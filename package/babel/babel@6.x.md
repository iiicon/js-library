## babel 6.x
babel 用来解析 es6/7 的代码以便能让浏览器执行

首先需要安装 babel-loader babel-core

```
npm install --save-dev babel-loader babel-core
```
然后需要设置浏览器版本和一些编译规则要安装 babel-preset-env, 这也可以认为是 babel-loader 的一个参数，是版本规则

```
npm install babel-preset-env --save-dev
```

因为有些api和属性在低版本的浏览器上没有，这个时候就需要创造一个出来，用来执行同样的方法，就需要用 babel-polyfill 和 babel-transform-runtime, babel-polyfill 为全局垫片，用来开发应用，babel-transform-runtime 为局部垫片，用来开发框架

```
npm install --save babel-polyfill
npm install --save-dev babel-plugin-transform-runtime
npm install --save babel-runtime
```

