const {entries} = require('./utils');

const map = function(mapper) {
    const returnValue = {};
    const obj = this();
    for (let [key, value] of entries(obj)){
        returnValue[key] = mapper(value, key, obj);
    }
    return returnValue;
};

const filter = function(evaluator) {
    const returnValue = {};
    const obj = this();
    for (let [key, value] of entries(obj)){
        if (evaluator(value, key, obj)){
            returnValue[key] = value;
        }
    }
    return returnValue;
};

const forEach = function(action) {
    const obj = this();
    for (let [key, value] of entries(obj)){
        action(value, key, obj);
    }
};

const every = function(evaluator) {
    const obj = this();
    for (let [key, value] of entries(obj)){
        if (!evaluator(value, key, obj)){
            return false;
        }
    }
    return true;
};
const toArray = function () {
    const returnValue = [];
    const obj = this();
    for (let [key, value] of entries(obj)){
        returnValue.push(value);
    }
    return returnValue;
}

const reduce = function(action, initialValue) {
    let returnValue = initialValue;
    const obj = this();
    for (let [key, value] of entries(obj)){
        returnValue = action(returnValue, value, key, obj);
    }
    return returnValue;
};
const find = function(evaluator) {
    const obj = this();
    for (let [key, value] of entries(obj)){
        if (evaluator(value, key, obj)){
            return value;
        }
    }
    return undefined;
};
module.exports = {
    entries,
    map,
    filter,
    forEach,
    every,
    toArray,
    reduce,
    find
};