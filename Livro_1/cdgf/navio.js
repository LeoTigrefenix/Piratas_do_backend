///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Backend do e-book: PIRATAS DO BACKEND - Navegando em node.js, NoSQL e REST API
//  Versão: 0.3
//  Editor: Capitão Tigrefenix
//
//****************************************************************************************************************
//  Arquivo principal. 
//      Inicialização das bibliotescas, escolha da porta de acesso e declaração dos arquivos relacionados
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//bibliotecas
const express = require('express');
const mongoose = require('mongoose');

//constantes
const app = express();         //variável que vai dar acesso as funções do express em todos os códigos do backend
const port = 3000;             // Porta que o servidor irá ouvir

// Conectar ao MongoDB (substitua pela sua string de conexão)
mongoose.connect('mongodb://localhost/minha_base_de_dados', { useNewUrlParser: true, useUnifiedTopology: true });

// ... Resto do seu código
