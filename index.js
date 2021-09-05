function createMatcher(patterns, ex = {}) {
  try {
    return (v) => {
      let result = [];
      patterns.forEach(([pattern, callback], index) => {
        if ((Function("v", "ex",`return Boolean(${pattern})`))(v, ex)) {
          result.push(callback(v));
        }
      });
      return result;
    };
  } catch (err) {
    console.error(err);
  }
}

function createSingleMatcher(patterns, ex = {}) {
  try {
    return (v) => {
      let result = [];
      patterns.every(([pattern, callback], index) => {
        if ((Function("v", "ex",`return Boolean(${pattern})`))(v, ex)) {
          result.push(callback(v));
          return false;
        } else {
          return true;
        }
      });
      return result;
    };
  } catch (err) {
    console.error(err);
  }
}

function matchObject(obj, matcher) {
  try {
    return Object.entries(obj).map((kv) => matcher(kv));
  } catch (err) {
    console.error(err);
  }
}

function matchArray(arr, matcher) {
  try {
    return arr.map((kv) => matcher(kv));
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createMatcher,
  createSingleMatcher,
  matchObject,
  matchArray,
};
