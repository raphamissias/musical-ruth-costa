import { separateByService } from "./database.js";

// Componentes que receberão variáveis
const servicesContainer = document.querySelector(".servicesContainer");

// Insere variáveis nos componentes
const insertList = async () => {
  const services = await separateByService();
  console.log(services);

  services.forEach((service) => {
    servicesContainer.insertAdjacentHTML(
      "beforeend",
      `
        <ul class="serviceList">
            <h3>${service.name}</h2>
            ${insertListItem(service)}
        </ul>
    `,
    );
  });
};

const insertListItem = (service) => {
  const { name, hymns } = service;
  console.log(hymns[0].youtube);

  return hymns
    .map(
      (hymn) =>
        `
        <li>
            <div class="column">
                <div class="title">${hymn.departamento}</div>   
                <div>${hymn.hino}</div>
                <div class="tone">
                    <div class="title">Tom</div>
                    <div>${hymn.tom}</div>
                </div>
            </div>
            <iframe id="player" type="text/html" src="http://www.youtube.com/embed/${hymn.youtube}?enablejsapi=1&origin=http://example.com" frameborder="0"></iframe>
            <div class="chordLogo">Ícone Cifra</div> <!-- Link para acessar Cifra do hino -->
        </li>
        `,
    )
    .join("");
};

insertList();
