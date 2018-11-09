/**
 *  几种求和
 *  arr = [1, 2, 3]
 */
function sum1(arr) {
  // 递归
  if (arr.length == 0) {
    return 0
  }
  if (arr.length == 1) {
    return arr[0]
  }
  if (arr.length > 1) {
    return arr[0] + sum1(arr.slice(1))
  }
}

function sum2(arr) {
  // for
  var sum = 0
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}

function sum3(arr) {
  // forEach
  var sum = 0
  arr.forEach(item => {
    sum += item
  })
  return sum
}

function sum4(arr) {
  // reduce
  return arr.reduce(function(pre, next, index, arr) {
    return pre + next
  })
}

function sum5(arr) {
  // eval
  return eval(arr.join('+'))
}

var arr = [1, 2, 3, 4]
console.log(
  'test sum =>> ' + sum1(arr),
  sum2(arr),
  sum3(arr),
  sum4(arr),
  sum5(arr)
)

/**
 * sort
 */
{
  function sort1(arr) {
    // sort api
    return arr.sort((a, b) => {
      return a - b
    })
  }

  function sort2(arr) {
    // bubble
    for (var i = 0; i < arr.length-1; i++) {
      for (var j = 0; j < arr.length-i-1; j++) {
        var temp = ''
        if (arr[j+1] < arr[j]) {
          temp = arr[j+1]
          arr[j+1] = arr[j]
          arr[j] = temp
        }
      }
    }
    return arr
  }

  console.log(sort1([1, 4, 3, 2, 5]), sort2([1, 4, 3, 2, 5]))
}
