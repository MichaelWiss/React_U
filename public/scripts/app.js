'use strict';

var square = function square(x) {
    return x * x;
};

// const SquareArrow = () => {
// return x * x;
// };

// const squareArrow = (x) => x * x;


// console.log(squareArrow(4));


// const getFirstName = (fullName) => {
// 	return fullName.split(' ')[0];
// };

var getFirstName = function getFirstName(fullName) {
    return fullName.split(' ')[0];
};

console.log(getFirstName('Mike Smith'));
