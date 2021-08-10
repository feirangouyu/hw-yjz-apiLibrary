let ArrayLibrary  = require('./ArrayLibrary')
function flatten(arr) {
  const result = [];

  ArrayLibrary.forEach(arr, (i) => {
    if (Array.isArray(i))
      result.push(...flatten(i));
    else
      result.push(i);
  })

  return result;
}

// Usage
const problem = [1, 2, 3, [4, 5, [6, 7], 8, 9]];

// console.log(flatten(problem)); ; // [1, 2, 3, 4, 5, 6, 7, 8, 9]
// form 指定this失败
{
  // console.log(Array.from('foo'));
  // console.log(Array.from([1, 2, 3], x => x + x));
  let obj = new Object({
    a: 1,
    b: 2
  })
  const arr1 = [1,2,3,4]
  console.log(ArrayLibrary.from(arr1, (item) => {
    console.log(this);
    return item * 2
  }, obj));
  console.log(ArrayLibrary.from('foo', null, obj));
}
// includes
{
  // let arr = [1,2,3,4]
  // console.log(ArrayLibrary.includes(arr, 1));
}
// indexOf
{
  // let arr = [1,2,3,4]
  // console.log(ArrayLibrary.indexOf(arr, 1, -30));
}
// isArray
{
  // let arr = [1,2,3,4]
  // let obj = {}
  // console.log(ArrayLibrary.isArray(arr));
  // console.log(ArrayLibrary.isArray(obj));
}
// join
{
  // let arr = ['abc', 'def', '123']
  // console.log(ArrayLibrary.join(arr, '-'));
}
// keys
{
  // let arr = ['abc', , '123']
  // console.log(ArrayLibrary.keys(arr));
}
//lastIndexOf
{
  // let arr = ['abc','abc', '123', 'abc']
  // console.log(ArrayLibrary.lastIndexOf(arr, 'abc'));
}
// of
{
  // console.log(ArrayLibrary.of('1', 2, 3, 5));
}
// pop
{
  // let arr = ['abc','abc', '123', 'abc']
  // console.log(ArrayLibrary.pop(arr));
}
// push
{
  // let arr = ['abc','abc', '123', 'abc']
  // console.log(ArrayLibrary.push(arr, '1', '2', '3'));
}
// reduceRight
{
  // let arr = [1,2,3,4]
  // console.log(ArrayLibrary.reduce(arr, (acc, cur) => {
  //   return acc + cur
  // }));
}
// reverse
{
  // let arr = [1,2,3,4]
  // console.log(ArrayLibrary.revserse(arr));
}
// shift
{
  // let arr = [1,2,3,4]
  // console.log(ArrayLibrary.shift(arr));
  // console.log(arr);
}
// slice
{
  // let arr = [1,2,3,4]
  // console.log(ArrayLibrary.slice(arr, 1, 3));
}
// some
{
  // let arr = [1,2,3,4]
  // console.log(ArrayLibrary.some(arr, i => i > 3));
}
// sort
{
  // // let arr = [1,4,3,5]
  // // // arr.sort( (a, b) => {
  // // //   return a - b
  // // // })
  // // // console.log(arr);
  // let arr2 = [1,5,2,4]
  // ArrayLibrary.sort(arr2, (a, b) => {
  //   return a - b
  // }) 
  // console.log(arr2);
}
// splice
{
  // let arr = [1,4,3,5]
  // console.log(ArrayLibrary.splice(arr, 1, 1, 8,12,1));
  // console.log(arr);
}
// toLocalString
{
  // let arr = [1,4,3,5]
  // console.log(ArrayLibrary.toLocaleString(arr));
}
// toString()
{
  // let arr = [1,4,3,5]
  // console.log(ArrayLibrary.toString(arr));
}
// unshift()
{
  // let arr = [1,4,3,5]
  // console.log(ArrayLibrary.unshift(arr, 5,5,5));
  // console.log(arr);
}
// values()
{
  // let arr = [1,4,3,5]
  // let result = ArrayLibrary.values(arr)
  // console.log(result);
}
