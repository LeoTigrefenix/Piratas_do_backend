//================================================
// interação externa
//================================================

module.exports = app => {

    //Novo esquema para colecao teste ////////////////////////////////////
       const iotSchema = new app.mongoose.Schema({    
           _h: Number,
           ll:String,  //"o" é original, "n" é nulo , "s" é substituido
           ip:  String,                        
           ct: Number,
           vt: Number,
           it: Number,
           ht: Number,
           tab: Number,
           cons:Number,
           auh: Number,
           aur: Number,
           sto: Number,
           ha:  Number,
           hb:  Number,
           iha: Number,
           ihb: Number,
           ta:  Number,
           tb:  Number,
           ita: Number,
           itb: Number,
           sb:  Number,
           vca: Number,
           vcb: Number,
           iva: Number,
           ivb: Number,
           ca:  Number,
           cb:  Number,
           ica: Number,
           icb: Number,
           irh: Number,
           ago: Number,    
           vp1: {                          
               1: Number,
               2: Number,
               3: Number,
               4: Number,
               5: Number,
               6: Number,
               7: Number,
               8: Number, 
               9: Number,
               10: Number,
               11: Number,
               12: Number,
               13: Number,
               14: Number,
               15: Number,
               16: Number      
               
           },   
           cp1: {                          
             1: Number,
             2: Number,
             3: Number,
             4: Number,
             5: Number,
             6: Number,
             7: Number,
             8: Number,
             9: Number,
           10: Number,
           11: Number,
           12: Number,
           13: Number,
           14: Number,
           15: Number,
           16: Number   
         },
         hp1: {                          
           1: Number,
           2: Number,
           3: Number,
           4: Number,
           5: Number,
           6: Number,
           7: Number,
           8: Number,
           9: Number,
           10: Number,
           11: Number,
           12: Number,
           13: Number,
           14: Number,
           15: Number,
           16: Number  
       },
         tp1: {                          
           1: Number,
           2: Number,
           3: Number,
           4: Number,
           5: Number,
           6: Number,
           7: Number,
           8: Number 
       },
       sb1: String
       });
     
   
       const dadoSchema =  new app.mongoose.Schema({
         _id: String,
         apo: String,
         ip:  String,
         ts:  String,
         cab: {        
             ia:  String, 
             sn:  String, 
             mcu: String,
             afe: String,
             sna: String,
             id:  String, 
             n1:  String, 
             emp: String, 
             set: String,
             mod: String, 
             st:  String, 
             sr:  String,
             nt:  String,
             cp:  String,
             cc:  String,
             rc:  String,
             fw:  String,
             lat: String,
             long: String
         },
         iot: [iotSchema]
       });
   
    //CRIA O BANCO  dados NO MONGO
    const Dados = app.mongoose.padrao.model('dados', dadoSchema);   //Cria nova coleção no mongo no formato do dadosSchema
   
   /////////////////////////////////====================================================
   //VAI CRIAR O BANCO DE DADOS donos
   
       const Hunico = async function(){ 
                   const retorno = await Dados.aggregate([
                       { $match: {"_id": '90-0'}},
                       { $unwind: '$iot'},
                       { $sort: { 'iot._h': -1 }}, 
                       { $limit: 1 }
                       /*{ $project: { 'iot.ct': 1, '_id': 0 }}*/
                     ]).then(resp => { return resp })
                   .catch(e => {
                       if(process.env.NODE_ENV =='gnomo'|| process.env.NODE_ENV =='gnomo'){
                         console.log(" ");
                         console.log("##Arq:dados.js; FUNC: - ocorre ao iniciar backend; MSG:");console.log("Erro ao criar database dados");
                         console.log(" ");
                       console.log(e);};
                       return 500
                   })
                                            
       if (retorno.length > 0 ) {          
               ///teste//////////////////////////
               if(process.env.NODE_ENV =='gnomo'|| process.env.NODE_ENV =='gnomo'){
                 console.log(" ");
               console.log("##Arq:dados.js; FUNC: - ocorre ao iniciar backend; MSG:");
               console.log("database 'dados' OK");   
               console.log(" ");
               }
               ///////////////////////////////
          
       } else { //se nao existe, registra novo DB no sistema
       
         ///teste//////////////////////////
           if(process.env.NODE_ENV =='gnomo'|| process.env.NODE_ENV =='gnomo'){
             console.log(" ");
             console.log("##Arq:dados.js; FUNC: - ocorre ao iniciar backend; MSG:");
             console.log("FOI CRIADO AGORA O DATABASE 'dados'  ---- OK!"); 
             console.log(" ");
          }
         ///////////////////////////////
   
            const fantasma = new Dados({
               _id: '90-0',
               apo: 'fantasma',
               ip:  '0',
               ts:  new  Date(),
               cab: {  
                   ia:  '0', 
                   sn:  '0', 
                   mcu: '0',               
                   id: '0',
                   n1:  '0', 
                   emp: "vazio", 
                   set: "vazio",
                   mod: "vazio", 
                   st:  'D', 
                   sr:  '0', 
                   tb:  '0',
                   qb:  '0',
                   cp:  '0',                
                   rc:  '0',
                   fw:  '0',
                   lat: "-7.21189",
                   long: "-36.6294"
               },
               iot: [hzero]
             });
   
             fantasma.save()
   
                  //Efetua backup da acao no mongo ///////////////////////////////////
           const transf = {
               nome: 'dados',
               caminho: 'colecoes/razao/dados',
               status: 'Ativo',
               datacriacao: new Date(),
               movido: null
           }
            const fazerhistoria = app.api.mongo.historicoRegDB.criaHistorico(transf);
   
       }
       return retorno
       }
     const consciencia = Hunico();      