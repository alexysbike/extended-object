const expect = require('expect');
const extend = require('../');

describe('Properties Functions', () => {

    it('should a property has access to the filter function', () => {
        const obj = {
            bases: {
                red: [
                    {name: 'Rlex', hp: 10},
                    {name: 'Rlex1', hp: 5},
                    {name: 'Rlex2', hp: 0},
                ],
                blue: [
                    {name: 'Blex', hp: 10},
                    {name: 'Blex2', hp: 6},
                ],
                yellow: [
                    {name: 'Clex', hp: 0},
                    {name: 'Clex2', hp: 0},
                ]
            }
        };

        const extended = extend(obj);
        const deadBase = extended.bases.filter(value => 
            value.length === value.filter(soldier => soldier.hp === 0).length
        );
        expect(deadBase.red).toNotExist();
        expect(deadBase.blue).toNotExist();
        expect(deadBase.yellow).toExist();
    });
    it('should a property has access to the map function', () => {
        const obj = {
            bases: {
                red: [
                    {name: 'Rlex', hp: 10},
                    {name: 'Rlex1', hp: 5},
                    {name: 'Rlex2', hp: 0},
                ],
                blue: [
                    {name: 'Blex', hp: 10},
                    {name: 'Blex2', hp: 6},
                ],
                yellow: [
                    {name: 'Clex', hp: 0},
                    {name: 'Clex2', hp: 0},
                ]
            }
        };

        const extended = extend(obj);
        extended.normalBases = extended.bases.map(value => {
            const soldiers = {};
            value.forEach(soldier => {
                soldiers[soldier.name] = soldier.hp;
            });
            return soldiers;
        });
        expect(extended.normalBases.red.Rlex).toBe(10);
        expect(extended.normalBases.red.Rlex1).toBe(5);
        expect(extended.normalBases.red.Rlex2).toBe(0);
        expect(extended.normalBases.blue.Blex).toBe(10);
        expect(extended.normalBases.blue.Blex2).toBe(6);
        expect(extended.normalBases.yellow.Clex).toBe(0);
        expect(extended.normalBases.yellow.Clex2).toBe(0);
    });
    it('should a property has access to the forEach function', () => {
        const obj = {
            bases: {
                red: [
                    {name: 'Rlex', hp: 10},
                    {name: 'Rlex1', hp: 5},
                    {name: 'Rlex2', hp: 0},
                ],
                blue: [
                    {name: 'Blex', hp: 10},
                    {name: 'Blex2', hp: 6},
                ],
                yellow: [
                    {name: 'Clex', hp: 0},
                    {name: 'Clex2', hp: 0},
                ]
            }
        };

        const extended = extend(obj);
        extended.soldiers = {};
        extended.bases.forEach((soldiers, key) => {
            soldiers.forEach(soldier => extended.soldiers[soldier.name] = key);
        });
        expect(extended.soldiers.Rlex).toBe('red');
        expect(extended.soldiers.Rlex1).toBe('red');
        expect(extended.soldiers.Rlex2).toBe('red');
        expect(extended.soldiers.Blex).toBe('blue');
        expect(extended.soldiers.Blex2).toBe('blue');
        expect(extended.soldiers.Clex).toBe('yellow');
        expect(extended.soldiers.Clex2).toBe('yellow');
    });
    it('should a property has access to the functions', () => {
        const extended = extend({});
        expect(typeof extended.filter).toBe('function');
        expect(typeof extended.map).toBe('function');
        expect(typeof extended.forEach).toBe('function');
        expect(typeof extended.reduce).toBe('function');
        expect(typeof extended.every).toBe('function');
        expect(typeof extended.toArray).toBe('function');
    });
    it('should prevent the spread of functions in inners properties', () => {
        const extended = extend({a: {b: 1}}, false);
        expect(typeof extended.a.filter).toNotBe('function');
        expect(typeof extended.a.map).toNotBe('function');
        expect(typeof extended.a.forEach).toNotBe('function');
        expect(typeof extended.a.reduce).toNotBe('function');
        expect(typeof extended.a.every).toNotBe('function');
        expect(typeof extended.a.toArray).toNotBe('function');
    });
});
