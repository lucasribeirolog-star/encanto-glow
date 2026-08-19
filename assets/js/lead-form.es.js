// ===== Encanto Glow — formulario de registro (área del cliente) — ES =====
(function () {
  const SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby_1KixFPNg8exeGzPzu3WaCbRQlt8gB-iIUmZNfFyKqZ5u7aEq42gd_EAG2lzFZ46e/exec";
  const form = document.getElementById("leadForm");
  if (!form) return;

  const referrerField = document.getElementById("referrerField");
  const referrerInput = document.getElementById("leadReferrer");
  const feedback = document.getElementById("leadFormFeedback");
  const procedureSelect = document.getElementById("leadProcedure");
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitBtnDefaultText = submitBtn ? submitBtn.textContent : "";

  if (procedureSelect && typeof TREATMENTS !== "undefined") {
    TREATMENTS.forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t.name;
      opt.textContent = t.name;
      procedureSelect.appendChild(opt);
    });
    const outroOpt = document.createElement("option");
    outroOpt.value = "Otro / aún no lo sé";
    outroOpt.textContent = "Otro / aún no lo sé";
    procedureSelect.appendChild(outroOpt);
  }

  const cpfInput = document.getElementById("leadCpf");
  if (cpfInput) {
    cpfInput.addEventListener("input", () => {
      let digits = cpfInput.value.replace(/\D/g, "").slice(0, 11);
      let formatted = digits;
      if (digits.length > 9) formatted = digits.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
      else if (digits.length > 6) formatted = digits.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
      else if (digits.length > 3) formatted = digits.replace(/(\d{3})(\d{1,3})/, "$1.$2");
      cpfInput.value = formatted;
    });
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
      // localStorage no disponible — continúa de todas formas
    }
  }

  async function saveLeadToSheet(data) {
    if (!SHEET_WEBHOOK_URL) return { ok: false };
    try {
      const res = await fetch(SHEET_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      return { ok: false };
    }
  }

  form.addEventListener("submit", async (e) => {
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
      dataNascimento: form.dataNascimento.value,
      cpf: form.cpf.value.trim(),
      endereco: form.endereco.value.trim(),
      indicacao: indicacaoChecked === "sim" ? "Sim" : "Não",
      quemIndicou: indicacaoChecked === "sim" ? form.quemIndicou.value.trim() : "",
      procedimento: procedureSelect ? procedureSelect.value : "",
      observacao: form.observacao ? form.observacao.value.trim() : "",
      dataEnvio: new Date().toISOString(),
    };

    saveLeadLocally(data);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
    }

    const result = await saveLeadToSheet(data);

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = submitBtnDefaultText;
    }

    if (feedback) {
      feedback.hidden = false;
      if (result && result.ok) {
        feedback.textContent = "¡Registro enviado con éxito! Pronto nos pondremos en contacto.";
      } else {
        feedback.textContent = "No fue posible enviar en este momento. Inténtalo de nuevo en unos instantes.";
      }
    }

    if (result && result.ok) {
      form.reset();
      referrerField.hidden = true;
    }
  });
})();
