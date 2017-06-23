/**
 * extended-object v.1.2.2
 * By Alexys Gonzalez (DK)
 */
const functions = require('./lib/functions');
const {entries} = require('./lib/utils');

const isObject = (obj = null) => {
    if (obj !== null && obj.constructor === {}.constructor) {
        return true;
    }
    return false;
};

const spreader = obj => {
    for (let [key, value] of entries(obj)){
        if(isObject(value)){
            obj[key] = extendedObject(value);
        }
    }
};

const extendedObject = (obj = {}, spread = false, clone = false) => {
    const inner = Symbol('inner');
    const extended = function(){
        return this[inner];
    };
    extended[inner] = (clone) ? JSON.parse(JSON.stringify(obj)) : obj;
    Object.assign(extended, functions);
    if(spread){
        spreader(extended[inner]);
    }
    extended.symbol = () => inner;
    const protectedProperties = [...Object.keys(functions), 'symbol'];
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
