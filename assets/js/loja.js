// ===== Encanto Glow — Loja (vitrine pública) =====
(function () {
  const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby_1KixFPNg8exeGzPzu3WaCbRQlt8gB-iIUmZNfFyKqZ5u7aEq42gd_EAG2lzFZ46e/exec";

  const state = { produtos: [], produtoAtual: null, freteEscolhido: null };

  const grid = document.getElementById("lojaGrid");
  const modal = document.getElementById("lojaModal");
  const modalClose = document.getElementById("lojaModalClose");
  const modalImg = document.getElementById("lojaModalImg");
  const modalNome = document.getElementById("lojaModalNome");
  const modalDescricao = document.getElementById("lojaModalDescricao");
  const modalPreco = document.getElementById("lojaModalPreco");
  const qtdInput = document.getElementById("lojaQtd");
  const cepInput = document.getElementById("lojaCep");
  const calcularBtn = document.getElementById("lojaCalcularFrete");
  const freteOpcoesEl = document.getElementById("lojaFreteOpcoes");
  const feedback = document.getElementById("lojaFeedback");
  const finalizarBtn = document.getElementById("lojaFinalizar");

  loadProdutos();

  async function loadProdutos() {
    try {
      const res = await fetch(`${WEBHOOK_URL}?action=list_produtos`);
      const json = await res.json();
      if (json.ok) {
        state.produtos = json.rows || [];
        renderGrid();
      } else {
        showEmpty("Não foi possível carregar os produtos agora.");
      }
    } catch (err) {
      showEmpty("Não foi possível carregar os produtos agora.");
    }
  }

  function showEmpty(msg) {
    grid.innerHTML = `<p class="panel-empty">${escapeHtml(msg)}</p>`;
  }

  function renderGrid() {
    if (state.produtos.length === 0) {
      showEmpty("Nenhum produto disponível no momento — volte em breve!");
      return;
    }
    grid.innerHTML = state.produtos
      .map((p) => {
        const semEstoque = !p["Estoque"] || Number(p["Estoque"]) <= 0;
        return `
        <div class="loja-card reveal">
          <img class="loja-card-img" src="${escapeHtml(p["Imagem URL"] || "/assets/images/logo-encanto-glow.jpg")}" alt="${escapeHtml(p["Nome"] || "")}" loading="lazy">
          <div class="loja-card-body">
            <h3>${escapeHtml(p["Nome"] || "")}</h3>
            <p>${escapeHtml(p["Descrição"] || "")}</p>
            <div class="loja-card-preco">${formatCurrency(p["Preço"])}</div>
            ${semEstoque ? '<div class="loja-card-estoque">Sem estoque no momento</div>' : ""}
            <button type="button" class="btn btn-primary" style="width:100%; justify-content:center;" data-comprar="${p["ID"]}" ${semEstoque ? "disabled" : ""}>Comprar</button>
          </div>
        </div>`;
      })
      .join("");

    grid.querySelectorAll("[data-comprar]").forEach((btn) => {
      btn.addEventListener("click", () => abrirModal(btn.dataset.comprar));
    });
  }

  function abrirModal(id) {
    const p = state.produtos.find((x) => String(x["ID"]) === String(id));
    if (!p) return;
    state.produtoAtual = p;
    state.freteEscolhido = null;

    modalImg.src = p["Imagem URL"] || "/assets/images/logo-encanto-glow.jpg";
    modalImg.alt = p["Nome"] || "";
    modalNome.textContent = p["Nome"] || "";
    modalDescricao.textContent = p["Descrição"] || "";
    modalPreco.textContent = formatCurrency(p["Preço"]);
    qtdInput.value = 1;
    cepInput.value = "";
    freteOpcoesEl.innerHTML = "";
    feedback.hidden = true;
    finalizarBtn.disabled = true;
    finalizarBtn.textContent = "Calcule o frete para continuar";

    modal.classList.add("active");
  }

  modalClose.addEventListener("click", fecharModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal();
  });

  function fecharModal() {
    modal.classList.remove("active");
  }

  cepInput.addEventListener("input", () => {
    let digits = cepInput.value.replace(/\D/g, "").slice(0, 8);
    if (digits.length > 5) digits = digits.replace(/(\d{5})(\d{1,3})/, "$1-$2");
    cepInput.value = digits;
  });

  calcularBtn.addEventListener("click", async () => {
    const cep = cepInput.value.replace(/\D/g, "");
    if (cep.length !== 8) {
      feedback.hidden = false;
      feedback.textContent = "Digite um CEP válido (8 dígitos).";
      return;
    }
    const p = state.produtoAtual;
    if (!p) return;

    calcularBtn.disabled = true;
    calcularBtn.textContent = "Calculando...";
    feedback.hidden = true;
    freteOpcoesEl.innerHTML = "";

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "calcular_frete",
          cepDestino: cep,
          peso: parseFloat(p["Peso (kg)"]) || 0.3,
          altura: parseFloat(p["Altura (cm)"]) || 4,
          largura: parseFloat(p["Largura (cm)"]) || 12,
          comprimento: parseFloat(p["Comprimento (cm)"]) || 17,
        }),
      });
      const json = await res.json();

      if (!json.ok) {
        feedback.hidden = false;
        feedback.textContent =
          json.error === "frete_nao_configurado"
            ? "Cálculo de frete ainda não configurado — em breve! Fale conosco pelo WhatsApp pra combinar o envio."
            : "Não foi possível calcular o frete agora. Tente novamente.";
        return;
      }

      renderFreteOpcoes(json.opcoes);
    } catch (err) {
      feedback.hidden = false;
      feedback.textContent = "Erro de conexão ao calcular o frete.";
    }

    calcularBtn.disabled = false;
    calcularBtn.textContent = "Calcular frete";
  });

  function renderFreteOpcoes(opcoes) {
    const validas = (Array.isArray(opcoes) ? opcoes : []).filter((o) => o && !o.error && o.price);
    if (validas.length === 0) {
      feedback.hidden = false;
      feedback.textContent = "Nenhuma opção de frete encontrada para esse CEP.";
      return;
    }
    freteOpcoesEl.innerHTML = validas
      .map(
        (o, i) => `
      <div class="loja-frete-opcao" data-frete-index="${i}">
        <div>
          <div class="nome">${escapeHtml(o.name || "Entrega")}</div>
          <div class="prazo">${o.delivery_time ? o.delivery_time + " dias úteis" : ""}</div>
        </div>
        <div class="preco">${formatCurrency(o.price)}</div>
      </div>`
      )
      .join("");

    freteOpcoesEl.querySelectorAll("[data-frete-index]").forEach((el) => {
      el.addEventListener("click", () => {
        freteOpcoesEl.querySelectorAll(".loja-frete-opcao").forEach((x) => x.classList.remove("selected"));
        el.classList.add("selected");
        state.freteEscolhido = validas[Number(el.dataset.freteIndex)];
        finalizarBtn.disabled = false;
        finalizarBtn.textContent = "Finalizar compra";
      });
    });
  }

  finalizarBtn.addEventListener("click", async () => {
    const p = state.produtoAtual;
    if (!p || !state.freteEscolhido) return;

    finalizarBtn.disabled = true;
    finalizarBtn.textContent = "Redirecionando...";
    feedback.hidden = true;

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "criar_pagamento",
          itens: [{ nome: p["Nome"], quantidade: parseInt(qtdInput.value, 10) || 1, preco: p["Preço"] }],
          frete: state.freteEscolhido.price,
        }),
      });
      const json = await res.json();

      if (json.ok && json.checkoutUrl) {
        window.location.href = json.checkoutUrl;
        return;
      }

      feedback.hidden = false;
      feedback.textContent =
        json.error === "pagamento_nao_configurado"
          ? "Pagamento online ainda não configurado — em breve! Fale conosco pelo WhatsApp pra fechar sua compra."
          : "Não foi possível iniciar o pagamento agora. Tente novamente.";
    } catch (err) {
      feedback.hidden = false;
      feedback.textContent = "Erro de conexão ao iniciar o pagamento.";
    }

    finalizarBtn.disabled = false;
    finalizarBtn.textContent = "Finalizar compra";
  });

  function formatCurrency(val) {
    const n = parseFloat(val);
    if (isNaN(n)) return "—";
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }
})();
