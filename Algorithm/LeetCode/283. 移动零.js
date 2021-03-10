/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// var moveZeroes = function (nums) {
//     var i = 0;
//     while (i < nums.length) {
//         if(nums[i] == 0){
//             nums.splice(i,1);
//             nums.push(0);
//             console.log(nums)
//         }
//         i++;
//     }
//     return nums;
// };

// console.log(moveZeroes( [0,1,0,3,12]));

// console.log(moveZeroes( [0,1,0]));

// console.log(moveZeroes( [0,0,1]));
nums = [0,0,1];
var i = 0;
while (i < nums.length) {
    if(nums[i] == 0){
        nums.splice(i,1);
        nums.push(0);
        i = 0;
    }else{
        i ++;
    }
    
}