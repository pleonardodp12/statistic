// Função para calcular a variância
const formulaVariancia = (tabelaDeClasses, media, totalFi) => {
  // Calcula a soma do quadrado das diferenças entre os valores (xi) e a média, ponderada pela frequência (fi)
  const somaXiMenosMediaQuadrado = tabelaDeClasses.reduce((sum, range) => {
    const xi = range.xi;
    const xiMenosMedia = xi - media;
    return sum + xiMenosMedia * xiMenosMedia * range.fi;
  }, 0);

  // Calcula a variância dividindo a soma pela diferença entre o total de frequências e 1 (para amostras)
  return somaXiMenosMediaQuadrado / (totalFi - 1);
};

// Função para calcular o desvio médio
const formulaDesvioMedio = (tabelaDeClasses, media, totalFi) => {
  // Calcula a soma das diferenças absolutas entre os valores (xi) e a média, ponderada pela frequência (fi)
  const somaXiMenosMediaAbs = tabelaDeClasses.reduce((sum, range) => {
    const xi = range.xi;
    const xiMenosMedia = xi - media;
    return sum + Math.abs(xiMenosMedia) * range.fi;
  }, 0);

  // Calcula o desvio médio dividindo a soma pelo total de frequências
  return somaXiMenosMediaAbs / totalFi;
};

// Função para calcular o desvio padrão a partir da variância
const formulaDesvioPadrao = (variancia) => {
  return Math.sqrt(variancia);
};

// Função para calcular o coeficiente de variação
const formulaCoeficienteVariacao = (desvioPadrao, media) => {
  // Calcula o coeficiente de variação como a razão entre o desvio padrão e a média, multiplicado por 100 para expressar em porcentagem
  return (desvioPadrao / media) * 100;
};

// Função para criar as classes com base nos dados
const montandoClasse = (primeiroNumero, ultimoNumero, h) => {
  const classes = [];
  for (let inicio = primeiroNumero; inicio <= ultimoNumero; inicio += h) {
    classes.push({ inicio, fim: inicio + h });
  }
  return classes;
};

// Função para calcular a frequência (fi) de uma classe
const formulaFi = (dados, range) => {
  return dados.filter((numero) => numero >= range.inicio && numero < range.fim)
    .length;
};

// Função para calcular o ponto médio (xi) de uma classe
const formulaXi = (range) => {
  return (range.inicio + range.fim) / 2;
};

// Função para calcular a frequência acumulada (fac) até uma classe
const formulaFac = (dados, arr, index) => {
  return arr
    .slice(0, index + 1)
    .reduce((sum, item) => sum + formulaFi(dados, item), 0);
};

// Função para calcular a média
const formulaMedia = (somaXiFi, totalFi) => {
  return somaXiFi / totalFi;
};

// Função para calcular a moda
const formulaModa = (tabelaDeClasses, h) => {
  // Encontra a classe modal inicialmente como a primeira classe (caso de empate).
  const classeModal = tabelaDeClasses.reduce(
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
  const classeAnterior = tabelaDeClasses[
    tabelaDeClasses.indexOf(classeModal) - 1
  ] || {
    fi: 0,
  };

  // Encontra a classe seguinte à classe modal (caso exista).
  const classeSeguinte = tabelaDeClasses[
    tabelaDeClasses.indexOf(classeModal) + 1
  ] || {
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

// Função para calcular a mediana
const formulaMediana = (totalFi, tabelaDeClasses) => {
  // Calcula o índice do meio, que é metade do total de frequências acumuladas.
  const indiceMedio = totalFi / 2;

  // Inicializa variáveis para guardar informações sobre a mediana.
  let limiteInferiorClasse;
  let frequenciaMediana;
  let amplitudeClasseMediana;
  let frequenciaAcumulada;

  // Procura pela classe que contém a mediana.
  const classeMediana = tabelaDeClasses.find((classe) => {
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

// Função principal para analisar a lista de dados
export const analisarDados = (arr) => {
  // Ordena a lista de dados em ordem crescente
  const dadosOrdenados = [...arr].sort((a, b) => a - b);

  // Conta a frequência de cada número
  const frequência = dadosOrdenados.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  // Calcula a soma das frequências para obter o total de frequências
  const somaFrequência =
    Object.values(frequência).reduce((soma, contador) => soma + contador, 0) ||
    arr.length;

  // Obtém o primeiro e o último número dos dados
  const primeiroNumero = dadosOrdenados[0];
  const ultimoNumero = dadosOrdenados[dadosOrdenados.length - 1];

  // Calcula a amplitude total dos dados
  const amplitudeTotal = ultimoNumero - primeiroNumero;

  // Conta o número de elementos nos dados
  const elementos = dadosOrdenados.length;

  // Calcula o número de classes usando diferentes métodos (k1, k2, k3)
  const k1 = Math.ceil(Math.sqrt(somaFrequência));
  const k2 = Math.ceil(1 + 3.22 * Math.log10(somaFrequência));
  const k3 = Math.ceil(-1 + 2 * Math.log(somaFrequência));

  // Calcula a amplitude das classes (h) dividindo a amplitude total pelo número de classes
  const h = Math.ceil(amplitudeTotal / k1);

  // Cria as classes com base nos limites inferior e superior
  const classes = montandoClasse(primeiroNumero, ultimoNumero, h);

  // Calcula as estatísticas de cada classe
  const tabelaDeClasses = classes.map((range, index, arr) => {
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

  // Calcula a média
  const totalFi = tabelaDeClasses.reduce((total, row) => total + row.fi, 0);
  const somaXiFi = tabelaDeClasses.reduce(
    (sum, row) => sum + row.xi * row.fi,
    0
  );
  const media = formulaMedia(somaXiFi, totalFi);

  // Calcula a mediana
  const mediana = formulaMediana(totalFi, tabelaDeClasses);

  // Calcula a moda
  const moda = formulaModa(tabelaDeClasses, h);

  // Calcula a variância
  const variancia = formulaVariancia(tabelaDeClasses, media, totalFi);

  // Calcula o desvio médio
  const desvioMedio = formulaDesvioMedio(tabelaDeClasses, media, totalFi);

  // Calcula o desvio padrão
  const desvioPadrao = formulaDesvioPadrao(variancia);

  // Calcula o coeficiente de variação
  const coeficienteVariacao = formulaCoeficienteVariacao(desvioPadrao, media);

  // Calcula o índice de assimetria
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
    tabelaDeClasses,
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
