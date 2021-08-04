class FunctionLibrary {
  // call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
  call (fn, obj, ...args) {
    if(obj === undefined || obj === null) {
      obj = globalThis
    }
    obj.temp = fn
    let result = obj.temp(...args)
    delete obj.temp
    return result
  }
  // apply() 方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数。
  apply (fn, obj, args) {
    this.call(fn, obj, ...args)
  }
  // bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
  bind (fn, obj, ...args1) {
    let that = this
    return function (...args2) {
      return that.call(fn, obj, ...args1, ...args2)
    }
  }
  //函数防抖 debounce() 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
  debounce (func, wait = 200) {
    let timer = null
    return function (...args) {
      let that = this;
      clearTimeout(timer)
      timer = setTimeout(function () {
        func.apply(that, args)
      }, wait);
    }
  }
  //函数节流 throttle() 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
  throttle (func, delay) {
    let preTime = Date.now()
    return function (...args) {
      let nowTime = Date.now()
      if (nowTime - preTime >= delay) {
        preTime = Date.now()
        func.apply(this, args)
      } 
    }
  }
}

module.exports =  new FunctionLibrary()