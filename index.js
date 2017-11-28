
const { lstatSync, readdirSync, readFileSync, writeFileSync, unlinkSync } = require('fs');
const { extname } = require('path');
const { createLinesSummary, createDirectivesSummary } = require("./summary");
const { parseTemplate } = require("./template");
const { grabDirectives } = require("./directives");

function writeToStatsFile(stats){
    const STATS_FILE_NAME = "./vpca-stats.log";
    try{
        unlinkSync(STATS_FILE_NAME);
    }catch(e){}
    let file = writeFileSync(STATS_FILE_NAME,JSON.stringify(stats));
}

function start(){ 
    let stats = processFolder(".");

    let data = {
        lines:createLinesSummary(stats),
        directives:createDirectivesSummary(stats)
    };
 
    writeToStatsFile(data);
}
function processFolder(path){
    let contents = readdirSync(path).map(subPath=> path +"/" + subPath);
    let folders = contents.filter(p => lstatSync(p).isDirectory());
    let files = contents.filter(p => lstatSync(p).isFile())
        .filter(f=>extname(f)===".vue");
    let stats = folders.reduce((prev,curr)=>prev.concat(processFolder(curr)),[]);
    
    return files.map(f=>processFile(f)).concat(stats).filter(s=>!!s);
}



function calculateLineCount(text){
    if(!text){
        return 0;
    }else{
        return text.split("\n").length;
    }
}





function processFile(file){
    let content = readFileSync(file,{encoding:"utf-8"});
    let template = parseTemplate(content);
    if(template){
        const count = calculateLineCount(template);
        const directives = grabDirectives(template);
        const directivesCount = directives.length;
        
        return{
            file,
            template,
            count,
            directives,
            directivesCount
        };
    }

}



if (require.main === module) {
    start();
}

module.exports = {
    start
};