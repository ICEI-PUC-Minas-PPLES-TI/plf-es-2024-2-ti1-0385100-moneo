/**
 * Seleciona os elementos da interface do usuário para interação.
 *
 * @result Elemento que exibirá o resultado do cálculo.
 * @btnCalculate Botão que inicia o cálculo do investimento.
 * @btnClean Botão que limpa os campos de entrada e o resultado exibido.
 */
let result = document.querySelector('#resultado');
let btnCalculate = document.querySelector('#calculate');
let btnClean = document.querySelector('#clean');




/**
 * Adiciona um evento de clique ao botão de cálculo.
 *
 * Ao clicar no botão, impede o comportamento padrão do formulário,
 * captura os valores de entrada do usuário, realiza os cálculos
 * para determinar o valor total do investimento, o valor investido
 * sem juros e o valor dos juros acumulados.
 *
 * Os resultados são então formatados e exibidos na interface do usuário.
 *
 * @param {Event} e - O evento de clique no botão de cálculo.
 */
btnCalculate.addEventListener('click', (e) => {
    e.preventDefault();


    let P = parseFloat(document.querySelector('#initial').value);
    let PMT = parseFloat(document.querySelector('#month').value);
    let r = parseFloat(document.querySelector('#rate').value) / 100;
    let t = parseInt(document.querySelector('#period').value);

    if (isNaN(P) || isNaN(PMT) || isNaN(r) || isNaN(t)) {
        result.innerHTML = '<p style="color: red;">Por favor, preencha todos os campos corretamente.</p>';
        return; // Interrompe o cálculo se algum campo estiver vazio ou inválido
    }

    let n = 12;

    let total = P * Math.pow(1 + r / n, n * t) + PMT * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));

    let investedValue = P + PMT * t * n;

    let interest = total - investedValue;

    total = total.toFixed(2).replace('.', ',');
    investedValue = investedValue.toFixed(2).replace('.', ',');
    interest = interest.toFixed(2).replace('.', ',');

    result.innerHTML = `
        <p>Valor total: R$${total}</p>
        <p>Valor investido (sem juros): R$${investedValue}</p>
        <p>Valor dos juros: R$${interest}</p>
    `;
});

/**
 * Adiciona um evento de clique ao botão de limpeza.
 *
 * Ao clicar no botão, impede o comportamento padrão do formulário
 * e limpa os campos de entrada do usuário, além de remover
 * qualquer resultado exibido na interface.
 *
 * @param {Event} e - O evento de clique no botão de limpeza.
 */
btnClean.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector('#initial').value = '';
    document.querySelector('#month').value = '';
    document.querySelector('#rate').value = '';
    document.querySelector('#period').value = '';
    result.innerHTML = '';
});
