/**
 * @param {string} S
 * @return {string}
 */
// var removeDuplicates = function (S) {
//     let len = S.length;
//     let cache = S.split("");
//     for (let i = 0; i < len; i++) {
//         if (cache[i] == cache[i + 1]) {
//             cache.splice(i, i + 1);
//         }
//     }
//     return cache;

// };
// console.log(removeDuplicates("abbaca"));

var removeDuplicates = function(S) {
    const stk = [];
    for (const ch of S) {
        if (stk.length && stk[stk.length - 1] === ch) {
            stk.pop();
        } else {
            stk.push(ch);
        }
    }
    return stk.join('');
};

console.log(removeDuplicates("abbaca"));

/**
 * @param {string} S
 * @return {string}
 */
// var removeDuplicates = function (S) {
//     let len = S.length;
//     let cache = S.split("");
//     for (let i = 0; i < len; i++) {
//         if (cache[i] == cache[i + 1]) {
//             cache.splice(i, i + 1);
//         }
//     }
//     return cache;

// };
// console.log(removeDuplicates("abbaca"));

var removeDuplicates = function(S) {
    const stk = [];
    for (const ch of S) {
        if (stk.length && stk[stk.length - 1] === ch) {
            stk.pop();
        } else {
            stk.push(ch);
        }
    }
    return stk.join('');
};

console.log(removeDuplicates("abbaca"));

/**
 * @param {string} S
 * @return {string}
 */
// var removeDuplicates = function (S) {
//     let len = S.length;
//     let cache = S.split("");
//     for (let i = 0; i < len; i++) {
//         if (cache[i] == cache[i + 1]) {
//             cache.splice(i, i + 1);
//         }
//     }
//     return cache;

// };
// console.log(removeDuplicates("abbaca"));

var removeDuplicates = function(S) {
    const stk = [];
    for (const ch of S) {
        if (stk.length && stk[stk.length - 1] === ch) {
            stk.pop();
        } else {
            stk.push(ch);
        }
    }
    return stk.join('');
};

console.log(removeDuplicates("abbaca"));

