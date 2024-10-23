document.getElementById('adicionarLinha').addEventListener('click', function() {
    const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
    
    for (let i = 0; i < 3; i++) {
        const novaCelula = novaLinha.insertCell(i);
        novaCelula.textContent = "Clique para editar";
        novaCelula.onclick = function() {
            editarCelula(novaCelula);
        };
    }
});

function editarCelula(celula) {
    const valorAtual = celula.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = valorAtual;
    celula.textContent = '';
    celula.appendChild(input);

    input.addEventListener('blur', function() {
        celula.textContent = input.value || "Clique para editar";
    });

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            celula.textContent = input.value || "Clique para editar";
        }
    });

    input.focus();
}
