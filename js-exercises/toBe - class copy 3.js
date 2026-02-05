
class comparison {
  constructor(a) {
    this.a = a;
  }

  toBe(b) {
    const sum = this.a === b;
    return sum;
  }

  notToBe(b) {
    const sum = this.a !== b;
    return sum;
  }
}
const expect = new comparison(2);
console.log(expect.toBe(2));
console.log(expect.notToBe(2));


/**
 * @param {string} val
 * @return {Object}
 */
const createCounter = (init) => {
  return {
    increment: (b) => {
      if (val === b) return true;
      throw new Error("Not Equal");
    },
    decrement: (b) => {
      if (val !== b) return true;
      throw new Error("Equal");
    },
  };
};

console.log(expect(4).notToBe(5)); // true
// console.log(expect(5).notToBe(5)); // throws "Equal"
const count = (init) => {
  let n = init;
  return {
    inc: () => ++n + " Increase ",
    res: () => (n = init) + " Reset ",
    dec: () => --n + " Decrease ",
  };
};

const r=count(5);
console.log(r.res())
console.log(r.inc())
console.log(r.inc())
console.log(r.inc())
console.log(r.res())
console.log(r.dec())
console.log(r.dec())
console.log(r.dec())
console.log(r.dec())
console.log(r.dec())
console.log(r.dec())
console.log(r.inc())
console.log(r.inc())
