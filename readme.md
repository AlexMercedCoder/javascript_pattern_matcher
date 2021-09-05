## PatternMatcher

PatterMatcher is a library to allow for more robust pattern matching in Javascript. Essentially you can create a switch like function
by Alex Merced of AlexMercedCoder.com

**NOTE** The eval function is no longer used since version 1.0.3, replaced with the safer and faster Function constructor

To Install PatterMatcher

`npm install alexmerced-patternmatcher`

to import the libraries functions

```js
const {
  createMatcher,
  createSingleMatcher,
  matchArray,
  matchObject,
} = require("./index.js");
```

## createMatcher & createSingleMatcher

These create a matching function. It takes one arguments which is array of arrays, each subarray should have two elements.

element 1 - a string that represents the value to matched with "v" in an express that can be evaluated as true or false
element 2 - a callback function that takes one argument, the value being matched.

The matching function returned takes one argument, the value to be matched and returns an array of the return value of any matches.

- a matcher created with createMatcher will allow for multiple matches
- a matcher created with createSingleMatch will allow for a single match

**createMatcher**

```js
//////////////////////////////////////
// Creating a Matcher for a Single Value and an Array of Values
//////////////////////////////////////
{
  // Create  Matcher with patterns
  const matcher = createMatcher([
    ["v % 2 === 0", (v) => `${v} is even`],
    ["v / 2 === 5", (v) => `${v} is 10`],
  ]);

  // use the matcher on a single value
  const result = matcher(10);
  console.log(result); // [ '10 is even', '10 is 10' ]

  //use the matcher on an array
  const result2 = matchArray([1, 3, 5, 6, 10], matcher);
  console.log(result2);
  // [ [], [], [], [ '6 is even' ], [ '10 is even', '10 is 10' ] ]
}
```

**createSingleMatcher**

```js
{
  // Create  Matcher with patterns
  const matcher = createSingleMatcher([
    ["v % 2 === 0", (v) => `${v} is even`],
    ["v / 2 === 5", (v) => `${v} is 10`],
  ]);

  // use the matcher on a single value
  const result = matcher(10);
  console.log(result); // [ '10 is even' ]

  //use the matcher on an array
  const result2 = matchArray([1, 3, 5, 6, 10], matcher);
  console.log(result2);
  // [ [], [], [], [ '6 is even' ], [ '10 is even' ] ]
}
```

## matchArray

As seen in the code snippets above, matchArray takes two arguments.

- argument 1 - an array of values
- argument 2 - a matcher function to pass each value to

matchArray returns an array with the return value of each match operation.

## matchObject

Similar to match array but for objects. It will turn the Object into an array of entries, so "v" should be treated as an array of `[key, value]` in your patterns to matched.

```js
//////////////////////////////////////
// Creating a Matcher for an Object
//////////////////////////////////////

{
  // The Object to be matched
  const alex = {
    name: "Alex Merced",
    age: 36,
    website: "AlexMercedCoder.com",
  };

  // Create Matcher with patterns
  const matcher = createSingleMatcher([
    ["v[0] === 'name'", (v) => `The name is ${v[1]}`],
    ["v[0] === 'age'", (v) => `The age is ${v[1]}`],
    ["v[0] === 'website'", (v) => `The website is ${v[1]}`],
  ]);

  // using the matcher on an object
  const result = matchObject(alex, matcher);
  console.log(result);
  // [ [ 'The name is Alex Merced' ], [ 'The age is 36' ], [ 'The website is AlexMercedCoder.com' ] ]
}
//////////////////////////////////////////////////////
```

## Tips

- If you want to check whether the value is a custom type do this `v.constructor.name === "TypeName"` not this `v instanceof TypeName`, you will have scoping issues with the latter. Either works fine with built-in types.

- A Function is dynamically generated using the function constructor to evaluate each pattern, the Function constructor will always create the function in the global scope not the local scope, so keep that in mind in any variable references.

- Both createMatcher and createSingleMatcher take a second argument as an object with any external value/functions you want to reference in your expression such `v === ex.type` would allow you to use a variable defined outside

**Example of Using Externals**
```js
    const str = "name"

    // Create Matcher with patterns, pass in externals as second argument
    const matcher = createSingleMatcher([
      ["v[0] === ex.str", (v) => `The name is ${v[1]}`],
      ["v[0] === 'age'", (v) => `The age is ${v[1]}`],
      ["v[0] === 'website'", (v) => `The website is ${v[1]}`],
    ], {str});
```