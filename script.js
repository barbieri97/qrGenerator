const divQR = document.getElementById("qrcode");
const campoTexto = document.getElementById("texto");
const erroMsg = document.getElementById("erro");
const btnDownload = document.getElementById("download");
const btnGerar = document.getElementById("gerar");
const btnToggle = document.getElementById("toggle-theme");

/* -------------------- TEMA -------------------- */
function aplicarTemaSalvo() {
  const tema = localStorage.getItem("tema") || "dark";
  document.documentElement.setAttribute("data-theme", tema);
  btnToggle.textContent = tema === "dark" ? "🌙" : "☀️";
}

btnToggle.onclick = () => {
  const atual = document.documentElement.getAttribute("data-theme");
  const novo = atual === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", novo);
  localStorage.setItem("tema", novo);
  btnToggle.textContent = novo === "dark" ? "🌙" : "☀️";
};

aplicarTemaSalvo();

/* -------------------- QR CODE -------------------- */
btnGerar.onclick = () => {
  divQR.innerHTML = "";
  erroMsg.classList.add("hidden");
  btnDownload.classList.add("hidden");

  const texto = campoTexto.value.trim();
  if (!texto) {
    erroMsg.textContent = "Digite um texto para gerar o QR Code.";
    erroMsg.classList.remove("hidden");
    return;
  }

  try {
    new QRCode(divQR, {
      text: texto,
      width: 256,
      height: 256,
      colorDark: document.documentElement.getAttribute("data-theme") === "dark" ? "#ffffff" : "#000000",
      colorLight: document.documentElement.getAttribute("data-theme") === "dark" ? "#0d1117" : "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
      const canvas = divQR.querySelector("canvas");
      if (!canvas) throw new Error("Falha ao gerar QR.");
      btnDownload.classList.remove("hidden");
    }, 80);

  } catch (e) {
    erroMsg.textContent = "O conteúdo é muito grande para ser convertido em QR Code.";
    erroMsg.classList.remove("hidden");
  }
};

/* -------------------- DOWNLOAD -------------------- */
btnDownload.onclick = () => {
  const canvas = divQR.querySelector("canvas");
  if (!canvas) return;

  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = "qrcode.png";
  a.click();
};
