// /**
//  * @param {number} n - a positive integer
//  * @return {number}
//  */
//  var hammingWeight = function (n) {
//     var len = n.length;
//     var c = n.toString(2);
//     var d = c.split("");
//     var count = 0;
//     for(let i = 0 ; i < d.length;i++){
//         if(d[i] == "1"){
//             count ++;
//         }
//     }
//     return count;
//     // var num = 0;
//     // while(n!=0){
//     //     num += n & 1;
//     //     n = n >>> 1;
//     // }
//     // return num;
// };




// hammingWeight("00000000000000000000000000001011");

const obj = {
    [Symbol.toPrimitive](a){
        if(a === 'Object'){
            return {age:42};
        }
        return null
    }
};
console.log(+obj);