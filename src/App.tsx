import { Bar, Line, Scatter } from "react-chartjs-2";

import { analyzeArray } from "./utils";
import { data, dollars } from "./data";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top" as const, // Corrija a posição aqui
//     },
//     title: {
//       display: true,
//       text: "Gráfico de Frequência",
//     },
//   },
//   annotation: {
//     annotations: [
//       {
//         type: "line",
//         mode: "horizontal",
//         scaleID: "y",
//         value: mean,
//         borderColor: "rgb(75, 192, 192)",
//         borderWidth: 2,
//         label: {
//           content: `Média: ${mean.toFixed(2)}`,
//           enabled: true,
//           position: "right",
//         },
//       },
//       {
//         type: "line",
//         mode: "horizontal",
//         scaleID: "y",
//         value: mode as number,
//         borderColor: "rgb(255, 205, 86)",
//         borderWidth: 2,
//         label: {
//           content: `Moda: ${mode}`,
//           enabled: true,
//           position: "right",
//         },
//       },
//       {
//         type: "line",
//         mode: "horizontal",
//         scaleID: "y",
//         value: median,
//         borderColor: "rgb(54, 162, 235)",
//         borderWidth: 2,
//         label: {
//           content: `Mediana: ${median}`,
//           enabled: true,
//           position: "right",
//         },
//       },
//     ],
//   },
// };

// console.log(mode, median, mean);

// const data = [
//   51, 51, 65, 52, 58, 58, 61, 58, 65, 65, 65, 56, 67.5, 67.5, 58, 67.5, 50, 57,
//   50, 50, 81, 81, 81, 81, 110, 110, 110, 78, 54, 54, 54, 54, 65, 84, 71, 65, 65,
//   65, 65, 66,
// ];

// const data = [
//   5.3, 8.2, 13.8, 74.1, 85.3, 88.0, 90.2, 91.5, 92.4, 92.9, 93.6, 94.3, 94.8,
//   94.9, 95.5, 95.8, 95.9, 96.6, 96.7, 98.1, 99.0, 101.4, 103.7, 106.0, 113.5,
// ];
const dados = analyzeArray(data);

// const data = {
//   labels,
//   datasets: [
//     {
//       label: "Frequência",
//       data: counts,
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//   ],
// };

console.log(dados);

const contarFrequenciaEItens = (array: number[]) => {
  const frequencia = new Map();

  array.forEach((item) => {
    frequencia.set(item, (frequencia.get(item) || 0) + 1);
  });

  const frequenciaMapeada = Object.fromEntries(frequencia);
  return Object.values(frequenciaMapeada);
};

function App() {
  return (
    <>
      <div style={{ width: "50%" }}>
        {/* <Line data={data} options={options} /> */}
        <Bar
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
          data={{
            labels: ["jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
            datasets: [
              {
                label: "My First Dataset",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
      <div style={{ width: "50%" }}>
        <Line
          data={{
            labels: ["jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
            datasets: [
              {
                label: "My First Dataset",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          }}
        />
      </div>

      <div style={{ width: "50%" }}>
        <Scatter
          data={{
            labels: dados.rangeCounts.map(({ classe }) => classe),
            datasets: [
              {
                type: "bar",
                label: "Bar Dataset",
                data: dados.rangeCounts.map(({ fi }) => fi),
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 1,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
              },
              {
                type: "bar",
                label: "Bar Dataset",
                data: [dados.media, dados.moda, dados.mediana],
                borderColor: "rgb(176, 219, 21)",
                borderWidth: 1,
                backgroundColor: "rgba(123, 145, 0, 0.2)",
              },
              {
                type: "line",
                tension: 0.1,
                label: "Line Dataset",
                data: dados.rangeCounts.map(({ fi }) => fi),
                fill: false,
                borderColor: "rgb(54, 162, 235)",
              },
            ],
          }}
          options={{
            scales: {
              // x: {
              //   beginAtZero: true,
              // },
              // xAxes: {
              //   beginAtZero: true,
              // },
              y: {
                min: 0,
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
