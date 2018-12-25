## 玩转 VS Code
**注：mac 版本的 vscode，其他版本需要稍微变通一下**
> 基础语言支持还需要再研究研究
> cmd option 好像有点交换，需要研究一下

### 1 上手 vscode

vscode --help 列出所有的命令  
cmd + shift + p 打开命令面板

#### 命令行的使用

- 首先在命令面板中搜索 shell 命令，在 PATH 中安装 code 命令，就可以在命令行中使用 code 命令打开 vscode

- 当然如果后面跟上文件路径就可以打开指定的文件

- 如果你希望在已经打开的窗口打开文件，可以在 code 命令后添加参数 -r 来进行窗口的复用

- 也可以使用 -g <file:line[:character]> 打开文件然后滚动到指定位置，比如输入 code -g package.json:128 

- 可以使用 -d 来比较两个文件，传入两个路径， code -r -d a.js b.js

- 除了以上直接打开磁盘上的文件外，也可以接受来自管道中的数据。这样就可以在 vsode 中显示命令行中的内容，比如 ls | code -


### 2 核心的键盘操作


#### 光标的移动（一个方向说明）   

- 单词移动 option + ←    
- 行首  cmd + ←   
- 在代码块（各种括号）首末进行跳转 cmd + shift + \   
- 移动到文档首尾  
 
#### 文本选择 

- 对于基于单词 行 和整个文档的光标操作，你只需要多按一个 shift 键，就可以在移动光标的同时选中其中的文本
- 对于代码块可以使用命令面板，选择括号所有内容来选中文本（原本没有，我自己定义了快捷键 control + shift + a）

#### 删除操作
- 删除前面 delete cmd + delete option + delete
- 删除后面 fn + delete cmd + fn + delete option + fn + delete


### 3 快捷键进阶

#### 代码行编辑

- 删除整行 cmd + shift + k
- 剪切整行 cmd + x
- 当前行下面重新开始一行  cmd + enter
- 当前行的上面重新开始一行 cmd + shift + enter
- 移动行 option + ↑
- 复制行 option + shift + ↑

#### 编程语言相关的命令

##### 添加注释

- 行注释 cmd + /
- 块注释 option + shift + a

##### 代码格式化

- option + shift + f （个人建议安装 prettier，很 nice）

##### 代码缩进

- 可以用命令行，当时自己用的多的还是格式化
- 当然也可以使用 cmd + [ 进行行缩进

#### 其余小技巧

- 调用字符的顺序 ctrl + t
- 转化大小写 可以用 cmd + shift + p 打开命令面板，搜索 transform to Uppercase, 也可以 cmd + k cmd + u(小写为l) 来执行，选择哪个看自己喜好
- 合并代码行 cmd + j 自己试试就知道了，一般没用，因为要格式化
- 行排序 命令面板搜索吧，一般没什么用
- 撤销光标的移动和选择 cmd + u （这个是神器）


### 4 多光标特性


- 按住 cmd + 鼠标左键可以创建多光标
- cmd + option + ↑ 可以创建多光标
- cmd + d 第一次按下时，他会选中光标附近的单词，第二次按下时，他会找到这个单词第二次出现的位置，创建一个新的光标，并且选中它
- cmd + k cmd + d 跳过当前这个选择 跳到下一个
- option + shift + i 他是和代码行批量处理有关，先用 ctrl + shift + a 选中括号内的代码，然后按下 option + shift + i 就会在每一行最后都会创建一个光标


### 5 如何快速在文件 代码 符号之间跳转


#### 文件跳转

- ctrl + tab 在打开的文件中跳转
- cmd + p 打开最近的文件列表（cmd + enter 会在侧边打开）

#### 行跳转

- ctrl + g 直接输入数字跳转(cmd + p 打开命令面板直接输入冒号也是一样的)
- cmd + p 输入文件名直接加冒号 跳转到指定的位置是一个神器 （很喜欢）

#### 符号（symbols）跳转

- cmd + shift + o 打开当前文件的所有符号，输入 : 就可以将这些符号进行分类，也可以搜索， endter 跳转到符号位置

#### 多文件符号跳转暂且不提 - -


### 6 代码自动补全、快速修复和重构

- tab 补全
- esc 关闭提示
- 黄色灯泡可以选择补全和代码重构（提取函数）


### 7 如何书写 code snippet

- 代码片段是对常用代码的一个抽象，他保留了大部分不变的代码，然后把需要经常变动的部分，换成变量，这样等下次调用它的时候，只需要把这些变量换成我们需要的就行了

- javascript.json 一个 block 包含 prefix body description, body 里的内容并不只是一个纯文本，它其实是一个模板。要让它像模板一样工作，我们就需要先理解一个概念，叫做 tab stop，当 body 里的内容被插入到编辑器后你就会发现内容里的 $1 和 $2 不见了，取而代之的是两个竖线，这个 $1 和 $2 就是 tab stop，就是我们按下 tab 之后光标移动到的位置

- 在我们插入 tab stop 的时候，除了 $1 $2 这样的语法，我们还可以填入 ${1:label}, 在这个格式下，代码片段被插入编辑器时，$1 的位置处，会预先填入 label 这个值，并且 label 会被选中, 多光标只需要多次输入 {1:label} 就可以实现多光标 ..


### 8 代码折叠、小地图、面包屑特性

#### 关于代码折叠

- cmd + option + [  折叠当前光标所在的内层代码
- cmd + option + ]  展开
- cmd + k cmd + [   递归折叠当前所在代码
- cmd + k cmd + ]   递归展开当前所在代码
- 折叠所有代码在我的电脑上不起作用不知道是什么原因 原始是 cmd + k cmd + 0 但是没有作用，自己又设置了 cmd + option + - ，展开是可以的 cmd + k cmd + j 自己设置了快捷键 cmd + option + =，所以现在折叠所有只能在命令面板里输入 fold all

#### 小地图

- 小地图默认是打开的
- 设置 editor.minimap.renderCharaters 为 false 就可以关闭小地图上显示的代码，用色块来代替，也可以用 editor.minimap.maxColumn 设置长度，默认 120 我觉得挺合适，很多时候我们只需看下每行代前的缩进和前面的代码高亮，就能看出个大概来了。

#### 面包屑 （breadcrumb）

- 默认是关闭的，需要设置 breadcrumbs.enabled = true
- 这是一个新功能，尤其是在函数中的时候可以把对应函数名显示到面包屑上，很舒服，希望在使用的时候它能给你带来一些便利吧


### 9 极速搜索有时候比 intellisense 还要重要（**这里留一个疑问**）

#### 单文件搜索

- cmd + f 编辑器会把当前光标所在位置的单词自动填充到搜索框中，我们可以通过 enter 和 shift + enter 在搜索结果中来回跳转
- cmd + f cmd + g 的操作有bug，期待后续完善（fn+f3）
- 大小写敏感 cmd + option + c
- 全单词匹配 cmd + option + w
- 正则表达式支持 cmd + option + r

#### 搜索配置

- 是否自动填充搜索关键词 editor.find.seedSearchStringFromSelection
- 选中多行文本自动在区域中搜索 editor.find.autoFindInSelection

#### 单文件替换

- 编辑替换操作就直接在搜索窗口操作，感觉不需要快捷键
- cmd + option + f 直接掉起替换窗口

#### 多文件搜索和替换

- cmd + shift + f 调出多文件搜索
- 搜索框下面的三个点，能配置包含的文件和排除的文件，书写格式是 glob 语法

#### 多文件搜索配置

- search.collapseResults : "alwaysExpand" 搜索结果始终打开
- search.location: "panel" 搜索框放到底部
- search.globalFindClipboard 和 editor.find.globalFindClipboard 控制“搜索”视图是否读取或修改 macOS 的共享查找剪贴板


### 优化编辑器设置

- 编辑器行号 editor.lineNumbers
- 编辑器空格 editor.renderWhitespace 
- 缩进参考线 editor.renderIndentGuides
- 垂直标尺   editor.rulers:[120]
- 小地图	  editor.minimap.enabled
- 光标		  editor.cursorBlinking | style | width
- 当前行高亮  editor.renderLineHeight


### 什么是工作台和命令面板

#### 工作台 workbench

- 左侧的几个 UI 组件比较简单，用的该已经熟悉了，需要说的是下面的那个设置按钮，用起来还是比较方便的
- 底部是状态栏
- 顶部是标题栏
- 面板有四个组件 问题面板、输出面板、调试控制台、输出终端，加上我把 search.location 也设置为了 panel，所以会有五个

#### 命令面板

- 命令面板（基于文本的交互界面） 输入 ？ 你就可以看到十几条选项，分别代表你能在命令面板中使用不同的功能，首先就是几个符号
	1. > 显示所有命令
	2. @ 显示跳转和文件中symbols 加 ： 分类
	3. '#' 显示跳转和工作区中的符号
	4. ： lines   
还有几个就是英文单词或者缩写
	1. edt 编辑
	2. ext 
	3. task debug
	4. term
	5. view 这个就可以打开各个组件
	
	
### 了解文件管理，什么是 multiroot workspace

- 资源管理器、关于资源管理器的设置 explorer、
- .vscode 文件夹、第一个配置文件是 settings.json, 还有另外两个 launch.json tasks.json 
- 多文件夹工作区，通过搜索命令面板 add folder to workspace, 添加工作区，save workspace as 之后会有一个后缀为 .code-workspace 的文件，这个文件有两个 key, 一个是 folders，一个是 settings，当然还有两个可选的键 extentsions 和 launch
- ctrl + r 打开最近的文件夹，cmd + enter 就可以在新窗口打开
- ctrl + w 切换窗口


### 怎么在编辑器里做好版本管理？

#### 版本管理视图

- ctrl + shift + g 打开版本管理视图

- git 和 svn 基本都同样的界面，但是也有差异，先拿 git 来说，比如说 git 有三种主要的文件状态 committed 已提交， Modified 修改， staged 暂存，当我们修改了一个文件，它会变成 Modified， 然后我们通过脚本 git add ${filename} 把这个文件状态改为暂存，被标记为暂存状态的文件，才有机会被提交，最后我们通过 git commit 来提交所有在暂存状态里的文件


### 配置终端模拟器

> 图形化界面不可能适应每个人，也不可能替我们完成所有可能的操作

> vscode 的理念：用图形化的工具，只完成最常用的或者 GUI 擅长做的那些操作，而把剩下的那部分重新交还给终端

> 内置的终端又叫做集成终端

#### 创建终端

- ctrl + ` toggle integrated terminal (切换集成终端, 打开或者关闭)
- ctrl + shift + ` create new integrated terminal (新建集成终端)
- cmd + \ split terminal （拆分终端）
- 终止终端在命令面板中设置 kill the active terminal instance

#### 终端内操作以及设置

"terminal.integrated.shell.osx": "/bin/zsh" 修改启动 shell 环境
"terminal.integrated.env.osx": {} 设置环境变量
"terminal.integrated.cwd": "" shell 启动时的初始目录
"terminal.integrated.rightClickBehavior": "selectWord" 控制右键点击行为
"terminal.integrated.scrollback": 1000 终端运行脚本显示的行数


### 为你的项目打造 workflow 

#### 执行任务

> 任务系统的目的就是将各种形形色色的任务脚本尽可能地统一化，然后提供一套简单又定制化强的方式操作他们

##### 任务自动检测

如果你的项目中有 typescript grunt jake gulp npm 这几个脚本工具的配置文件的话，vscode 会自动读取当前文件夹下的配置。

如果有 package.json， 命令面板搜索运行任务 run task 时，就能看到 npm 相关的任务（文件就是 .vscode 下面的 task.json）

##### 自定义任务（configure task）

- type 为 shell

```
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "echo",
      "type": "shell", // 默认 shell
      "command": "echo Hello"  // 命令或者程序
    }
  ]
}
```

- type 为 process, 打开 qq 浏览器

```
{
      "label": "QQBrowser",
      "type": "process",
      "command": "/Applications/QQBrowser.app/Contents/MacOS/QQBrowser"
}
```

##### 分组和结果显示

```
{
  "label": "test shell",
  "type": "shell",
  "command": "./test.sh",
  "args": [
    {
    	"value": "hello",
    	"quoting": "escape" // 默认使用 escape，strong 是单引号，weak 是双引号
    }
  ]
  "windows": {
    "command": ".\\scripts\\test.cmd"
  },
  "group": {   // 三种选择 build test none
    "isDefault": true,   // 设为默认运行测试任务
    "kind": "test"
  },
  "presentation": {  // 任务运行的时候是否调出运行的界面
    "reveal": "always",  
    "panel": "new"
  },
  "options": {
    "cwd": "", // 任务脚本文件夹地址
    "env": {}, // 环境变量
    "shell": { // 指定 shell 环境
      "executable": "bash"
    }
  }
```
  **但是现在有一个问题就是 run test 可以运行，但是 cmd shift b 却不行**


### debugger

#### 调试窗口

- 打开 cmd + shift + d
- f5 开始调试

vscode 用于配置调试的文件也是一个 json 文件，launch.json

#### 调试 launch.json

```
{
 // 使用 IntelliSense 了解相关属性。 
 // 悬停以查看现有属性的描述。
 // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
 "version": "0.2.0",
 "configurations": [
  {
   "type": "node", // 调试器的类型
   "request": "launch", // 如果我们的代码已经运行起来了，则可以将它的值设为 attach 我们则是使用调试器来调试已有的代码进程，如果值是 launch，意味着我们会使用调试器来调试这个已有的代码进程
   "name": " 启动程序 ", // 这个配置的名字
   "program": "${file}"
  }
 ]
}

```

剩下的模板和智能提示已经做得很好了，还有就是新增加的参数

```
{
 "type": "node",
 "request": "launch",
 "name": "Gulp task",
 "program": "${workspaceFolder}/node_modules/gulp/bin/gulp.js",
 "args": [ // 传入的参数
  "task"
 ]
}
```


### 你不知道的工作区快捷键

#### 编辑器操作

##### 横向编辑器组（多个编辑器称为编辑器组 editor group）

- 拆分编辑器 （split editor） cmd + \
- 关闭编辑器依然可以用 cmd + w
- 编辑器组之间快速跳转 ctrl + 1、2

##### 纵向编辑器组

- 切换垂直/水平编辑器布局（flip editor group layout） cmd + option + 0

##### Tab

- 打开上一个/下一个编辑器（open next/previous editor）cmd + option + ←/→ 需要注意的是这个命令会打开编辑器中的每一个tab，如果你需要在 group 中你需要（open next editor in group）

##### 移动编辑器 tab

- move editor into next/previous group

##### grid 布局

- grid editor layout 2*2
- 聚焦到上方编辑器组（focus above editor group）

##### drag & drop

虽然网格系统很强大，但是不一定它就一定是合适的，一般而言，左右两个编辑器组就够用了，只需要熟悉几个快捷键就行了，还有就是可以使用鼠标，拖到你想要的位置

##### 专注模式

- 关闭视图（toggle ） cmd + b
- 关闭面板（toggle panel） cmd + J
- 切换活动栏（toggle activity bar visibility）
- 切换状态栏（toggle status bar visibility）
- 切换禅模式（toggle zen model）,esc退出
- 切换居中布局（toggle centered layout）

![创造自己的工作台](https://static001.geekbang.org/resource/image/11/8c/1111c17d45a16da352a5b71f05c6d18c.png)


### 编辑器设置和快捷键

主要说快捷键绑定的一些操作，其他的操作都比较简单，有图形化的界面

打开 keybindings.json 在右边可以设置自己的快捷键

```
{
  "key": "cmd+enter",   // 按键
  "command": "command",  // 为那个命令指定快捷键
  "when": "editorTextFocus" // 条件
  		可以用 ！ ==  && 和 =~（正则）
}
```

要删除快捷键在 command 上加 - 就行了

```
{
  "key": "cmd+s",
  "command": "-workbench.action.files.save"
}
```


### 基础语言支持：JSON Markdown

#### JSON

vscode 的配置文件、任务系统、代码片段都是使用 JSON 语法，而且 vscode 为文件指定了一个特殊的 JSON 文件类型，称为 JSON width Comments

与此同时，JSON 的语言服务支持 JSON Schema，可以规范 JSON 内容的格式，和做一定程度的语法检查

在自己的个人设置或者工作区设置中可以有三种情况，修改 json.schemas 就行了

#####  第一种

```
{
   "$schema": "http://json.schemastore.org/babelrc"
}
```

##### 第二种

```
"json.schemas": [
     {
        "fileMatch": [
            "/.babelrc"
        ],
        "url": "http://json.schemastore.org/babelrc"
    }
]

```

##### 第三种
**注意默认情况下 vscode 并不认识自己设置的文件，需要点击语言设置选择 JSON**

```
{
  "fileMatch": [
    "/.myconfig"
  ],
  "schema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "the name of the iiicon wanna"
      }
    }
  }
}
```


### 前端语言支持

#### 基础语言支持

转到定义 go to definition (F12)
格式化文件 fromat document
符号跳转 cmd shift o
函数建议列表和参数建议

#### 类型提示

##### JSDoc

##### typings/d.ts	

VS Code 会自动搜索，找到合适的 d.ts 文件，然后下载下来，接着就能提供智能提示功能了，这种功能又叫做自动采集功能 auto type acquisition	

##### ts-check(真是一个好东西)

```
// @ts-check 手动开启更强的代码审核
```

#### 模块引用

##### 相对地址引用

##### jsconfig.json

```
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es2016",
        "baseUrl": "."
    },
    "exclude": [
        "node_modules",
        "**/node_modules/*"
    ]
}
```

##### 自模块引用 auto imports

##### 自动模块更新

当你文件的路径改变的时候会自动修改 import 的文件路径

#### 代码审查 tsconfig/checkJs

```
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es2016",
        "baseUrl": ".",
        "paths": {
            "*": [
                "*",
                "common/*"
            ]
        },
        "checkJs": true
    },
    "exclude": [
        "node_modules",
        "**/node_modules/*"
    ]
}
```

#### Node.js

> vscode 的代码调试 api，nodejs 是支持最好的

##### 代码调试 auto attach

打开命令面板 输入切换开关自动附加 toggle auto attach, 然后打断点，接着执行命令 `node --inspect-brk index.js`,个人感觉用处不大的原因可能还是平时不怎么写 node，写 node 的话可以省去平时写 lunch.json 的麻烦

##### 记录点 logpoints	

一样可以得到输出结果，而且不用改变代码


### HTML、CSS 以及前端开关神器 Emmet 介绍与支持

#### HTML、CSS

##### 1 取色器 color picker

五个部件 饱和度（saturation）透明度（opacity）色相（hue）上方左侧不同写法，右侧回退之前

##### 2 预览

经测试也只能在 css 中预览 html 结构

#### Emmet

	子节点操作符 >
	ul>li
	
	兄弟节点操作符 +
	div+p+bq
	
	乘法操作 *
	ul>li*3
	
	class name Id
	ul#list>list*3
	
	官方例子
	#page>div.logo+ul#navigation>li*5>a{Item $}
	
#### Emmet in vscode

##### 展开缩写

默认 tab 展开是关闭的 可以设置 `emmet.triggerExpansionOnTab`

##### 建议列表

比如 p10 padding: 10px

##### 使用缩写包围

选中要包围的标签，打开命令面板输入缩写包围，wrap with abbreviation

##### 多光标也支持缩写包围

##### 其他操作

标签转至配对 emmet: 转至匹配对（go to matching pair）   
删除标签对 emmet: 移除标签 （remove tag）

##### 在某个语言中打开 emmet 支持

	"emmet.includeLanguages": {
        "wxml": "html",
        "vue-html": "html"
    }


### 如何深度定制自己的主题

#### 固定 UI 视图

- 切换状态栏可见性 toggle status bar visibility
- 切换侧边栏位置 toggle side bar position
- 切换搜索视图位置 

#### 修改工作区配色 

*个人表示懒得弄*

	workbench.colorCustomizations 触发提示就能看到了
	
#### 修改编辑器配色

检查 TM 作用域（inspect TM scope）运行这个命令会有一个悬浮窗口呈现，就是当前代码缩对应的语言、语法类型以及当前的颜色和背景色

    editor.tokenColorCustomization 设置颜色
	
#### 基于主题修改配色

也一样，设置的时候先选择主题就行了



### 一些可能没有用的 tips & tricks

跳转 F12 自己的 mac 只能切屏 不起作用