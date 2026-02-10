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
  const r = arr;
  for (let i = 0; i <= arr.length - 1; i++) {
    r[i] = fn(r[i],i)
  }
  return r;
};

console.log(map([1, 2, 3], plusone));
console.log(map([1, 2, 3], plusI));
console.log(map([10, 20, 30], constant));
