function createMatcher(patterns) {
  return (v) => {
    let result = [];
    patterns.forEach(([pattern, callback], index) => {
      if (eval(`Boolean(${pattern})`)) {
        result.push(callback(v));
      }
    });
    return result;
  };
}

function createSingleMatcher(patterns) {
  return (v) => {
    let result = [];
    patterns.every(([pattern, callback], index) => {
      if (eval(`Boolean(${pattern})`)) {
        result.push(callback(v));
        return false;
      } else {
        return true;
      }
    });
    return result;
  };
}

function matchObject(obj, matcher) {
  return Object.entries(obj).map((kv) => matcher(kv));
}

function matchArray(arr, matcher) {
  return arr.map((kv) => matcher(kv));
}

module.exports = {
  createMatcher,
  createSingleMatcher,
  matchObject,
  matchArray,
};
