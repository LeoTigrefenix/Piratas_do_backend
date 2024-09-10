///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Backend do e-book: PIRATAS DO BACKEND - Navegando em node.js, NoSQL e REST API
//  Versão: 0.3
//  Editor: Capitão Tigrefenix
//
//****************************************************************************************************************
//  Arquivo de declaração do banco de dados. 
//      Inicialização das bibliotescas, escolha da porta de acesso e declaração dos arquivos relacionados
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// bibliotecas importadas 
const mongoose = require('mongoose')


// Declarar o caminho para conexão no banco de dados
mongoose.meuDataBase = mongoose.createConnection('');

//Função para conectar ao mongo 
let ConexaoMongo = mongoose.connection;
    ConexaoMongo.on('error', console.error.bind(console, 'Erro conexao com MongoDB:'));
    ConexaoMongo.once('open', function() {
        console.log('Conexao com MongoDB realizada com sucesso')
    });