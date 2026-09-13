import { separateByService } from "./database.js";

// Componentes interativos
const servicesContainer = document.querySelector(".servicesContainer");

const showLoading = () => {
  servicesContainer.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <span>Carregando...</span>
    </div>
  `;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const separateByServiceWithRetry = async (attempts = 3) => {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      console.log(`Tentativa ${attempt}/${attempts}`);

      return await separateByService();
    } catch (error) {
      console.error(`Tentativa ${attempt} falhou:`, error);

      if (attempt === attempts) {
        throw error;
      }

      await sleep(100 * attempt);
    }
  }
};

// Insere as listas conforme o Culto
const insertList = async () => {
  showLoading();

  try {
    const services = await separateByServiceWithRetry();

    servicesContainer.innerHTML = "";

    services.forEach((service) => {
      servicesContainer.insertAdjacentHTML(
        "beforeend",
        `
          <ul class="serviceList">
            <h3>${service.name}</h3>
            ${insertListItem(service)}
          </ul>
        `,
      );
    });
  } catch (error) {
    console.error("Falha definitiva:", error);

    servicesContainer.innerHTML = `
      <div class="loading">
        <p>Não foi possível carregar os hinos.</p>
        <button id="retryButton">
          Tentar novamente
        </button>
      </div>
    `;

    document
      .querySelector("#retryButton")
      .addEventListener("click", insertList);
  }
};

// Insere um item de lista para cada hino
const insertListItem = (service) => {
  const { name, hymns } = service;

  return hymns
    .map(
      (hymn) =>
        `
        <li>
            <div class="hymnWrapper">
                <iframe id="player" type="text/html" src="https://www.youtube.com/embed/${hymn.youtube}" frameborder="0"></iframe>
              <div class="hymnDesc">
                <div class="infoWrapper">
                  <div class="title">${hymn.departamento}</div>   
                  <div>${hymn.hino}</div>
                </div>
                <div class="toneWrapper">
                    <div class="title">Tom</div>
                    <div>${hymn.tom}</div>
                </div>
              </div>
            </div>
            <div id="wrp${hymn.id}" class="chordsWrapper">
                <div class="flex">
                    <button id="btn${hymn.id}" class="expandChordsBtn" onClick="showChordsDisplay('wrp${hymn.id}', ${hymn.id}, 'btn${hymn.id}', '${hymn.acordes}')">Expandir Cifra</button>
                    <button class="expandChordsBtn"><a href="${hymn.acordes}" target="_blank">Abrir em nova guia</a></button>
                </div>
            </div>
        </li>
        `,
    )
    .join("");
};

insertList();
