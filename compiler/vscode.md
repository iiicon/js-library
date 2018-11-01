## 玩转 VS Code
**注：mac 版本的 vscode，其他版本需要稍微变通一下**

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

#### test git and svn