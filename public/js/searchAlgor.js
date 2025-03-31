import { initChart } from './chart.js';
import { fetchJSON } from './utils.js';
import { randomNumberArray } from './utils.js';

let array = await fetchJSON('../array.json');
let newArray = array.sortedNumbers;
const chart = initChart(newArray);
let searchNumber = randomNumberArray(newArray);
const secondaryColor = "rgba(255, 0, 0, 1)";
const defaultColor = "rgba(54, 162, 235, 0.8)";

const searchBtn = document.getElementById("searchBtn");
const targetPosition = document.getElementById("position"); 
const targetNumber = document.getElementById("targetNumber");
const targetNumberLabel = document.getElementById("targetNumberLabel");

// Target number for search
targetNumberLabel.innerHTML = `Selected target number for search : `;
targetNumber.value = searchNumber;

searchBtn.addEventListener("click",function() {
    linearSearch(newArray,searchNumber);    
});

async function chartColorChange(position1,position2,position3) {
    if(position3 === 'undefined') {
/*      chart.data.datasets[0].backgroundColor[position1] = secondaryColor;
        chart.data.datasets[0].backgroundColor[position2] = secondaryColor; */
        changeChartColumnColor(chart,position1,secondaryColor);
        changeChartColumnColor(chart,position2,secondaryColor);
        chart.update();
        await new Promise(resolve => setTimeout(resolve, 400));
/*      chart.data.datasets[0].backgroundColor[position1] = defaultColor;
        chart.data.datasets[0].backgroundColor[position2] = defaultColor; */
        changeChartColumnColor(chart,position1,defaultColor);
        changeChartColumnColor(chart,position2,defaultColor);
    }
    else {
/*      chart.data.datasets[0].backgroundColor[position1] = secondaryColor;
        chart.data.datasets[0].backgroundColor[position2] = secondaryColor;
        chart.data.datasets[0].backgroundColor[position3] = secondaryColor; */
        changeChartColumnColor(chart,position1,secondaryColor)
        changeChartColumnColor(chart,position2,secondaryColor)
        changeChartColumnColor(chart,position3,secondaryColor)
        chart.update();
        await new Promise(resolve => setTimeout(resolve, 400));
/*      chart.data.datasets[0].backgroundColor[position1] = defaultColor;
        chart.data.datasets[0].backgroundColor[position2] = defaultColor;
        chart.data.datasets[0].backgroundColor[position3] = defaultColor; */
        changeChartColumnColor(chart,position1,defaultColor);
        changeChartColumnColor(chart,position2,defaultColor);
        changeChartColumnColor(chart,position3,defaultColor);
    }
}

async function binarySearch(arr, x) {
    let l = 0;
    let r = arr.length - 1;
    let mid;
    
    while (r >= l) {
        mid = l + Math.floor((r - l) / 2);
        targetPosition.innerHTML = `Position of the target number on the Array: ${mid + 1}`;
        chart.update();
        await chartColorChange(l,mid,r);
        
        if (arr[mid] == x) {
            targetPosition.innerHTML = `Position of the target number on the Array: ${mid + 1}`;
        }
        else if (arr[mid] > x) {
            r = mid - 1;
        }
        else {
            l = mid + 1;
        }
    }
}

async function linearSearch(arr,x) {
    for(let i = 0; i < arr.length; i++) {
        chart.data.datasets[0].backgroundColor[i] = secondaryColor;
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
