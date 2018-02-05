## 事件循环

### 事件循环的各个基础要点

* 我们知道 js 的一大特点就是单线程，而这个线程中拥有唯一的事件循环
* js 代码的执行过程中，除了依靠函数调用栈搞定函数的执行顺序外，还依靠任务队列来搞定另一些代码的执行
* 一个线程中，事件循环是唯一的，但是任务队列可以有多个
* 任务队列又分为 macro-task(宏任务) micro-task(微任务)，在新标准中他们被称为 task 和 job
* macro-task 大致包括：script 整段代码、setTimeout、setInterval、setImmediate、I/O、UI rendering
* micro-task 大致包括：process.nextTick、Promise、Object.observe(已废弃)、MutationObserver(html5 新特性)
* setTimeout/Promise 等我们称之为任务源，而进入任务执行队列的是他们指定的具体执行任务
* 来自不同的任务源的任务会进入到不同的任务队列，setTimeout 和 setInterval 是同源的
* 事件循环的顺序，决定了 js 代码的执行顺序，他从 script 开始第一次循环，之后全局上下文进入函数调用栈，直到调用栈清空，只剩全局，然后执行所有的 micro-task。 当所有可执行的 micro-task 执行完毕之后。循环再次从 macro-task 开始，找到其中一个任务队列执行完毕，然后再执行所有的 micro-task，这样一直循环下去
* 其中每一个任务的执行，无论是 macro-task 还是 micro-task，都是借助函数调用栈来完成

```
// demo
console.log('golb1');

setTimeout(function() {
    console.log('timeout1');
    process.nextTick(function() {
        console.log('timeout1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout1_promise');
        resolve();
    }).then(function() {
        console.log('timeout1_then')
    })
})

setImmediate(function() {
    console.log('immediate1');
    process.nextTick(function() {
        console.log('immediate1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate1_promise');
        resolve();
    }).then(function() {
        console.log('immediate1_then')
    })
})

process.nextTick(function() {
    console.log('glob1_nextTick');
})
new Promise(function(resolve) {
    console.log('glob1_promise');
    resolve();
}).then(function() {
    console.log('glob1_then')
})

setTimeout(function() {
    console.log('timeout2');
    process.nextTick(function() {
        console.log('timeout2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout2_promise');
        resolve();
    }).then(function() {
        console.log('timeout2_then')
    })
})

process.nextTick(function() {
    console.log('glob2_nextTick');
})
new Promise(function(resolve) {
    console.log('glob2_promise');
    resolve();
}).then(function() {
    console.log('glob2_then')
})

setImmediate(function() {
    console.log('immediate2');
    process.nextTick(function() {
        console.log('immediate2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate2_promise');
        resolve();
    }).then(function() {
        console.log('immediate2_then')
    })
})
```

第一步：宏任务script首先执行。全局入栈。glob1输出。

![script首先执行](http://upload-images.jianshu.io/upload_images/599584-5ae0b593167e499b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

第二步，执行过程遇到setTimeout。setTimeout作为任务分发器，将任务分发到对应的宏任务队列中。
    
    setTimeout(function() { console.log('timeout1'); process.nextTick(function() { console.log('timeout1_nextTick'); }) new Promise(function(resolve) { console.log('timeout1_promise'); resolve(); }).then(function() { console.log('timeout1_then') }) }) 

![timeout1进入对应队列](http://upload-images.jianshu.io/upload_images/599584-afded6f26c106326.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

第三步：执行过程遇到setImmediate。setImmediate也是一个宏任务分发器，将任务分发到对应的任务队列中。setImmediate的任务队列会在setTimeout队列的后面执行。
    
    setImmediate(function() { console.log('immediate1'); process.nextTick(function() { console.log('immediate1_nextTick'); }) new Promise(function(resolve) { console.log('immediate1_promise'); resolve(); }).then(function() { console.log('immediate1_then') }) }) 

![进入setImmediate队列](http://upload-images.jianshu.io/upload_images/599584-c22a5e6567ec25d3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

第四步：执行遇到nextTick，process.nextTick是一个微任务分发器，它会将任务分发到对应的微任务队列中去。
    
    process.nextTick(function() { console.log('glob1_nextTick'); }) 

![nextTick](http://upload-images.jianshu.io/upload_images/599584-8d16de95f6a12b25.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

第五步：执行遇到Promise。Promise的then方法会将任务分发到对应的微任务队列中，但是它构造函数中的方法会直接执行。因此，glob1_promise会第二个输出。
    
    new Promise(function(resolve) { console.log('glob1_promise'); resolve(); }).then(function() { console.log('glob1_then') }) 

![先是函数调用栈的变化](http://upload-images.jianshu.io/upload_images/599584-792877853f338494.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![然后glob1_then任务进入队列](http://upload-images.jianshu.io/upload_images/599584-b5c548ec48521c87.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

第六步：执行遇到第二个setTimeout。
    
    setTimeout(function() { console.log('timeout2'); process.nextTick(function() { console.log('timeout2_nextTick'); }) new Promise(function(resolve) { console.log('timeout2_promise'); resolve(); }).then(function() { console.log('timeout2_then') }) }) 

![timeout2进入对应队列](http://upload-images.jianshu.io/upload_images/599584-0392b96fd8fd2281.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

第七步：先后遇到nextTick与Promise
    
    process.nextTick(function() { console.log('glob2_nextTick'); }) new Promise(function(resolve) { console.log('glob2_promise'); resolve(); }).then(function() { console.log('glob2_then') }) 

![glob2_nextTick与Promise任务分别进入各自的队列](http://upload-images.jianshu.io/upload_images/599584-7001e3438df47eb0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

第八步：再次遇到setImmediate。
    
    setImmediate(function() { console.log('immediate2'); process.nextTick(function() { console.log('immediate2_nextTick'); }) new Promise(function(resolve) { console.log('immediate2_promise'); resolve(); }).then(function() { console.log('immediate2_then') }) }) 

![nextTick](http://upload-images.jianshu.io/upload_images/599584-eb6742e93ff577cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这个时候，script中的代码就执行完毕了，执行过程中，遇到不同的任务分发器，就将任务分发到各自对应的队列中去。接下来，将会执行所有的微任务队列中的任务。

其中，nextTick队列会比Promie先执行。nextTick中的可执行任务执行完毕之后，才会开始执行Promise队列中的任务。

当所有可执行的微任务执行完毕之后，这一轮循环就表示结束了。下一轮循环继续从宏任务队列开始执行。

这个时候，script已经执行完毕，所以就从setTimeout队列开始执行。

![第二轮循环初始状态](http://upload-images.jianshu.io/upload_images/599584-48cfccebbff92e97.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

setTimeout任务的执行，也依然是借助函数调用栈来完成，并且遇到任务分发器的时候也会将任务分发到对应的队列中去。

只有当setTimeout中所有的任务执行完毕之后，才会再次开始执行微任务队列。并且清空所有的可执行微任务。

setTiemout队列产生的微任务执行完毕之后，循环则回过头来开始执行setImmediate队列。仍然是先将setImmediate队列中的任务执行完毕，再执行所产生的微任务。

当setImmediate队列执行产生的微任务全部执行之后，第二轮循环也就结束了。

> 大家需要注意这里的循环结束的时间节点。
> 
> 当我们在执行setTimeout任务中遇到setTimeout时，它仍然会将对应的任务分发到setTimeout队列中去，但是该任务就得等到下一轮事件循环执行了。例子中没有涉及到这么复杂的嵌套，大家可以动手添加或者修改他们的位置来感受一下循环的变化。

