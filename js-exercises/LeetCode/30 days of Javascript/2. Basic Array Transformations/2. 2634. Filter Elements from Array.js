const filter = (arr, fn) => {
  let filteredArr = [];
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i], i) && (filteredArr[filteredArr.length] = arr[i]);
  }
  return filteredArr;
};

console.log(
  filter([0, 10, 20, 30], function greaterThan10(n) {
    return n > 10;
  }),
);

console.log(
  filter([1, 2, 3], function firstIndex(n, i) {
    return i === 0;
  }),
);

console.log(
  filter([-2, -1, 0, 1, 2], function plusOne(n) {
    return n + 1;
  }),
);

// console.log(map([1, 2, 3], plusI));
// console.log(map([10, 20, 30], constant));
