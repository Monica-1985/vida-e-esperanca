// Aguarda o carregamento completo do DOM para garantir que os elementos existam
document.addEventListener('DOMContentLoaded', function() {

    // Seleciona os campos pelos IDs
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');

    // Adiciona o listener de BLUR para o campo de CPF
    if (cpfInput) {
        // <-- CORREÇÃO AQUI
        cpfInput.addEventListener('blur', function(e) { 
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            value = value.replace(/(\d{3})(\d)/, '$1.$2'); 
            value = value.replace(/(\d{3})(\d)/, '$1.$2'); 
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
            e.target.value = value.slice(0, 14); 
        });
    }

    // Adiciona o listener de BLUR para o campo de Telefone
    if (telefoneInput) {
        // <-- CORREÇÃO AQUI
        telefoneInput.addEventListener('blur', function(e) { 
            let value = e.target.value.replace(/\D/g, ''); 
            value = value.replace(/^(\d{2})(\d)/, '($1) $2'); 
            value = value.replace(/(\d{5})(\d)/, '$1-$2'); 
            e.target.value = value.slice(0, 15); 
        });
    }

    // Adiciona o listener de BLUR para o campo de CEP
    if (cepInput) {
        // <-- CORREÇÃO AQUI
        cepInput.addEventListener('blur', function(e) { 
            let value = e.target.value.replace(/\D/g, ''); 
            value = value.replace(/(\d{5})(\d)/, '$1-$2'); 
            e.target.value = value.slice(0, 9); 
        });
    }

});