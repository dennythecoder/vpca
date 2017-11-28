let templateRegex = /<template>([^]*)<\/template>/;
let commentsRegex = /<!--[^]*?-->/g;

function parseTemplate(content){
    let results = templateRegex.exec(content);
    let template = results ? results[1] : null;
    let templateWithoutComments = template ? template.replace(commentsRegex,"") : null;
    return templateWithoutComments;
}


module.exports=  {
    parseTemplate
};