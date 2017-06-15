const expect = require('expect');
const extendedObject = require('../');
it('should extends an object and add values to arrays with map function', () => {
    const data = {
        a: [ 'abc', 'y' ],
        b: [ 'z' ],
        c: 'NOP',
        d: 'que raro',
        refer: 'refer'
    };
    const obj = extendedObject(data);
    const mapped = obj.map(value => (value instanceof Array) ? ['new', ...value] : ['new', value]);
    expect(mapped.a.length).toBe(3);
    expect(mapped.b.length).toBe(2);
    expect(mapped.c.length).toBe(2);
    expect(mapped.d.length).toBe(2);
    expect(mapped.refer.length).toBe(2);
});
it('should extend an object and fill an array with all the values with forEach', () => {
    const data = {
        a: [ 'abc', 'y' ],
        b: [ 'z' ],
        c: 'NOP',
        d: 'que raro',
        refer: 'refer'
    };
    const obj = extendedObject(data);
    const array = [];
    obj.forEach(value => (value instanceof Array) ? array.push(...value) : array.push(value));
    expect(array.length).toBe(6);
});
it('should extend an object and get only Arrays using using filter function', () => {
    const data = {
        a: [ 'abc', 'y' ],
        b: [ 'z' ],
        c: 'NOP',
        d: 'que raro',
        refer: 'refer'
    };
    const obj = extendedObject(data);
    const onlyArray = obj.filter(value => (value instanceof Array));
    expect(onlyArray.a).toExist();
    expect(onlyArray.b).toExist();
    expect(onlyArray.c).toNotExist();
    expect(onlyArray.d).toNotExist();
    expect(onlyArray.refer).toNotExist();
});
it('should extend an object and check if all the keys are Arrays with every function', () => {
    const data = {
        a: [ 'abc', 'y' ],
        b: [ 'z' ],
        c: 'NOP',
        d: 'que raro',
        refer: 'refer'
    };
    const obj = extendedObject(data);
    const notOnlyArray = obj.every(value => (value instanceof Array));
    expect(notOnlyArray).toBe(false);
    const data2 = {
        a: [ 'abc', 'y' ],
        b: [ 'z' ],
    };
    const obj2 = extendedObject(data);
    const onlyArray = obj2.every(value => (value instanceof Array));
    expect(onlyArray).toBe(false);
});
it('should extend an object and convert it to array using toArray function', () => {
    const data = {
        a: [ 'abc', 'y' ],
        b: [ 'z' ],
        c: 'NOP',
        d: 'que raro',
        refer: 'refer'
    };
    const obj = extendedObject(data);
    const array = obj.toArray();
    expect(array instanceof Array).toBe(true);
});
it('should catch overwrite of protected properties', () => {
    const data = {
        a: [ 'abc', 'y' ],
        b: [ 'z' ],
        c: 'NOP',
        d: 'que raro',
        refer: 'refer'
    };
    const obj = extendedObject(data);
    obj.map = 'overwrite';
    expect(typeof obj.map).toBe('function');
});
it('should extend an object and use reduce', () => {
    const data = {
        a: [ 'abc', 'y' ],
        b: [ 'z' ],
        c: 'NOP',
        d: 'que raro',
        refer: 'refer'
    };
    const obj = extendedObject(data);

    const anotherObj = obj.reduce((acc, value) => {
        if(value instanceof Array){
            acc.arrays.push(value);
        }else{
            acc.others.push(value);
        }
        return acc;
    }, {arrays: [], others: []});
    expect(anotherObj.arrays.length).toBe(2);
    expect(anotherObj.others.length).toBe(3);
});