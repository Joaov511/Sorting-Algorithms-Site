import { fetchJSON } from './fetchJSON.js';
import { initChart } from './chart.js';

let array = await fetchJSON('../array.json');
let newArray = array.sortedNumbers;
const chart = initChart(newArray);
let searchNumber = randomNumberArray(newArray);

const searchBtn = document.getElementById("searchBtn");
const targetPosition = document.getElementById("position"); 
const targetNumber = document.getElementById("targetNumber");
const targetNumberLabel = document.getElementById("targetNumberLabel");

// Target number for search
targetNumberLabel.innerHTML = `Selected target number for search : `;
targetNumber.value = searchNumber;
function randomNumberArray(array) {
    let number = Math.round(Math.random() * 150);
    return newArray[number];
}

searchBtn.addEventListener("click",function() {
    linearSearch(newArray,searchNumber);    
});

async function chartColorChange(position1,position2,position3) {
    const redColor = "rgba(255, 0, 0, 1)";
    const defaultColor = "rgba(54, 162, 235, 0.8)";
    
    if(position3 === 'undefined') {
        chart.data.datasets[0].backgroundColor[position1] = redColor;
        chart.data.datasets[0].backgroundColor[position2] = redColor;
        chart.update();
        await new Promise(resolve => setTimeout(resolve, 400));
        chart.data.datasets[0].backgroundColor[position1] = defaultColor;
        chart.data.datasets[0].backgroundColor[position2] = defaultColor;
    }
    else {
        chart.data.datasets[0].backgroundColor[position1] = redColor;
        chart.data.datasets[0].backgroundColor[position2] = redColor;
        chart.data.datasets[0].backgroundColor[position3] = redColor;
        chart.update();
        await new Promise(resolve => setTimeout(resolve, 400));
        chart.data.datasets[0].backgroundColor[position1] = defaultColor;
        chart.data.datasets[0].backgroundColor[position2] = defaultColor;
        chart.data.datasets[0].backgroundColor[position3] = defaultColor;
    }
}

async function binarySearch(arr, x) {
    let l = 0;
    let r = arr.length - 1;
    let mid;
    const redColor = "rgba(255, 0, 0, 1)";
    const defaultColor = "rgba(54, 162, 235, 0.8)";
    
    while (r >= l) {
        mid = l + Math.floor((r - l) / 2);
        targetPosition.innerHTML = `Position of the target number on the Array: ${mid + 1}`;
        chart.update();
        await chartColorChange(l,mid,r);
        
        if (arr[mid] == x) {
            targetPosition.innerHTML = `Position of the target number on the Array: ${mid + 1}`;
        }
        if (arr[mid] > x) {
            r = mid - 1;
        }
        else {
            l = mid + 1;
        }
        
    }
}

async function linearSearch(arr,x) {
    const redColor = "rgba(255, 0, 0, 1)";
    const defaultColor = "rgba(54, 162, 235, 0.8)";
    for(let i = 0; i < arr.length; i++) {
        chart.data.datasets[0].backgroundColor[i] = redColor;
        chart.update();
        await new Promise(resolve => setTimeout(resolve, 50));
        if(arr[i] == x){
            targetPosition.innerHTML = `Position of the target number on the Array: ${i}`;
        }
        else {
            chart.data.datasets[0].backgroundColor[i] = defaultColor;
            chart.update();
        }
    }
}
