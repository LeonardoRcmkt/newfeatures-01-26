const arr1 = ["hello", "a", "banana"]
const fn1 = (s) => s.length
// Resultado esperado: ["a", "hello", "banana"]

const arr2 = [
  { user: "Ana", age: 30 },
  { user: "João", age: 20 },
  { user: "Maria", age: 40 }
]
const fn2 = (u) => u.age

// Resultado esperado
// [
//   { user: "João", age: 20 },
//   { user: "Ana", age: 30 },
//   { user: "Maria", age: 40 }
// ]

const arr3 = [
  { id: 1, scores: [10, 20] },
  { id: 2, scores: [5, 99] },
  { id: 3, scores: [50, 1] }
]
const fn3 = (item) => item.scores[1]


// Resultado esperado
// [
//   { id: 3, scores: [50, 1] },
//   { id: 1, scores: [10, 20] },
//   { id: 2, scores: [5, 99] }
// ]



const sortBy = (arr, fn) =>  arr.sort((a,b)=> fn(a) - fn(b))


// console.log(sortBy(arr1,fn1));
// console.log(sortBy(arr2,fn2));
console.log(sortBy(arr3,fn3));