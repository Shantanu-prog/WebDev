console.log('Namaste Dunia version3');

//boject create

// let rectangle = {
//     length: 1,
//     breadth: 2,
    
//     //agr object ke andar funton likha jaye toh usse function nahi bolte, uuse method bolte hai.
//     draw: function(){
//         console.log('draw my picture in wide screen');
//     }
// }; 

// function createRectangle(len, bre)
// {
//     return rectangle = {
//     length: len,
//     breadth: bre,
    
//     //agr object ke andar funton likha jaye toh usse function nahi bolte, uuse method bolte hai.
//     draw: function(){
//         console.log('draw my picture in wide screen');
//     }
// }; 

// }
// let rectangleObj1 = createRectangle(5, 4);
// let rectangle2 = createRectangle(3, 2);  /

// function Rectangle(len, bre)
// {
//     this.length = len;
//     this.breadth = bre; 
//     this.draw = function()
//     {
//         console.log('drawing');
//     }
// }
// let rectangleObject = new Rectangle(3, 4);

// // rectangleObject.color = 'yellow';
// // console.log(rectangleObject)

// // delete rectangleObject.color;
// // console.log(rectangleObject);

// let rectangle1 = new Function(
//     'length', 'breadth',
//     `this.length = length;
//      this.breadth = bredth; 
//      this.draw = function() {
//         console.log('drawing');
//      }`
// );

// //oblect create using Rectangle1
// let rect = new Rectangle(2, 3);

// console.log(rect);

// let a = 10;
// let b = a;

// a++;
// console.log(a);
// console.log(b);
 
// let a = { value: 10};
// let b = a ;

// a.value++;

// console.log(a.value);
// console.log(b.value);

// let a = 10;
// function inc(a){
//     a++
// }

// inc(a);
// console.log(a);

// let a = {value: 10};

// function inc(a)
// {
//     a.value++;
// }
// inc(a);

// console.log(a);

// let rectangle = {
//     length : 2,
//     breadth: 4,
// };

// // //for-in loop
// // for(let key in rectangle){
// //    console.log(key, rectangle[key]);
// // }

// //for-of loop
// // for(let key of Object.entries(rectangle)){
// //      console.log(key);
// // }

// if('length' in rectangle){
//     console.log('present');
// }
// else{
//     console.log('Absent');
// }
 

//object-cole #1
// let src = {
//     a : 10,
//     b : 20,
//     c : 30,
// };

// let dest = {};

// for(let key in src){
//     dest[key] = src[key];
// }

// console.log(dest);

// src.a++;
// console.log(dest)



//object-clone #2
//  let src = {
//     a:10,
//     b:20,
//     c:30,
//  };
    // let src2 = {vlue: 25};
//  let dest = Object.assign({}, src);

//  console.log(dest);

//  src.a++;

//  console.log(dest);


//object-clone #3
// let src = {
//     a:10,
//     b:20,
//     c:30,
// }
// let dest = {...src };
// console.log(dest);
// src.a++;
// console.log(dest);


