// 函数 做几件事呢？
// 行为
// 1. 返回一个值
// 2. 调用别的函数
//   - 全局 （验证全局的这个函数有没有被调用到）
//   - 局部的(分析代码的影响链)
// 3. 改变一个值(分析代码的影响链) -> vue -> view -> 去验证视图
// 单测
// it 描述当前的测试
const { add } = require("../index");

// 组织我们的单元测试
describe("add", () => {
  it("add 1 + 2", () => {
    // 给定 input
    // 验证 output
    // 写我们的测试
    // 调用 add
    // 参数 -》 函数 input
    //  given - 准备测试数据
    const a = 1;
    const b = 2;

    // when -> 触发你要测试的动作
    const result = add(a, b);

    // 验证结果
    //   console.log(result === 3);
    // 匹配器
    // then -> 验证结果
    expect(result).toBe(3);
  });

  it("add 5+0", () => {
    expect(add(5, 0)).toBe(5);
  });
});

// 测试别的函数
