import { Scatter } from "react-chartjs-2";
import { analyzeArray } from "./utils";
import { data } from "./data";
import { Chart, registerables } from "chart.js";
import "./style.css";
Chart.register(...registerables);

//exemplo de dados com AS negativo
// const data = [
//   20, 25, 25, 25, 25, 25, 21, 24, 24, 24, 24, 25, 25, 25, 15, 27, 26, 26, 30,
// ];

//exemplo de dados com AS = 0
// const data = [
//   20, 25, 25, 25, 25, 25, 21, 24, 24, 24, 24, 25, 25, 25, 15, 27, 26, 26, 30,
//   33, 33, 15,
// ];

const dados = analyzeArray(data);

console.log(dados);

// const findMFromClasses = () => {};

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
              {
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
