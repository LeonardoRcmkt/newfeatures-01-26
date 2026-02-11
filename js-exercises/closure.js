function createAdder(a) {
  return function add(b) {
    return a = a + b;
  };
}
const addTo = createAdder(4);
// console.log(addTo(2));

const Avalue = (a) => (b) => `A: ${a} B: ${b}`;
const Bvalue = Avalue(10);
// console.log(Bvalue(5));

var createCounter = function(n) {
  return function() {
    return n++;      
  };
};
const fn = createAdder(1)
console.log(fn(6))
console.log(fn(0))
console.log(fn(1))
console.log(fn(4))
console.log(fn(-20))
console.log(fn(6))