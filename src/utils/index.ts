const formulaVariancia = (rangeCounts, media, totalFi) => {
  const somaXiMenosMediaQuadrado = rangeCounts.reduce((sum, range) => {
    const xi = range.xi;
    const xiMenosMedia = xi - media;
    return sum + xiMenosMedia * xiMenosMedia * range.fi;
  }, 0);

  return somaXiMenosMediaQuadrado / (totalFi - 1);
};

const formulaDesvioMedio = (rangeCounts, media, totalFi) => {
  const somaXiMenosMediaAbs = rangeCounts.reduce((sum, range) => {
    const xi = range.xi;
    const xiMenosMedia = xi - media;
    return sum + Math.abs(xiMenosMedia) * range.fi;
  }, 0);

  return somaXiMenosMediaAbs / totalFi;
};

const formulaDesvioPadrao = (variancia) => {
  return Math.sqrt(variancia);
};

const formulaCoeficienteVariacao = (desvioPadrao, media) => {
  return (desvioPadrao / media) * 100;
};

const montandoClasse = (primeiroNumero, ultimoNumero, h) => {
  const classes = [];
  for (let inicio = primeiroNumero; inicio <= ultimoNumero; inicio += h) {
    classes.push({ inicio, fim: inicio + h });
  }
  return classes;
};

const formulaFi = (dados, range) => {
  return dados.filter((numero) => numero >= range.inicio && numero < range.fim)
    .length;
};

const formulaXi = (range) => {
  return (range.inicio + range.fim) / 2;
};

const formulaFac = (dados, arr, index) => {
  return arr
    .slice(0, index + 1)
    .reduce((sum, item) => sum + formulaFi(dados, item), 0);
};

const formulaMedia = (somaXiFi, totalFi) => {
  return somaXiFi / totalFi;
};

const formulaModa = (rangeCounts, h) => {
  // Encontra a classe modal inicialmente como a primeira classe (caso de empate).
  const classeModal = rangeCounts.reduce(
    (classeModal, classeAtual) => {
      return classeAtual.fi > classeModal.fi ? classeAtual : classeModal;
    },
    { fi: 0 }
  );

  // Obtém a frequência da classe modal.
  const frequenciaModal = classeModal.fi;

  // Divide o nome da classe modal em limite inferior e superior e converte-os em números.
  const limitesClasseModal = classeModal.classe.split("-").map(Number);
  const limiteInferiorClasseModal = limitesClasseModal[0];

  // Encontra a classe anterior à classe modal (caso exista).
  const classeAnterior = rangeCounts[rangeCounts.indexOf(classeModal) - 1] || {
    fi: 0,
  };

  // Encontra a classe seguinte à classe modal (caso exista).
  const classeSeguinte = rangeCounts[rangeCounts.indexOf(classeModal) + 1] || {
    fi: 0,
  };

  // Calcula a moda utilizando a fórmula da moda para dados contínuos.
  const moda =
    limiteInferiorClasseModal +
    ((frequenciaModal - classeAnterior.fi) /
      (frequenciaModal -
        classeAnterior.fi +
        (frequenciaModal - classeSeguinte.fi))) *
      h;

  // Retorna o valor da moda.
  return moda;
};

const formulaMediana = (totalFi, rangeCounts) => {
  // Calcula o índice do meio, que é metade do total de frequências acumuladas.
  const indiceMedio = totalFi / 2;

  // Inicializa variáveis para guardar informações sobre a mediana.
  let limiteInferiorClasse;
  let frequenciaMediana;
  let amplitudeClasseMediana;
  let frequenciaAcumulada;

  // Procura pela classe que contém a mediana.
  const classeMediana = rangeCounts.find((classe) => {
    if (classe.fac >= indiceMedio) {
      frequenciaAcumulada = classe.fac;
    }

    return frequenciaAcumulada;
  });

  if (classeMediana) {
    // Se a classe da mediana foi encontrada, guarda informações relevantes.
    frequenciaMediana = classeMediana.fi;

    // Divide o nome da classe em limite inferior e superior, convertendo-os em números.
    const [limiteInferior, limiteSuperior] = classeMediana.classe
      .split("-")
      .map(Number);
    limiteInferiorClasse = limiteInferior;
    amplitudeClasseMediana = limiteSuperior - limiteInferior;
  }

  // Calcula a posição da mediana dentro da classe.
  const posicaoMediana =
    indiceMedio - (frequenciaAcumulada - frequenciaMediana);

  // Calcula o valor da mediana usando a posição relativa dentro da classe.
  const mediana =
    limiteInferiorClasse +
    (posicaoMediana / frequenciaMediana) * amplitudeClasseMediana;
  // Retorna o valor da mediana.
  return mediana;
};

export const analyzeArray = (arr) => {
  //ordena a lista de dados em ordem crescente
  const dadosOrdenados = [...arr].sort((a, b) => a - b);

  //conta a frequência de cada número
  const frequência = dadosOrdenados.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  const somaFrequência =
    Object.values(frequência).reduce((soma, contador) => soma + contador, 0) ||
    arr.length;

  const primeiroNumero = dadosOrdenados[0];
  const ultimoNumero = dadosOrdenados[dadosOrdenados.length - 1];
  const amplitudeTotal = ultimoNumero - primeiroNumero;
  const elementos = dadosOrdenados.length;

  const k1 = Math.ceil(Math.sqrt(somaFrequência));
  const k2 = Math.ceil(1 + 3.22 * Math.log10(somaFrequência));
  const k3 = Math.ceil(-1 + 2 * Math.log(somaFrequência));

  const h = Math.ceil(amplitudeTotal / k1);

  const classes = montandoClasse(primeiroNumero, ultimoNumero, h);

  const rangeCounts = classes.map((range, index, arr) => {
    const fi = formulaFi(dadosOrdenados, range);
    const xi = formulaXi(range);
    const fac = formulaFac(dadosOrdenados, arr, index);
    const xifi = xi * fi;
    const xi2fi = Math.pow(xi, 2) * fi;
    return {
      classe: `${range.inicio} - ${range.fim}`,
      fi,
      xi,
      fac,
      xifi,
      xi2fi,
    };
  });

  //média
  const totalFi = rangeCounts.reduce((total, row) => total + row.fi, 0);
  const somaXiFi = rangeCounts.reduce((sum, row) => sum + row.xi * row.fi, 0);
  const media = formulaMedia(somaXiFi, totalFi);

  // mediana
  const mediana = formulaMediana(totalFi, rangeCounts);

  //moda
  const moda = formulaModa(rangeCounts, h);

  // Variância
  const variancia = formulaVariancia(rangeCounts, media, totalFi);

  // Desvio Médio
  const desvioMedio = formulaDesvioMedio(rangeCounts, media, totalFi);

  // Desvio Padrão
  const desvioPadrao = formulaDesvioPadrao(variancia);

  // Coeficiente de Variação
  const coeficienteVariacao = formulaCoeficienteVariacao(desvioPadrao, media);

  const medidasDeAssimetria = (media - moda) / desvioPadrao;

  return {
    dadosOrdenados,
    primeiroNumero,
    ultimoNumero,
    amplitudeTotal,
    elementos,
    k1,
    k2,
    k3,
    h,
    rangeCounts,
    totalFi,
    media,
    mediana,
    moda,
    variancia,
    desvioMedio,
    desvioPadrao,
    coeficienteVariacao,
    medidasDeAssimetria,
  };
};

// const data = [
//   51, 51, 65, 52, 58, 58, 61, 58, 65, 65, 65, 56, 67.5, 67.5, 58, 67.5, 50, 57,
//   50, 50, 81, 81, 81, 81, 110, 110, 110, 78, 54, 54, 54, 54, 65, 84, 71, 65, 65,
//   65, 65, 66,
// ];

// const data = [
//   10.5, 11.2, 12.8, 13.5, 14.2, 14.5, 15.7, 16.1, 17.4, 18.2, 19.8, 20.3, 21.6,
//   22.3, 23.5, 24.1, 25.6, 26.7, 27.9, 28.4, 14.2, 14.5, 15.7, 16.1, 17.4, 18.2,
//   19.8, 20.3, 21.6, 22.3, 23.5, 24.1,
// ];

// const data = [
//   5, 7, 8, 8, 8, 9, 9, 10, 10, 10, 10, 11, 11, 12, 12, 12, 13, 14, 15, 20,
// ];

// const data = [15, 25, 20];

// const data = [
//   5.3, 8.2, 13.8, 74.1, 85.3, 88.0, 90.2, 91.5, 92.4, 92.9, 93.6, 94.3, 94.8,
//   94.9, 95.5, 95.8, 95.9, 96.6, 96.7, 98.1, 99.0, 101.4, 103.7, 106.0, 113.5,
// ];

// const analysis = analyzeArray(data);

// console.log("AMPLITUDE TOTAL: ");
// console.log("valor mínimo: ", analysis.primeiroNumero);
// console.log("valor máximo: ", analysis.ultimoNumero);
// console.log("amplitude Total: ", analysis.amplitudeTotal);
// console.log("elementos (K): ", analysis.elementos);
// console.log("------------------------------------------");
// console.log("1º passo: ");
// console.log("k1: ", analysis.k1);
// console.log("k2: ", analysis.k2);
// console.log("k3: ", analysis.k3);
// console.log("------------------------------------------");

// console.log("2º passo: ");
// console.log("amplitude (h): ", analysis.h);

// console.table(analysis.rangeCounts, [
//   "classe",
//   "fi",
//   "xi",
//   "fac",
//   "xifi",
//   "xi2fi",
// ]);

// console.log("Total de fi:", analysis.totalFi);

// console.log("Média: ", analysis.media);
// console.log("Moda: ", analysis.moda);
// console.log("mediana: ", analysis.mediana);

// console.log("variancia", analysis.variancia);
// console.log("desvioMedio", analysis.desvioMedio);
// console.log("desvioPadrao", analysis.desvioPadrao);
// console.log("coeficienteVariacao", analysis.coeficienteVariacao, "%");
