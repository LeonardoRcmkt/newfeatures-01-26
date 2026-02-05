
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


