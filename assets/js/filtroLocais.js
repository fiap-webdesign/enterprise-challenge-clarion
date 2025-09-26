document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".filtro-form");
    const selects = Array.from(form.querySelectorAll("select.input-filtro"));
    const esporteSelect = selects[0] || null;
    const estadoSelect = selects[1] || null;
    const cidadeSelect = selects[2] || null;
    const dateInput =
    form.querySelector('input[type="date"].input-filtro') || null;

    const eventos = Array.from(document.querySelectorAll(".card-evento"));
    const eventosContainer = document.querySelector(".eventos");
    const retornosErro = document.querySelector("#alerta");

    let noResultsEl = eventosContainer.querySelector(".no-results-message");
    if (!noResultsEl) {
        noResultsEl = document.createElement("p");
        noResultsEl.className = "no-results-message alert alert-warning";
        noResultsEl.textContent = "Ops... Não encontramos resultados para essa busca. Experimente remover ou alterar alguns filtros e tente novamente!";
        noResultsEl.style.display = "none";
        noResultsEl.style.marginTop = "1rem";
        retornosErro.appendChild(noResultsEl);
    }

function normalize(text) {
    return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function parseCard(card) {
    const esporte = card.querySelector("h2")?.textContent?.trim() || "";
    const locationText =
    card.querySelector(".text-highlight")?.textContent?.trim() || "";
    const paras = Array.from(
    card.querySelectorAll(".informacoes-secundarias p")
    );
    let dateStr = "";
    for (const p of paras) {
    const m = p.textContent.match(/\d{2}\/\d{2}\/\d{4}/);
    if (m) {
        dateStr = m[0];
        break;
    }
    }
    let dateISO = "";
    if (dateStr) {
    const [dd, mm, yyyy] = dateStr.split("/");
    dateISO = `${yyyy}-${mm}-${dd}`;
    }
    return { esporte, locationText, dateISO };
}

function filterEvents() {
    const esporteVal = normalize(esporteSelect?.value || "");
    const estadoVal = normalize(estadoSelect?.value || "");
    const cidadeVal = normalize(cidadeSelect?.value || "");
    const dataVal = (dateInput?.value || "").trim();

    let anyVisible = false;

    eventos.forEach((card) => {
    const { esporte, locationText, dateISO } = parseCard(card);
    const nEsporte = normalize(esporte);
    const nLocation = normalize(locationText);

    let visible = true;

    if (esporteVal && !nEsporte.includes(esporteVal)) visible = false;
    if (estadoVal && !nLocation.includes(estadoVal)) visible = false;
    if (cidadeVal && !nLocation.includes(cidadeVal)) visible = false;
    if (dataVal && dateISO !== dataVal) visible = false;

    card.style.display = visible ? "" : "none";
    if (visible) anyVisible = true;
    });

    noResultsEl.style.display = anyVisible ? "none" : "";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    filterEvents();
});


form.addEventListener("reset", () => {
    setTimeout(() => {
    eventos.forEach((card) => (card.style.display = ""));
    noResultsEl.style.display = "none";
    }, 0);
});
});
