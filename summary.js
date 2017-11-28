const {findAverage, findMean} = require("./arrayFunctions");

function createLinesSummary(stats){
    stats.sort((a, b) => b.count - a.count);
    let min = stats[0].count,
        max = stats[stats.length-1].count,
        mean = findMean(stats,"count"),
        average = findAverage(stats,"count");
    
    return {
        min,
        max,
        mean,
        average
    };
}
function createDirectivesSummary(stats){
    stats.sort((a,b)=> a.directivesCount - b.directivesCount);
    let min = stats[0].directivesCount,
        max = stats[stats.length-1].directivesCount,
        sum = stats.reduce((a,b)=>a+b.directivesCount,0),
        average = sum / stats.length,
        mean = stats[Math.floor(stats.length/2)].directivesCount;
    
    return {
        min,
        max,
        sum,
        average,
        mean,
        directives: stats[10].directives.grouped
    };
}

module.exports = {
    createLinesSummary,
    createDirectivesSummary
};