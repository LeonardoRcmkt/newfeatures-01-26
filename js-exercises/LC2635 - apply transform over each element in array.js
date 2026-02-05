const plus = (a)=>++a
// let r = 0;

const apply = (arr, fn) => {
let i = 1;
let r = arr;
let n = 0;
  for (let n=1;n<=arr.length;n++){
n = fn(r[i]);
i++;
console.log("a" + n)
}

  return r;
};


console.log(apply([1,2], plus))