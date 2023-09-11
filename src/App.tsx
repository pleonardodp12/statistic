import { Bar, Line, Scatter } from "react-chartjs-2";

import { analyzeArray } from "./utils";
import { data } from "./data";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const dados = analyzeArray(data);

console.log(dados);

const findMFromClasses = () => {};

function App() {
  return (
    <>
      <div style={{ width: "50%" }}>
        <Scatter
          data={{
            labels: dados.rangeCounts.map(({ classe }) => classe),
            datasets: [
              // {
              //   type: "bar",
              //   label: "Bar Dataset",
              //   data: dados.rangeCounts.map(({ fi }) => fi),
              //   borderColor: "rgb(255, 99, 132)",
              //   borderWidth: 1,
              //   backgroundColor: "rgba(255, 99, 132, 0.2)",
              // },
              // {
              //   type: "line",
              //   label: "Bar Dataset",
              //   data: [dados.media, dados.moda, dados.mediana],
              //   borderColor: "rgb(176, 219, 21)",
              //   borderWidth: 1,
              //   backgroundColor: "rgba(123, 145, 0, 0.2)",
              // },
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
            responsive: true,
            scales: {
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
