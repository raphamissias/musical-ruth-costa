const API_URL =
  "https://script.google.com/macros/s/AKfycbwVeI_SScp82G1foYHNYMQzqxRBTWmh6mfaYPtxWY--Bd7h-M0O8unUp1aFVlPqxQvv/exec?";

const readHymns = async () => {
  try {
    const response = await fetch(`${API_URL}path=hymns&action=read`, {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });

    const { data, status } = await response.json();

    if (status != 200) {
      console.log(data.message);
    }

    return data;
  } catch (e) {
    console.log(e);
  }
};

// Separa os hinos por categoria de culto
export const separateByService = async () => {
  const hymns = await readHymns();
  const servicesArr = [];

  await hymns.forEach((hymn, index) => {
    const { nome_culto, departamento, hino, tom, youtube, cifra } = hymn;

    // Procura se o culto já existe
    const service = servicesArr.find((item) => item.name === nome_culto);

    // Dados do hino
    const hymnData = {
      departamento,
      hino,
      tom,
      youtube,
      cifra,
    };

    if (!service) {
      // Dá início à nova lista de culto
      servicesArr.push({
        name: nome_culto,
        hymns: [hymnData],
      });
    } else {
      // Adiciona hino na lista de culto já criada
      servicesArr[0].hymns.push(hymnData);
    }
  });

  return servicesArr;
};

separateByService();
