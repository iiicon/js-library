## 安装
突然从 webpack2 升级到了 webpack4 遇到了很多问题，安装的时候突然就冒出一个 webpack-cli 的脚手架工具，据说可以像 parcel 那样 0 配置直接开发项目，但是还是不打算直接用。

- 首先先说一下安装的问题   
	全局安装需要安装 webpack 和 webpack-cli，必须全部安装，但是内部文件中使用 webpack 的时候还是会有问题，会有 module 未能找到的报错，不知道 bin 目录中究竟是安装了什么东西   
	但是如果你是直接在自己的根目录下安装 webpack 和 webpack-cli 的话，是不会有什么问题的，步骤如下：
	
	```
	npm install webpack -D
	npm install webpack-cli -D
	npm init -y
	```
	但是以前的直接用 webpack 直接打包的命令是不能用了，而且现在需要你把入口名字直接放到 src/index.js 里面， 使用如下命令便能直接打包相关文件了
	
	```
	webpack --mode-development
	```

