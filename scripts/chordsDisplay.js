const chordsWrapper = document.querySelector(".chordsWrapper");
const expandChordBtn = document.querySelector(".expandChordsBtn");
let isChordsExpanded = false;

// expandChordBtn.addEventListener("click", () => {});

const showChordsDisplay = (chordsWrapperId, expandChordBtnId) => {
  isChordsExpanded = !isChordsExpanded;
  const chordsFrame = document.getElementById(chordsWrapperId);
  const expandChordBtn = document.getElementById(expandChordBtnId);

  if (!isChordsExpanded) {
    chordsFrame.style.display = "none";
    expandChordBtn.textContent = "Expandir Cifra";
    expandChordBtn.style.backgroundColor = "var(--primary-color)";
  } else {
    chordsFrame.style.display = "flex";
    expandChordBtn.textContent = "Recolher Cifra";
    expandChordBtn.style.backgroundColor = "#c40202d5";
  }
};
