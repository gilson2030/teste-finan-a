const financeForm = document.getElementById('financeForm');
const entradasElem = document.getElementById('entradas');
const saidasElem = document.getElementById('saidas');
const totalElem = document.getElementById('total');
const financeChartCtx = document.getElementById('financesChart').getContext('2d');

// Variáveis para controlar as entradas e saídas
let entradas = 0;
let saidas = 0;

// Dados para o gráfico
let chartData = {
    labels: ['Entradas', 'Saídas'],
    datasets: [{
        data: [entradas, saidas],
        backgroundColor: ['#28a745', '#dc3545'],
        borderColor: ['#218838', '#c82333'],
        borderWidth: 1
    }]
};

const financeChart = new Chart(financeChartCtx, {
    type: 'pie',
    data: chartData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: R$ ${tooltipItem.raw.toFixed(2)}`;
                    }
                }
            }
        }
    }
});

// Função para atualizar o resumo financeiro e gráfico
function atualizarResumo() {
    entradasElem.textContent = entradas.toFixed(2);
    saidasElem.textContent = saidas.toFixed(2);
    totalElem.textContent = (entradas - saidas).toFixed(2);

    // Atualiza os dados do gráfico
    financeChart.data.datasets[0].data = [entradas, saidas];
    financeChart.update();
}

// Função para adicionar transações
financeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (valor <= 0) {
        alert('Por favor, insira um valor positivo.');
        return;
    }

    if (tipo === 'entrada') {
        entradas += valor;
    } else if (tipo === 'saida') {
        saidas += valor;
    }

    // Atualizar o resumo financeiro
    atualizarResumo();

    // Limpar o formulário
    financeForm.reset();
});
