### vscode extensions
**持续更新中...**

在项目的 .vscode 文件夹下，创建一个文件 extension.json, 你只需提供一个 key， recommendations, 在这个数据中把所有的插件的 ID 放进去，当别人打开这个项目的时候，如果没有安装这些插件，vscode 就会提示

当然你可以直接安装到你的编辑器当中

下面我分享一下我自己的插件

	{
	  "extensions": {
	    "recommendations": [
	      "atom one dark theme", // theme
	      "atom one light theme",
	      "auto close tag", // Automatically add HTML/XML close tag
	      "auto rename tag", // 和上面这个差不多，很好理解
	      "autoprefixer", // 手写 css 这个东西可以解决几乎所有的兼容问题
	      "bookmarks", // 书签
	      "barcket pair colorizer", // 花括号有颜色 也有人用 Rainbow Brackets，这个可能是新写的，用的人还比较少
	      "chinese", // 这个不用说
	      "code Runner", // 目前 run js
	      "debugger for chrome", // 说实话没怎么用过
	      "document this", // 自动函数 class 注释
	      "eslint",
	      "RemoteHub", // 在 vscode 中直接看到 github 文件的改动
	      "github pull requests", // git 管理器中 pull request
	      "gitlens", // vscode 中的 sourcetree
	      "import cost", // 显示引入包的大小
	      "es6 code snippets", // 暂时先留着吧，提示不好的时候最好去掉
	      "lodash", // lodash snippets
	      "miniapp", // 小程序原生的 snippets
	      "npm Intellisense", // 提示 npm 包
	      "open in browser",
	      "openChrome", // 这两个还是比较常用
	      "path Intallisense", // 这个是相当好用的
	      "perttier", // 目前在用的 code formatter
	      "REST Client", // 直接发 http 请求  还在研究。。。
	      "sass",
	      "scss IntelliSense", // 我写 c 版本的 sass
	      "setting sync", // 同步 vscode 设置到 github （有密码的要注意保密）
	      "svn", // 为了工作，但是也没有怎么用，还是下了 smartSVN
	      "typescript hero", // Additional toolings for typescript
	      "vetur", // Vue tooling for VS Code
	      "vscode-random", // Generates random data directly into VS Code (命令面板执行 random)
	      "vscode-pigment" // Previews colors used inside the editor
	    ]
	  }
	}

