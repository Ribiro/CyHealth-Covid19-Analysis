export const planetChartData = {
    type: "line",
    data: {
      labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
      datasets: [
        {
          label: "Cases",
          type: "line",
          data: [4, 8, 15, 12, 11, 18, 6, 14],
          backgroundColor: "rgba(54,73,93,.5)",
          borderColor: "yellow",
          borderWidth: 3
        },
        {
          label: "Deaths",
          type: "line",
          data: [1, 2, 3, 4, 5, 8, 2, 6],
          backgroundColor: "light-red",
          borderColor: "red",
          borderWidth: 3
        },
        {
            label: "Tests",
            type: "bar",
            data: [10, 20, 30, 30, 23, 40, 12, 59],
            backgroundColor: "rgba(71, 183,132,.5)",
            borderColor: "green",
            borderWidth: 3
          }
      ]
    },
    options: {
      responsive: true,
      lineTension: 1,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              padding: 25
            }
          }
        ]
      }
    }
  };
  
  export default planetChartData;