// Başlangıç renkleri ve ton farkları
var baseColors = {
    '1': '#1f77b4', // Mavi
    '2': '#d62728', // Kırmızı
    '3': '#2ca02c', // Yeşil
    // İhtiyaç duyulan diğer bitiş rakamları için de başlangıç renklerini ekleyebilirsiniz.
};
var toneDiff = 40; // Renk tonu farkı (0-255 arasında olmalı)

// Renk paletini dinamik olarak oluştur
function createColorPalette(cellName) {
    var lastDigit = cellName.toString().slice(-1); // CellName'in son rakamını al
    var baseColor = baseColors[lastDigit] || '#000000'; // Belirli bir bitiş rakamı için başlangıç rengini al, yoksa siyah kullan

    // Renk tonlarını oluştur
    var colorPalette = [];
    for (var i = 0; i < 10; i++) { // 10 farklı ton
        var tone = i * toneDiff;
        colorPalette.push(shadeColor(baseColor, tone));
    }
    return colorPalette;
}

// Renk tonunu oluşturmak için yardımcı fonksiyon
function shadeColor(color, percent) {
    var f = parseInt(color.slice(1), 16),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = f >> 16,
        G = f >> 8 & 0x00FF,
        B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
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
            backgroundColor: createColorPalette(cellName)
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
            datasets: datasets
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
