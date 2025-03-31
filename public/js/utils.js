export function swap(array, i, k) {
    const temp = array[i];
    array[i] = array[k];
    array[k] = temp;
    return array;
}

export function shuffle(array) {
    for(let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export async function fetchJSON(filepath) {
    const response = await fetch(filepath);
    const data = await response.json();
    return data;
}

export function randomNumberArray(newArray) {
    let number = Math.round(Math.random() * 150);
    return newArray[number];
}