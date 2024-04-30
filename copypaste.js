var colorPalette = [];
// Mavi tonları
for (var i = 0; i <= 81; i++) {
    if (i % 10 === 1) {
        colorPalette.push("#" + i.toString().padStart(2, "0") + "00FF");
    }
    // Yeşil tonları
    else if (i % 10 === 2) {
        colorPalette.push("#00" + i.toString().padStart(2, "0") + "00");
    }
    // Mor tonları
    else if (i % 10 === 3) {
        colorPalette.push("#" + i.toString().padStart(2, "0") + "00" + i.toString().padStart(2, "0"));
    }
    // Kırmızı tonları
    else if (i % 10 === 4) {
        colorPalette.push("#FF" + i.toString().padStart(2, "0") + "00");
    }
    // Cyan tonları
    else if (i % 10 === 5) {
        colorPalette.push("#00FF" + i.toString().padStart(2, "0"));
    }
    // Turuncu tonları
    else if (i % 10 === 6) {
        colorPalette.push("#FFA5" + i.toString().padStart(2, "0"));
    }
    // Sarı tonları
    else if (i % 10 === 7) {
        colorPalette.push("#FFFF" + i.toString().padStart(2, "0"));
    }
    // Pembe tonları
    else if (i % 10 === 8) {
        colorPalette.push("#FF00" + i.toString().padStart(2, "0"));
    }
    // Siyah tonları
    else if (i % 10 === 9) {
        colorPalette.push("#" + i.toString().padStart(2, "0") + i.toString().padStart(2, "0") + i.toString().padStart(2, "0"));
    }
}

var chartInstance;

function createChart(data) {
    var uniqueCabNames = [...new Set(data.map(item => item.CabName))];
    var uniqueCellNames = [...new Set(data.map(item => item.CellName))];

    var datasets = [];
    uniqueCellNames.forEach(cellName => {
        var totalUsersData = [];
        uniqueCabNames.forEach(cabName => {
            var filteredData = data.filter(item => item.CellName === cellName && item.CabName === cabName);
            var totalUsers = filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + item.TotalUsers, 0) : 0;
            totalUsersData.push(totalUsers);
        });

        datasets.push({
            label: cellName,
            data: totalUsersData,
            backgroundColor: ""
        });
    });

    var ctx = document.getElementById("cellUser").getContext("2d");

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: uniqueCabNames.map(String),
            datasets: datasets.map(function(dataset, index) {
                var colorIndex = index % colorPalette.length;
                dataset.backgroundColor = colorPalette[colorIndex];
                return dataset;
            })
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: false,
                    text: "User Chart"
                },
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'x',
                    },
                    pan: {
                        enabled: true,
                        mode: 'x',
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: false,
                        text: "CabName"
                    }
                },
                y: {
                    stacked: true,
                    title: {
                        display: false,
                        text: "TotalUsers"
                    }
                }
            },        
            responsive: true, // Grafiği responsive hale getirir
            maintainAspectRatio: false // En boy oranını koruma
        }
    });
}

function updateChart() {
    $.ajax({
        type: "GET",
        url: "/eventgrafikcell/" + event_id,
        data: {
            id: event_id,
            _token: csrf
        },
        success: function(response) {
            createChart(response);
        }
    });
}

$(document).ready(function() {
    updateChart();
    setInterval(updateChart, setIntervalMinute);
});
