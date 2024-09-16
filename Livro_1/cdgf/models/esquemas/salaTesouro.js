///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Backend do e-book: PIRATAS DO BACKEND - Navegando em node.js, NoSQL e REST API
//  Versão: 2.0
//  Editor: Capitão Tigrefenix
//
//****************************************************************************************************************
// Definifição do Schema da collection 'salaTesouros'
// Será armazenado os produtos NÃO comeciáveis: Mapas de navegação, Mapas de tesouro, Tesouros, moedas
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = app => {
 
  //Novo esquema para colecao  salaTesouros////////////////////////////////////
    //descrever o Schema do vetor de mapas
    const mapasSchema = new app.mongoose.Schema({    
        entrada   : { data: Date, responsavel: String},
        saida     : { data: Date, responsavel: String},
        tipo      : String, //(mapa de) rota ou tesouro
        descricao : String,
        quantidade: Number
    });
    //descrever o Schema do vetor de Tesouros
    const tesourosSchema = new app.mongoose.Schema({    
      entrada   : { data: Date, responsavel: String},
      saida     : { data: Date, responsavel: String},
      embalagem : String, //baú, caixa, barril ...
      descricao : String, 
      quantidade: Number
    });
  
    const salaTesourosSchema =  new app.mongoose.Schema({
      numeroBook  : Number,  //1º 2º 3º  
      nRegistros  : Number,  // caso seja 53 000 (aproximadamente 500bits para criar e 300bits cada)
      mapas       : [mapasSchema],  //posso usar o _id para deletar
      tesouros    : [tesourosSchema],  //posso usar o _id para deletar
      cofreMoedas : {mOuro: Number, mPrata: Number, mCobre: Number}
    });
 
    //Cria nova coleção (collection) no mongo no formato do salaTesourosSchema. Precisa terminar em 's'
      const STESOUROS = app.mongoose.online.model('salaTesouros', salaTesourosSchema);   
    //deixar acessível por outros arquivos
     

 
 /////////////////////////////////====================================================
 //Agora criar de fato a collection, fazer um dado fantasma lá para iniciar


    //ISSO NÃO É OBRIGATÓRIO, ESTOU FAZENDO PARA FACILITAR A VALIDAÇÃO QUE DEU CERTO OS PASSOS ANTERIORES
    // Função que vai verificar se o dado fantasma foi criado. 
    const criarCollection = async function(){ 

      const buscaFantasma = await STESOUROS.aggregate([
        { $match: {"numeroBook":0} },
        { $project: { _id: 0 } }
      ])
      .then(resp => {
            //LOG-------------------------------------------------------------  
              console.log("##Arq:conves.js; FUNC: criarCollection; MSG:", resp);
            //---------------------------------------------------------------   
          return resp
      })
      .catch(e => {    
            //LOG-------------------------------------------------------------  
              console.log("##Arq:salaTesouro.js; FUNC: criarCollection; MSG:");
              console.log("Erro ao criar database dados");
              console.log(" ------------------------------------- ");
              console.warn(e);
            //----------------------------------------------------------------
            return []
      })
                           
      if (buscaFantasma.length === 0 ) {          
        //LOG-------------------------------------------------------------
          console.log("##Arq:salaTesouro.js; FUNC: criarCollection; MSG:");
          console.log("Será criado a collection 'salaTEsouros' "); 
          console.log(" ------------------------------------- ");
        //----------------------------------------------------------------

        //montar valor fantastama para ininicar a collection
          const mapasFantasma = {
            entrada   : { data: new Date(), responsavel: "inicialização"},
            saida     : { data: null, responsavel: null},
            tipo      : "inicialização",
            descricao : "inicialização da coleção",
            quantidade: 0
          };

          const tesourosFantasma = {
            entrada   : { data: new Date(), responsavel: "inicialização"},
            saida     : { data: null, responsavel: null},
            tipo      : "inicialização",
            embalagem : null,
            quantidade: 0          
          };
          //ATENÇÃO QUE AQUI NAO É UM OBJETO QUALQUER, E SIM UM MODELO DO SCHEMA CRIADO
          const salaTesourosFantasma = new STESOUROS({
              numeroBook  : 0,
              nRegistros  : 0,
              mapas       : [mapasFantasma],
              tesouros    : [tesourosFantasma],
              cofreMoedas : {mOuro: 0, mPrata: 0, mCobre: 0}
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
    return {STESOUROS,consciencia}
 
}