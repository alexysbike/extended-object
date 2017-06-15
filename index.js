/**
 * extended-object v.1.1.0
 * By Alexys Gonzalez (DK)
 */
const {
    entries,
    map,
    filter,
    forEach,
    every,
    toArray,
    reduce
} = require('./lib/functions');
const extendedObject = (obj = {}, clone = false) => {
    const inner = Symbol('inner');
    const extended = function(){
        return this[inner];
    };
    extended[inner] = (clone) ? JSON.parse(JSON.stringify(obj)) : obj;
    extended.map = map;
    extended.filter = filter;
    extended.forEach = forEach;
    extended.every = every;
    extended.toArray = toArray;
    extended.reduce = reduce;
    extended.symbol = () => inner;
    const protectedProperties = [
        'map',
        'filter',
        'forEach',
        'every',
        'toArray',
        'symbol',
        'reduce',
    ];
    const proxied = new Proxy(extended, {
        get: function(target, prop, receiver) {
            if (protectedProperties.indexOf(prop) >= 0 || prop === inner){
                return target[prop];
            }
            return target[inner][prop];
        },
        set: function(target, prop, value, receiver) {
            if (protectedProperties.indexOf(prop) >= 0){
               console.error(`Cannot write ${prop}. It's a protected property`);
               return false;
            }
            target[inner][prop] = value;
            return true;
        },
        apply: function(target, thisArg, argumentsList) {
            return target[inner];
        }
    });
    return proxied;
};

module.exports = extendedObject;
