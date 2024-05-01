  chartInstance = new Chart(ctx, {
    type: "horizontalBar", // Grafiği yatay yap
    data: {
      labels: uniqueCabNames.map(String),
      datasets: datasets
    },
    options: {
      responsive: true,
      plugins: {
        // plugins içeriği...
      },
      scales: {
        y: { // Yatay grafikte y ekseni
          stacked: true,
          title: {
            display: false,
            text: "CabName"
          }
        },
        x: { // Yatay grafikte x ekseni
          stacked: true,
          title: {
            display: false,
            text: "TotalUsers"
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
