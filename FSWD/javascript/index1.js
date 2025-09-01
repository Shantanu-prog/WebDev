// let lastName = ' shantanu ';
// let firstname = new String('kumar');

// let message = 
// `hello ${lastName}
// thanks for the oppurnity

// regards
// shantnau`;

// console.log(message);

// // let words = message.split(' ');

// // console.log(words);

// let date = new Date();

// let date2 = new Date('june 20 1998 07:15');

// let date3 = new Date(1998, 11, 20, 7);

// date3.setFullYear(1950);


// console.log(date3);

//creating an Array

// let numbers = [1, 4, 5, 7];

// console.log(numbers);

// //searching or finding

// console.log(numbers);

// console.log(numbers.indexOf(4));

// //we want to check if a number exist in an arrary
// if(numbers.indexOf(5) != -1)
//     console.log("present"); 

// console.log(numbers.includes(7));

// console.log(numbers.indexOf(4, 0));

let courses = [
    {no:1, name: 'shan'},
    {no:2, naam: 'kittu'}
];  

console.log(courses);

// console.log( course.indexOf({no:1, naam:'shan'}));

let course = courses.find(function(course){
    return course.naam == 'shan';
})

console.log(course);   