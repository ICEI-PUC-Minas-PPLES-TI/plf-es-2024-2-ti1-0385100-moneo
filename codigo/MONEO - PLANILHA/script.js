document.getElementById('submitDados').addEventListener('click', function() {
    const dataPagamento = document.getElementById('dataPagamento').value;
    const salario = parseFloat(document.getElementById('salario').value.replace('R$ ', '').replace(',', '.')) || 0;

    // Atualiza a data de início na exibição
    const dataInicio = document.getElementById('dataInicio').value;
    document.getElementById('dataInicioDisplay').textContent = `Data de Início: ${dataInicio}`;

    // Atualiza os valores na tabela de resumo
    document.getElementById('dataPrevistaPagamento').textContent = dataPagamento;
    document.getElementById('salarioValor').textContent = `R$ ${salario.toFixed(2)}`;

    // Adiciona uma nova linha na tabela
    const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();

    for (let i = 0; i < 5; i++) {
        const novaCelula = novaLinha.insertCell(i);
        if (i === 0) {
            novaCelula.textContent = dataPagamento;
        } else if (i === 3) {
            const valor = parseFloat(prompt("Informe o valor:").replace('R$ ', '').replace(',', '.')) || 0;
            novaCelula.textContent = valor.toFixed(2);
        } else {
            novaCelula.textContent = "clique para editar";
        }
        novaCelula.onclick = function() {
            editarCelula(novaCelula);
        };
    }

    // Atualiza o resumo
    atualizarResumo();
});

function atualizarResumo() {
    const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
    let total = 0;

    // Soma os valores da coluna "Valor"
    for (let i = 0; i < tabela.rows.length; i++) {
        total += parseFloat(tabela.rows[i].cells[3].textContent) || 0;
    }

    // Atualiza os valores do resumo
    document.getElementById('totalValor').textContent = `R$ ${total.toFixed(2)}`;
    
    // Atualiza o saldo
    const salario = parseFloat(document.getElementById('salario').value.replace('R$ ', '').replace(',', '.')) || 0;
    const saldo = salario - total;
    document.getElementById('saldoValor').textContent = `R$ ${saldo.toFixed(2)}`;
}

// Função para editar células
function editarCelula(celula) {
    const valorAtual = celula.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = valorAtual;
    celula.textContent = '';
    celula.appendChild(input);

    input.addEventListener('blur', function() {
        celula.textContent = input.value || "clique para editar";
        atualizarResumo();
    });

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            celula.textContent = input.value || "clique para editar";
            atualizarResumo();
        }
    });

    input.focus();
}
