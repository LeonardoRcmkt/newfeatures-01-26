const openFridge = (...foods) => console.log(foods);
const getFood = (...foods) => foods

const food1 = "pizza";
const food2 = "hamburger";
const food3 = "hotdog";
const food4 = "sushi";
const food5 = "ramen";

// openFridge(food1, food2, food3, food4, food5);
const foods = getFood(food1, food2, food3, food1, food5)
console.log(foods)