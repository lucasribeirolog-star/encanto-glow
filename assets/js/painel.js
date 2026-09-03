// ===== Encanto Glow — Painel Interno =====
(function () {
  const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby_1KixFPNg8exeGzPzu3WaCbRQlt8gB-iIUmZNfFyKqZ5u7aEq42gd_EAG2lzFZ46e/exec";
  const ADMIN_TOKEN = "ec40038a41c77584f3367385";
  const ACCESS_CODE = "EncantoGlow2026";
  const SESSION_KEY = "encantoGlowPanelUnlocked";

  const state = { agendamentos: [], editingId: null, produtos: [], editingProdutoId: null, resultados: [], editingResultadoId: null, cadastros: [] };
  let calState = { year: new Date().getFullYear(), month: new Date().getMonth() };
  const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const DOWS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

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

  // ---------- Init (só roda após desbloquear) ----------
  function init() {
    populateProcedimentos();
    setupTabs();
    setupAgendaForm();
    setupCalendar();
    setupTodos();
    setupPaciente();
    setupProdutoForm();
    setupResultadoForm();
    document.getElementById("refreshBtn").addEventListener("click", () => {
      loadAgendamentos();
      loadProdutos();
      loadResultados();
      loadCadastros();
    });
    renderCalendar();
    renderTodos();
    loadAgendamentos();
    loadProdutos();
    loadResultados();
    loadCadastros();
  }

  function populateProcedimentos() {
    const select = document.getElementById("agProcedimento");
    if (!select || typeof TREATMENTS === "undefined") return;
    TREATMENTS.forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t.name;
      opt.textContent = t.name;
      select.appendChild(opt);
    });
    const outro = document.createElement("option");
    outro.value = "Outro";
    outro.textContent = "Outro";
    select.appendChild(outro);
  }

  // ---------- Tabs ----------
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
  async function loadAgendamentos(showFeedback) {
    try {
      const url = `${WEBHOOK_URL}?action=list_agendamentos&token=${encodeURIComponent(ADMIN_TOKEN)}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.ok) {
        state.agendamentos = json.rows || [];
        renderCalendar();
        renderTodos();
        renderPacienteResultados();
        renderTodosPacientes();
      }
    } catch (err) {
      // silencioso — mantém os dados já carregados em memória
    }
  }

  // Cadastros vem do formulário público (cadastro.html) — é a lista de
  // pacientes que já preencheram o cadastro. Usado tanto pra restringir o
  // agendamento a pacientes cadastrados quanto pra montar a lista completa
  // de pacientes na aba "Buscar Paciente".
  async function loadCadastros() {
    try {
      const url = `${WEBHOOK_URL}?action=list_cadastros&token=${encodeURIComponent(ADMIN_TOKEN)}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.ok) {
        state.cadastros = json.rows || [];
        populateAgendaPacienteSelect();
        renderPacienteResultados();
        renderTodosPacientes();
      }
    } catch (err) {
      // silencioso — mantém os dados já carregados em memória
    }
  }

  // Alguns cadastros salvam o telefone com o "55" (código do Brasil) na
  // frente e outros não — sem normalizar isso, o mesmo paciente cadastrado
  // duas vezes de formas diferentes pareceria duas pessoas distintas.
  function normalizePhone(str) {
    let digits = (str || "").toString().replace(/\D/g, "");
    if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) {
      digits = digits.slice(2);
    }
    return digits;
  }

  // Monta as opções do seletor "Paciente cadastrado" no Novo Agendamento,
  // uma por telefone único (se o mesmo telefone tiver mais de um cadastro,
  // usa o mais recente) — assim o agendamento só pode ser feito pra quem já
  // preencheu o formulário.
  function populateAgendaPacienteSelect() {
    const select = document.getElementById("agNome");
    if (!select) return;
    const valorAtual = select.value;

    const porChave = {};
    state.cadastros.forEach((c) => {
      if (!c["Nome"]) return; // cadastro incompleto, sem nome — não dá pra agendar assim
      const tel = normalizePhone(c["Telefone"]);
      const chave = tel || "nome:" + normalize(c["Nome"]);
      const atual = porChave[chave];
      if (!atual || String(c["Data/Hora"]) > String(atual["Data/Hora"])) {
        porChave[chave] = c;
      }
    });
    const unicos = Object.keys(porChave)
      .map((chave) => ({ chave, cadastro: porChave[chave] }))
      .sort((a, b) => normalize(a.cadastro["Nome"]).localeCompare(normalize(b.cadastro["Nome"])));

    select.innerHTML =
      `<option value="" disabled${valorAtual ? "" : " selected"}>Selecione um paciente</option>` +
      unicos
        .map(({ chave, cadastro: c }) => {
          const nome = c["Nome"] || "";
          const tel = c["Telefone"] || "";
          return `<option value="${escapeHtml(chave)}" data-nome="${escapeHtml(nome)}" data-telefone="${escapeHtml(tel)}" data-email="${escapeHtml(c["Email"] || "")}">${escapeHtml(nome)}${tel ? " — " + escapeHtml(tel) : ""}</option>`;
        })
        .join("");

    if (valorAtual && select.querySelector(`option[value="${CSS.escape(valorAtual)}"]`)) {
      select.value = valorAtual;
    }
  }

  // ---------- Novo / Editar Agendamento ----------
  function setupAgendaForm() {
    const form = document.getElementById("agendaForm");
    const feedback = document.getElementById("agendaFeedback");
    const cancelBtn = document.getElementById("agCancelEdit");
    const nomeSelect = document.getElementById("agNome");

    if (cancelBtn) cancelBtn.addEventListener("click", resetAgendaForm);

    nomeSelect.addEventListener("change", () => {
      const opt = nomeSelect.selectedOptions[0];
      document.getElementById("agTelefone").value = (opt && opt.dataset.telefone) || "";
      document.getElementById("agEmail").value = (opt && opt.dataset.email) || "";
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      feedback.hidden = true;

      const opt = nomeSelect.selectedOptions[0];
      const nomePaciente = (opt && opt.dataset.nome) || "";
      if (!nomePaciente) {
        feedback.hidden = false;
        feedback.textContent = "Selecione um paciente cadastrado.";
        return;
      }

      const payload = {
        token: ADMIN_TOKEN,
        nome: nomePaciente,
        telefone: document.getElementById("agTelefone").value.trim(),
        email: document.getElementById("agEmail").value.trim(),
        procedimento: document.getElementById("agProcedimento").value,
        dataConsulta: document.getElementById("agData").value,
        horario: document.getElementById("agHorario").value,
        valor: document.getElementById("agValor").value,
        status: document.getElementById("agStatus").value,
        observacao: document.getElementById("agObs").value.trim(),
      };
      if (state.editingId) {
        payload.action = "update_agendamento";
        payload.id = state.editingId;
      } else {
        payload.tipo = "agendamento";
      }

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Salvando...";

      try {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        feedback.hidden = false;
        if (json.ok) {
          feedback.textContent = state.editingId ? "Agendamento atualizado!" : "Agendamento salvo com sucesso!";
          resetAgendaForm();
          loadAgendamentos();
        } else {
          feedback.textContent = "Erro ao salvar: " + (json.error || "tente novamente.");
        }
      } catch (err) {
        feedback.hidden = false;
        feedback.textContent = "Erro de conexão. Tente novamente.";
      }

      btn.disabled = false;
      btn.textContent = state.editingId ? "Salvar alterações" : "Salvar agendamento";
    });
  }

  function resetAgendaForm() {
    document.getElementById("agendaForm").reset();
    state.editingId = null;
    populateAgendaPacienteSelect(); // remove qualquer opção temporária injetada por uma edição anterior
    document.getElementById("agTelefone").value = "";
    document.getElementById("agEmail").value = "";
    const title = document.getElementById("agFormTitle");
    if (title) title.textContent = "Novo agendamento";
    document.getElementById("agendaForm").querySelector('button[type="submit"]').textContent = "Salvar agendamento";
    const cancelBtn = document.getElementById("agCancelEdit");
    if (cancelBtn) cancelBtn.hidden = true;
  }

  function editAgendamento(id) {
    const ag = state.agendamentos.find((a) => String(a["ID"]) === String(id));
    if (!ag) return;
    state.editingId = id;

    const select = document.getElementById("agNome");
    const tel = normalizePhone(ag["Telefone"]);
    const chave = tel || "nome:" + normalize(ag["Nome"]);
    let opt = select.querySelector(`option[value="${CSS.escape(chave)}"]`);
    if (!opt) {
      // agendamento antigo (ou paciente sem cadastro correspondente) — mantém
      // o nome visível mesmo assim, numa opção temporária só pra essa edição
      opt = document.createElement("option");
      opt.value = chave;
      opt.dataset.nome = ag["Nome"] || "";
      opt.dataset.telefone = ag["Telefone"] || "";
      opt.dataset.email = ag["Email"] || "";
      opt.textContent = (ag["Nome"] || "Paciente sem cadastro") + " (sem cadastro)";
      select.insertBefore(opt, select.options[1] || null);
    }
    select.value = chave;

    document.getElementById("agTelefone").value = ag["Telefone"] || "";
    document.getElementById("agEmail").value = ag["Email"] || "";
    document.getElementById("agProcedimento").value = ag["Procedimento"] || "";
    document.getElementById("agData").value = ag["Data da Consulta"] || "";
    document.getElementById("agHorario").value = ag["Horário"] || "";
    document.getElementById("agValor").value = ag["Valor"] || "";
    document.getElementById("agStatus").value = ag["Status"] || "Agendado";
    document.getElementById("agObs").value = ag["Observação"] || "";

    const title = document.getElementById("agFormTitle");
    if (title) title.textContent = "Editar agendamento";
    document.getElementById("agendaForm").querySelector('button[type="submit"]').textContent = "Salvar alterações";
    const cancelBtn = document.getElementById("agCancelEdit");
    if (cancelBtn) cancelBtn.hidden = false;

    document.querySelectorAll(".panel-tab").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".panel-panel").forEach((p) => p.classList.remove("active"));
    document.querySelector('.panel-tab[data-tab="novo"]').classList.add("active");
    document.getElementById("tab-novo").classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteAgendamento(id) {
    if (!confirm("Excluir este agendamento? Essa ação não pode ser desfeita.")) return;
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "delete_agendamento", token: ADMIN_TOKEN, id }),
      });
      state.agendamentos = state.agendamentos.filter((a) => String(a["ID"]) !== String(id));
      renderCalendar();
      renderTodos();
      renderPacienteResultados();
      renderTodosPacientes();
    } catch (err) {
      alert("Não foi possível excluir agora. Tente de novo.");
    }
  }

  // ---------- Calendário ----------
  function setupCalendar() {
    document.getElementById("calPrev").addEventListener("click", () => {
      calState.month--;
      if (calState.month < 0) { calState.month = 11; calState.year--; }
      renderCalendar();
    });
    document.getElementById("calNext").addEventListener("click", () => {
      calState.month++;
      if (calState.month > 11) { calState.month = 0; calState.year++; }
      renderCalendar();
    });
  }

  function pad2(n) { return String(n).padStart(2, "0"); }

  function renderCalendar() {
    const grid = document.getElementById("calGrid");
    if (!grid) return;
    document.getElementById("calTitle").textContent = `${MESES[calState.month]} ${calState.year}`;

    const countByDay = {};
    state.agendamentos.forEach((ag) => {
      const d = ag["Data da Consulta"];
      if (typeof d === "string" && d.startsWith(`${calState.year}-${pad2(calState.month + 1)}`)) {
        countByDay[d] = (countByDay[d] || 0) + 1;
      }
    });

    let html = DOWS.map((d) => `<div class="panel-cal-dow">${d}</div>`).join("");

    const firstDay = new Date(calState.year, calState.month, 1).getDay();
    const daysInMonth = new Date(calState.year, calState.month + 1, 0).getDate();
    const todayStr = new Date().toISOString().slice(0, 10);

    for (let i = 0; i < firstDay; i++) {
      html += `<div class="panel-cal-day empty"></div>`;
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${calState.year}-${pad2(calState.month + 1)}-${pad2(day)}`;
      const count = countByDay[dateStr] || 0;
      const isToday = dateStr === todayStr;
      html += `<div class="panel-cal-day${isToday ? " today" : ""}" data-date="${dateStr}">
        ${day}
        ${count ? `<span class="panel-cal-badge">${count}</span>` : ""}
      </div>`;
    }

    grid.innerHTML = html;
    grid.querySelectorAll(".panel-cal-day:not(.empty)").forEach((cell) => {
      cell.addEventListener("click", () => showDayDetails(cell.dataset.date));
    });
  }

  function showDayDetails(dateStr) {
    document.querySelectorAll(".panel-cal-day").forEach((c) => c.classList.remove("selected"));
    const cell = document.querySelector(`.panel-cal-day[data-date="${dateStr}"]`);
    if (cell) cell.classList.add("selected");

    const dayCard = document.getElementById("calDayCard");
    const list = document.getElementById("calDayList");
    const [y, m, d] = dateStr.split("-");
    document.getElementById("calDayTitle").textContent = `Agendamentos em ${d}/${m}/${y}`;

    const items = state.agendamentos.filter((ag) => ag["Data da Consulta"] === dateStr);
    if (items.length === 0) {
      list.innerHTML = `<p class="panel-empty">Nenhum agendamento neste dia.</p>`;
    } else {
      list.innerHTML = items
        .sort((a, b) => String(a["Horário"]).localeCompare(String(b["Horário"])))
        .map(
          (ag) => `
        <div class="panel-list-item">
          <div>
            <div class="name">${ag["Horário"] || "--:--"} — ${escapeHtml(ag["Nome"])}</div>
            <div class="meta">${escapeHtml(ag["Procedimento"] || "")} · ${escapeHtml(ag["Telefone"] || "")}</div>
          </div>
          <span class="status-${ag["Status"]}">${ag["Status"] || ""}</span>
        </div>`
        )
        .join("");
    }
    dayCard.hidden = false;
  }

  // ---------- Todos os Agendamentos ----------
  function setupTodos() {
    document.getElementById("todosFiltro").addEventListener("input", renderTodos);
    document.getElementById("todosStatusFiltro").addEventListener("change", renderTodos);
  }

  function renderTodos() {
    const tbody = document.getElementById("todosTbody");
    if (!tbody) return;
    const filtro = (document.getElementById("todosFiltro").value || "").toLowerCase();
    const statusFiltro = document.getElementById("todosStatusFiltro").value;

    let rows = state.agendamentos.filter((ag) => {
      const matchNome = (ag["Nome"] || "").toLowerCase().includes(filtro);
      const matchStatus = !statusFiltro || ag["Status"] === statusFiltro;
      return matchNome && matchStatus;
    });

    rows = rows.slice().sort((a, b) => String(b["Data da Consulta"]).localeCompare(String(a["Data da Consulta"])));

    if (rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="panel-empty">Nenhum agendamento encontrado.</td></tr>`;
      return;
    }

    tbody.innerHTML = rows
      .map((ag) => {
        const [y, m, d] = String(ag["Data da Consulta"] || "").split("-");
        const dataFmt = y ? `${d}/${m}/${y}` : "—";
        return `
        <tr>
          <td>${dataFmt}</td>
          <td>${escapeHtml(ag["Horário"] || "")}</td>
          <td>${escapeHtml(ag["Nome"] || "")}</td>
          <td>${escapeHtml(ag["Telefone"] || "")}</td>
          <td>${escapeHtml(ag["Procedimento"] || "")}</td>
          <td>${formatCurrency(ag["Valor"])}</td>
          <td>
            <select class="panel-status-select" data-id="${ag["ID"]}">
              <option value="Agendado" ${ag["Status"] === "Agendado" ? "selected" : ""}>Agendado</option>
              <option value="Concluído" ${ag["Status"] === "Concluído" ? "selected" : ""}>Concluído</option>
              <option value="Cancelado" ${ag["Status"] === "Cancelado" ? "selected" : ""}>Cancelado</option>
            </select>
          </td>
          <td class="fin-actions">
            <button type="button" class="btn btn-ghost" data-edit="${ag["ID"]}" title="Editar" style="padding:0.4rem 0.7rem; font-size:0.78rem;">✏️ Editar</button>
            <button type="button" class="btn btn-ghost" data-delete="${ag["ID"]}" title="Excluir" style="padding:0.4rem 0.7rem; font-size:0.78rem; color:#b3261e; border-color:#b3261e;">🗑️ Excluir</button>
          </td>
        </tr>`;
      })
      .join("");

    tbody.querySelectorAll(".panel-status-select").forEach((sel) => {
      sel.addEventListener("change", () => updateAgendamentoStatus(sel.dataset.id, sel.value));
    });
    tbody.querySelectorAll("[data-edit]").forEach((btn) => {
      btn.addEventListener("click", () => editAgendamento(btn.dataset.edit));
    });
    tbody.querySelectorAll("[data-delete]").forEach((btn) => {
      btn.addEventListener("click", () => deleteAgendamento(btn.dataset.delete));
    });
  }

  async function updateAgendamentoStatus(id, status) {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "update_agendamento", token: ADMIN_TOKEN, id, status }),
      });
      const ag = state.agendamentos.find((a) => String(a["ID"]) === String(id));
      if (ag) ag["Status"] = status;
      renderPacienteResultados();
      renderTodosPacientes();
    } catch (err) {
      alert("Não foi possível atualizar o status agora. Tente de novo.");
    }
  }

  // ---------- Buscar Paciente ----------
  function setupPaciente() {
    document.getElementById("pacienteBusca").addEventListener("input", renderPacienteResultados);
  }

  function normalize(str) {
    return (str || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
  }

  // Unifica Cadastros (formulário público) + Agendamentos num único registro
  // por paciente, agrupando pelo telefone (normalizado, só dígitos) — assim
  // um mesmo paciente com o nome digitado de formas diferentes em cada
  // visita ainda aparece como uma pessoa só. Quando falta telefone, agrupa
  // pelo nome normalizado como retaguarda.
  function buildPacientesUnificados() {
    const mapa = {};
    function chaveFor(nome, telefone) {
      const tel = normalizePhone(telefone);
      return tel ? "tel:" + tel : "nome:" + normalize(nome);
    }
    function garantir(nome, telefone, email) {
      const chave = chaveFor(nome, telefone);
      if (!mapa[chave]) {
        mapa[chave] = { chave, nome: nome || "", telefone: telefone || "", email: email || "", cadastros: [], visitas: [] };
      }
      if (nome) mapa[chave].nome = nome;
      if (telefone) mapa[chave].telefone = telefone;
      if (email) mapa[chave].email = email;
      return mapa[chave];
    }

    state.cadastros.forEach((c) => {
      garantir(c["Nome"], c["Telefone"], c["Email"]).cadastros.push(c);
    });
    state.agendamentos.forEach((ag) => {
      garantir(ag["Nome"], ag["Telefone"], ag["Email"]).visitas.push(ag);
    });

    return Object.values(mapa);
  }

  function renderPacienteCard(paciente) {
    const concluidas = paciente.visitas.filter((v) => v["Status"] === "Concluído");
    const totalGasto = concluidas.reduce((sum, v) => sum + (parseFloat(v["Valor"]) || 0), 0);
    const procedimentos = [...new Set(concluidas.map((v) => v["Procedimento"]).filter(Boolean))];
    const visitasOrdenadas = paciente.visitas
      .slice()
      .sort((a, b) => String(b["Data da Consulta"]).localeCompare(String(a["Data da Consulta"])));
    const duplicado = paciente.cadastros.length > 1;

    return `
    <div class="panel-patient-card">
      <div class="panel-patient-head">
        <div>
          <h3>${escapeHtml(paciente.nome) || "(sem nome)"}${duplicado ? ` <span class="tipo-badge tipo-Duplicidade" title="Encontramos ${paciente.cadastros.length} cadastros com esse telefone">⚠️ Cadastro duplicado (${paciente.cadastros.length}x)</span>` : ""}</h3>
          <span>${escapeHtml(paciente.telefone || "")}${paciente.email ? " · " + escapeHtml(paciente.email) : ""}</span>
        </div>
      </div>
      <div class="panel-stats">
        <div class="panel-stat"><strong>${paciente.visitas.length}</strong><span>Agendamentos</span></div>
        <div class="panel-stat"><strong>${concluidas.length}</strong><span>Visitas concluídas</span></div>
        <div class="panel-stat"><strong>${formatCurrency(totalGasto)}</strong><span>Total gasto</span></div>
        <div class="panel-stat"><strong>${procedimentos.length}</strong><span>Procedimentos distintos</span></div>
      </div>
      ${procedimentos.length ? `<p style="margin-bottom:1rem; font-size:0.88rem; color:var(--ink-soft);"><strong>Procedimentos realizados:</strong> ${procedimentos.map(escapeHtml).join(", ")}</p>` : ""}
      ${
        visitasOrdenadas.length === 0
          ? `<p class="panel-empty" style="padding:1rem;">Cadastrado, ainda sem agendamentos.</p>`
          : `<div class="panel-list">
        ${visitasOrdenadas
          .map((v) => {
            const [y, m, d] = String(v["Data da Consulta"] || "").split("-");
            const dataFmt = y ? `${d}/${m}/${y}` : "—";
            return `
          <div class="panel-list-item">
            <div>
              <div class="name">${dataFmt} ${v["Horário"] ? "às " + v["Horário"] : ""} — ${escapeHtml(v["Procedimento"] || "")}</div>
              <div class="meta">${formatCurrency(v["Valor"])}</div>
            </div>
            <span class="status-${v["Status"]}">${v["Status"] || ""}</span>
          </div>`;
          })
          .join("")}
      </div>`
      }
    </div>`;
  }

  function renderPacienteResultados() {
    const container = document.getElementById("pacienteResultados");
    if (!container) return;
    const termo = normalize(document.getElementById("pacienteBusca").value);

    if (!termo) {
      container.innerHTML = `<p class="panel-empty">Digite o nome de um paciente para ver o histórico.</p>`;
      return;
    }

    const lista = buildPacientesUnificados().filter((p) => normalize(p.nome).includes(termo));
    if (lista.length === 0) {
      container.innerHTML = `<p class="panel-empty">Nenhum paciente encontrado com esse nome.</p>`;
      return;
    }

    container.innerHTML = lista.map(renderPacienteCard).join("");
  }

  // Lista completa de pacientes (cadastrados e/ou com agendamentos), sempre
  // visível abaixo da busca, com aviso de cadastros duplicados (mesmo
  // telefone aparecendo mais de uma vez em Cadastros).
  function renderTodosPacientes() {
    const container = document.getElementById("pacienteTodos");
    if (!container) return;

    const todos = buildPacientesUnificados().sort((a, b) => normalize(a.nome).localeCompare(normalize(b.nome)));

    if (todos.length === 0) {
      container.innerHTML = `<p class="panel-empty">Nenhum paciente cadastrado ainda.</p>`;
    } else {
      container.innerHTML = todos.map(renderPacienteCard).join("");
    }

    const duplicados = todos.filter((p) => p.cadastros.length > 1);
    const aviso = document.getElementById("pacienteDuplicidadeAviso");
    if (aviso) {
      if (duplicados.length > 0) {
        aviso.hidden = false;
        aviso.textContent = `⚠️ ${duplicados.length} paciente(s) com cadastro duplicado (mesmo telefone em mais de um cadastro) — veja o aviso no card de cada um.`;
      } else {
        aviso.hidden = true;
      }
    }
  }

  // ---------- Helpers ----------
  function formatCurrency(val) {
    const n = parseFloat(val);
    if (!val || isNaN(n)) return "—";
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  // ---------- Produtos (Loja) ----------
  async function loadProdutos() {
    try {
      const url = `${WEBHOOK_URL}?action=list_produtos&token=${encodeURIComponent(ADMIN_TOKEN)}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.ok) {
        state.produtos = json.rows || [];
        renderProdutos();
      }
    } catch (err) {
      // silencioso — mantém os dados já carregados em memória
    }
  }

  function setupProdutoForm() {
    const form = document.getElementById("prodForm");
    if (!form) return;
    const feedback = document.getElementById("prodFeedback");
    const cancelBtn = document.getElementById("prodCancelEdit");

    cancelBtn.addEventListener("click", resetProdutoForm);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = {
        token: ADMIN_TOKEN,
        nome: document.getElementById("prodNome").value.trim(),
        descricao: document.getElementById("prodDescricao").value.trim(),
        preco: parseFloat(document.getElementById("prodPreco").value) || 0,
        imagemUrl: document.getElementById("prodImagem").value.trim(),
        peso: parseFloat(document.getElementById("prodPeso").value) || 0,
        altura: parseFloat(document.getElementById("prodAltura").value) || 0,
        largura: parseFloat(document.getElementById("prodLargura").value) || 0,
        comprimento: parseFloat(document.getElementById("prodComprimento").value) || 0,
        estoque: parseInt(document.getElementById("prodEstoque").value, 10) || 0,
        ativo: document.getElementById("prodAtivo").checked,
      };
      if (state.editingProdutoId) {
        payload.action = "update_produto";
        payload.id = state.editingProdutoId;
      } else {
        payload.action = "create_produto";
      }

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Salvando...";

      try {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        feedback.hidden = false;
        if (json.ok) {
          feedback.textContent = state.editingProdutoId ? "Produto atualizado!" : "Produto salvo com sucesso!";
          resetProdutoForm();
          loadProdutos();
        } else {
          feedback.textContent = "Erro ao salvar: " + (json.error || "tente novamente.");
        }
      } catch (err) {
        feedback.hidden = false;
        feedback.textContent = "Erro de conexão. Tente novamente.";
      }

      btn.disabled = false;
      btn.textContent = state.editingProdutoId ? "Salvar alterações" : "Salvar produto";
    });
  }

  function resetProdutoForm() {
    document.getElementById("prodForm").reset();
    document.getElementById("prodAtivo").checked = true;
    state.editingProdutoId = null;
    document.getElementById("prodFormTitle").textContent = "Novo produto";
    document.getElementById("prodForm").querySelector('button[type="submit"]').textContent = "Salvar produto";
    document.getElementById("prodCancelEdit").hidden = true;
  }

  function editProduto(id) {
    const p = state.produtos.find((x) => String(x["ID"]) === String(id));
    if (!p) return;
    state.editingProdutoId = id;
    document.getElementById("prodNome").value = p["Nome"] || "";
    document.getElementById("prodDescricao").value = p["Descrição"] || "";
    document.getElementById("prodPreco").value = p["Preço"] || "";
    document.getElementById("prodImagem").value = p["Imagem URL"] || "";
    document.getElementById("prodPeso").value = p["Peso (kg)"] || "";
    document.getElementById("prodAltura").value = p["Altura (cm)"] || "";
    document.getElementById("prodLargura").value = p["Largura (cm)"] || "";
    document.getElementById("prodComprimento").value = p["Comprimento (cm)"] || "";
    document.getElementById("prodEstoque").value = p["Estoque"] || "";
    document.getElementById("prodAtivo").checked = p["Ativo"] === true || String(p["Ativo"]).toLowerCase() === "true";

    document.getElementById("prodFormTitle").textContent = "Editar produto";
    document.getElementById("prodForm").querySelector('button[type="submit"]').textContent = "Salvar alterações";
    document.getElementById("prodCancelEdit").hidden = false;

    document.querySelectorAll(".panel-tab").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".panel-panel").forEach((p2) => p2.classList.remove("active"));
    document.querySelector('.panel-tab[data-tab="produtos"]').classList.add("active");
    document.getElementById("tab-produtos").classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteProduto(id) {
    if (!confirm("Excluir este produto? Essa ação não pode ser desfeita.")) return;
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "delete_produto", token: ADMIN_TOKEN, id }),
      });
      state.produtos = state.produtos.filter((x) => String(x["ID"]) !== String(id));
      renderProdutos();
    } catch (err) {
      alert("Não foi possível excluir agora. Tente de novo.");
    }
  }

  function renderProdutos() {
    const tbody = document.getElementById("prodTbody");
    if (!tbody) return;

    if (state.produtos.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="panel-empty">Nenhum produto cadastrado ainda.</td></tr>`;
      return;
    }

    tbody.innerHTML = state.produtos
      .map((p) => {
        const ativo = p["Ativo"] === true || String(p["Ativo"]).toLowerCase() === "true";
        const img = p["Imagem URL"] ? `<img src="${escapeHtml(p["Imagem URL"])}" alt="" style="width:42px; height:42px; object-fit:cover; border-radius:8px;">` : "—";
        return `
        <tr>
          <td>${img}</td>
          <td>${escapeHtml(p["Nome"] || "")}</td>
          <td>${formatCurrency(p["Preço"])}</td>
          <td>${escapeHtml(String(p["Estoque"] != null ? p["Estoque"] : ""))}</td>
          <td>${ativo ? "✅" : "🚫"}</td>
          <td class="fin-actions">
            <button type="button" class="btn btn-ghost" data-edit-produto="${p["ID"]}" style="padding:0.4rem 0.7rem; font-size:0.78rem;">✏️ Editar</button>
            <button type="button" class="btn btn-ghost" data-delete-produto="${p["ID"]}" style="padding:0.4rem 0.7rem; font-size:0.78rem; color:#b3261e; border-color:#b3261e;">🗑️ Excluir</button>
          </td>
        </tr>`;
      })
      .join("");

    tbody.querySelectorAll("[data-edit-produto]").forEach((btn) => {
      btn.addEventListener("click", () => editProduto(btn.dataset.editProduto));
    });
    tbody.querySelectorAll("[data-delete-produto]").forEach((btn) => {
      btn.addEventListener("click", () => deleteProduto(btn.dataset.deleteProduto));
    });
  }

  // ---------- Resultados (Fotos) ----------

  // Reduz a foto (a maioria dos celulares tira em 3-4MB+) para no máximo
  // 1600px de largura e converte para JPEG, pra não pesar demais no envio
  // nem no armazenamento do Drive. Devolve uma data URL ("data:image/jpeg;base64,...").
  function compressImageFile(file, maxWidth, quality) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round(height * (maxWidth / width));
            width = maxWidth;
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = () => reject(new Error("Não foi possível ler a imagem."));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
      reader.readAsDataURL(file);
    });
  }

  async function loadResultados() {
    try {
      const url = `${WEBHOOK_URL}?action=list_resultados&token=${encodeURIComponent(ADMIN_TOKEN)}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.ok) {
        state.resultados = json.rows || [];
        renderResultados();
      }
    } catch (err) {
      // silencioso — mantém os dados já carregados em memória
    }
  }

  function setupResultadoForm() {
    const form = document.getElementById("resForm");
    if (!form) return;
    const feedback = document.getElementById("resFeedback");
    const cancelBtn = document.getElementById("resCancelEdit");
    const fileInput = document.getElementById("resArquivo");
    const previewWrap = document.getElementById("resPreviewWrap");
    const previewImg = document.getElementById("resPreview");

    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) {
        previewWrap.hidden = true;
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.src = e.target.result;
        previewWrap.hidden = false;
      };
      reader.readAsDataURL(file);
    });

    cancelBtn.addEventListener("click", resetResultadoForm);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      feedback.hidden = true;

      const payload = {
        token: ADMIN_TOKEN,
        tag: document.getElementById("resTag").value.trim(),
        legenda: document.getElementById("resLegenda").value.trim(),
        ordem: parseInt(document.getElementById("resOrdem").value, 10) || 0,
        ativo: document.getElementById("resAtivo").checked,
      };

      const file = fileInput.files[0];
      if (file) {
        try {
          const dataUrl = await compressImageFile(file, 1600, 0.85);
          payload.imagemBase64 = dataUrl.split(",")[1];
          payload.mimeType = "image/jpeg";
          payload.fileName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
        } catch (err) {
          feedback.hidden = false;
          feedback.textContent = "Não foi possível processar essa imagem. Tente outra foto.";
          return;
        }
      } else if (!state.editingResultadoId) {
        feedback.hidden = false;
        feedback.textContent = "Selecione uma foto para enviar.";
        return;
      }

      if (state.editingResultadoId) {
        payload.action = "update_resultado";
        payload.id = state.editingResultadoId;
      } else {
        payload.action = "create_resultado";
      }

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Enviando...";

      try {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        feedback.hidden = false;
        if (json.ok) {
          feedback.textContent = state.editingResultadoId ? "Foto atualizada!" : "Foto adicionada com sucesso!";
          resetResultadoForm();
          loadResultados();
        } else {
          feedback.textContent = "Erro ao salvar: " + (json.error || "tente novamente.");
        }
      } catch (err) {
        feedback.hidden = false;
        feedback.textContent = "Erro de conexão. Tente novamente.";
      }

      btn.disabled = false;
      btn.textContent = state.editingResultadoId ? "Salvar alterações" : "Salvar foto";
    });
  }

  function resetResultadoForm() {
    document.getElementById("resForm").reset();
    document.getElementById("resAtivo").checked = true;
    document.getElementById("resPreviewWrap").hidden = true;
    state.editingResultadoId = null;
    document.getElementById("resFormTitle").textContent = "Nova foto de resultado";
    document.getElementById("resForm").querySelector('button[type="submit"]').textContent = "Salvar foto";
    document.getElementById("resCancelEdit").hidden = true;
  }

  function editResultado(id) {
    const r = state.resultados.find((x) => String(x["ID"]) === String(id));
    if (!r) return;
    state.editingResultadoId = id;
    document.getElementById("resTag").value = r["Tag"] || "";
    document.getElementById("resLegenda").value = r["Legenda"] || "";
    document.getElementById("resOrdem").value = r["Ordem"] || "";
    document.getElementById("resAtivo").checked = r["Ativo"] === true || String(r["Ativo"]).toLowerCase() === "true";
    document.getElementById("resArquivo").value = "";

    const previewWrap = document.getElementById("resPreviewWrap");
    const previewImg = document.getElementById("resPreview");
    if (r["Imagem URL"]) {
      previewImg.src = r["Imagem URL"];
      previewWrap.hidden = false;
    } else {
      previewWrap.hidden = true;
    }

    document.getElementById("resFormTitle").textContent = "Editar foto de resultado";
    document.getElementById("resForm").querySelector('button[type="submit"]').textContent = "Salvar alterações";
    document.getElementById("resCancelEdit").hidden = false;

    document.querySelectorAll(".panel-tab").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".panel-panel").forEach((p2) => p2.classList.remove("active"));
    document.querySelector('.panel-tab[data-tab="resultados"]').classList.add("active");
    document.getElementById("tab-resultados").classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteResultado(id) {
    if (!confirm("Excluir esta foto? Essa ação não pode ser desfeita.")) return;
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "delete_resultado", token: ADMIN_TOKEN, id }),
      });
      state.resultados = state.resultados.filter((x) => String(x["ID"]) !== String(id));
      renderResultados();
    } catch (err) {
      alert("Não foi possível excluir agora. Tente de novo.");
    }
  }

  function renderResultados() {
    const tbody = document.getElementById("resTbody");
    if (!tbody) return;

    if (state.resultados.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="panel-empty">Nenhuma foto cadastrada ainda.</td></tr>`;
      return;
    }

    const sorted = state.resultados.slice().sort((a, b) => (a["Ordem"] || 0) - (b["Ordem"] || 0));

    tbody.innerHTML = sorted
      .map((r) => {
        const ativo = r["Ativo"] === true || String(r["Ativo"]).toLowerCase() === "true";
        const img = r["Imagem URL"] ? `<img src="${escapeHtml(r["Imagem URL"])}" alt="" style="width:42px; height:42px; object-fit:cover; border-radius:8px;">` : "—";
        return `
        <tr>
          <td>${img}</td>
          <td>${escapeHtml(r["Tag"] || "")}</td>
          <td>${escapeHtml(r["Legenda"] || "")}</td>
          <td>${escapeHtml(String(r["Ordem"] != null ? r["Ordem"] : ""))}</td>
          <td>${ativo ? "✅" : "🚫"}</td>
          <td class="fin-actions">
            <button type="button" class="btn btn-ghost" data-edit-resultado="${r["ID"]}" style="padding:0.4rem 0.7rem; font-size:0.78rem;">✏️ Editar</button>
            <button type="button" class="btn btn-ghost" data-delete-resultado="${r["ID"]}" style="padding:0.4rem 0.7rem; font-size:0.78rem; color:#b3261e; border-color:#b3261e;">🗑️ Excluir</button>
          </td>
        </tr>`;
      })
      .join("");

    tbody.querySelectorAll("[data-edit-resultado]").forEach((btn) => {
      btn.addEventListener("click", () => editResultado(btn.dataset.editResultado));
    });
    tbody.querySelectorAll("[data-delete-resultado]").forEach((btn) => {
      btn.addEventListener("click", () => deleteResultado(btn.dataset.deleteResultado));
    });
  }
})();
