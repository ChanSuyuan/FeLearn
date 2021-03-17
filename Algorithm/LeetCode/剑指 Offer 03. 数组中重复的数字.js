/**
 * @param {number[]} nums
 * @return {number}
 * 找出数组中重复的数字。
在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，
但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

 */
var findRepeatNumber = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] == nums[j]) {
                return nums[i];
            }
        }
    }
    return false;
};

/* 
    这是一道较为典型题，通过暴力循环，查找重复数字，该题简单在只需要返回任意一个，而并不是全部，如果是全部，那么题目会更有意思。
    通过暴力循环，可以容易地得到答案，但是内存占有率已经运行速度都不怎么理想。那么在此转换一下思路，试一下别的方法。
*/

var findRepeatNumber = function (nums) {
    let map = new Map();
    for (let i of nums) {
        if (map.has(i)) {
            return i;
        }
        map.set(i, 1);
    }
    return null;
}
/* 
执行用时：
100 ms, 在所有 JavaScript 提交中击败了59.05%的用户
内存消耗：45.5 MB, 在所有 JavaScript 提交中击败了29.37%的用户
*/
