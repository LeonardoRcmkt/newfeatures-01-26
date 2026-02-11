function plusone(n) {
  return n + 1;
}
function plusI(n, i) {
  return n + i;
}
function constant() {
  return 42;
}

const map = (arr, fn) => {
  for (let i = 0; i <= arr.length - 1; i++) {
    arr[i] = fn(arr[i], i);
  }
  return arr;
};

console.log(map([1, 2, 3], plusone));
console.log(map([1, 2, 3], plusI));
console.log(map([10, 20, 30], constant));
