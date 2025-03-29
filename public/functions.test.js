const functions = require('./functions');

test('selection sort', () => {
    array = [1,2,3,4]
    expect(functions.swap(array,0,1)).toStrictEqual([2,1,3,4]);
})

test('shuffle array', () => {
    expect(functions.shuffle([1,2,3,4,5,6])).not.toStrictEqual([1,2,3,4,5,6]);
})

