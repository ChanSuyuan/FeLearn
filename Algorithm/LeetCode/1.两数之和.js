// var twoSum = function(nums, target) {
//     for(var i = 0;i < nums.length;i++){
//         for(var j = i + 1;j < nums.length;j++){
//             if(nums[i] + nums[j] == target){
//                 return [i,j];
//             }
//         }
//     }
// };
// console.log(twoSum([2,7,11,15],9));
// console.log(twoSum([3,2,4],6));

/* 
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

*/
// reduce();

// var twoSum = function(nums,target){
//     var n = nums.length
//     var coche = new Array(n + 1).fill(0);
//     console.log(coche);
// };
// twoSum([1,2,3],5);

function fn(s){
    if(s[0] == 1 && s.length == 1){
        return true;
    }
    var ans = s.slice(1,s.length);
    var len = ans.length;
    if(ans[0] == 1){
        return true;
    }
     for(let i = 1;i < len;i++){
            if(ans[i] + ans[i + 1] == "11"){
                return false;
        }
    }
    return false;
}
fn("10");