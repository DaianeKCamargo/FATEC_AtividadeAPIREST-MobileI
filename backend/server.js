
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Armazenamento temporário em memória
const doacoes = [];
let proximoId = 1;

// GET: verificar se a API está funcionando
app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API REST de Doações está funcionando!',
        projeto: 'Registro de doações de tampinhas',
        status: 'online',
    });
});

// POST: registrar uma doação
app.post('/doacoes', (req, res) => {
    const { peso, localId } = req.body;

    // Validar o peso
    if (
        typeof peso !== 'number' ||
        !Number.isFinite(peso) ||
        peso <= 0
    ) {
        return res.status(400).json({
            erro: 'O peso deve ser um número maior que zero.',
        });
    }

    // Validar o identificador do ponto de coleta
    if (
        typeof localId !== 'string' ||
        localId.trim() === ''
    ) {
        return res.status(400).json({
            erro: 'O identificador do ponto de coleta é obrigatório.',
        });
    }

    // Calcular a quantidade estimada de tampinhas
    const quantidadeTampinhas = Math.round(
        (peso * 1000) / 2
    );

    const doacao = {
        id: proximoId++,
        peso,
        localId: localId.trim(),
        quantidadeTampinhas,
        data: new Date().toISOString(),
    };

    doacoes.push(doacao);

    return res.status(201).json({
        mensagem: 'Doação registrada com sucesso!',
        doacao,
    });
});

// GET: consultar todas as doações
app.get('/doacoes', (req, res) => {
    res.status(200).json({
        total: doacoes.length,
        doacoes,
    });
});

// Inicializar o servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
