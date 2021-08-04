class ArrayLibrary {
  /*
    concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
    @param {*} valueN
  */
  concat (...valueN) {
    let newArray = []
    valueN.forEach(e => {
      if(e instanceof Array)
        newArray.push(...e)
      else newArray.push(e)
    })
    return newArray
  }
  /*
    copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。
    @param {Array} array
    @param {int} target
    @param {int} start
    @param {int} end
  */
  copyWithin (array, target, start = 0, end) {
    if(!target || target >= array.length) return array
    target = target >= 0 ? target: target + array.length
    target = target < 0 ? 0 : target
    start = start >= 0 ? start: (start + array.length) < 0 ? 0: (start + array.length)
    end = end || array.length
    end = end >= 0 ? end: (end + array.length) < 0 ? 0: (end + array.length)
    end = end > array.length ? array.length : end

    if(end - start <= 0) return array
    let length = array.length
    let oldArray = []
    for(let i = start; i < end; i++) {
      oldArray.push(array[i])
    }
    for(let i = 0, j = target; i < oldArray.length; i++, j++) {
      array[j] = oldArray[i]
    }

    array.length = length
    return array
  }
  /*
    every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
    @param {Array} array
    @param {Function} callback
    @param {*} thisArg
  */
  every (array, callback, thisArg = globalThis) {
    if(array.length === 0) return true
    for(let i = 0; i < array.length; i++) {
      if(!callback.call(thisArg, array[i], i, array)) {
        return false
      }
    }
    return true
  }
  /*
    fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
    @param {Array} array
    @param {*} value
    @param {int} start
    @param {int} end
  */
  fill (array, value, start = 0, end) {
    start = start >= 0 ? start : (start + array.length) < 0 ? 0 : start + array.length
    end = end || array.length
    end = end >= 0 ? end : (end + array.length) < 0 ? 0 : end + array.length
    if(start >= array.length || end >array.length || end <= start) {
      return array
    }
    for(let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }
  /*
    filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
    @param {Array} array
    @param {Function} callback
    @param {*} thisArg
  */
  filter (array, callback, thisArg = globalThis) {
    let newArray = []
    array.forEach((element, index, array) => {
      if(callback.call(thisArg, element, index, array)) {
        newArray.push(element)
      }
    })
    return newArray
  }
  /*
    find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
    @param {Array} array
    @param {Function} callback
    @param {*} thisArg
  */
  find (array, callback, thisArg = globalThis) {
    for(let i = 0; i < array.length; i++) {
      if(callback.call(thisArg, array[i], i, array)) {
        return array[i]
      }
    }
    return undefined
  }
  /*
    findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。
    @param {Array} array
    @param {Function} callback
    @param {*} thisArg
  */
  findIndex (array, callback, thisArg = globalThis) {
    for(let i = 0; i < array.length; i++) {
      if(callback.call(thisArg, array[i], i, array)) {
        return i
      }
    }
    return -1   
  }
  /*
    flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
    @param {Array} array
    @param {int} depth
  */
  flat (array, depth = 1) {
    function hanledFlat (array, data, temp, depth) {
      if(!(data instanceof Array) || ( depth !== 'Infinity' && temp > depth)) { 
        return array.push(data)
      }
      data.forEach(element => {
        hanledFlat(array, element, temp + 1, depth)
      })
    }
    let newArray = []
    array.forEach(element => {
      let array = []
      hanledFlat(array, element, 1, depth)
      newArray.push(...array)
    })

    return newArray
  }
  /*
    forEach() 方法对数组的每个元素执行一次给定的函数。
    @param {Array} array
    @param {Function} callback
    @param {*} thisArg
  */
  forEach (array, callback, thisArg = globalThis ) {
    for(let i = 0; i < array.length; i++) {
      if(array[i] === undefined) continue
      callback.call(thisArg, array[i], i, array )
    }
    return undefined
  }
  /*
    map() 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
    @param {Array} array
    @param {Function} callback
  */
  map (array, callback) {
    let newArray = []
    array.forEach((element, index, array,thisArg) => {
      newArray.push(callback(element, index, array, thisArg))
    });
    return newArray
  }
  /*
    reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
    @param {Array} array
    @param {Function} callback
    @param {*} initialValue
  */
  reduce (array, callback, initialValue) {
    if(initialValue === undefined && array.length === 0) throw new TypeError('Reduce of empty array with no initial value');
    if(initialValue === undefined && array.length === 1) return array[0]
    if(initialValue != undefined && array.length === 0) return initialValue

    let index = 0
    if(initialValue === undefined) {
      index = 1
      initialValue = initialValue || array[0]
    }
    let accumulator  = initialValue
    for(let i = index; i < array.length; i++) {
      accumulator = callback(accumulator, array[i], i , array)
    }
    return accumulator
  }
}

module.exports =  new ArrayLibrary()



