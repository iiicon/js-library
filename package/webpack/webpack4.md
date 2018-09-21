### 安装
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

### 核心概念

- entry 文件的入口，也是打包的入口，个人习惯是一个对象，这样扩展性比较好，可以有单个或者多个entry
- output 打包的文件 bundle，可以自定义名字，可以多个，可以自定义规格
- module 存放各种 loader
- plugins 参与打包的整个过程，配置编译时的变量，打包优化和压缩
- optimization 这个 webpack4 新增的属性，就是优化的意思，就是以前 plugins 里面的内容抽离出来的

### 基础命令和脚手架工具

- 脚手架工具感觉还是不太成熟，可以关注 [webpack-cli](https://github.com/webpack/webpack-cli/tree/acf0fd961958c7a1ea984914d2b0dbeb47034c3e)
- 平时自己还是敲命令会灵活一点，比如
 `webpack -config webpack.config.js`
 
### 编译 es6、7
- babel(包括babel-loader;babel-presets;babel-plugin;)处理语法为 es3 之类的

	```
	npm install babel-loader babel-core babel-presets
	```
- babel-polyfill;babel-runtime 处理低版本浏览器没有的 api, 当然开发就选择polyfill，全局 import 就 ok，runtime 是局部垫片，一般开发框架用

	```
	npm install babel-polyfill babel-runtime babel-plugin-transform-runtime 
	```
- 还有一点就是一般会在根目录下写一个 babelrc 文件用来写 babel 的配置，这样就不需要再 babel-loader 中在配置 options

### 使用 ts
- 需要安装 typescript ts-loader awesome-typescript-loader
	配置文件 .tsconfig.json
	
	```
	{
	  "compilerOptions": {
	    "module": "commonjs",
	    "target": "es5",
	    "allowJs": true,
	  },
	  "include": ["./src/*"],
	  "exclude": ["./node_modules"]
	}

	```
	
	具体使用见 [typescript](https://github.com/iiicon/js-library/tree/master/package/typescript)
	
### 打包公共代码
- webpack3 是用 webpack.commonPlugin, webpack4 是用 splitChunks, 这个的配置官网说的简直是太迷了，试了好多次才掌握了怎么去使用

config 的配置一般写在 optimization 下，第一步，提取单文件组件中的公共 js

```
optimization: {
    minimize: false,  					// 不压缩
    splitChunks: {
      chunks: 'all',					// 范围为全部块
      name: true,						// 自动命名
      cacheGroups: {					// 缓存组
        default: false,					// 公共代码在 default，不想用 false
        commons: {						// commons 只是一个名字
          name: 'common',				// 指定 chunkname
          chunks: 'all',				
          minChunks: 1,					// 1 还是 2 不清楚
          maxInitialRequests: 5,		// 初始化并行请求最大数
          minSize: 0					// 打包条件，最小为 0
        }
      }
    }
  }
```
**需要注意的是 cacheGroups 中的 priority test reuseExistingChunk 不能继承覆盖父级属性**

- 但是可以看出来，打包的结果虽然可以分开两个文件，但是公共代码并没有提取出来，因为 webpack 其实支持的是多 entry 提取公共代码，so， 第二步，多 entry 提取公共代码

```
cacheGroups: {
	default: false,
	commons: {
	  name: 'common',
	  chunks: 'all',
	  minChunks: 2,					// 一般都至少为 2
	  maxInitialRequests: 5,
	  minSize: 0
	}
}
```
通过这样就可以提取多文件的公共代码了, 但是如果页面中引入了第三方插件，或者 npm 引入了第三方代码，我们一般都要把其与业务代码分离, 用下面的方式就都能做到

```
output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all',
      name: true,
      maxSize: 30000,
      cacheGroups: {
        default: false,
        commons: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendors: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          priority: 10
        }
      }
    }
  },
  plugins: [
    new cleanWebpackPlugin('dist'),

    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  resolve: {
    alias: {
      jquery$: path.resolve(__dirname, './src/js/jquery.js')
    }
  }
```

- 通过上面的代码可以打包多文件入口，再次回到提取同一个文件相同的 chunk，这个主要是用在懒加载、还有区分自己的业务公共代码、第三方公共代码、业务代码， 自己的业务代码可以用两种方法分割
	1. require.ensure([], fn, vendor) 这种方式呢公用代码需要自己写 require.include() 这是 webpack 的方式
	2. import(/* webpackChunkName: vendor, '' */).then()  这是 es6 的方式    
基本上还是通过上面的配置就能实现分离自己的业务代码，业务公共代码，已经第三方代码 如下

```
var webpack = require('webpack')
var cleanWebpackPlugin = require('clean-webpack-plugin')
var path = require('path')

module.exports = {
  entry: {
    pagea: './src/pagea.js',
    // pageb: './src/pageb.js'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  optimization: {
    minimize: false,
    occurrenceOrder: true,
    splitChunks: {
      name: true,
      cacheGroups: {
        default: false,
        commons: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendors: {
          chunks: 'initial',
          test: /node_modules/,
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new cleanWebpackPlugin('dist'),

    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  resolve: {
    alias: {
      jquery$: path.resolve(__dirname, './src/js/jquery.js')
    }
  }
}
```
*上面说的比较啰嗦，但是是一个思维过程，下面贴出最终的 splitChunks*

```
var webpack = require('webpack')
var cleanWebpackPlugin = require('clean-webpack-plugin')
var path = require('path')

module.exports = {
  entry: {
    pagea: './src/pagea.js',
    pageb: './src/pageb.js'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  optimization: {
    minimize: false,
    occurrenceOrder: true,
    splitChunks: {
      name: true,
      cacheGroups: {
        default: false,
        commons: {						// 初始代码提取到 common
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        asyncommon: {					// 异步加载的提取到 async-common
          name: 'async-common',
          minChunks: 2,
          chunks: 'async',
          maxInitialRequests: 5,
          minSize: 0
        },
        vendors: {
          chunks: 'initial',			// 第三方依赖提取到 vendor
          test: /node_modules/,
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new cleanWebpackPlugin('dist'),

    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  resolve: {
    alias: {
      jquery$: path.resolve(__dirname, './src/js/jquery.js')
    }
  }
}

```

### 处理 css

安装 loader 和插件

```
style-loader 
css-loader
postcss-loader
less-loader less
sass-loader node-sass
提取 css mini-css-extract-plugin
压缩 css optimize-css-assets-webpack-plugin
```

配置如下

```
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: './dist/',
    chunkFilename: '[name].chunk.js'
  },
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              // modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                // require('autoprefixer')()
                require('postcss-cssnext')()
              ]
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      }
      
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
      chunkFilename: '[name].css'
    })
  ]
}
```

### tree shaking 
其实上面就已经都有配置了，占空留着以后写吧

### 处理文件

```
file-loader
url-loader		// 处理图片的时候可以只用 url-loader
img-loader  		// 压缩好像不太好用了
postcss-sprites 	// css 雪碧图

...
{
	loader: 'postcss-loader',
	options: {
	  ident: 'postcss',
	  plugins: [
	    // require('autoprefixer')()
	    require('postcss-sprites')({
	      spritePath: './dist/assets/',
	      retina: true
	    }),
	    require('postcss-cssnext')()
	  ]
	}
}
...

...
{
	test: /\.(jpg|png|jpeg|gif)$/,
	use: [
	  // {
	  //   loader: 'file-loader',
	  //   options: {
	  //     publicPath: './assets/',
	  //     outputPath: '',
	  //     useRelativePath: true
	  //   }
	  // },
	  {
	    loader: 'url-loader',
	    options: {
	      name: '[name]-[hash:6].[ext]',
	      limit: 1000,
	      publicPath: './assets/',
	      outputPath: '',
	      useRelativePath: true
	    }
	  },
	  {
	    // 用img-loader来压缩图片竟然是不好用了
	    loader: 'img-loader',
	    options: {
	      pngquant: {
	        quality: 20
	      }
	    }
	  }
	]
	},
	{
	test: /\.(eot|svg|ttf|woff2?)$/,
	use: [
	  {
	    loader: 'url-loader'
	  }
	]
},
...

```

### 生成 HTML
html-webpack-plugin  
 
```
rules: {
...
{
	test: /\.html$/,
	use: [
	  {
	    loader: 'html-loader',
	    options: {
	      attrs: ['img:src', 'img:data-src'],
	      minimize: false,
	      collapseWhitespace: true
	    }
	  }
	]
}

plugins: [
	new htmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true,
      minimize: true
    })
]
```

### 开发环境
就说devserver, 一个简单的例子

```
devServer: {
	port: 0000,
	hot: true,
	inline: false,
	overlay: true,
	proxy: {
		'/': {
        target: 'http://apitest.zyh365.com',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/common': '/mobile/web/common'
        },
        headers: {}
      }
	},
	historyApiFallback: {
      rewrites: [
        {
          from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
          to: function(context) {
            return '/' + context.match[1] + context.match[2] + '.html'
          }
        }
      ]
    }
}
```

### webpack-merge
在 webpack3 以前一般都是通过打包命令传一个参数过来指定是 development 还是 production，然后利用 webpack-merge 以 common 为基础文件，生成不同环境下的不同文件

但是 webpack4 之后呢，提供了一个 mode 的参数, 就是可以指定不同配置文件，这样的情况下就不用再传参数，再在 common 中做一大堆的判断了，只需要分开公共部分就可以了，下面就是 3 和 4 的对比

```
const path = require('path')
const webpack = require('webpack')
const devConfig = require('./webpack.dev.conf')
const prodConfig = require('./webpack.prod.conf')

const merge = require('webpack-merge')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

const generate = env => {
  const scriptLoader = ['babel-loader'].concat(
    env === 'production'
      ? []
      : [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          }
        ]
  )
  const cssLoader = [
    {
      loader: 'css-loader',
      options: {
        // minimize: true,
        // modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
        sourceMap: env === 'development',
        importLoaders: 2
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        sourceMap: env === 'development',
        plugins: [
          // require('autoprefixer')(),
          require('postcss-cssnext')()
        ].concat(
          env === 'production'
            ? [
                require('postcss-sprites')({
                  spritePath: '../dist/assets/',
                  retina: true
                })
              ]
            : []
        )
      }
    }
  ]
  const styleLoader = (env === 'development'
    ? [
        {
          loader: 'style-loader',
          options: {
            // insertInto: '#app',
            // singleton: true,
            transform: 'util/css.transform.js'
          }
        }
      ]
    : [
        {
          loader: MiniCssExtractPlugin.loader,
          options: { sourceMap: true, publicPath: '/' }
        }
      ]
  ).concat(cssLoader)

  const fileLoader =
    env === 'development'
      ? [
          {
            loader: 'file-loader',
            options: {
              publicPath: '',
              outputPath: './assets/'
              // useRelativePath: true
            }
          }
        ]
      : [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:6].[ext]',
              limit: 2000,
              publicPath: '',
              outputPath: './assets/'
            }
          },
          // { 
          // 这里可千万不能有空行，浪费了五个小时才找到这个错误
          //   // loader: 'img-loader',
          //   // options: { pngquant: { quality: 80 } }
          // }
        ]

  return {
    entry: { app: './src/app.js' },
    output: {
      filename: 'js/[name].bundle.js',
      publicPath: '/',
      path: path.resolve(__dirname, '../dist'),
      chunkFilename: 'js/[name].chunk.js'
    },
    resolve: {
      alias: { jquery$: path.resolve(__dirname, '../src/js/jquery.js') }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, '../src'),
          use: scriptLoader
        },
        {
          test: /\.css$/,
          use: styleLoader
        },
        {
          test: /\.(jpg|png|jpeg|gif)$/,
          use: fileLoader
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                attrs: ['img:src', 'img:data-src'],
                minimize: true,
                collapseWhitespace: true
              }
            }
          ]
        },
        { test: /\.(eot|svg|ttf|woff2?)$/, use: [{ loader: 'url-loader' }] }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: './css/[name].min.css',
        chunkFilename: './css/[name].css'
      }),
      new htmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        inject: true,
        minimize: true
      }),
      new webpack.ProvidePlugin({
        $: 'jquery'
      })
    ]
  }
}

module.exports = env => {
  let config = env === 'development' ? devConfig : prodConfig
  return merge(generate(env), config)
}

```

```
webpack.common.js

+ const path = require('path');
+ const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
+
+ module.exports = {
+   entry: {
+     app: './src/index.js'
+   },
+   plugins: [
+     new CleanWebpackPlugin(['dist']),
+     new HtmlWebpackPlugin({
+       title: 'Production'
+     })
+   ],
+   output: {
+     filename: '[name].bundle.js',
+     path: path.resolve(__dirname, 'dist')
+   }
+ };

+ webpack.dev.js

+ const merge = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'development',
+   devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   }
+ });

webpack.prod.js

+ const merge = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'production',
+ });
```

这篇博客其实只是记录了学习中个人有感觉的一些点，当然也都是一些基本功能，webpack 本身并不复杂，只是配置项太多了，并不能静下心来去仔细看所有的 api config.., 但是我觉得应该在项目中再继续完善这篇博客，这篇记录算是对 2018 年 7 月的一个 ending 吧。

