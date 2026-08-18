// ===== Encanto Glow — formulário de cadastro (área do cliente) =====
(function () {
  const WHATSAPP_NUMBER = "5515992809088";
  const SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby_1KixFPNg8exeGzPzu3WaCbRQlt8gB-iIUmZNfFyKqZ5u7aEq42gd_EAG2lzFZ46e/exec";
  const form = document.getElementById("leadForm");
  if (!form) return;

  const referrerField = document.getElementById("referrerField");
  const referrerInput = document.getElementById("leadReferrer");
  const feedback = document.getElementById("leadFormFeedback");
  const procedureSelect = document.getElementById("leadProcedure");

  if (procedureSelect && typeof TREATMENTS !== "undefined") {
    TREATMENTS.forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t.name;
      opt.textContent = t.name;
      procedureSelect.appendChild(opt);
    });
    const outroOpt = document.createElement("option");
    outroOpt.value = "Outro / ainda não sei";
    outroOpt.textContent = "Outro / ainda não sei";
    procedureSelect.appendChild(outroOpt);
  }

  form.querySelectorAll('input[name="indicacao"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      const isSim = form.querySelector('input[name="indicacao"]:checked').value === "sim";
      referrerField.hidden = !isSim;
      referrerInput.required = isSim;
      if (!isSim) referrerInput.value = "";
    });
  });

  function saveLeadLocally(data) {
    try {
      const leads = JSON.parse(localStorage.getItem("encantoGlowLeads") || "[]");
      leads.push(data);
      localStorage.setItem("encantoGlowLeads", JSON.stringify(leads));
    } catch (err) {
      // localStorage indisponível — segue apenas o envio via WhatsApp
    }
  }

  function saveLeadToSheet(data) {
    if (!SHEET_WEBHOOK_URL) return;
    fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    }).catch(() => {
      // Falha silenciosa — o cadastro ainda segue pelo WhatsApp normalmente
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const indicacaoChecked = form.querySelector('input[name="indicacao"]:checked').value;
    const data = {
      nome: form.nome.value.trim(),
      telefone: form.telefone.value.trim(),
      email: form.email.value.trim(),
      cidade: form.cidade.value.trim(),
      indicacao: indicacaoChecked === "sim" ? "Sim" : "Não",
      quemIndicou: indicacaoChecked === "sim" ? form.quemIndicou.value.trim() : "",
      procedimento: procedureSelect ? procedureSelect.value : "",
      observacao: form.observacao ? form.observacao.value.trim() : "",
      dataEnvio: new Date().toISOString(),
    };

    saveLeadLocally(data);
    saveLeadToSheet(data);

    const lines = [
      "Olá! Gostaria de agendar uma avaliação na Encanto Glow. 💉",
      "",
      "*Cadastro — Área do Cliente*",
      `Nome: ${data.nome}`,
      `Telefone: ${data.telefone}`,
      `E-mail: ${data.email}`,
      `Cidade: ${data.cidade}`,
      `Indicação: ${data.indicacao}${data.quemIndicou ? " — " + data.quemIndicou : ""}`,
      `Procedimento de interesse: ${data.procedimento}`,
    ];
    if (data.observacao) {
      lines.push(`Observação: ${data.observacao}`);
    }
    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener");

    if (feedback) {
      feedback.hidden = false;
      feedback.textContent = "Cadastro enviado! Abrimos o WhatsApp com seus dados prontos — é só confirmar o envio por lá.";
    }

    form.reset();
    referrerField.hidden = true;
  });
})();
