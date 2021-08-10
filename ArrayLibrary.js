const { instanceOf } = require("../ObjectLibrary2")

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
    if(initialValue !== undefined && array.length === 0) return initialValue

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
  /**
   * Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
   * @param {Array} array 
   * @param {Function} callback 
   * @param {object} thisObj 
   */
  from(array, callback, thisObj) {
    let result = []
    const isArray = Array.isArray(array)
    let obj = {
      a: 3
    }
    if(isArray) {
      array.forEach( (item, index) => {
        if(callback) {
          // call指定不了this???
          result[index] = callback.call(thisObj, item)
        } else {
          result[index] = item
        }
      })
    } else {
      result = [].concat(...array)
    }
    return result
  }
  /**
   * includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
   * @param {Array} array  
   * @param {any} value 
   * @param {Number} index 
   */
  includes(array ,value, index = 0) {
      let indexAbs = index >= 0 ? index: array.length + index
      for(; indexAbs < array.length; indexAbs++) {
        if(array[indexAbs] === value) {
          return true
        }
      }
      return false
  }
  /**
   * indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
   * @param {Array} array
   * @param {any} value 
   * @param {Number} index 
   */
   indexOf(array, value, index = 0) {
     if(index > array.length) {
       return -1
     }
     if(index + array.length < 0) {
       index = 0
     }
    let indexAbs = index >= 0 ? index: array.length + index
    for(; indexAbs < array.length; indexAbs++) {
      if(array[indexAbs] === value) {
        return indexAbs
      }
    }
    return -1
  }
  /**
   * Array.isArray() 用于确定传递的值是否是一个 Array。
   * @param {Array} array 
   */
  isArray(array) {
    return (array instanceof Array)
  }
  /**
   * join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。
   * 如果数组只有一个项目，那么将返回该项目而不使用分隔符。
   * @param  {Array} array
   * @param  {any} separator 
   */
  join(array ,separator = '') {
    let str = array[0].toString()
    if(array.length === 1 ) {
      return str
    }
    array.forEach((item, index) => {
      if(index > 0) {
        str += separator.toString() + item.toString()
      }
    })
    return str
  }
  /**
   *  keys() 方法返回一个包含数组中每个索引键的Array Iterator对象。
   * @param {Array} array 
   */
  keys(array) {
    let result = []
    for(let i = 0; i < array.length; i++) {
      result.push(i)
    }
    return result
  }
  /**
   * lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。
   * 从数组的后面向前查找，从 fromIndex 处开始。
   * @param {Array} array
   * @param {any} value 
   * @param {Number} fromIndex 
   */
  lastIndexOf(array, value, fromIndex = array.length - 1) {
    if(Math.abs(fromIndex) > array.length) {
      return -1
    }
    if(fromIndex < 0) {
      fromIndex = array.length - 1 + fromIndex
    }
    for(; fromIndex >= 0; fromIndex--) {
      if(array[fromIndex] === value) {
        return fromIndex
      }
    }
    return -1
  }
  /**
   * Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
   * @param  {...any} args 
   */
  of(...args) {
    let result = []
    args.forEach( (item) => {
      result.push(item)
    })
    return result
  }
  /**
   * pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
   * @param {Array} array 
   */
  pop(array) {
    if(array.length == undefined) {
      array.length = 0
      return undefined
    }
    array.length--
    return array
  }
  /**
   * 
   * @param {Array} array 
   * @param  {...any} args 
   */
  push(array, ...args) {
    let length = array.length
    args.forEach((item) => {
      array[length] = item
      length++
    })
    array.length = length
    return array
  }
  /**
   * reduceRight() 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。
   * @param {Array} array 
   * @param {Function} callback 
   * @param {any} initialValue 
   * @returns 
   */
  reduceRight(array, callback, initialValue) {
    if(array === undefined && initialValue === undefined) {
      return TypeError("Reduce of empty array with no initial value")
    }
    if(array === undefined && initialValue !== undefined) {
      return initialValue
    }
    if(array.length === 1 && initialValue === undefined) {
      return array[0]
    }
    let index = array.length - 2
    let accumulator = array[array.length - 1]
    let currentValue = array[array.length - 2]
    if(initialValue !== undefined) {
      index++
      currentValue = array[array.length - 1]
      accumulator = initialValue
    }
    for(; index >=0; index--) {
      accumulator = callback(accumulator, currentValue, index, array)
    }
    return accumulator
  }
  /**
   * reverse() 方法将数组中元素的位置颠倒，并返回该数组。
   * 数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。
   * @param {Array} array 
   */
  revserse(array) {
    if(array.length === 0) {
      return []
    }
    let result = []
    for(let i = array.length - 1; i >= 0; i--) {
      result.push(array[i])
    }
    return result
  }
  /**
   * shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
   * @param {Array} array 
   */
  shift(array) {
    let result = array[0]
    for(let i = 0; i < array.length; i++) {
      array[i] = array[i + 1]
    }
    array.length--
    return result
  }
  /**
   * slice() 方法返回一个新的数组对象，
   * 这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。
   * @param {Array} arr 
   * @param {Number} begin 
   * @param {Number} end 
   * @returns 
   */
  slice(arr, begin, end) {
    if(arr.length === 0) {
      return []
    }
    let i = begin || 0
    let lastIndex = end || arr.length
    if(begin >= arr.length) {
      return []
    }
    if(end < begin) {
      lastIndex = arr.length
    }
    let result = []
    for(; i < lastIndex; i++) {
      result.push(arr[i])
    }
    return result
  }
  /**
   * some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
   * @param {Array} arr 
   * @param {Function} callback 
   * @returns 
   */
  some(arr, callback) {
    for(let i = 0; i < arr.length; i++) {
      let result = callback(arr[i], i)
      if(result) {
        return true
      }
    }
    return false
  }
  /**
   * sort() 方法用原地算法对数组的元素进行排序，并返回数组。
   * 默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的
   * @param {Array} array 
   * @param {Functioin} callback 
   */
  sort(array,callback) {
    if(callback === undefined) {
      for(let i = 0 ; i < array.length; i++) {
        for(let j = i; j < array.length; j++) {
          if(array[i] > array[j]) {
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
          }
        }
      }
      return array
    } else {
      for(let i = 0 ; i < array.length; i++) {
        for(let j = i; j < array.length; j++) {
          let result = callback(array[i],array[j])
          if(result > 0) {
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
          }
        }
      }
    }
    
  }
  /**
   * splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
   * @param {Array} array 
   * @param {Number} start 
   * @param {Number} deleteCount 
   * @param  {...any} args 
   */
  splice(array, start, deleteCount, ...args) {
    if(start < 0 && Math.abs(start) > array.length) {
      start = 0
    }
    if(start > array.length) {
      start = array.length
    }
    if(start < 0) {
      start = array.length + start
    }
    if(deleteCount !== undefined) {
      if(deleteCount >= array.length - start) {
        deleteCount = array.length - start
      }
      if(deleteCount < 0) {
        deleteCount = 0
      }
    } else {
      deleteCount = 0
    }
    let result = []
    // 删除元素
    for(let i = start; i < array.length; i++) {
      if(i < start + deleteCount) {
        result.push(array[i]) 
      }
      array[i] = array[i + deleteCount]
    }
    array.length -= deleteCount
    // 添加元素
    if(args === undefined || args.length === 0) {
    } else {
      let count = args.length
      for(let i = array.length - 1; i >= start; i-- ) {
        if(i === start) {
          let index = i + 1
          args.forEach( (item) => {
            array[index] = item
            index++
          })
        } else {
          array[i + count] = array[i]
        }
      }
    }
    return result
  }
  /**
   * toLocaleString() 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，
   * 这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。
   * @param {Array} array 
   */
   toLocaleString(array) {
    let str = ''
    array.forEach( (item, index) => {
      if(index == 0) {
        str += item.toLocaleString ()
      } else {
        str +=',' + item.toLocaleString ()
      }
    })
    return str
  }
  /**
   * toString() 返回一个字符串，表示指定的数组及其元素。
   * @param {Array} array 
   * @returns 
   */
  toString(array) {
    let str = ''
    array.forEach( (item, index) => {
      if(index == 0) {
        str += item.toString ()
      } else {
        str +=',' + item.toString ()
      }
    })
    return str
  }
  /**
   * unshift() 方法将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。
   * @param {Array} array 
   * @param  {...any} args 
   */
  unshift(array, ...args) {
    let count = args.length
    for(let i = array.length - 1; i >= 0; i--) {
      array[i + count] = array[i]
    }
    args.forEach( (item, index) => {
      array[index] = item
    })
    return array.length
  }
  /**
   * values() 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值
   * @param {Array} array 
   */
  values(array) {
    let result = {}
    array.forEach( (item, index) => {
      result[index] = item
    })
    return result
  }
}

module.exports =  new ArrayLibrary()



