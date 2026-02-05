const returnFunctions = (...args) => {};

const sumCallback = (a, b) => a + b;
const subtractCallback = (a, b) => a + b;

const fSum = (...args) => [...args].reduce(sumCallback, 0);
const fSubtract = (...args) => [...args].reduce(subtractCallback, 0);

// const fHelperC = (...args) => a + b;

console.log(fSum(1, 2, 3, 4, 5, 1));
console.log(fSubtract(1, 2, 3, 4, 5, 1));
// console.log(fHelperC(1));
