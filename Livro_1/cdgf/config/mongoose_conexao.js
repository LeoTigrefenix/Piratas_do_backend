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
 
// bibliotecas importadas 
 const mongoose = require('mongoose')
//----------------------------------------------------------------------------------------------------------------- 
try{
    //importar constantes
    const { meu_mongo_online } = require("../contraCapa/.pirata") //link de conexão online, não esquecer de liberar IP

    //To fix all deprecation warnings, follow the below steps:
    //versões antigas do mongoose        
        // mongoose.set('useNewUrlParser', true);
        // mongoose.set('useFindAndModify', false);
        // mongoose.set('useCreateIndex', true);
        // mongoose.set('useUnifiedTopology', true);
    //obs
        // !!! By default, mongoose.connect() mongoose.createConnection() will print out the DeprecationWarning warning !! (https://mongoosejs.com/docs/5.x/docs/deprecations.html)
        //aparentemente consegui tira-lo !!!!!!!
    
    //estabelecendo conexão 
        mongoose.online =  mongoose.createConnection(meu_mongo_online);    

        //LOG---------------------------------------------------------------------------------------------------------
            console.log('------------------------------------------------------------------------------------- ');
            console.log('MongoDB Conetado');
            console.log('------------------------------------------------------------------------------------- ');
        //------------------------------------------------------------------------------------------------------------

}catch(error){
    //LOG
        console.log('MongoDB Não conectado! Problema com a importação da variável de endereço online ou na conexão')
        console.error(error);
}

    
