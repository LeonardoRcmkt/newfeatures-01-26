function createAdder(a) {
  return function add(b) {
    const sum = a + b;
    return sum;
  };
}
const addTo = createAdder(4);
// console.log(addTo(2));

const Avalue = (a) => (b) => `A: ${a} B: ${b}`;
const Bvalue = Avalue(10);
// console.log(Bvalue(5));

var createCounter = function(n) {
  let currentCount = n - 1;
  return function() {
    currentCount += 1;
    return currentCount;      
  };
};
const fn = createCounter(1)
console.log(fn(6))