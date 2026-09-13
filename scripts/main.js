import { separateByService } from "./database.js";

// Componentes interativos
const servicesContainer = document.querySelector(".servicesContainer");

// Insere as listas conforme o Culto
const insertList = async () => {
  try {
    const services = await separateByService();

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
    console.error("Erro ao carregar os dados:", error);

    servicesContainer.innerHTML = `
      <div class="loading">
        <span>Não foi possível carregar os hinos.</span>
        <button onclick="location.reload()">
          Tentar novamente
        </button>
      </div>
    `;
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
            <div class="chordsWrapper">
              <button id="btn${hymn.id}" class="expandChordsBtn" onClick="showChordsDisplay(${hymn.id}, 'btn${hymn.id}')">Expandir Cifra</button>
              <iframe id=${hymn.id} class="chords" src="${hymn.acordes}" frameborder="0"></iframe>
            </div>
        </li>
        `,
    )
    .join("");
};

insertList();
