/**
 * @param {number[]} nums
 * 
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
    var stack = [];//单调栈
    var len = nums.length;
    const res = new Array(len + 1).fill(-1);
    for (let i = 0; i < 2 * n - 1; i++) {
        while (stack.length && nums[stack[stack.length - 1]] < nums[i % n]) {
            res[stack[stack.length - 1]] = nums[i % n];
            stack.pop();
        }
        stack.push(i % n);
    }
    return res;

};








var nextGreaterElements = function (nums) {
    const n = nums.length;
    const ret = new Array(n).fill(-1);
    const stk = [];
    for (let i = 0; i < n * 2 - 1; i++) {
        while (stk.length && nums[stk[stk.length - 1]] < nums[i % n]) {
            ret[stk[stk.length - 1]] = nums[i % n];
            stk.pop();
        }
        stk.push(i % n);
    }
    return ret;
};


function fn(nums) {
    const n = nums.length;
    const ret = new Array(n).fill(-1);
    const stk = [];
    for (let i = 0; i < n * 2 - 1; i++) {
        while (stk.length && nums[stk[stk.length - 1]] < nums[i % n]) {
            ret[stk[stk.length - 1]] = nums[i % n];
            stk.pop();
        }
        stk.push(i % n);
        console.log(stk);
    }
}

fn([1, 2, 1]);



// var nextGreaterElements = function(nums) {
//     var stack = [];
//     var len = nums.length;
//     var ans = new Array(len).fill(-1);
//     for (var i = 0; i < len * 2; i++) {
//         while (stack.length && nums[stack[stack.length - 1]] < nums[i % len]) {
//             ans[stack[stack.length - 1]]  = nums[i % len];
//             stack.pop()
//         }
//         stack.push(i % len)
//     }
//     return ans;
// };