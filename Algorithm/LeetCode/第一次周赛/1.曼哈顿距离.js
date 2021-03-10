/**
 * @param {number} x
 * @param {number} y
 * @param {number[][]} points
 * @return {number}
 */
function fn(x,y,points){
    var len = points.length;
    var temp = [];
    var arr = new Array(len).fill(0).map(()=> new Array(2).fill(0));
    var tmp = 0;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < 2; j++) {
            if (x == points[i][j] || y == points[i][j + 1]) {
                arr[i][0] = x;
                arr[i][1] = y;
                tmp = 1;
            }
        }
    }

    if (tmp == 1) {
        for (let i = 0; i < arr.length; i++) {
            var c = Math.abs(x - arr[i][0]) + Math.abs(y - arr[i][1]);
            temp[i] = c;
        }
        var d = Math.min.apply(null,temp);
        for (let i = 0; i < temp.length; i++) {
            if(temp[i] == d){
                return i;
            }
        }
    }
    return -1;
}
fn(3,4,[[1,2],[3,1],[2,4],[2,3],[4,4]]);
// temp = [1,2,3,4,5];
// var d = Math.min.apply(null,temp);
// console.log(d);





/////////////////////////////////////////////////////////// 


/**
 * @param {number} x
 * @param {number} y
 * @param {number[][]} points
 * @return {number}
 */
var nearestValidPoint = function (x, y, points) {
    var len = points.length;
    var arr = new Array(len).fill(0).map(()=> new Array(2).fill(0));
    for(let i = 0 ;i < len;i ++){
        for(let j = 0;j < 2;j++){
            if(x == points[i][j] || y == points[i][j + 1]){
                arr[i] = points[i][j]; 
            }
        }
    }
    if(arr.length){
        var tmp = [];
        for(let i = 0;i < arr.length;i ++){
            var c = Math.abs(arr[i][0]) + Math.abs(arr[i][1]);
            tmp[i] = c;
        }
        var d = Math.min.apply(null,tmp);
        for(let i = 0;i < tmp.length;i++){
            if(tmp[i] == d){
                return i;
            }
        }
    }
    return -1;
 };























