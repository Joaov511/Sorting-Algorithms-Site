function swap(array, i, k) {
    const temp = array[i];
    array[i] = array[k];
    array[k] = temp;
    return array;
}

function shuffle(array) {
    for(let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

module.exports.swap = swap;
module.exports.shuffle = shuffle;
