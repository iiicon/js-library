## 深入 VS Code
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