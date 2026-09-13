const API_URL =
  "https://script.google.com/macros/s/AKfycbwVeI_SScp82G1foYHNYMQzqxRBTWmh6mfaYPtxWY--Bd7h-M0O8unUp1aFVlPqxQvv/exec?";

const readHymns = async () => {
  try {
    const response = await fetch(`${API_URL}path=hymns&action=read`);

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}`);
    }

    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      throw new Error(`A API não retornou JSON. Content-Type: ${contentType}`);
    }

    const { data, status } = JSON.parse(text);

    if (status !== 200) {
      console.error(data?.message);
      return [];
    }

    return data;
  } catch (error) {
    console.error("ERRO NA API:", error);
    return [];
  }
};

// Separa os hinos por categoria de culto
export const separateByService = async () => {
  const hymns = await readHymns();
  const servicesArr = [];

  hymns.forEach((hymn) => {
    const { id, nome_culto, departamento, hino, tom, youtube, acordes } = hymn;

    // Procura se o culto já existe
    const service = servicesArr.find((item) => item.name === nome_culto);

    // Dados do hino
    const hymnData = {
      id,
      departamento,
      hino,
      tom,
      youtube,
      acordes,
    };

    if (!service) {
      servicesArr.push({
        name: nome_culto,
        hymns: [hymnData],
      });
    } else {
      service.hymns.push(hymnData);
    }
  });

  return servicesArr;
};

separateByService();
