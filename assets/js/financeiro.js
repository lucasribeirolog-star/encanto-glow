// ===== Encanto Glow — Painel Financeiro (fluxo de caixa) =====
(function () {
  const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby_1KixFPNg8exeGzPzu3WaCbRQlt8gB-iIUmZNfFyKqZ5u7aEq42gd_EAG2lzFZ46e/exec";
  const ADMIN_TOKEN = "ec40038a41c77584f3367385";
  const ACCESS_CODE = "EncantoGlowCaixa2026";
  const SESSION_KEY = "encantoGlowFinanceiroUnlocked";

  const CATEGORIAS = {
    Entrada: ["Botox / Toxina Botulínica", "Preenchimento Facial", "Limpeza de Pele", "Depilação a Laser", "Massagem Estética", "Peeling", "Drenagem Linfática", "Venda de Produtos", "Pacote de Sessões", "Outras Receitas"],
    Saída: ["Aluguel", "Energia Elétrica", "Água", "Internet/Telefone", "Salários", "Pró-labore", "Contador", "Marketing/Anúncios", "Manutenção de Equipamentos", "Impostos/Taxas", "Material de Limpeza", "Gasolina", "Uber", "Outras Despesas"],
    Compra: ["Insumos Descartáveis", "Produtos Estéticos (Revenda)", "Cosméticos/Ativos", "Equipamentos", "Embalagens", "Outros Insumos"]
  };
  const FORMAS_PAGAMENTO = ["Dinheiro", "Pix", "Cartão de Débito", "Cartão de Crédito", "Transferência Bancária", "Boleto"];
  const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  const state = { lancamentos: [], editingId: null };

  // ---------- Gate ----------
  const gate = document.getElementById("panelGate");
  const app = document.getElementById("panelApp");
  const gateCode = document.getElementById("gateCode");
  const gateSubmit = document.getElementById("gateSubmit");
  const gateError = document.getElementById("gateError");

  function unlock() {
    gate.style.display = "none";
    app.hidden = false;
    init();
  }

  if (sessionStorage.getItem(SESSION_KEY) === "1") {
    unlock();
  } else {
    gateSubmit.addEventListener("click", tryUnlock);
    gateCode.addEventListener("keydown", (e) => {
      if (e.key === "Enter") tryUnlock();
    });
  }

  function tryUnlock() {
    if (gateCode.value === ACCESS_CODE) {
      sessionStorage.setItem(SESSION_KEY, "1");
      unlock();
    } else {
      gateError.hidden = false;
      gateCode.value = "";
      gateCode.focus();
    }
  }

  // ---------- Init ----------
  function init() {
    setupTabs();
    setupForm();
    setupPeriodo();
    setupTodosFiltros();
    document.getElementById("refreshBtn").addEventListener("click", () => loadFinanceiro());
    onTipoChange();
    loadFinanceiro();
  }

  function setupTabs() {
    document.querySelectorAll(".panel-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".panel-tab").forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".panel-panel").forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
      });
    });
  }

  // ---------- Data loading ----------
  async function loadFinanceiro() {
    try {
      const url = `${WEBHOOK_URL}?action=list_financeiro&token=${encodeURIComponent(ADMIN_TOKEN)}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.ok) {
        state.lancamentos = json.rows || [];
        renderDashboard();
        renderTodos();
      }
    } catch (err) {
      // silencioso — mantém os dados já carregados em memória
    }
  }

  // ---------- Novo / Editar Lançamento ----------
  function onTipoChange() {
    const tipoSelect = document.getElementById("finTipo");
    tipoSelect.addEventListener("change", populateCategorias);
    populateCategorias();
  }

  function populateCategorias() {
    const tipo = document.getElementById("finTipo").value;
    const catSelect = document.getElementById("finCategoria");
    const atual = catSelect.value;
    catSelect.innerHTML = '<option value="" disabled selected>Selecione</option>';
    (CATEGORIAS[tipo] || []).forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      catSelect.appendChild(opt);
    });
    if ((CATEGORIAS[tipo] || []).includes(atual)) catSelect.value = atual;
  }

  function setupForm() {
    const formaSelect = document.getElementById("finForma");
    FORMAS_PAGAMENTO.forEach((f) => {
      const opt = document.createElement("option");
      opt.value = f;
      opt.textContent = f;
      formaSelect.appendChild(opt);
    });

    const form = document.getElementById("finForm");
    const feedback = document.getElementById("finFeedback");
    const cancelBtn = document.getElementById("finCancelEdit");
    const submitBtn = form.querySelector('button[type="submit"]');

    cancelBtn.addEventListener("click", resetForm);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = {
        token: ADMIN_TOKEN,
        data: document.getElementById("finData").value,
        tipo_lancamento: document.getElementById("finTipo").value,
        categoria: document.getElementById("finCategoria").value,
        descricao: document.getElementById("finDescricao").value.trim(),
        formaPagamento: document.getElementById("finForma").value,
        valor: parseFloat(document.getElementById("finValor").value) || 0,
        observacao: document.getElementById("finObs").value.trim()
      };

      submitBtn.disabled = true;
      submitBtn.textContent = "Salvando...";

      try {
        let res;
        if (state.editingId) {
          payload.action = "update_financeiro";
          payload.id = state.editingId;
          res = await fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
        } else {
          payload.action = "create_financeiro";
          res = await fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
        }
        const json = await res.json();
        feedback.hidden = false;
        if (json.ok) {
          feedback.textContent = state.editingId ? "Lançamento atualizado!" : "Lançamento salvo com sucesso!";
          resetForm();
          loadFinanceiro();
        } else {
          feedback.textContent = "Erro ao salvar: " + (json.error || "tente novamente.");
        }
      } catch (err) {
        feedback.hidden = false;
        feedback.textContent = "Erro de conexão. Tente novamente.";
      }

      submitBtn.disabled = false;
      submitBtn.textContent = state.editingId ? "Salvar alterações" : "Salvar lançamento";
    });
  }

  function resetForm() {
    document.getElementById("finForm").reset();
    populateCategorias();
    state.editingId = null;
    document.getElementById("finFormTitle").textContent = "Novo lançamento";
    document.getElementById("finForm").querySelector('button[type="submit"]').textContent = "Salvar lançamento";
    document.getElementById("finCancelEdit").hidden = true;
  }

  function editLancamento(id) {
    const l = state.lancamentos.find((x) => String(x["ID"]) === String(id));
    if (!l) return;
    state.editingId = id;
    document.getElementById("finData").value = l["Data"] || "";
    document.getElementById("finTipo").value = l["Tipo"] || "Entrada";
    populateCategorias();
    document.getElementById("finCategoria").value = l["Categoria"] || "";
    document.getElementById("finDescricao").value = l["Descrição"] || "";
    document.getElementById("finForma").value = l["Forma de Pagamento"] || "";
    document.getElementById("finValor").value = l["Valor"] || "";
    document.getElementById("finObs").value = l["Observação"] || "";
    document.getElementById("finFormTitle").textContent = "Editar lançamento";
    document.getElementById("finForm").querySelector('button[type="submit"]').textContent = "Salvar alterações";
    document.getElementById("finCancelEdit").hidden = false;

    document.querySelectorAll(".panel-tab").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".panel-panel").forEach((p) => p.classList.remove("active"));
    document.querySelector('.panel-tab[data-tab="novo"]').classList.add("active");
    document.getElementById("tab-novo").classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteLancamento(id) {
    if (!confirm("Excluir este lançamento? Essa ação não pode ser desfeita.")) return;
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "delete_financeiro", token: ADMIN_TOKEN, id })
      });
      state.lancamentos = state.lancamentos.filter((x) => String(x["ID"]) !== String(id));
      renderDashboard();
      renderTodos();
    } catch (err) {
      alert("Não foi possível excluir agora. Tente de novo.");
    }
  }

  // ---------- Período (filtro do dashboard) ----------
  function setupPeriodo() {
    const select = document.getElementById("finPeriodo");
    const customRow = document.getElementById("finPeriodoCustom");
    select.addEventListener("change", () => {
      customRow.hidden = select.value !== "custom";
      renderDashboard();
    });
    document.getElementById("finPeriodoDe").addEventListener("change", renderDashboard);
    document.getElementById("finPeriodoAte").addEventListener("change", renderDashboard);
  }

  function getPeriodoFiltro() {
    const modo = document.getElementById("finPeriodo").value;
    const hoje = new Date();
    const y = hoje.getFullYear();
    const m = hoje.getMonth();

    if (modo === "mes-atual") {
      return { de: new Date(y, m, 1), ate: new Date(y, m + 1, 0, 23, 59, 59) };
    }
    if (modo === "mes-passado") {
      return { de: new Date(y, m - 1, 1), ate: new Date(y, m, 0, 23, 59, 59) };
    }
    if (modo === "ano") {
      return { de: new Date(y, 0, 1), ate: new Date(y, 11, 31, 23, 59, 59) };
    }
    if (modo === "custom") {
      const de = document.getElementById("finPeriodoDe").value;
      const ate = document.getElementById("finPeriodoAte").value;
      return {
        de: de ? new Date(de + "T00:00:00") : null,
        ate: ate ? new Date(ate + "T23:59:59") : null
      };
    }
    return { de: null, ate: null }; // "tudo"
  }

  function filtrarPorPeriodo(lista, periodo) {
    if (!periodo.de && !periodo.ate) return lista;
    return lista.filter((l) => {
      const d = parseData(l["Data"]);
      if (!d) return false;
      if (periodo.de && d < periodo.de) return false;
      if (periodo.ate && d > periodo.ate) return false;
      return true;
    });
  }

  function parseData(str) {
    if (!str) return null;
    const [y, m, d] = String(str).split("-");
    if (!y || !m || !d) return null;
    return new Date(Number(y), Number(m) - 1, Number(d));
  }

  // ---------- Dashboard ----------
  function renderDashboard() {
    const grid = document.getElementById("finKpiGrid");
    if (!grid) return;

    const periodo = getPeriodoFiltro();
    const filtrados = filtrarPorPeriodo(state.lancamentos, periodo);

    const entradas = filtrados.filter((l) => l["Tipo"] === "Entrada");
    const saidas = filtrados.filter((l) => l["Tipo"] === "Saída");
    const compras = filtrados.filter((l) => l["Tipo"] === "Compra");

    const totalEntradas = sumValor(entradas);
    const totalSaidas = sumValor(saidas);
    const totalCompras = sumValor(compras);
    const lucroReal = totalEntradas - totalSaidas - totalCompras;
    const margem = totalEntradas > 0 ? (lucroReal / totalEntradas) * 100 : 0;
    const ticketMedio = entradas.length > 0 ? totalEntradas / entradas.length : 0;

    // Saldo em caixa: sempre acumulado de TODOS os lançamentos, sem filtro de período
    const todasEntradas = sumValor(state.lancamentos.filter((l) => l["Tipo"] === "Entrada"));
    const todasSaidas = sumValor(state.lancamentos.filter((l) => l["Tipo"] === "Saída"));
    const todasCompras = sumValor(state.lancamentos.filter((l) => l["Tipo"] === "Compra"));
    const saldoAtual = todasEntradas - todasSaidas - todasCompras;

    grid.innerHTML = `
      <div class="fin-kpi positive"><strong>${formatCurrency(totalEntradas)}</strong><span>Total de Entradas</span></div>
      <div class="fin-kpi negative"><strong>${formatCurrency(totalSaidas)}</strong><span>Total de Saídas</span></div>
      <div class="fin-kpi negative"><strong>${formatCurrency(totalCompras)}</strong><span>Total de Compras</span></div>
      <div class="fin-kpi accent"><strong>${formatCurrency(lucroReal)}</strong><span>Lucro Real</span></div>
      <div class="fin-kpi"><strong>${margem.toFixed(1)}%</strong><span>Margem de Lucro</span></div>
      <div class="fin-kpi"><strong>${formatCurrency(ticketMedio)}</strong><span>Ticket Médio (Entrada)</span></div>
      <div class="fin-kpi"><strong>${filtrados.length}</strong><span>Nº de Lançamentos</span></div>
      <div class="fin-kpi accent"><strong>${formatCurrency(saldoAtual)}</strong><span>Saldo Atual em Caixa</span></div>
    `;

    renderCategoriaBreakdown(saidas.concat(compras));
    renderDemonstrativoMensal();
  }

  function sumValor(lista) {
    return lista.reduce((sum, l) => sum + (parseFloat(l["Valor"]) || 0), 0);
  }

  function renderCategoriaBreakdown(despesas) {
    const container = document.getElementById("finCatBreakdown");
    if (!container) return;

    const porCategoria = {};
    despesas.forEach((l) => {
      const cat = l["Categoria"] || "Sem categoria";
      porCategoria[cat] = (porCategoria[cat] || 0) + (parseFloat(l["Valor"]) || 0);
    });

    const entradas = Object.entries(porCategoria)
      .filter(([, v]) => v > 0)
      .sort((a, b) => b[1] - a[1]);

    if (entradas.length === 0) {
      container.innerHTML = `<p class="panel-empty">Nenhuma despesa no período selecionado.</p>`;
      return;
    }

    const max = entradas[0][1];
    container.innerHTML = entradas
      .map(([cat, valor]) => `
        <div class="fin-cat-bar-row">
          <div class="fin-cat-bar-label">${escapeHtml(cat)}</div>
          <div class="fin-cat-bar-track"><div class="fin-cat-bar-fill" style="width:${(valor / max) * 100}%"></div></div>
          <div class="fin-cat-bar-value">${formatCurrency(valor)}</div>
        </div>
      `)
      .join("");
  }

  function renderDemonstrativoMensal() {
    const tbody = document.getElementById("finMensalTbody");
    if (!tbody) return;

    const porMes = {};
    state.lancamentos.forEach((l) => {
      const d = parseData(l["Data"]);
      if (!d) return;
      const chave = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
      if (!porMes[chave]) porMes[chave] = { entradas: 0, saidas: 0, compras: 0, ano: d.getFullYear(), mes: d.getMonth() };
      const valor = parseFloat(l["Valor"]) || 0;
      if (l["Tipo"] === "Entrada") porMes[chave].entradas += valor;
      else if (l["Tipo"] === "Saída") porMes[chave].saidas += valor;
      else if (l["Tipo"] === "Compra") porMes[chave].compras += valor;
    });

    const chaves = Object.keys(porMes).sort().reverse();
    if (chaves.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="panel-empty">Nenhum lançamento registrado ainda.</td></tr>`;
      return;
    }

    tbody.innerHTML = chaves
      .map((chave) => {
        const m = porMes[chave];
        const lucro = m.entradas - m.saidas - m.compras;
        const margem = m.entradas > 0 ? (lucro / m.entradas) * 100 : 0;
        return `
        <tr>
          <td>${MESES[m.mes]}/${m.ano}</td>
          <td>${formatCurrency(m.entradas)}</td>
          <td>${formatCurrency(m.saidas)}</td>
          <td>${formatCurrency(m.compras)}</td>
          <td>${formatCurrency(lucro)}</td>
          <td>${margem.toFixed(1)}%</td>
        </tr>`;
      })
      .join("");
  }

  // ---------- Todos os Lançamentos ----------
  function setupTodosFiltros() {
    document.getElementById("todosFiltroTexto").addEventListener("input", renderTodos);
    document.getElementById("todosFiltroTipo").addEventListener("change", renderTodos);
  }

  function renderTodos() {
    const tbody = document.getElementById("todosTbody");
    if (!tbody) return;

    const texto = (document.getElementById("todosFiltroTexto").value || "").toLowerCase();
    const tipoFiltro = document.getElementById("todosFiltroTipo").value;

    let rows = state.lancamentos.filter((l) => {
      const matchTexto = !texto || (l["Descrição"] || "").toLowerCase().includes(texto) || (l["Categoria"] || "").toLowerCase().includes(texto);
      const matchTipo = !tipoFiltro || l["Tipo"] === tipoFiltro;
      return matchTexto && matchTipo;
    });

    rows = rows.slice().sort((a, b) => String(b["Data"]).localeCompare(String(a["Data"])));

    if (rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="panel-empty">Nenhum lançamento encontrado.</td></tr>`;
      return;
    }

    tbody.innerHTML = rows
      .map((l) => {
        const [y, m, d] = String(l["Data"] || "").split("-");
        const dataFmt = y ? `${d}/${m}/${y}` : "—";
        return `
        <tr>
          <td>${dataFmt}</td>
          <td><span class="tipo-badge tipo-${l["Tipo"]}">${escapeHtml(l["Tipo"] || "")}</span></td>
          <td>${escapeHtml(l["Categoria"] || "")}</td>
          <td>${escapeHtml(l["Descrição"] || "")}</td>
          <td>${escapeHtml(l["Forma de Pagamento"] || "")}</td>
          <td>${formatCurrency(l["Valor"])}</td>
          <td>${escapeHtml(l["Observação"] || "")}</td>
          <td class="fin-actions">
            <button type="button" data-edit="${l["ID"]}" title="Editar">✏️</button>
            <button type="button" data-delete="${l["ID"]}" title="Excluir">🗑️</button>
          </td>
        </tr>`;
      })
      .join("");

    tbody.querySelectorAll("[data-edit]").forEach((btn) => {
      btn.addEventListener("click", () => editLancamento(btn.dataset.edit));
    });
    tbody.querySelectorAll("[data-delete]").forEach((btn) => {
      btn.addEventListener("click", () => deleteLancamento(btn.dataset.delete));
    });
  }

  // ---------- Helpers ----------
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
