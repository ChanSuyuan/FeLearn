/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const cache = []
    const map = new Map()
    map.set("(", ")")
    map.set("[", "]")
    map.set("{", "}")
    console.log(map);
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            cache.push(s[i]);
            console.log(cache);
        }//判断map映射中是否含有字符按中元素，正括号存在即合理，继续循环
        else {
            if (cache.length === 0) {
                return false //无符合规则字符，则return false;
            }
            if (map.get(cache[cache.length - 1]) === s[i]) {
                cache.pop() //从map映射中获取栈顶元素
            }
            else return false
        }
    }
    if (cache.length) return false
    return true
};

console.log(isValid("([])"));
