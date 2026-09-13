const expandChordBtn = document.querySelector(".expandChordsBtn");
let isChordsExpanded = false;

// expandChordBtn.addEventListener("click", () => {});

const showChordsDisplay = (
  wrapperId,
  chordsFrameId,
  expandChordBtnId,
  acordes,
) => {
  const chordsWrapper = document.getElementById(wrapperId);
  const expandChordBtn = document.getElementById(expandChordBtnId);

  if (!chordsWrapper || !expandChordBtn) return;

  let chordsFrame = document.getElementById(chordsFrameId);

  // Se a cifra já existe, alterna a visibilidade
  if (chordsFrame) {
    const isHidden = chordsFrame.style.display === "none";

    if (isHidden) {
      chordsFrame.style.display = "block";
      expandChordBtn.textContent = "Recolher Cifra";
      expandChordBtn.style.backgroundColor = "#c40202d5";
    } else {
      chordsFrame.style.display = "none";
      expandChordBtn.textContent = "Expandir Cifra";
      expandChordBtn.style.backgroundColor = "var(--primary-color)";
    }

    return;
  }

  // Primeiro clique: cria a cifra
  chordsWrapper.insertAdjacentHTML(
    "beforeend",
    `
      <iframe
        id="${chordsFrameId}"
        class="chords"
        src="${acordes}"
        frameborder="0"
      ></iframe>
    `,
  );

  // Agora o iframe existe no DOM
  chordsFrame = document.getElementById(chordsFrameId);

  chordsFrame.style.display = "block";
  expandChordBtn.textContent = "Recolher Cifra";
  expandChordBtn.style.backgroundColor = "#c40202d5";
};
