///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Backend do e-book: PIRATAS DO BACKEND - Navegando em node.js, NoSQL e REST API
//  Versão: 2.0
//  Editor: Capitão Tigrefenix
//
//****************************************************************************************************************
//  Arquivo de declaração do banco de dados. 
//      Inicialização das bibliotescas, escolha da porta de acesso e declaração dos arquivos relacionados
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//importar constantes
const { meu_mongo_online } = require('../contraCapa/.pirata') //link de conexão online, não esquecer de liberar IP


// bibliotecas importadas 
const mongoose = require('mongoose')

//To fix all deprecation warnings, follow the below steps:
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

// !!! By default, mongoose.connect() mongoose.createConnection() will print out the DeprecationWarning warning !! (https://mongoosejs.com/docs/5.x/docs/deprecations.html)
//aparentemente consegui tira-lo !!!!!!!

mongoose.createConnection(meu_mongo_online)
.then(() => console.log('MongoDB Conetado'))
.catch(err => console.error(err));

