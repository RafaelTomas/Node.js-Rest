const express = require('express');
const { listen } = require('express/lib/application');

const app = express();

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

app.get('/atendimentos', (req,res) => res.send('você está na rota de atendimentos!'));
