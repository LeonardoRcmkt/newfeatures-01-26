
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
