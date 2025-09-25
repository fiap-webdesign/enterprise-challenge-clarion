document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".filtro-form");
    const selects = Array.from(form.querySelectorAll("select.input-filtro"));
    const esporteSelect = selects[0] || null;
    const estadoSelect = selects[1] || null;
    const cidadeSelect = selects[2] || null;
    const parceiroSelect = selects[3] || null;

    const atletas = Array.from(document.querySelectorAll(".card-atleta"));
    const atletasContainer = document.querySelector(".atletas");

    let noResultsEl = atletasContainer.querySelector(".no-results-message");
    if (!noResultsEl) {
        noResultsEl = document.createElement("p");
        noResultsEl.className = "no-results-message";
        noResultsEl.textContent = "Nenhum atleta encontrado.";
        noResultsEl.style.display = "none";
        noResultsEl.style.marginTop = "1rem";
        atletasContainer.appendChild(noResultsEl);
    }

    function normalize(text) {
        return (text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    }

    function parseCard(card) {
        const nome = card.querySelector("h2")?.textContent?.trim() || "";
        const locationText = card.querySelector(".text-highlight")?.textContent?.trim() || "";
        const paras = Array.from(card.querySelectorAll(".informacoes-secundarias p"));

        let esportes = "";

        paras.forEach(p => {
            const text = p.textContent.toLowerCase();
            if (text.includes("esporte")) esportes = p.textContent;
        });

        return { nome, locationText, esportes };
    }

    function filterAtletas() {
        const esporteVal = normalize(esporteSelect?.value || "");
        const estadoVal = normalize(estadoSelect?.value || "");
        const cidadeVal = normalize(cidadeSelect?.value || "");
        const parceiroVal = normalize(parceiroSelect?.value || "");

        let anyVisible = false;

        atletas.forEach(card => {
            const { nome, locationText, esportes } = parseCard(card);

            const nLocation = normalize(locationText);
            const nEsportes = normalize(esportes);
            const nNome = normalize(nome);

            let visible = true;

            if (esporteVal && !nEsportes.includes(esporteVal)) visible = false;
            if (estadoVal && !nLocation.includes(estadoVal)) visible = false;
            if (cidadeVal && !nLocation.includes(cidadeVal)) visible = false;
            if (parceiroVal && !nNome.includes(parceiroVal)) visible = false;

            card.style.display = visible ? "" : "none";
            if (visible) anyVisible = true;
        });

        noResultsEl.style.display = anyVisible ? "none" : "";
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        filterAtletas();
    });

    form.addEventListener("reset", () => {
        setTimeout(() => {
            atletas.forEach(card => (card.style.display = ""));
            noResultsEl.style.display = "none";
        }, 0);
    });
});
