// Variables needed to initiate
let numbers = [370, 20, 71, 115, 249, 775, 687, 966, 583, 161, 202, 977, 426, 800, 262, 591, 580, 217, 229, 279, 61, 520, 825, 774, 552, 983, 427, 241, 385, 347, 83, 978, 114, 269, 781, 269, 658, 806, 192, 577, 354, 920, 102, 166, 240, 237, 677, 769, 347, 303, 587, 398, 246, 32, 455, 458, 683, 858, 792, 940, 767, 996, 663, 172, 649, 481, 995, 51, 644, 747, 136, 45, 346, 811, 578, 426, 894, 256, 631, 56, 134, 247, 269, 725, 200, 626, 134, 93, 647, 955, 170, 88, 955, 375, 515, 411, 312, 838, 447, 570, 154, 775, 715, 802, 572, 849, 489, 599, 577, 888, 267, 143, 426, 982, 918, 509, 771, 953, 23, 334, 696, 327, 293, 47, 172, 845, 423, 296, 505, 430, 396, 23, 684, 695, 64, 625, 767, 328, 293, 677, 19, 438, 125, 116, 806, 759, 99, 721, 183, 2];
let max = 90;
let newArray = numbers.slice(0,max);
let isSortingRunning = false;

// HTML elements
const canvas = document.getElementById("chart");
const sortBtn = document.getElementById('sortBtn');
const numberOfMoves = document.getElementById('moves');
const sortType = document.getElementById('sortType');
const shuffleBtn = document.getElementById('shuffleArray');
const rangeInput = document.getElementById('rangeInput');
const rangeValue = document.getElementById('rangeValue');
const themeSwitch = document.getElementById("themeSwitch");
const header = document.getElementById("header");
const headerItems = document.getElementsByClassName("navItems");


//Chart
const backgroundColors = ['rgba(0, 140, 200, 0.8)','rgba(224, 34, 49, 0.8)']
const config  = {
    type: "bar",
    options: {
        maintainAspectRatio: true
    },
    data : {
        labels :newArray,
        datasets : [{label: "Numbers", data : newArray, backgroundColor : [backgroundColors[0]]}]
    }
};
let chart = new Chart(canvas, config);

// Sorting and its methods
sortBtn.addEventListener('click',function() {
    switch(sortType.value){
        case "Bubble Sort":
            bubbleSort();
        break;
        case "Selection Sort": 
            selectionSort();
        break;
        
    }
});

function swap(array, i, k) {
    const temp = array[i];
    array[i] = array[k];
    array[k] = temp;
}

async function bubbleSort() {
    if(isSortingRunning) return;
    
    isSortingRunning = true;
    let swaps = 0;
    
    for(let i = 0; i < newArray.length - 1; i++) {
        for(let k = 0; k < newArray.length - i - 1; k++) {
                if(newArray[k] > newArray[k + 1]) {
                    swap(newArray, k, k + 1);
                    
                    chart.data.datasets[0].backgroundColor[k] = 'rgba(255, 0, 0, 1)';
                    chart.data.datasets[0].backgroundColor[k + 1] = 'rgba(255, 0, 0, 1)';
                    chart.update();
                    
                    await new Promise(resolve => setTimeout(resolve, 150));
                    
                    chart.data.datasets[0].backgroundColor[k] = 'rgba(54, 162, 235, 0.8)';
                    chart.data.datasets[0].backgroundColor[k + 1] = 'rgba(54, 162, 235, 0.8)';
                    
                    numberOfMoves.innerHTML = `Number of swaps : ${swaps}`;
                    swaps++;
                    chart.update();
                }
            
        }
    }
    isSortingRunning = false;

    
}

async function selectionSort() {
    if(isSortingRunning) return;
    
    isSortingRunning = true;
    let swaps = 0;
    let temp = 0;
    
    for(let i = 0; i < newArray.length - 1; i++) {
        for(let k = i + 1; k < newArray.length ; k++) {
                if(newArray[k] < newArray[i]) {
                    temp = newArray[i];
                    swap(newArray, k, i);
                    
                    chart.data.datasets[0].backgroundColor[k] = 'rgba(255, 0, 0, 1)';
                    chart.data.datasets[0].backgroundColor[temp] = 'rgba(255, 0, 0, 1)';
                    chart.update();
                    
                    await new Promise(resolve => setTimeout(resolve, 150));
                    
                    chart.data.datasets[0].backgroundColor[k] = 'rgba(54, 162, 235, 0.8)';
                    chart.data.datasets[0].backgroundColor[temp] = 'rgba(54, 162, 235, 0.8)';
                    
                    numberOfMoves.innerHTML = `Number of swaps : ${swaps}`;
                    swaps++;
                    chart.update();
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
    chart.data.datasets[0].data.backgroundColor = 'rgba(54, 162, 235, 0.8)';
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


// Dark and light mode

window.onload = function() {
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDarkMode = true;
        btnDarkMode(shuffleBtn);
        btnDarkMode(sortBtn);
    }
    else {
        isDarkMode = false;

    }
}


function resetAnimation(element) {
    element.style.animation = "none";
    void element.offsetWidth;
}


themeSwitch.addEventListener('click', function() {
        switch(isDarkMode) {
            case false : {
                document.body.style.backgroundColor = "var(--darkModeBlack)";
                document.body.style.color = "var(--darkModeText)";
    
                sortType.style.color = "rgb(236, 229, 229)";
                sortType.style.backgroundColor = "rgb(59,59,59)";

                sortBtn.style.boxShadow = "1px 3px 18px #3a44d3";
                shuffleBtn.style.boxShadow = "1px 3px 18px #3a44d3";
                

                header.style.backgroundColor = "rgb(24,26,27)";
                for(let i = 0; i < headerItems.length; i++) {
                    headerItems[i].style.color = "rgb(236, 229, 229)";
                }
                
                resetAnimation(themeSwitch);
                themeSwitch.style.animation = "switchThemeAnim 0.9s linear";
                themeSwitch.src = "light-mode.png";
                isDarkMode = true;
            }
            break;
            case true : {
                document.body.style.backgroundColor = "white";
                document.body.style.color = "black";
    
                sortType.style.color = "black";
                sortType.style.backgroundColor = "white";

                sortBtn.style.boxShadow = "3px 3px 4px #979696";
                shuffleBtn.style.boxShadow = "3px 3px 4px #979696";

                rangeInput.style.background = 'rgb(163, 161, 161)';

                header.style.backgroundColor = "white";
                for(let i = 0; i < headerItems.length; i++) {
                    headerItems[i].style.color = "black";
                }

                resetAnimation(themeSwitch);
                themeSwitch.style.animation = "switchThemeAnim 0.9s linear";
                themeSwitch.src = "dark-mode.svg";
                isDarkMode = false;
            }
        }
    
})

function btnDarkMode(buttonName) {
    buttonName.style.backgroundColor = '#2B39F0';
    buttonName.style.color = 'white';
    buttonName.style.border = '1px solid #2B39F0';
    buttonName.style.boxShadow = "1px 3px 18px #3a44d3";

}







    



