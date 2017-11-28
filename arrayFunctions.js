function findAverage(arr, field){
    let sum = arr.reduce((prev,curr)=>{
        if(field){
            return prev + curr[field];
        }else{
            return prev + curr;
        }
    },0);
    return sum / arr.length;
}
function findMean(arr, field){
    if(!arr) return;
    if(field){
        arr.sort((a,b)=>{
            if(a[field] > b[field]) return 1;
            if(a[field] < b[field]) return -1;
            return 0;
        });
    }else{
        arr.sort();
    }
    let l = arr.length,
        upper = arr[Math.ceil(l/2)],
        lower = arr[Math.floor(l/2)];
    return (upper[field] + lower[field]) / 2;
}


module.exports = {
    findAverage,
    findMean
}