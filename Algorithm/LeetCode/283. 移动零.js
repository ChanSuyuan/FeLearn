/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var moveZeroes = function (nums) {
    var i = 0;
    var count = 0;
    while (count < nums.length) {
        if (nums[i] == 0) {
            nums.splice(i, 1);
            nums.push(0);
        } else {
            i++;
        }
        count++;
    }
    return nums;
};