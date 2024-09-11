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


//importar constantes
const { grandemongo } = require('../contraCapa/.pirata') //online Leonardo
console.log(grandemongo)
console.log(typeof(grandemongo))

// bibliotecas importadas 
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://<usuario>:<senha>@<nome do cluster>.mongodb.net/<nome do database>?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.error(err));


