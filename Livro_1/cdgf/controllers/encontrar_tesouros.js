///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Backend do e-book: PIRATAS DO BACKEND - Navegando em node.js, NoSQL e REST API
//  Versão: 2.0
//  Editor: Capitão Tigrefenix
//
//****************************************************************************************************************
//  Arquivo referente as funções de encontrar tesouros, moedas e mapas, estando misturados ou não
//      
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//importar constantes
//
//
//export
module.exports = app =>{
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Função: tesouroMisto
//
//  O que faz: Recebe uma porção de tesouros misto, entende o que é o que e salva na sala de tesouros
//
//  Tipo: POST
//
//  Espera receber:[ {descrição: STRING, quantidade: INT }, .... ]
//
//  Respostas: 
//
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const tesouroMisto = async (req, res)=>{
    console.log("req.body")
    console.log(req.body)
    //constante
        //parece formar um objeto com o vetor de dados
        const maior_chance_tesouro      = new Set(["bau","tesouro","baus","tesouros","caixa","barril","saco"]);
        const maior_chance_moeda_ouro   = new Set(["moeda","moedas","ouro","prata","cobre"]);      
        const maior_chance_mapa         = new Set(["mapa","tesouro","rota"]);
        
        
    //variaveis
        contagemDadoErrado  = 0;
        relatarErro         = [];
        relatarDescarte     = [];
    //verificação dos dados
    try {
        if(req.body.length === 0 ){
            return res.status(415).send("Tipo de dado errado")
        }
        for(let index = 0; index< req.body.length; index++){
            if(typeof(req.body[index].descricao) != "string" || typeof(req.body[index].quantidade) != "number" ){
                contagemDadoErrado++;
                console.log("req.body[index]");
                console.log(req.body[index]);

                relatarErro.push(JSON.stringify(req.body[index]));
            }
            else{
                //deixar a descrição minúscula
                    (req.body[index].descricao).toLowerCase();
                    let frase = (req.body[index].descricao).split(' ');
                //
                //analisar se tem uma ou mais palavras chaves 
                    // const resultado = frase.filter(palavra => temos_para_procurar.has(palavra));
                //
                //analisar as palavras que tem, caso a caso
                    


                    switch(frase){
                        //verifica se é um tesouro em baú, caixa, saco, barril....
                        case (frase.filter(palavra => maior_chance_tesouro.has(palavra))).length > 0:
                            console.log(req.body[index],"considerado TESOURO");
                           break;
                        //verifica se for moedas ou materiais de metal precioso
                        case (frase.filter(palavra => maior_chance_moeda_ouro.has(palavra))).length > 0:
                            console.log(req.body[index],"considerado moeda");
                            break;
                        //verifica se for mapa
                        case (frase.filter(palavra => maior_chance_mapa.has(palavra))).length > 0:
                            console.log(req.body[index],"considerado mapa");
                            break;
                        //resto
                        default:
                            //posso descartar
                            relatarDescarte.push({"material_descartado":req.body[index]});
                            break;
                    }
                  
                //

            }
        }
        //LOG-----------------------------------------------------------------------
        console.log("frase.filter(palavra => maior_chance_tesouro.has(palavra))");
        console.log(frase.filter(palavra => maior_chance_tesouro.has(palavra)));
        //-----------------------------------------------------------------------
        if(contagemDadoErrado) return res.status(200).send(`"quantiaErros":${contagemDadoErrado},"Erros":${relatarErro}`);
        else return res.status(200).send(`ok`);
    } catch (error) {
        console.warn(error)
        return res.status(400).send("bad request");
    }

    

    //análise dos dados
    //vamos verificar cada descrição


    // 415 Unsupported Media Type
    // The media format of the requested data is not supported by the server, so the server is rejecting the request.

// const mapasSchema = new app.mongoose.Schema({    
//     entrada   : { data: Date, responsavel: String},
//     saida     : { data: Date, responsavel: String},
//     tipo      : String, //(mapa de) rota ou tesouro
//     descricao : String,
//     quantidade: Number
// });
// //descrever o Schema do vetor de Tesouros
// const tesourosSchema = new app.mongoose.Schema({    
//   entrada   : { data: Date, responsavel: String},
//   saida     : { data: Date, responsavel: String},
//   embalagem : String, //baú, caixa, barril ...
//   descricao : String, 
//   quantidade: Number
// });

// const salaTesourosSchema =  new app.mongoose.Schema({
//   numeroBook  : Number,  //1º 2º 3º  
//   nRegistros  : Number,  // caso seja 53 000 (aproximadamente 500bits para criar e 300bits cada)
//   mapas       : [mapasSchema],  //posso usar o _id para deletar
//   tesouros    : [tesourosSchema],  //posso usar o _id para deletar
//   cofreMoedas : {mOuro: Number, mPrata: Number, mCobre: Number}
// });

}

return {tesouroMisto}
} 