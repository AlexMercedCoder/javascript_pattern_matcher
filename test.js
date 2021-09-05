const {
  createMatcher,
  createSingleMatcher,
  matchArray,
  matchObject,
} = require("./index.js");

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
//////////////////////////////////////////////////////

//////////////////////////////////////
// Creating a Single Matcher for a Single Value and an Array of Values
//////////////////////////////////////

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
//////////////////////////////////////////////////////

//////////////////////////////////////
// Creating a Matcher for an Object
//////////////////////////////////////

{

    // The Object to be matched
    const alex = {
        name: "Alex Merced",
        age: 36,
        website: "AlexMercedCoder.com"
    }

    // Create Matcher with patterns
    const matcher = createSingleMatcher([
      ["v[0] === 'name'", (v) => `The name is ${v[1]}`],
      ["v[0] === 'age'", (v) => `The age is ${v[1]}`],
      ["v[0] === 'website'", (v) => `The website is ${v[1]}`],
    ]);
  
    // using the matcher on an object
    const result = matchObject(alex, matcher)
    console.log(result)
    // [ [ 'The name is Alex Merced' ], [ 'The age is 36' ], [ 'The website is AlexMercedCoder.com' ] ]
  }
  //////////////////////////////////////////////////////