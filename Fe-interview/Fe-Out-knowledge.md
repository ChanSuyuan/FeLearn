### 什么是微前端？

+ 微前端的思想：现代 Web App 的多个相对独立的功能模块应该由对应的相对独立的多个团队负责。 
+ 概念：与多个可以独立发布功能的团队一起构建现代化Web应用程序的技术、策略和方法，但需要区别的是，它并不代表着某种技术，而是指一种架构理念。 
+ 微前端，由微服务演变而来，逐渐分为了三个部分：独立开发、独立测试、独立部署。##

### Eslint 的实现原理

+ Eslint 的作用，代码规范与代码检查。

#### Linter

Linter 是 eslint 最核心的类。它提供了这几个 api：

```
verify // 检查
verifyAndFix // 检查并修复

getSourceCode // 获取 AST
defineParser // 定义 Parser
defineRule // 定义 Rule
getRules // 获取所有的 Rule
```

SourceCode 就是指 AST（抽象语法树），Parser 是把源码字符串解析成 AST 的，而 Rule

 则是我们配置的那些对 AST 进行检查的规则。

Linter 主要的功能是在 verify 和 verifyAndFix 里实现的，当命令行指定 --fix 或者配置文件指定 fix: true 就会调用 verifyAndFix 对代码进行检查并修复，否则会调用 verify 来进行检查。

**那么 verify 和 fix 是怎么实现的呢？ 这就是 eslint 最核心的部分了。**

我们知道 Eslint 的 rule 是基于 AST 进行检查的，那就是要先把源码 parse 成 AST。而 eslint 的 parser 也是可以切换的，需要向找到用啥 parser ：

默认是 Eslint 自带的 espree，也可以通过配置来切换成别的 parser，比如 @eslint/babel-parser、@typescript/eslint-parser等。

以下是关于 resolve parser 的逻辑

```javascript
let parserName = DEFAULT_PARSER_NAME;
let parser = espree;
if(typeof config.parser === 'object' && config.parser ！== null) {
  parseName = config.parser.filePath;
  parser = config.parser.definition;
}else if(typeof config.parser === "string"){
  //....
  parser = slots.parserMap.get(config.parser);
}
```

确定了 parser 之后，就是调用 parse 方法。

parser的 parse 方法会把源码解析为 AST，在 eslint 里通过 SourceCode 来封装 AST 的。后面看到 SourceCode 就是指 AST 。

```javascript
const parseResult = parse(
	text,
  parser,
  parserOptions,
  options.filename
);

slots.lastSourceCode = parseResult.sourceCode;
```

有了 AST ，就可以调用 rules 对 AST 进行检查。

调用 rule 对 SourceCode 进行检查，获得 lintingProblems

parse 之后，会调用 runRules 方法对 AST 进行检查，返回结果就是 problems，也就是有什么错误和怎么修复的信息。

```javascript
try {
	lintingProblems = runRules(
  	sourceCode,
    configuredRules,
    ruleId => getRule(slots,ruleId),
    parseOptions,
    parserName,
    settings,
    options.filename,
    options.disableFixes,
    slots.cwd,
    providedOptions.physicalFilename
  );
}catch(err) {
  //....
}
```

那么 runRules 是怎么运行 Rule 的呢？

rule 会通过鉴别，对不同的 AST 做不同的检查，与 babel 类似。 runRules 会遍历 AST，然后遇到不同的 AST 会 emit 不同的事件。rule 里处理声明 AST 就会监听什么事件，这样通过事件监听的方式，就可以在遍历 AST 的过程中，执行不同的 rule 。

通过创建 listener 监听器，在遍历 AST，emit 不同的事件，触发 listener，而在这个 listener 中有 ruleContext，rule 里面就是通过这个 report 的 api 进行报错，这样就可以把所有的错误收起来，然后进行打印。

![image-20211102104124917](C:\Users\Csy\AppData\Roaming\Typora\typora-user-images\image-20211102104124917.png)

这里的 Problem 指的是 **linting problem** 。

lint problem 是 检查的结果，也就是从哪一行哪一列到哪一行哪一列，有什么错误。

还有就是怎么修复，修复其实就是从哪个下标到哪个下标（range），替换成什么文本（text）。

```typescript
type LintMessage = {
  column: number | undefined;
  endColumn?: number;
  endLine?: number;
  fatal: boolean;
  fix?: {
		range: [number,number];
    text: string;
  };
  line: number | undefined;
  message: string;
  ruleId: string | null;
  severity: 0 | 1 | 2;
	//.....
}
```

fix 的修改操作就是实现简单的字符串替换。

**通过字符串替换实现自动 fix**

遍历完 AST 调用了所有的 rules，收集到了 linting Problems 之后，就可以进行 fix 了。

```typescript
do {
	passNumber ++;
  
  debug(`Linting code for ${debugTextDescription}(pass ${passNumber})`);
  messages = this.verify(currentText, config, options);
  
  debug(`Generating fixed text for ${debugTextDescription}(pass ${passNumber})`);
  fixedResult = SourceCodeFixer.applyFixes(currentText, messages, shouldFix);
  
  // keep track if any fixes were ever applied -important for return value
  fixed = fixed || fixedResult.fixed;
  
  // update to use the fixed output instead of the original text
  currentText = fixedResult.output;
}while(
	fixedResult.fixed && passNumber < MAX_AUTOFIX_PASSES
)
```

也就是 verify 进行检查，然后根据 fix 信息自动 fix

fix 就是字符串替换：

```typescript
function attemptFix(problem) {
	const fix = problem.fix;
	const start = fix.range[0];
	const end = fix.rangep[1];
	
	// Remain it as a problem if it's overlapped or it's a negative range
	if(lastPos >= start || start > end) {
		remainingMessages.push(problem);
		return false;
	}
	
	// Remove BOM.
	if((start < 0 && end >= 0) || (start === 0 && fix.text.startsWith(BOM))){
		output = "";
	}
	
	// Make output to this fix
	output += text.slice(Math.max(0,lastPos), Math.max(0,start));
	output += fix.text;
	lastPos = end;
	return true;
}
```

有的同学可能注意到了，字符串替换为什么要加个 while 循环呢？

因为多个 fix 之间的 range 也就是替换的范围可能是有重叠的，如果有重叠就放到下一次来修复，这样 while 循环最多修复 10 次，如果还有 fix 没修复就不修了。

这就是 fix 的实现原理，通过字符串替换来实现的，如果有重叠就循环来 fix。

### preprocess 和 postprocess

其实核心的 verify 和 fix 的流程就是上面那些，但是 Eslint 还支持之前和之后做一些处理。也就是 pre 和 post 的 process，这些也是在插件里定义的。

```javascript
module.exports = {
    processors: {
        ".txt": {
            preprocess: function(text, filename) {
                return [ // return an array of code blocks to lint
                    { text: code1, filename: "0.js" },
                    { text: code2, filename: "1.js" },
                ];
            },

            postprocess: function(messages, filename) {
              
                return [].concat(...messages);
            }
        }
    }
};
```

之前的处理是把非 js 文件解析出其中的一个个 js 文件来，这和 webpack 的 loader 很像，这使得 Eslint 可以处理非 JS 文件的 lint。

之后的处理呢？那肯定是处理 problems 啊，也就是 messages，可以过滤掉一些 messages，或者做一些修改之类的。

那 preprocess 和 postprocess 是怎么实现的呢？

这个就比较简单了，就是在 verify 之前和之后调用就行。

![image-20211102112945687](C:\Users\Csy\AppData\Roaming\Typora\typora-user-images\image-20211102112945687.png)

### 通过 comment directives 来过滤掉一些 problems

我们知道 eslint 还支持通过注释来配置，比如 `/* eslint-disable */` `/*eslint-enable*/` 这种。

那它是怎么实现的呢？

注释的配置是通过扫描 AST 来收集所有的配置的，这种配置叫做 commentDirective，也就是哪行那列 Eslint 是否生效。

然后在 verify 结束的时候，对收集到的 linting problems 做一次过滤即可。
