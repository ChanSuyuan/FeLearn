/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
    let s1 = s.replace(/\s*/g,"");
    let cache = [];
    const map = new Map()
    map.set("(", ")");
    for (let i = 0; i < s1.length; i++) {
        if(s1[i] === "+"){
            if(i == 0){
                continue;
            }
           
        }
    }
};

let a1 = "1 + 1";
let a2 = a1.replace(/\s*/g,""); 
var calculate = function(s) {
    const ops = [1];
    let sign = 1;

    let ret = 0;
    const n = s.length;
    let i = 0;
    while (i < n) {
        if (s[i] === ' ') {
            i++;
        } else if (s[i] === '+') {
            sign = ops[ops.length - 1];
            i++;
        } else if (s[i] === '-') {
            sign = -ops[ops.length - 1];
            i++;
        } else if (s[i] === '(') {
            ops.push(sign);
            i++;
        } else if (s[i] === ')') {
            ops.pop();
            i++;
        } else {
            let num = 0;
            while (i < n && !(isNaN(Number(s[i]))) && s[i] !== ' ') {
                num = num * 10 + s[i].charCodeAt() - '0'.charCodeAt();
                i++;
            }
            ret += sign * num;
        }
    }
    return ret;
};

