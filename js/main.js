/* === js/main.js === */
/* Este script será usado em TODAS as suas páginas HTML */

document.addEventListener("DOMContentLoaded", () => {
  
  // ======== 1. CONTROLE DO MENU MOBILE ========
  const menuToggle = document.querySelector(".menu-toggle");
  const menuMobile = document.getElementById("menu-mobile");

  if (menuToggle && menuMobile) {
    menuToggle.addEventListener("click", () => {
      menuMobile.classList.toggle("hidden");
    });
  }

  // ======== 2. CONTROLE DO DARK MODE ========
  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    // Ao carregar, verifica o que está salvo no localStorage
    const temaSalvo = localStorage.getItem("tema") || "light";
    if (temaSalvo === "dark") {
      // Aplica a classe 'dark' no <html> (necessário para o Tailwind)
      document.documentElement.classList.add("dark"); 
      themeToggle.textContent = "☀️";
    } else {
      document.documentElement.classList.remove("dark");
      themeToggle.textContent = "🌙";
    }

    // Adiciona o evento de clique no botão
    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      const darkAtivo = document.documentElement.classList.contains("dark");
      themeToggle.textContent = darkAtivo ? "☀️" : "🌙";
      localStorage.setItem("tema", darkAtivo ? "dark" : "light");
    });
  }

  // ======== 3. MÁSCARAS DO FORMULÁRIO DE CADASTRO ========
  // (Este código SÓ vai rodar se encontrar o formulário)
  const formCadastro = document.getElementById('cadastro-form');
  
  if (formCadastro) { 
    // Seleciona os inputs pelo ID
    const cpfInput = document.getElementById('cpf');
    const cepInput = document.getElementById('cep');
    const telefoneInput = document.getElementById('telefone');

    // Máscara de CPF: 000.000.000-00
    if (cpfInput) {
      cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 11);
        if (value.length > 9) value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        else if (value.length > 6) value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        else if (value.length > 3) value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        e.target.value = value;
      });
    }

    // Máscara de CEP: 00000-000
    if (cepInput) {
      cepInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 8);
        if (value.length > 5) value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
        e.target.value = value;
      });
    }

    // Máscara de Telefone: (00) 90000-0000
    if (telefoneInput) {
      telefoneInput.addEventListener('input', (e) => {
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