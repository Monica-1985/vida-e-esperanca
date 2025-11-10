/* === js/main.js === */

document.addEventListener("DOMContentLoaded", () => {
  
  // ======== 1. CONTROLE DO MENU MOBILE (COM ACESSIBILIDADE) ========
  const menuToggle = document.querySelector(".menu-toggle");
  const menuMobile = document.getElementById("menu-mobile");

  if (menuToggle && menuMobile) {
    menuToggle.addEventListener("click", () => {
      menuMobile.classList.toggle("hidden");
      
      // Verifica se o menu está visível (não tem 'hidden')
      const estaAberto = !menuMobile.classList.contains("hidden");
      
      // Atualiza o atributo ARIA para leitores de tela
      menuToggle.setAttribute("aria-expanded", estaAberto);
    });
  }

  // ======== 2. CONTROLE DO DARK MODE (COM ACESSIBILIDADE) ========
  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    const aplicarTema = (tema) => {
      if (tema === "dark") {
        document.documentElement.classList.add("dark");
        themeToggle.textContent = "☀️";
        // Atualiza o label acessível
        themeToggle.setAttribute("aria-label", "Mudar para modo claro");
      } else {
        document.documentElement.classList.remove("dark");
        themeToggle.textContent = "🌙";
        // Atualiza o label acessível
        themeToggle.setAttribute("aria-label", "Mudar para modo escuro");
      }
    };
    
    // Ao carregar, verifica o que está salvo
    const temaSalvo = localStorage.getItem("tema") || "light";
    aplicarTema(temaSalvo);

    // Adiciona o evento de clique no botão
    themeToggle.addEventListener("click", () => {
      const darkAtivo = document.documentElement.classList.toggle("dark");
      const novoTema = darkAtivo ? "dark" : "light";
      
      aplicarTema(novoTema);
      localStorage.setItem("tema", novoTema);
    });
  }

  // ======== 3. MÁSCARAS DO FORMULÁRIO (COM ACESSIBILIDADE) ========
  const formCadastro = document.getElementById('cadastro-form');
  
  if (formCadastro) { 
    const cpfInput = document.getElementById('cpf');
    const cepInput = document.getElementById('cep');
    const telefoneInput = document.getElementById('telefone');

    // MÁSCARA DE CPF: Aplicada no 'blur' (saída do campo)
    if (cpfInput) {
      cpfInput.addEventListener('blur', (e) => { // <-- MUDANÇA IMPORTANTE
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 11);
        if (value.length > 9) value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        else if (value.length > 6) value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        else if (value.length > 3) value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        e.target.value = value;
      });
    }

    // MÁSCARA DE CEP: Aplicada no 'blur'
    if (cepInput) {
      cepInput.addEventListener('blur', (e) => { // <-- MUDANÇA IMPORTANTE
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 8);
        if (value.length > 5) value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
        e.target.value = value;
      });
    }

    // MÁSCARA DE TELEFONE: Aplicada no 'blur'
    if (telefoneInput) {
      telefoneInput.addEventListener('blur', (e) => { // <-- MUDANÇA IMPORTANTE
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 11);
        if (value.length > 10) value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        else if (value.length > 6) value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        else if (value.length > 2) value = value.replace(/(\d{2})(\d{1,5})/, '($1) $2');
        else if (value.length > 0) value = value.replace(/(\d{1,2})/, '($1');
        e.target.value = value;
      });
    }
  } // Fim do if(formCadastro)
  
}); // Fim do DOMContentLoaded