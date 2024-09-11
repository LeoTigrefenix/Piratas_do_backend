//================================================
// interação externa
//================================================

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
        const Dados = app.mongoose.padrao.model('conves', dadoSchema);   

   
   /////////////////////////////////====================================================
    //Agora criar de fato a collection, fazer um dado fantasma lá para iniciar
   
}