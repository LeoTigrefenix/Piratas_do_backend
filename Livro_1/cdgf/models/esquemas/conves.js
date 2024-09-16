///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Backend do e-book: PIRATAS DO BACKEND - Navegando em node.js, NoSQL e REST API
//  Versão: 2.0
//  Editor: Capitão Tigrefenix
//
//****************************************************************************************************************
// Definifição do Schema da collection 'conves'
// Será armazenado os produtos comeciáveis: Comida, bebida e animais
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = app => {
 
    //Novo esquema para colecao  conves////////////////////////////////////
      //descrever o Schema do vetor de animais
      const animaisSchema = new app.mongoose.Schema({    
          entrada   : { data: Date, responsavel: String},
          saida     : { data: Date, responsavel: String},
          especie   : String,
          descricao : String,
          quantidade: Number
      });
      //descrever o Schema do vetor de comida e também de bebida
      const comidaBebidaSchema = new app.mongoose.Schema({    
        entrada   : { data: Date, responsavel: String},
        saida     : { data: Date, responsavel: String},
        embalagem : String, //caixa, barril, saco, tonel, garrafa, fardo...
        descricao : String, //tomate, cebola, batata, farinha, água, rum 
        quantidade: Number
      });
    
      const convesSchema =  new app.mongoose.Schema({
        numeroBook : Number,  //1º 2º 3º  
        nRegistros : Number,  // caso seja 53 000 (aproximadamente 500 para criar e 300 cada)
        comida     : [comidaBebidaSchema],  //posso usar o _id para deletar
        bebidas    : [comidaBebidaSchema],  //posso usar o _id para deletar
        animais    : [animaisSchema]        //posso usar o _id para deletar
      });
   
      //Cria nova coleção (collection) no mongo no formato do convesSchema. Precisa terminar em 's'
        const CONVES = app.mongoose.online.model('conves', convesSchema);   
      
  /////////////////////////////////====================================================
  /////////////////////////////////====================================================
  //Agora criar de fato a collection, fazer um dado fantasma lá para iniciar

  //ISSO NÃO É OBRIGATÓRIO, ESTOU FAZENDO PARA FACILITAR A VALIDAÇÃO QUE DEU CERTO OS PASSOS ANTERIORES
  
 

    // Função que vai verificar se o dado fantasma foi criado. 
      const criarCollection = async function(){ 

        const buscaFantasma = await CONVES.aggregate([
          { $match: {"numeroBook":0} },
          { $project: { _id: 0 } }
        ])
        .then(resp => { 
          //LOG-------------------------------------------------------------  
            console.log("##Arq:conves.js; FUNC: criarCollection; MSG:", resp);
          //---------------------------------------------------------------   
          return resp })
        .catch(e => {    
              //LOG-------------------------------------------------------------  
                console.log("##Arq:conves.js; FUNC: criarCollection; MSG:");
                console.log("Erro ao criar database dados");
                console.log(" ------------------------------------- ");
                console.warn(e);
              //----------------------------------------------------------------
              return []
        })
                            
        if (buscaFantasma.length === 0 ) {          
          //LOG-------------------------------------------------------------
            console.log("##Arq:conves.js; FUNC: criarCollection; MSG:");
            console.log("Será criado a collection 'conves' "); 
            console.log(" ------------------------------------- ");
          //----------------------------------------------------------------

          //montar valor fantastama para ininicar a collection
            const animaisFantasma  = {
              entrada   : { data: new Date(), responsavel: "inicialização"},
              saida     : { data: null, responsavel: null},
              especie   : null,
              descricao : "inicialização da coleção",
              quantidade: 0
            };
                                                            
            const comidaBebidaFantasma = {
              entrada   : { data: new Date(), responsavel: "inicialização"},
              saida     : { data: null, responsavel: null},              
              embalagem : null,
              descricao : "inicialização",
              quantidade: 0          
            };
            //ATENÇÃO QUE AQUI NAO É UM OBJETO QUALQUER, E SIM UM MODELO DO SCHEMA CRIADO
            const salaTesourosFantasma = new CONVES({
                numeroBook  : 0,
                nRegistros  : 0,
                comida      : [comidaBebidaFantasma],
                bebidas     : [comidaBebidaFantasma],
                animais     : [animaisFantasma],
                
            });
          //Salvar valor fantasma na collection, criando-a
          //A collection será visível no MongoDB após a inserção do primeiro documento.
            salaTesourosFantasma.save()
        }
        return 
      }
  //chamar a constante para ativar a função 
    const consciencia = criarCollection();  

  //deixar acessível por outros arquivos
    return {CONVES,consciencia}
}
  //RASCUNHO
  // //*/*/*/*/--
  // // nesse caso
  // module.exports = CONVES; //usarei futuramente !
  // const CONVES = require('../Livro_1/cdgf/models/esquemas/conves.js'); // COMO não subi para o app ele é requerido assim 
  // //*/*/*/*/--