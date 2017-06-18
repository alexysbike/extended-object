# extended-object
Extends an object adding array functions like map, filter, forEach, etc...

## Installation
```
$ npm install extended-object
```

## How to use it
##### Syntax
```javascript
const extendedObject = require('extended-object');
extendedObject(obj, spread = true, clone = false);
```
By default the extendedObject its applied to each object inside.
If the spread is set to false, extendedObject will be applied only to the outer object
By default its used reference equality in the returned object.
If clone is set to true, its return a deep copy of the object.

```javascript
const extendedObject = require('extended-object');
const myObj = extendedObject({a: 1, b: 2, c: 3});
const mapped = myObj.map(value => `Number ${value}`);
console.log(mapped);
//{a: 'Number 1', b: 'Number 2', c: 'Number 3'}
```
A little more complex use.
```javascript
const extendedObject = require('extended-object');
const myObj = extendedObject({a: 'Alexys', b: 'Gonzalez', c: 101});
const message = [];
const myFunc = message => value => (typeof value === 'number')
    ? message.push(`is ${value} years old!`) 
    : message.push(value);

myObj.forEach(myFunc(message));

console.log(message.join(' '));
//Alexys Gonzalez is 101 years old!

myObj.c++;

const message2 = [];
myObj.forEach(myFunc(message2));

console.log(message2.join(' '));
//Alexys Gonzalez is 102 years old!
```

## Functions

###.map
Create a new object with the results of calling a provided function on every property in the calling object.
##### Syntax
```javascript
const newObject = obj.map((value, key, obj) => {
    // Return element for newObject
});
```
##### Example
```javascript
const extendedObject = require('extended-object');
const myObj = extendedObject({alex: 1, belinda: 2, charlie: 3});
const mapped = myObj.map((value, key) => `${key} is ${value} years old!`);
console.log(mapped);
/*
{ 
    alex: 'alex is 1 years old!',
    belinda: 'belinda is 2 years old!',
    charlie: 'charlie is 3 years old!' 
}
*/
```

### .filter
Create a new object with all properties that pass the test implemented by the provided function.
##### Syntax
```javascript
const newObject = obj.filter((value, key, obj) => {
    // Return true for passed property to newObject
});
```
##### Example
```javascript
const extendedObject = require('extended-object');
const myObj = extendedObject({alex: 1, belinda: 2, charlie: 3});
const filtered = myObj.filter(value => value >= 2);
console.log(filtered);
/*
{ 
    belinda: 2,
    charlie: 3
}
*/
```

### .forEach
Execute a provided function once for each object property.
##### Syntax
```javascript
obj.forEach((value, key, obj) => {
    // operations
});
```
##### Example
```javascript
const extendedObject = require('extended-object');
const myObj = extendedObject({alex: 1, belinda: 2, charlie: 3});
myObj.forEach((value, key) => console.log(`${key} is ${value} years old!`));
//alex is 1 years old!
//belinda is 2 years old!
//charlie is 3 years old! 
```

### .every
Test whether all properties in the object pass the test implemented by the provided function.
##### Syntax
```javascript
const pass = obj.every((value, key, obj) => {
    // Evaluate and return true or false for each property
});
```
##### Example
```javascript
const extendedObject = require('extended-object');
const myObj = extendedObject({alex: 17, belinda: 20, charlie: 30});
const olders = myObj.every(value => value >= 18);
console.log(olders);
//false
```

### .toArray
Return an array with all the properties of he object.
##### Syntax
```javascript
const array = obj.toArray();
```
##### Example
```javascript
const extendedObject = require('extended-object');
const myObj = extendedObject({alex: 17, belinda: 20, charlie: 30});
const array = myObj.toArray();
console.log(array);
//[17, 20, 30]
```

### .reduce
applies a function against an accumulator and each property in the object to reduce it to a single value.
##### Syntax
```javascript
const pass = obj.reduce((accumulator, value, key, obj) => {
    // return the accumulator for the next iteration
}[, initialValue]);
```
##### Example
```javascript
const extendedObject = require('extended-object');
const myObj = extendedObject({alex: 17, belinda: 20, charlie: 30});
const total = myObj.reduce((accumulator, value) => {
    accumulator += value;
    return accumulator;
}, 0);
console.log(total);
// 67
```
