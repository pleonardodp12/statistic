import { useState } from "react";
import { analisarDados } from "./utils";
import { data } from "./data";
import { Chart as Chartjs, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import "./style.css";
Chartjs.register(...registerables);

// exemplo de dados com AS negativo
// const data = [
//   14, 13, 18, 20, 25, 25, 25, 25, 25, 21, 24, 25, 25, 25, 27, 26, 26, 30, 31,
// ];

//exemplo de dados com AS = 0
// const data = [
//   20, 25, 25, 25, 25, 25, 21, 24, 24, 24, 24, 25, 25, 25, 15, 27, 26, 26, 30,
//   33, 33, 15,
// ];

const dados = analisarDados(data);

console.log(dados);

const findM = (m = 0) => {
  const classeEncontrada = dados.tabelaDeClasses.find((dado) => {
    const [min, max] = dado.classe.split(" - ").map(Number);
    return m >= min && m <= max;
  });

  return classeEncontrada;
};

function App() {
  const [showLine, setShowLine] = useState<boolean>(false);
  const [showBar, setShowBar] = useState<boolean>(true);
  const [showDispersionMeasures, setShowDispersionMeasures] =
    useState<boolean>(false);

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
          {dados.tabelaDeClasses.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((valor, subIndex) => (
                <td key={subIndex}>{valor}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="group-tables">
        <div>
          <h2>Amplitude total</h2>
          <table className="rtable rtable--flip">
            <thead>
              <tr>
                <th>Valor mínimo</th>
                <th>Valor máximo</th>
                <th>Amplitude total</th>
                <th>elementos (K)</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{dados.primeiroNumero}</td>
                <td>{dados.ultimoNumero}</td>
                <td>{dados.amplitudeTotal}</td>
                <td>{dados.elementos}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2>1º e 2º passo</h2>
          <table className="rtable rtable--flip">
            <thead>
              <tr>
                <th>K</th>
                <th>Amplitude (h)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dados.k2}</td>
                <td>{dados.h}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2>Medidas de posição</h2>
          <table className="rtable rtable--flip">
            <thead>
              <tr>
                <th>Média</th>
                <th>Mediana</th>
                <th>moda</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dados.media}</td>
                <td>{dados.mediana}</td>
                <td>{dados.moda}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2>Medidas de dispersão</h2>
          <table className="rtable rtable--flip">
            <thead>
              <tr>
                <th>Variância</th>
                <th>Desvio médio</th>
                <th>Desvio Padrão</th>
                <th>Coef. de variação</th>
                <th>(AS) Medida de assim...</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dados.variancia}</td>
                <td>{dados.desvioMedio}</td>
                <td>{dados.desvioPadrao}</td>
                <td>{dados.coeficienteVariacao}</td>
                <td>{dados.medidasDeAssimetria}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p>* Se AS = 0, a o gráfico seria simétrico </p>
      <br />
      <p>* Se AS {" > "} 0, Assimétrica positivo </p>
      <br />
      <p>* Se AS {" < "} 0, Assimétrica negativo </p>
      <div className="graphic-content">
        <div className="graphic">
          <Chart
            type="bar"
            style={{ width: "70%" }}
            data={{
              labels: dados.tabelaDeClasses.map(({ classe }) => classe),
              datasets: [
                {
                  hidden: !showBar,
                  type: "bar",
                  label: "Dados em barra por frequência",
                  data: dados.tabelaDeClasses,
                  parsing: {
                    xAxisKey: "classe",
                    yAxisKey: "fi",
                  },
                  borderColor: "rgb(255, 159, 64)",
                  borderWidth: 1,
                  backgroundColor: "rgba(255, 159, 64, 0.3)",
                },
                {
                  hidden: !showDispersionMeasures,
                  type: "bubble",
                  label: "Média",
                  data: [
                    {
                      x: findM(dados.media)?.classe,
                      y: findM(dados.media)?.fi,
                      r: 8,
                    },
                  ],
                  backgroundColor: "rgb(255, 99, 132)",
                },
                {
                  hidden: !showDispersionMeasures,
                  type: "bubble",
                  label: "Moda",
                  data: [
                    {
                      x: findM(dados.moda)?.classe,
                      y: findM(dados.moda)?.fi,
                      r: 8,
                    },
                  ],
                  backgroundColor: "rgb(201, 203, 207)",
                },
                {
                  hidden: !showDispersionMeasures,
                  type: "bubble",
                  label: "Mediana",
                  data: [
                    {
                      x: findM(dados.mediana)?.classe,
                      y: findM(dados.mediana)?.fi,
                      r: 8,
                    },
                  ],
                  backgroundColor: "rgb(153, 102, 255)",
                },
                {
                  hidden: !showLine,
                  type: "line",
                  tension: 0.1,
                  label: "Gráfico com linha",
                  data: dados.tabelaDeClasses.map(({ fi }) => fi),
                  fill: false,
                  borderColor: "rgb(54, 162, 235)",
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    title: function (context) {
                      const bubbleTitle =
                        context?.[0]?.dataset?.type === "bubble";
                      if (bubbleTitle) {
                        if (context?.[0]?.dataset.label === "Média")
                          return `Média: ${dados.media}`;
                        if (context?.[0]?.dataset.label === "Mediana")
                          return `Mediana: ${dados.mediana}`;
                        if (context?.[0]?.dataset.label === "Moda")
                          return `Moda: ${dados.moda}`;
                      }
                      return;
                    },
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Classe",
                  },
                  beginAtZero: true,
                },
                y: {
                  title: {
                    display: true,
                    text: "Frequência (fi)",
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        <div className="wrapper-toggles">
          <div className="toggle">
            <span>Gráfico linha</span>
            <input type="checkbox" checked={showLine} readOnly />
            <label onClick={() => setShowLine(!showLine)}></label>
          </div>
          <div className="toggle">
            <span>Gráfico barras</span>
            <input type="checkbox" checked={showBar} readOnly />
            <label onClick={() => setShowBar(!showBar)}></label>
          </div>
          <div className="toggle">
            <span>Medidas de dispersão</span>
            <input type="checkbox" checked={showDispersionMeasures} readOnly />
            <label
              onClick={() => setShowDispersionMeasures(!showDispersionMeasures)}
            ></label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
