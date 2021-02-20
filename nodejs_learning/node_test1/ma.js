console.log("asdsadas");
require("./mb");
var a = 10;

class Person {
    constructor() {
        this.name = "张三"
    }
    hobby() {
        console.log("喜欢打篮球")
    }
}

module.exports = {
    a,
    Person
}
/* 
    exports 是 module.export的引用
    module.exports = exports
*/
exports.a = a;
exports.Person = Person;
