let numbers = [2, 19, 20, 23, 23, 32, 45, 47, 51, 56, 61, 64, 71, 83, 88, 93, 99, 102, 114, 115, 116, 125, 134, 134, 136, 143, 154, 161, 166, 170, 172, 172, 183, 192, 200, 202, 217, 229, 237, 240, 241, 246, 247, 249, 256, 262, 267, 269, 269, 269, 279, 293, 293, 296, 303, 312, 327, 328, 334, 346, 347, 347, 354, 370, 375, 385, 396, 398, 411, 423, 426, 426, 426, 427, 430, 438, 447, 455, 458, 481, 489, 505, 509, 515, 520, 552, 570, 572, 577, 577, 578, 580, 583, 587, 591, 599, 625, 626, 631, 644, 647, 649, 658, 663, 677, 677, 683, 684, 687, 695, 696, 715, 721, 725, 747, 759, 767, 767, 769, 771, 774, 775, 775, 781, 792, 800, 802, 806, 806, 811, 825, 838, 845, 849, 858, 888, 894, 918, 920, 940, 953, 955, 955, 966, 977, 978, 982, 983, 995, 996];
let max = 90;
let newArray = numbers;
//let newArray = numbers.slice(0,max);

const canvas = document.getElementById("chart");
const searchBtn = document.getElementById("searchBtn");
const targetPosition = document.getElementById("position"); 
const themeSwitch = document.getElementById("themeSwitch");
const header = document.getElementById("header");
const headerItems = document.getElementsByClassName("navItems");

searchBtn.addEventListener("click",function() {
    binarySearch(newArray,370);
})


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

async function binarySearch(arr, x) {
    let l = 0;
    let r = arr.length - 1;
    let mid;
    const redColor = "rgba(255, 0, 0, 1)";
    const defaultColor = "rgba(54, 162, 235, 0.8)";
    
    while (r >= l) {
        mid = l + Math.floor((r - l) / 2);
        chart.data.datasets[0].backgroundColor[l] = redColor;
        chart.data.datasets[0].backgroundColor[r] = redColor;
        chart.data.datasets[0].backgroundColor[mid] = redColor;
        chart.update();
        
        await new Promise(resolve => setTimeout(resolve, 400));

        chart.data.datasets[0].backgroundColor[l] = defaultColor;
        chart.data.datasets[0].backgroundColor[r] = defaultColor;
        chart.data.datasets[0].backgroundColor[mid] = defaultColor;
        targetPosition.innerHTML = `Position of the target number on the Array: ${mid + 1}`;
        chart.update();
        
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

//Dark and light mode toggle
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode = true;
}
else {
    isDarkMode = false;
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