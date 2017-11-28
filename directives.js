const {findAverage, findMean} = require("./arrayFunctions");

let directivesRegex = /(v-[A-z]+?)[\s|=]/gi;
let shortHandVbindRegex = /\s:([A-z]+)/gi;
let shortHandVonRegex = /\s@([A-z]+)/gi;

let isLogged = 0;

function arrToObject(arr){
    let o = {};
    arr.forEach((item, idx)=>o[idx]=item);
    return o;
}


function groupDirectives(directives){
    let map = Object.create(null);
    map["v-on"] = [];
    map["v-bind"] = [];
    directives.forEach(d=>{
        if(!map[d.name]) map[d.name] = [];
        map[d.name].push(d);
    });

    return map;
}



function grabDirectives(template){
    let results = [];
    let result;
    while((result = directivesRegex.exec(template))){
        results.push(makeDirective(result[1]));
    }
    while((result = shortHandVbindRegex.exec(template))){
        results.push(makeVbind(result[1]));
    }   
    while((result = shortHandVonRegex.exec(template))){
        results.push(makeVon(result[1]));
    }  
    results.grouped = groupDirectives(results);
    return results;
 }


function makeDirective(result){
    let split = result.split(":"),
        name = split[0];

    switch(name){
        case "v-bind":
            return makeVbind(split[1]);
        case "v-on":
            return makeVon(split[1]);
        default:
            return {
                name:name
            };
    }


}

function makeVbind(binded){
    return {
        name:"v-bind",
        binded
    };
}

function makeVon(handledResult){
    let modifiers = handledResult.split("."),
        handled = modifiers.shift();
    return {
        name:"v-on",
        handled,
        modifiers
    };
}




 module.exports = {
     grabDirectives
 };