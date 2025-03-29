let array;
await fetch("../array.json").then((res) => res.json())
.then((data) => {
    array = data;
})
import { initChart } from './chart.js';
let numbers = array.numbers;
let max = 90;
let newArray = numbers.slice(0,max);
let isSortingRunning = false;
const chart = initChart(newArray);

const sortBtn = document.getElementById('sortBtn');
const numberOfMoves = document.getElementById('moves');
const sortType = document.getElementById('sortType');
const shuffleBtn = document.getElementById('shuffleArray');
const rangeInput = document.getElementById('rangeInput');
const rangeValue = document.getElementById('rangeValue');
const bubbleSortText = document.getElementById('bubbleSort');
const selectionSortText = document.getElementById('selectionSort');
const moreAboutElements = document.getElementsByClassName('moreAbout');

// Sorting and its methods
sortBtn.addEventListener('click',function() {
    switch(sortType.value){
        case "Bubble Sort":
            bubbleSort();
        break;
        case "Selection Sort": 
            selectionSort(newArray);
        break;
    }
});

function swap(array, i, k) {
    const temp = array[i];
    array[i] = array[k];
    array[k] = temp;
    return array;
}

async function colorChangingChart(position1,position2) {
    chart.data.datasets[0].backgroundColor[position1] = 'rgba(255, 0, 0, 1)';
    chart.data.datasets[0].backgroundColor[position2] = 'rgba(255, 0, 0, 1)';
    chart.update();
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    chart.data.datasets[0].backgroundColor[position1] = 'rgba(54, 162, 235, 0.8)';
    chart.data.datasets[0].backgroundColor[position2] = 'rgba(54, 162, 235, 0.8)';
    
    chart.update();
}

async function bubbleSort() {
    if(isSortingRunning) return;
    
    isSortingRunning = true;
    let swaps = 0;
    
    for(let i = 0; i < newArray.length - 1; i++) {
        for(let k = 0; k < newArray.length - i - 1; k++) {
                if(newArray[k] > newArray[k + 1]) {
                    swap(newArray, k, k + 1);
                    await colorChangingChart(k,k+1);
                    numberOfMoves.innerHTML = `Number of swaps : ${swaps}`;
                    swaps++;
                    chart.update();
                }
        }
    }
    isSortingRunning = false;
}

async function selectionSort(array) {
    if(isSortingRunning) return;
    
    isSortingRunning = true;
    let swaps = 0;
    let temp = 0;
    
    for(let i = 0; i < array.length - 1; i++) {
        for(let k = i + 1; k < array.length ; k++) {
                if(array[k] < array[i]) {
                    temp = array[i];
                    swap(array, k, i);
                    await colorChangingChart(k,temp);
                    numberOfMoves.innerHTML = `Number of swaps : ${swaps}`;
                    swaps++;
                }
        }
    }
    isSortingRunning = false;
}


// Input type range
rangeValue.textContent = rangeInput.value;

rangeInput.addEventListener('input' , function()  {
    rangeValue.textContent = rangeInput.value;
    max = parseInt(rangeInput.value);
    
    newArray = numbers.slice(0,max);
    chart.data.datasets[0].data = newArray;
    chart.data.labels = newArray;
    chart.data.datasets[0].data.backgroundColor = '#343A40';
    chart.update();
})


// Shuffle 
function shuffle(array) {
    for(let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

shuffleBtn.addEventListener('click', function() {
    shuffle(newArray);
    chart.update();
});

//Sort Type
function moreAboutAnimation(sortAlgorithm) {
    sortAlgorithm.style.animation = 'moreAboutfadeIn 0.5s linear';
}

function checkSortType() {
    switch(sortType.value){
        case "Bubble Sort":
            selectionSortText.style.display = "none";
            moreAboutAnimation(bubbleSortText);
            bubbleSortText.style.display = 'flex';
        break;
        case "Selection Sort":
            bubbleSortText.style.display = 'none';
            moreAboutAnimation(selectionSortText);
            selectionSortText.style.display = "flex";
        break;
    }
}
sortType.addEventListener('change', checkSortType);



