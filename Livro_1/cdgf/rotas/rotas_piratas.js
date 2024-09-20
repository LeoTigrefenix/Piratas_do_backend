

module.exports = app => {

    //ROTA DOS TEROUROS--------------------------------------------------------------------------------
    app.route("/mixDeTesouros")
        .post(app.cdgf.controllers.encontrarTesouros.tesouroMisto)
        // Livro_1\cdgf\controllers\encontrarTesouros.js

    //-------------------------------------------------------------------------------------------------

}



//OBSERVAÇÃO
//colocar depois um JWT e até um barer só para validar o cabeçalho das requisições 
//como o básico não aborda isso então é melhor finalizar o básico primeiro