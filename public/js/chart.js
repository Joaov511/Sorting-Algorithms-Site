export function initChart(array) {
    const canvas = document.getElementById("chart");
    const backgroundColors = ['rgba(0, 140, 200, 0.8)','rgba(224, 34, 49, 0.8)']
    const config  = {
        type: "bar",
        options: {
            maintainAspectRatio: true
        },
        data : {
            labels : array,
            datasets : [{label: "Numbers", data : array, backgroundColor : [backgroundColors[0]]}]
        }
    };
    let chart = new Chart(canvas, config);
    return chart;
}

export function changeChartColumnColor(chart,position, color) {
    chart.data.datasets[0].backgroundColor[position] = color;
}
