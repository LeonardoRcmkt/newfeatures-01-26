const comparison = (a) => {
    return {
  isTrue: (b) => a===b,
  isFalse: (b) => a!==b
  }
};
console.log(comparison(2).isFalse(2))
