var count = 1
var container = document.getElementById('container')

function getUserAction(name) {
  container.innerHTML = count++
  return name
}

container.onmousemove = getUserAction
