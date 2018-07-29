### js-web-api

| Api              | 用法                                                     | 返回值或者备注                                         |
| ---------------- | ------------------ | ------------- |
| getComputedStyle | window.getComputedStyle("元素", "伪类");        | CSS 样式声明对象([object CSSStyleDeclaration]) |
| currentStyle     | window.currentStyle("元素", "属性")             | css 属性（IE）        |
| getAttribute     | 属性名需要驼峰写法 style.getAttribute("backgroundColor") | 属性值       |
| escape | js 对字符进行编码，可用于搜藏中的 history 记录 | 不编码的字符有69个 *+-. / @——0-9a-zA-Z |
| encodeURI | 进行 url 跳转时可以整体使用 encodeURI | 不编码的字符有82个 ！#￥&'() * +,/:;=?@_~0-9a-zA-Z
| encodeURIComponent| 不编码的有71个 | 不编码的字符有 ！'() * - . _ ~0-9a-zA-Z |
| decodeURI | 解码 | |
| decodeURIComponent | 函数可把字符串作为 URI 组件进行解码 |
| unescape | 函数可对通过 escape() 编码的字符串进行解码。| 与 url 无关的内容便可用 escape 相关 api |
| client | document.documentElement.clientHeight | 获取高度很关键
| scrollHeight | document.documentElement.scrollHeight | 获取滚动高度
| scrollTop | document.documentElement.scrollTop | 超过设备的高度













<!--
<table class="table table-bordered table-striped table-condensed">  
    <tr>
        <th>Api</th>
        <th>用法</th>
        <th>返回值</th>
    </tr>  
    <tr>  
        <td rowspan="6" style="white-space:nowrap;width:1000px">getComputedStyle</td>
        <td rowspan="3">window.getComputedStyle("元素", "伪类");</td>
         <td>CSS样式声明对象([object CSSStyleDeclaration])</td>
    </tr>
   
</table>-->
