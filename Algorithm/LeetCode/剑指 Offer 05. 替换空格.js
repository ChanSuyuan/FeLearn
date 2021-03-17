/**
 * @param {string} s
 * @return {string}
 */


/* 
请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

示例 1：
输入：s = "We are happy."
输出："We%20are%20happy."
*/
 var replaceSpace = function (s) {
    // 1. 调用库函数懒蛋法 正则匹配 s.replace
    return s.replace(/\s/g, '%20')

    // 2. 规规矩矩loop法 空格的unicode码值是32
    let res = ''

    for (let c of s) res += c.charCodeAt() === 32 ? '%20' : c

    return res
};