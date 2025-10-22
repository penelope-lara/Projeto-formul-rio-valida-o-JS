document.addEventListener('DOMContentLoaded', () => {
    // 1. Pega a referência do formulário
    const form = document.getElementById('contactForm');

    // Pega todos os campos que têm o atributo 'required'
    const requiredInputs = form.querySelectorAll('[required]');

    // 2. Adiciona o listener de submissão do formulário
    form.addEventListener('submit', (event) => {
        // Bloqueia o envio padrão do formulário
        event.preventDefault();

        validateAllFields();
    });

    /**
     * Função que itera sobre todos os campos obrigatórios e verifica se todos são válidos.
     */
    function validateAllFields() {
        let isFormValid = true;

        // Itera sobre a NodeList de campos obrigatórios
        requiredInputs.forEach(input => {
            // Chamamos a função mais simples de validação para cada campo
            const isValid = checkEmpty(input);

            // Se um campo for inválido, o formulário como um todo é inválido
            if (!isValid) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Se todos OK, faz o envio (ou simula)
            console.log('Formulário Enviado com Sucesso!');
            alert('Mensagem enviada com sucesso!');
            form.reset();
            // Opcional: Remover as bordas verdes após o reset
            requiredInputs.forEach(input => {
                input.closest('.form-group').classList.remove('success');
            });
        }
    }

    /**
     * Função Direto ao Ponto: Verifica se o campo está vazio e aplica o estilo.
     * @param {HTMLElement} input - O campo a ser validado.
     * @returns {boolean} - Retorna true se o campo estiver OK, false se estiver vazio.
     */
    function checkEmpty(input) {
        // Pega o valor e remove espaços extras
        const value = input.value.trim();

        // Pega o elemento pai para manipulação das classes de erro/sucesso
        const formGroup = input.closest('.form-group');

        // VALIDAÇÃO: CAMPO VAZIO
        if (value === '') {
            // Ação de ERRO (Borda Vermelha)
            formGroup.classList.remove('success');
            formGroup.classList.add('error');

            // Exibe a mensagem de erro (que aparece via CSS com a classe 'error')
            formGroup.querySelector('.error-message').textContent = 'campo obrigatório';

            return false;
        } else {
            // Ação de SUCESSO (Borda Verde)
            formGroup.classList.remove('error');
            formGroup.classList.add('success');

            // Garante que a mensagem de erro esteja limpa/escondida
            formGroup.querySelector('.error-message').textContent = '';

            return true;
        }
    }

    // ** MELHORIA DE UX: Validação em Tempo Real (Blur) **
    // Adiciona o listener para verificar o campo assim que o usuário sai dele.
    requiredInputs.forEach(input => {
        // Evento 'blur' é disparado quando o usuário clica fora do campo
        input.addEventListener('blur', () => {
            checkEmpty(input);
        });

        // Evento 'input' é disparado a cada tecla. 
        // Usamos para remover a borda vermelha assim que o usuário começa a corrigir.
        input.addEventListener('input', () => {
            const formGroup = input.closest('.form-group');
            // Se o campo já estava em erro, revalidamos.
            if (formGroup.classList.contains('error')) {
                checkEmpty(input);
            }
        });
    });
});