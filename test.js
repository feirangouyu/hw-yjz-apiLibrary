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

console.log(flatten(problem)); ; // [1, 2, 3, 4, 5, 6, 7, 8, 9]