
function openTab(evt, tabName) {
    const tabcontents = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = 'none';
    }

    const tablinks = document.getElementsByClassName('tablink');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove('active');
    }

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.tablink').click();
});


const API_URL = 'https://crudcrud.com/api/6ad05fc8739746e5a4012e7247d75299';


document.getElementById('reservaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const placa = document.getElementById('placaReserva').value.toUpperCase();
    const numeroApartamento = document.getElementById('numeroApartamentoReserva').value;
    const blocoApartamento = parseInt(document.getElementById('blocoApartamentoReserva').value.toUpperCase());
    const numeroVaga = parseInt(document.getElementById('numeroVagaReserva').value.toUpperCase());

    if (!placa.match(/^[A-Z]{3}\d{4}$/)) {
        alert('A placa deve estar nesse formato "ABC1234".');
        return;
    }

    if (isNaN(numeroVaga) || numeroVaga < 1 || numeroVaga > 100) {
        alert('O número da vaga deve estar entre 1 e 100.');
        return;
    }

    if (isNaN(numeroApartamento) || numeroApartamento <= 0) {
        alert('Número do apartamento inválido!');
        return;
    }

    const reserva = {
        placa,
        numeroApartamento,
        blocoApartamento,
        numeroVaga
    };

    fetch(`${API_URL}/reservas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reserva)
    }).then(response => response.json())
    .then(data => {
        alert('Vaga reservada com sucesso!');
        exibirReservas();
    }).catch(error => {
        console.error('Erro ao reservar vaga:', error);
    });

    document.getElementById('reservaForm').reset();
});


function exibirReservas() {
    fetch(`${API_URL}/reservas`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(reservas => {
        const listaReservas = document.getElementById('listaReservas');
        listaReservas.innerHTML = '';

        reservas.forEach((reserva, index) => {
            const li = document.createElement('li');
            li.textContent = `Vaga: ${reserva.numeroVaga}, Placa: ${reserva.placa}, Apartamento: ${reserva.numeroApartamento}, Bloco: ${reserva.blocoApartamento}`;
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.onclick = () => removerReserva(reserva._id);
            li.appendChild(btnRemover);
            listaReservas.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Erro ao listar reservas:', error);
    });
}


function removerReserva(id) {
    fetch(`${API_URL}/reservas/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        alert('Reserva removida com sucesso!');
        exibirReservas();
    })
    .catch(error => {
        console.error('Erro ao remover reserva:', error);
    });
}


document.getElementById('cadastroForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const placa = document.getElementById('placaCadastro').value.toUpperCase();
    const nomeProprietario = document.getElementById('nomeProprietario').value;
    const modeloVeiculo = document.getElementById('modeloVeiculo').value;
    const corVeiculo = document.getElementById('corVeiculo').value;

    if (!placa.match(/^[A-Z]{3}\d{4}$/)) {
        alert('A placa deve estar no formato "ABC1234".');
        return;
    }

    const veiculo = {
        placa,
        nomeProprietario,
        modeloVeiculo,
        corVeiculo
    };

    fetch(`${API_URL}/veiculos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(veiculo)
    }).then(response => response.json())
    .then(data => {
        alert('Veículo cadastrado com sucesso!');
        exibirVeiculos();
    }).catch(error => {
        console.error('Erro ao cadastrar veículo:', error);
    });

    document.getElementById('cadastroForm').reset();
});


function exibirVeiculos() {
    fetch(`${API_URL}/veiculos`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(veiculos => {
        const listaVeiculos = document.getElementById('listaVeiculos');
        listaVeiculos.innerHTML = '';

        veiculos.forEach((veiculo, index) => {
            const li = document.createElement('li');
            li.textContent = `Placa: ${veiculo.placa}, Proprietário: ${veiculo.nomeProprietario}, Modelo: ${veiculo.modeloVeiculo}, Cor: ${veiculo.corVeiculo}`;
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.onclick = () => removerVeiculo(veiculo._id);
            li.appendChild(btnRemover);
            listaVeiculos.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Erro ao listar veículos:', error);
    });
}


function removerVeiculo(id) {
    fetch(`${API_URL}/veiculos/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        alert('Veículo removido com sucesso!');
        exibirVeiculos();
    })
    .catch(error => {
        console.error('Erro ao remover veículo:', error);
    });
}


exibirVeiculos();
exibirReservas();
