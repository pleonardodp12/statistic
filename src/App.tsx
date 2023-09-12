import { ChangeEvent, useState } from "react";
import { analisarDados } from "./utils";
// @ts-expect-error
import { data } from "./data";
import { Chart as Chartjs, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import "./style.css";
Chartjs.register(...registerables, annotationPlugin);

// exemplo de dados com AS negativo
// const data = [
//   14, 13, 18, 20, 25, 25, 25, 25, 25, 21, 24, 25, 25, 25, 27, 26, 26, 30, 31,
// ];

//exemplo de dados com AS = 0
// const data = [
//   20, 25, 25, 25, 25, 25, 21, 24, 24, 24, 24, 25, 25, 25, 15, 27, 26, 26, 30,
//   33, 33, 15,31,
// ];

export type TTabelaDeClasses = {
  classe: string;
  fi: number;
  xi: number;
  fac: number;
  xifi: number;
  xi2fi: number;
}[];

export type TDados = {
  dadosOrdenados: number[];
  primeiroNumero: number;
  ultimoNumero: number;
  amplitudeTotal: number;
  elementos: number;
  k1: number;
  k2: number;
  k3: number;
  h: number;
  tabelaDeClasses: TTabelaDeClasses;
  mediana: number;
  media: number;
  moda: number;
  variancia: number;
  desvioMedio: number;
  desvioPadrao: number;
  coeficienteVariacao: number;
  medidasDeAssimetria: number;
};

const findM = (dados: TDados, m = 0) => {
  const classeEncontrada = dados.tabelaDeClasses.find((dado) => {
    const [min, max] = dado.classe.split(" - ").map(Number);
    return m >= min && m <= max;
  });

  return classeEncontrada;
};

function floatToPercentage(floatNumber: number) {
  // Multiplica o número por 100 para obter a representação em porcentagem
  const percentage = floatNumber;
  // Formata a porcentagem com duas casas decimais
  return percentage.toFixed(0) + "%";
}

function App() {
  const [showLine, setShowLine] = useState<boolean>(false);
  const [showBar, setShowBar] = useState<boolean>(true);
  const [showDispersionMeasures, setShowDispersionMeasures] =
    useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);
  const [dados, setDados] = useState({} as TDados);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const sanitizedInput = inputValue.replace(/[^0-9,]/g, "");
    setInputValue(sanitizedInput);
    const numberArray = inputValue
      .split(",")
      .map((item) => parseFloat(item.trim()))
      .filter((number) => !isNaN(number));

    setNumbers(numberArray);
  };
  console.log(dados);

  const handleSubtmit = () => {
    if (!numbers.length) return;
    setDados(analisarDados(numbers));
    setIsCalculated(true);
  };

  const handleBackButton = () => {
    setNumbers([]);
    setInputValue("");
    // @ts-expect-error
    setDados({});
    setIsCalculated(false);
  };

  return (
    <>
      {!isCalculated ? (
        <div className="wrapper-initial-page">
          <h1>Trabalho de probabilidade estatística</h1>
          <textarea
            placeholder="Digite os valores com uma vírgula separando cada número 1,2,3"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="button" type="button" onClick={handleSubtmit}>
            Calcular
          </button>
        </div>
      ) : (
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
                    <td>{floatToPercentage(dados.coeficienteVariacao)}</td>
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
                          // @ts-expect-error
                          x: findM(dados, dados.media)?.classe,
                          y: findM(dados, dados.media)?.fi,
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
                          // @ts-expect-error
                          x: findM(dados, dados.moda)?.classe,
                          y: findM(dados, dados.moda)?.fi,
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
                          // @ts-expect-error
                          x: findM(dados, dados.mediana)?.classe,
                          y: findM(dados, dados.mediana)?.fi,
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
                      // @ts-expect-error
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
                    // annotation: {
                    //   annotations: [
                    //     {
                    //       type: "line",
                    //       borderColor: "blue",
                    //       borderWidth: 3,
                    //       label: {
                    //         display: true,
                    //         backgroundColor: "blue",
                    //         borderRadius: 0,
                    //         color: "white",
                    //         content: (ctx) => middleValue(ctx, 0, 4).toFixed(2),
                    //       },
                    //       xMax: indexToMax(0) + 0.05,
                    //       xMin: indexToMin(0) - 0.05,
                    //       xScaleID: "x",
                    //       yMax: (ctx) => middleValue(ctx, 0, 0.5),
                    //       yMin: (ctx) => middleValue(ctx, 0, 0.5),
                    //       yScaleID: "y",
                    //     },
                    //   ],
                    // },
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
                <input
                  type="checkbox"
                  checked={showDispersionMeasures}
                  readOnly
                />
                <label
                  onClick={() =>
                    setShowDispersionMeasures(!showDispersionMeasures)
                  }
                ></label>
              </div>
            </div>
          </div>
          <div className="wrapper-button">
            <button className="button" type="button" onClick={handleBackButton}>
              Calcular outros valores
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
