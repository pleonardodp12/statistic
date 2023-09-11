import { Bar, Line, Scatter } from "react-chartjs-2";

import { analyzeArray } from "./utils";
import { data } from "./data";
import { Chart, registerables } from "chart.js";
import "./style.css";
Chart.register(...registerables);

const dados = analyzeArray(data);

console.log(dados);

const findMFromClasses = () => {};

function App() {
  return (
    <>
      <h2>Tabela de classes</h2>

      <table className="rtable">
        <thead>
          <tr>
            <th>Classe</th>
            <th>Fi</th>
            <th>Xi</th>
            <th>Fac</th>
            <th>XiFi</th>
            <th>Xi²Fi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Chrome</td>
            <td>9,562</td>
            <td>68.81%</td>
            <td>7,895</td>
            <td>01:07</td>
          </tr>
          <tr>
            <td>Firefox</td>
            <td>2,403</td>
            <td>17.29%</td>
            <td>2,046</td>
            <td>00:59</td>
          </tr>
          <tr>
            <td>Safari</td>
            <td>1,089</td>
            <td>2.63%</td>
            <td>904</td>
            <td>00:59</td>
          </tr>
          <tr>
            <td>Internet Explorer</td>
            <td>366</td>
            <td>2.63%</td>
            <td>333</td>
            <td>01:01</td>
          </tr>
          <tr>
            <td>Safari (in-app)</td>
            <td>162</td>
            <td>1.17%</td>
            <td>112</td>
            <td>00:58</td>
          </tr>
          <tr>
            <td>Opera</td>
            <td>103</td>
            <td>0.74%</td>
            <td>87</td>
            <td>01:22</td>
          </tr>
          <tr>
            <td>Edge</td>
            <td>98</td>
            <td>0.71%</td>
            <td>69</td>
            <td>01:18</td>
          </tr>
          <tr>
            <td>Other</td>
            <td>275</td>
            <td>6.02%</td>
            <td>90</td>
            <td>N/A</td>
          </tr>
        </tbody>
      </table>

      <h2>Flipped axis and overflow:</h2>

      <table className="rtable rtable--flip">
        <thead>
          <tr>
            <th>Browser</th>
            <th>Sessions</th>
            <th>Percentage</th>
            <th>New Users</th>
            <th>Avg. Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Chrome</td>
            <td>9,562</td>
            <td>68.81%</td>
            <td>7,895</td>
            <td>01:07</td>
          </tr>
          <tr>
            <td>Firefox</td>
            <td>2,403</td>
            <td>17.29%</td>
            <td>2,046</td>
            <td>00:59</td>
          </tr>
          <tr>
            <td>Safari</td>
            <td>1,089</td>
            <td>2.63%</td>
            <td>904</td>
            <td>00:59</td>
          </tr>
          <tr>
            <td>Internet Explorer</td>
            <td>366</td>
            <td>2.63%</td>
            <td>333</td>
            <td>01:01</td>
          </tr>
          <tr>
            <td>Safari (in-app)</td>
            <td>162</td>
            <td>1.17%</td>
            <td>112</td>
            <td>00:58</td>
          </tr>
          <tr>
            <td>Opera</td>
            <td>103</td>
            <td>0.74%</td>
            <td>87</td>
            <td>01:22</td>
          </tr>
          <tr>
            <td>Edge</td>
            <td>98</td>
            <td>0.71%</td>
            <td>69</td>
            <td>01:18</td>
          </tr>
          <tr>
            <td>Other</td>
            <td>275</td>
            <td>6.02%</td>
            <td>90</td>
            <td>N/A</td>
          </tr>
        </tbody>
      </table>
      <div style={{ width: "80vw" }}>
        <Scatter
          data={{
            labels: dados.tabelaDeClasses.map(({ classe }) => classe),
            datasets: [
              {
                type: "bar",
                label: "Dados em barra por frequência",
                data: dados.tabelaDeClasses.map(({ fi }) => fi),
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 1,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
              },
              // {
              //   type: "line",
              //   label: "Bar Dataset",
              //   data: [dados.media, dados.moda, dados.mediana],
              //   borderColor: "rgb(176, 219, 21)",
              //   borderWidth: 1,
              //   backgroundColor: "rgba(123, 145, 0, 0.2)",
              // },
              // {
              //   type: "line",
              //   tension: 0.1,
              //   label: "",
              //   data: dados.tabelaDeClasses.map(({ fi }) => fi),
              //   fill: false,
              //   borderColor: "rgb(54, 162, 235)",
              // },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Frequência (fi)",
                },
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
