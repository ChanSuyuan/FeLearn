/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function (num) {
    let arr = new Array(num + 1).fill(0);
    for (let i = 1; i <= num; i++) {
        if (i & 1) {
            arr[i] = arr[i - 1] + 1;
        } else {
            arr[i] = arr[i / 2];
        }
    }
};



/* 
本题思路: 一如既往，new Array 初始化创建数组;

*/