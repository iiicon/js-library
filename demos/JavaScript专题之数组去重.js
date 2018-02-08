{
  // 1 双层循环
  var arr = [2, 2, '2', 2]

function unique(arr) {
    var res = []

    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < res.length; j++) {
        if (res[j] === arr[i]) {
          break
        }
      }

      if (res.length === j) {
        res.push(arr[i])
      }
    }

    return res
  }
  console.log(unique(arr))
  // 这个方法兼容性最好
}

{
  // 2 用 indexOf 简化内层循环
  var arr = [3, '3', 3, 3]

  function unique(arr) {
    var res = []

    for (var i = 0, len = arr.length; i < len; i++) {
      var current = arr[i]

      if (res.indexOf(current) === -1) {
        res.push(arr[i])
      }
    }

    return res
  }

  console.log(unique(arr))
}

{
  // 3 先排序，然后判断相邻的元素是否相等
  var arr = [4, 4, '4', 3, '5']

  function unique(arr) {
    var res = []
    var sortArr = arr.concat().sort()
    var previous

    for (var i = 0, len = sortArr.length; i < len; i++) {
      if (!i || sortArr[i] !== previous) {
        res.push(sortArr[i])
      }
      previous = sortArr[i]
    }

    return res
  }

  console.log(unique(arr))
  // var arr = [4, 4, '4', 4, '4'] 注意这种情况无法去重，但是这种效率会比较高（比 indexOf）
}

{
  // 4 集合上面两种方法，写工具函数，用 isSort 来表示是否已经排序，分别执行不同的方法
  var array1 = [1, 2, '1', 2, 1]
  var array2 = [1, 1, '1', 2, 2]

  // 第一版
  function unique(arr, isSort) {
    var res = []
    var previous

    for (var i = 0, len = arr.length; i < len; i++) {
      if (isSort) {
        if (!i || previous !== arr[i]) {
          res.push(arr[i])
        }
        previous = arr[i]
      } else {
        var current = arr[i]

        if (res.indexOf(current) === -1) {
          res.push(current)
        }
      }
    }

    return res
  }

  console.log(unique(array1))
  console.log(unique(array2, true))
}

{
  // 完善可以去重忽略大小写
  var arr = [1, '2', 2, 'a', 'A', 1]

  function unique(arr, isSort, iteratee) {
    var res = []
    var previous = []

    for (var i = 0, len = arr.length; i < len; i++) {
      var value = arr[i]
      var computed = iteratee ? iteratee(value, i, arr) : value

      if (isSort) {
        if (!i || previous !== value) {
          res.push(arr[i])
        }
        previous = value
      } else if (iteratee) {
        if (previous.indexOf(computed) === -1) {
          previous.push(computed)
          res.push(value)
        }
      } else if (res.indexOf(value) === -1) {
        res.push(value)
      }
    }

    return res
  }

  console.log(
    unique(arr, false, function(item) {
      return typeof item == 'string' ? item.toLowerCase() : item
    })
  )
}

{
  // 5 filter ES5 提供了 filter 方法，我们可以用来简化外层循环
  var arr = [1, 2, 1, 1, '1']

  function unique(arr) {
    return arr.filter(function(item, index, arr) {
      return arr.indexOf(item) === index
    })
  }
  // 排序去重的方法
  function unique2(array) {
    return array
      .concat()
      .sort()
      .filter(function(item, index, array) {
        return !index || item !== array[index - 1]
      })
  }

  console.log(unique(arr))
}

// 其他方法
{
  // Object 键值对 :-D
  var array = [1, 2, 1, 1, '1']

  function unique(array) {
    var obj = {}
    return array.filter(function(item, index, array) {
      return obj.hasOwnProperty(item) ? false : (obj[item] = true)
    })
  }

  console.log(unique(array)) // [1, 2]

  // 我们可以发现，是有问题的，因为 1 和 '1' 是不同的，但是这种方法会判断为同一个值，这是因为对象的键值只能是字符串，
  // 所以我们可以使用 typeof item + item 拼成字符串作为 key 值来避免这个问题
  function unique2(array) {
    var obj = {}
    return array.filter(function(item, index, array) {
      return obj.hasOwnProperty(typeof item + item)
        ? false
        : (obj[typeof item + item] = true)
    })
  }

  console.log(unique2(array)) //[ 1, 2, '1' ]

  // 然而，即便如此，我们依然无法正确区分出两个对象，比如 {value: 1} 和 {value: 2}，
  // 因为 typeof item + item 的结果都会是 object[object Object]，不过我们可以使用 JSON.stringify 将对象序列化
  var array = [{ value: 1 }, { value: 1 }, { value: 2 }]

  function unique(array) {
    var obj = {}
    return array.filter(function(item, index, array) {
      console.log(typeof item + JSON.stringify(item))
      return obj.hasOwnProperty(typeof item + JSON.stringify(item))
        ? false
        : (obj[typeof item + JSON.stringify(item)] = true)
    })
  }

  console.log(unique(array)) // [{value: 1}, {value: 2}]
}

{
  // es6 Set 数据唯一，类似于数组
  var array = [1, 2, 1, 1, '1']

  function unique(array) {
    return Array.from(new Set(array))
  }

  // 简化
  function unique2(array) {
    return [...new Set(array)]
  }

  // 简化
  let uniquex = a => [...new Set(a)]

  console.log(uniquex(array)) // [1, 2, "1"]
}

{
  // demo 只能这样
  function unique(array) {
    return Array.from(new Set(array))
  }
  console.log(unique([NaN, NaN])) // [NaN]
}