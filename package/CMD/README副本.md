## CMD

- 书写格式如下   
	
	```
	define(factory)
	```

- factory 为函数时，表示模块的构造方法。该构造方法，可以得到模块向外提供的接口。 factory 方法字啊执行时，默认会传入三个参数：require、exports、module
	
	```
	define(factory(require, exports, module){
	
		// 模块代码
		
	})
	```

- define 也可以接受两个以上的参数, 但是这不属于 cmd 规范

	```
	define('hello', ['jquery'], function(require, exports, module) {
	
	  // 模块代码
	
	});
	```

- require.async 用来模块内异步加载模块, 感觉很 AMD

	```
	define(function(require, exports, module) {

	  // 异步加载一个模块，在加载完成时，执行回调
	  require.async('./b', function(b) {
	    b.doSomething();
	  });
	
	  // 异步加载多个模块，在加载完成时，执行回调
	  require.async(['./c', './d'], function(c, d) {
	    c.doSomething();
	    d.doSomething();
	  });
	
	});
	```

- require 是第一个参数，用来获取其他模块提供的接口

	```
	define(function(require, exports, module) {
	
		// 获取模块接口
		var a = require('./a')
		
		// 调用 a 模块的方法
		a.doSomething()
		
	})
	```
	
- exports 是一个对象，用来向外提供模块接口

	```
	define(function(require, exports, module){
	
		<!--1-->
		exports.foo = 'bar'
		exports.bar = function(){}
		
		<!--2-->
		return {
			foo: 'bar',
			do: function(){}
		}
		
		<!--3-->
		module.exports = {
			foo: 'bar',
			dosomething: function(){}
		}
	
	})
	```
	**提示** exports 仅仅是 module.exports 的一个引用。在 factory 内部给 exports重新赋值并不会改变 module.exports 的值。因此给 exports 赋值是无效的，不能用来更改模块接口。
	
- module 是一个对象，上面存储了与当前模块相关联的一些属性和方法

	```
	module.id 模块的唯一标识
	module.uri 模块的绝对路径
	module.dependencies 模块的依赖
	module.exports 当前模块对外提供的接口
	```



