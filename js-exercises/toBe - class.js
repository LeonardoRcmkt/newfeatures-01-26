
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

