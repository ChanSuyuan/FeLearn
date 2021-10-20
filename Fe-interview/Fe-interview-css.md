# CSS

## 盒模型

- **W3C 标准盒模型 ： 盒子宽（高）度= width(height) + padding + border + margin**
- IE 怪异盒子模型：**盒子宽（高）度= width(height) + margin**

- **在设置样式时通过添加 box-sizing 属性定义引擎采用哪种计算方式。**

```css
box-sizing: content-box|border-box|inherit:
content-box 默认值，元素的 width/height 不包含padding，border，与标准盒子模型表现一致
border-box 元素的 width/height 包含 padding，border，与怪异盒子模型表现一致
inherit 指定 box-sizing 属性的值，应该从父元素继承
```



## 几种上下文

- **BFC：格式化上下文，是页面上的一个独立的渲染区域。**

- - **形成条件：**

- - - float 的值不是 none
    - position 的值不是 static 或者 relative

- - - display 的值是 inline-block, table-cell, flex, table-caption 或者 inline-flex
    - overflow 的值不是 visible

- **IFC：内联格式上下文。水平可以通过添加 text-align: center / display: inline-block生成。垂直可以通过vertical-align: middle**
- **GFC：网格布局上下文，display: grid**

- **FFC：自适应格式上下文， display: flex / inline-flex**

## CSS 选择器

- **包含：id选择器（#box）、类选择器（.box）、标签选择器（div）、后代选择器（#box div）、子选择器（.one>one_1）、相邻选择器（.one + .two）、伪类选择器、伪元素选择器、属性选择器。**
- **其中 子类选择器：选择父类元素为 .one 的所有 .one_1 的元素。  相邻选择器：选择紧接在 .one 之后的所有 .two 元素**



## CSS 优先级



内联 > ID 选择器 > 类选择器 > 标签选择器



## 继承属性

- **继承属性可分为字体系列属性、文本系列属性、元素可见性(visibility)、表格布局属性。**



## CSS 新特性

### Transition 过渡

### animation 动画

### shadow 阴影

### transform 转换



## CSS Position

- **Static ： 默认值、表示无定位。**
- **absolute：** **表示采用绝对定位方式，相对于position值不是static的父容器进行定位，该值会使元素脱离文档流，使用该值后可以用**`**left，right，top，bottom**`**对元素进行移动定位。设置后脱离文档流。**

- **relative：** **表示采用相对定位的方式，相对于元素原本的位置进行定位，该值****不会****使元素脱离文档流，使用该值后可以用**`**left，right，top，bottom**`**对元素进行移动定位。**
- **fixed：** **表示采用固定定位的方式，相对于浏览器窗口进行定位，并且无论滚动条怎么滚动，使用了该值的元素都始终处于固定位置，该值会使元素脱离文档流，使用该值后可以用**`**left，right，top，bottom**`**对元素进行移动定位。设置后脱离文档流**

- **sticky：常用于scroll事件中，在 viewport 时该元素的位置不受定位影响，而当该元素的位置要离开 viewport 时，定位会变成 fixed。该元素不脱离文档流。**
- **float：浮动，设置后脱离文档流。**



## 常规水平居中、水平垂直居中

### 水平居中：

```css
    /* 水平居中有几种	方法分别可以是 
        1、块级元素中，在子级直接设置margin: 0 auto;
        2、在行内元素中，可以直接设置text-align:center；
        3、 在块级元素中，当子级中有float设置了属性，则需要在父级中设置width:fit-content，以及设置margin: 0 auto;
        4、在块级元素中，可以使用flex盒子。在2012版本的flex盒子，可以设置父级为display:flex,justify-content:center;
        5、采用绝对定位联合transform,在子级中设置position:absolute,设置left为50%，transform:translate(-50%,0);
        6、采用负margin方法，在子级中设置position:absolute,设置left:50%，宽度width:X 然后margin-left:- 1/2 X;
        7、在子级中将left、right都设置为0，并且设置position:absolute;margin:0 auto;
     */
```

### 水平垂直居中：

```css
  /* 水平垂直居中的方法
        1、行内元素，在父级设置height,在子级设置line-height，在此处两者需要设置相同的值。
        2、table，在父级设置display:table，在子级设置display:table-cell;vertical-align:middle;
        3、使用flex布局。在父级中设置display:flex,align-items:center;
        4、使用绝对定位，在子级中设置position:absolute,然后设置top:50% left:50%;transform:translate(-50%,-50%);
        5、使用绝对定位，在子级中设置position:absolute,然后设置top:50%,left:50%;width:x,height:y,margin-top: - 1/2 X;margin-left : - 1/2 y;
        6、使用绝对定位，在子级中设置left、right、top、bottom都为0，然后设置margin:auto 0;
     */
```

## Flex 布局

- **包含：flex-direction、flex-wrap、flex-flow、justify-content、align-items、align-content、flex-grow、 flex-shrink 、flex-basis。**
- **flex-direction: row/ row-reverse / column / column-reverse**

- **flex-wrap: nowrap / wrap / wrap-reverse**
- **justify-content: flex-start / flex-end / center / space-between / space-around**

## Grid 布局

- **包含：**



## 关于Span标签的padding、margin的设置

- **span是一种内联样式，初始默认的 display 属性是 inline，是不允许设置宽高的。如果想要设置宽高，需要将其转换成块级元素 - display: block**  





## 圣杯布局 && 双飞翼布局

- **作用：圣杯布局和双飞翼布局解决的问题是一样的，就是两边顶宽，中间自适应的三栏布局，中间栏是要在放在文档流前面以优先渲染。**
- **区别：圣杯布局，为了中间 div 内容不被遮挡，将中间的 div 设置了左右 padding-left 和 padding-right 后，将左右两个 div 用相对布局 position: relative 并分别配合 right 和 left 属性， 以便左右两栏 div 移动后不遮挡中间 div 。双飞翼布局，为了中间 div 内容不被遮挡，直接在中间 div 内部 创建子 div 用于放置内容， 在该子 div 里用 margin-left 和 margin-right 为左右两栏 div 留出位置。**

- **圣杯布局** 

```javascript
<body>
<div id="hd">header</div>
<div id="bd">
  <div id="middle">middle</div>
  <div id="left">left</div>
  <div id="right">right</div>
</div>
<div id="footer">footer</div>
</body>

<style>
#hd{
    height:50px;
    background: #666;
    text-align: center;
}
#bd{
    /*左右栏通过添加负的margin放到正确的位置了，此段代码是为了摆正中间栏的位置*/
    padding:0 200px 0 180px;
    height:100px;
}
#middle{
    float:left;
    width:100%;/*左栏上去到第一行*/
    height:100px;
    background:blue;
}
#left{
    float:left;
    width:180px;
    height:100px;
    margin-left:-100%;
    background:#0c9;
    /*中间栏的位置摆正之后，左栏的位置也相应右移，通过相对定位的left恢复到正确位置*/
    position:relative;
    left:-180px;
}
#right{
    float:left;
    width:200px;
    height:100px;
    margin-left:-200px;
    background:#0c9;
    /*中间栏的位置摆正之后，右栏的位置也相应左移，通过相对定位的right恢复到正确位置*/
    position:relative;
    right:-200px;
}
#footer{
    height:50px;
    background: #666;
    text-align: center;
}
</style>
```

- **双飞翼布局** 

```javascript
<body>
<div id="hd">header</div> 
  <div id="middle">
    <div id="inside">middle</div>
  </div>
  <div id="left">left</div>
  <div id="right">right</div>
  <div id="footer">footer</div>
</body>

<style>
#hd{
    height:50px;
    background: #666;
    text-align: center;
}
#middle{
    float:left;
    width:100%;/*左栏上去到第一行*/     
    height:100px;
    background:blue;
}
#left{
    float:left;
    width:180px;
    height:100px;
    margin-left:-100%;
    background:#0c9;
}
#right{
    float:left;
    width:200px;
    height:100px;
    margin-left:-200px;
    background:#0c9;
}

/*给内部div添加margin，把内容放到中间栏，其实整个背景还是100%*/ 
#inside{
    margin:0 200px 0 180px;
    height:100px;
}
#footer{  
   clear:both; /*记得清楚浮动*/  
   height:50px;     
   background: #666;    
   text-align: center; 
} 
</style>
```



## 隐藏元素

占位：

- `visibility: hidden;`
- `margin-left: -100%;`

- `opacity: 0;`
- `transform: scale(0);`

不占位:

- `display: none;`
- `width: 0; height: 0; overflow: hidden;`

仅对块内元素：

- `text-indent: -9999px;`
- `font-size: 0;`



## 清除 float 的方式以及其优点

- 问题出现的原因：父元素只包含浮动元素，在没有设置高度属性或者auto的前提下，它的高度会塌陷会零，因为子元素设置了 float 属性，而 float 属性会把元素从标准文档流中抽离，直接结果就是外部盒子丢掉两个孩子，因为内部没有其他盒子了，所以外部盒子只包裹文本节点内容，却把两个内部盒子扔在外面了。
- 解决方案：

- - 把外部盒子也从标准文档流中抽离，让它和孩子们见面。缺点：可读性差，不易于维护（别人很难理解为什么要给父元素也添上float），而且可能需要调整整个页面布局。
  - 在外部盒子的最下方添置一个带有 clear 属性的空盒子。 缺点：冗余代码。

- - 用 overflow: hidden 清除浮动。 给外部盒子添加该属性。 缺点： 可能造成溢出元素不可见。
  - 用伪元素 after 清除浮动。给外部盒子的 after 伪元素设置 clear 属性，再隐藏它。这其实是对空盒子方案的改进，一种纯CSS的解决方案，不用引入冗余元素。 

```css
clearfix {*zoom: 1;}
.clearfix:before,.clearfix:after {display: table;line-height: 0;content: "";}
.clearfix:after {clear: both;}
```



## CSS 三角形

- 原理：高宽设置为 0 ， 四个边框设置 border-width ,border-style ,border-color 即可，如果某个三角要变为透明，设置 border-color: transparent 。

```css
<div class='rect'></div>
<style>
    .rect {
      width: 0;
      height: 0;
      background-color: #fff;
      border-right: 100px solid rgb(34, 230, 220);
      border-left: 100px solid rgb(202, 146, 25);
      border-top: 100px solid rgb(29, 156, 194);
      border-bottom: 100px solid rgb(16, 204, 101);
    }
  </style>
// 创建一个 div ，宽高都为0，实现效果如下，发现border的四个边都是一个三角形，
```

![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1629018907189-79ef6322-da0a-4b29-bc75-059a11a689e8.png)

```css
// 要实现三角形只需将其中几个边background设置为transparent，即可得到三角形。
 <style>
    .rect {
      width: 0;
      height: 0;
      background-color: #fff;
      border-right: 100px solid transparent;
      border-left: 100px solid transparent;
      border-top: 100px solid rgb(29, 156, 194);
      border-bottom: 100px solid transparent;
    }
  </style>
```

- ![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1629018944591-41d97af7-3364-4aed-8c0a-e0fadc1ff1ce.png)

## px rem em vw vh

- px: 绝对固定的值，无论页面放大或者缩小都不会改变。
- em: 可从父级继承，相对父亲标签字体大小的倍数。如果当前元素的字体为 `12px`，那么子元素 `1em` 就是 12`px`。由于是相对父级的倍数，所以多层嵌套时，倍数关系的计算会很头痛。

- rem: 相对根元素字体大小的倍数。相对于 `html` 的字体大小，如果不做任何修改，浏览器默认字体大小为 `16px`。
- vw : 1vw 等于视口宽度的1%

- vh : 1vh 等于视口高度的1%
- vmin : 选取 vw 和 vh 中最小的那个

- vmax : 选取 vw 和 vh 中最大的那个



## 什么是 FOUC ， 如何避免 FOUC ?

- FOUC, 即是 Flash of Unstyled Content，是指页面一开始以样式 A （或无样式）的渲染，突然变成样式 B。
- 原因是样式表的晚于 HTML 加载导致页面重新绘制。即通过 @import 方式导入样式表 、style 标签在 body 里。

- 解决方法： 把 link 放在 head 中。



## CSS Sprites 的原理和优缺点 *

- 原理：多张图片合成成一张单独的图片。可以减少网站的 HTTP 请求数。该图片使用 CSS background 和 background-position 属性渲染，这也就意味着标签变得更加复杂了，图片是在 CSS 中定义，而非 img 标签。
- 优点：hover效果，如果是多个图片，网络正常的情况下首次会闪烁一下。如果是断网情况下，就没图片了。sprites 就很好的解决了这个问题（第一次就加载好了）。合并了请求数，制作帧动画方便。

- 缺点：位置不好控制，有时候容易露底。。比如说30*30的按钮，图片只有12*12保不齐就漏出其他图片了。合成时候比较费时（有工具代替）。位置计算费时（有工具代替）。更新一部分的时候，需要重新加载整个图片，缓存失效。

## CSS 可置换元素与不可置换元素

- CSS 可置换元素，一般自带有固有的宽高。其展现效果不由 CSS 控制。对于其外观的渲染是独立于 CSS 的。简单来讲，对于该元素的内容，并不会收到当前文档样式影响。对于 CSS 可置换元素，需要留意的是对于其可能也是行内元素或是块级元素的可能性。
- 行内元素是无法改变宽高的，而 img 作为一种行内元素却可以修改其宽高，就是因为 img 是一种可置换元素。

- 典型的可替换元素：iframe vedio embed img 。

## Chrome 支持 12 px 以下的文字元素

- 使用 transform: sacle() 。但其中，transform 对行内元素无效，需要添加 display: block / inline-block ，到这里还没完，在设置完属性对元素进行了缩放，原本元素还是会占据对应位置，需要在外部再添加一层 div 。
- 使用图片。



## 浏览器是怎么判断元素是否和某个 CSS 选择器匹配 ？

- 先产生一个元素集合，然后从后往前判断。
- e.g：

- - 有选择器 div.ready #wrapper > .bg-red 
  - 先把所有元素 class 中有 bg-red 的元素拿出来组成一个集合，然后上一层，对每一个集合中的元素，如果元素的 parent id 不为 #wrapper 则把元素从集合中删去。再向上，从这个元素的父元素开始向上找，没有找到一个 tagName 为 div 且 class 中有 ready 的元素，就把原来的元素从集合中删去。

- - ![img](https://cdn.nlark.com/yuque/0/2021/png/22079037/1629217519989-917465cb-ad61-4fe6-94f8-d699cbf62e32.png)

- **P.s：为什么从后往前匹配是因为效率和文档流的解析方向。效率不必说，找元素的父亲和之前的兄弟比遍历所有儿子快并且方便。****关于文档流的解析方向，是因为现在的**` **CSS**`**，一个元素只要确定了这个元素在文档流之前出现过的所有元素，就能确定他的匹配情况；应用在即使** `**html**` **没有载入完成，浏览器也能根据已经载入的这一部分信息完全确定出现过的元素的属性。**
- **P.s：** **为什么是用集合主要也还是效率。基于**` **CSS Rule**` **数量远远小于元素数量的假设和索引的运用，遍历每一条** `**CSS Rule**` **通过集合筛选，比遍历每一个元素再遍历每一条** `**Rule**` **匹配要快得多。**

