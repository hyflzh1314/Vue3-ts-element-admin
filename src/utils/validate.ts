export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

export const isArray = (arg: any) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export const isValidURL = (url: string) => {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

export const toStringfy = (o: object) => JSON.stringify(o)

// 添加响应式Array值

export const addReactiveArray = (reactiveArr: any[], arr: any[]) => {
  if(arr.length === 0) return
  arr.forEach((item) => {
    reactiveArr.push(item)
  })
}

// 清空响应式Array
export const clearReactiveArray = (arr: any[]) => {
  var l = arr.length
  if (l === 0) return
  for (let i = (l - 1); i >= 0; i--) {
    arr.splice(i, 1)
  }
}

// 删除数组中指定的值
export const removeTargetInArray = (arr: any[], target: any, value: any) => {
  var l = arr.length
  if (l === 0) return
  for (let i = 0; i < l; i++) {
    if (arr[i][target] === value) {
      arr.splice(i, 1)
      break
    }
  }
}
