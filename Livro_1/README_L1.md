# Piratas_do_backend Livro 1
Backend básico para acompanhamento do e-book "Piratas do Backend - Navegando em Node.js, NoSQL e REST API"



## Estrutura 
`Rascunho por hora`

Livro_1/
├── cdgf/
│   ├── controllers/
│   │   └── 
│   ├── models/
│   │   └── 
│   ├── services/
│   │   └── 
│   ├── routes/
│   │   └── 
│   ├── config/
│   │   └── 
│   ├── utils/
│   │   └── 
│   └── navio.js
│   │   
│   └── contraCapa/
|       └── .pirata
├── tests/
└── package.json

- cdgf: Contém o código fonte da aplicação.
- controllers: Contém os controladores que tratam as requisições HTTP.
- models: Contém as definições dos modelos de dados.
- services: Contém a lógica de negócio da aplicação.
- routes: Define as rotas da aplicação.
- config: Contém configurações da aplicação, como conexões com bancos de dados.
- utils: Contém funções utilitárias.
- tests: Contém os testes unitários e de integração.
- .pirata: Armazena as variáveis de ambiente.
- package.json: Contém as dependências do projeto.


## Histórico de mudanças (commit)

### Livro_1: v01-INICIO: estrutura de pastas, conexão mongodb e estrutura das collections
*cdgf*
- arquivo index.js será chamado de navio.js

*cdgf/models/esquemas*
- adicionado os _Schema_ das collections criadas, `conves` e `salaTesouro`

*cdgf/config*
- configurando conexão com o mondoDB, `mongoose_conexao.js`

*cdgf/contraCapa*
- futuramente aqui será salvo as variáveis de ambiente

*tests*
- pasta destinada a futuramente possuir funções de testes para a aplicação do Livro 1



### Livro_1: v02- sem .env. MongoDB online conectado. Schema conves ok
*cdgf/contraCapa*
- Deixei de salvar no github as variáveis de ambiente para minha segurança, dado que o sistema está aberto na internet para qualquer pessoa consultar.
- bugou precisei fazer um para os tópicos abaixo, por isso v03 repete `MongoDB online conectado. Schema conves ok`

### Livro_1: v03-MongoDB online conectado. Schema conves ok
*cdgf/config*
- finalizada a conexão com o mongodb em `mongoose_conexao.js`

*cdgf/models/esquemas*
- iniciado a montagem do esquema do conves  em `conves.js` 


### Livro_1: v04-atualização nodemodules; retirado mongoDB DeprecationWarning; Schemas e mongoose.model corrigidos
* atualização do `package.json` para evitar warnings e vulnerabilidade. Além de ter sido adicionado _body-parser_ e _consign_, ambos, para uso futuro. 

    DE:
    "express": "4.19.2",
    "mongoose": "8.5.1",
    "nodemon": "^3.1.4"
    PARA:
    "body-parser": "1.20.3",
    "consign": "0.1.6",
    "express": "4.21.0",
    "mongoose": "8.5.1",
    "nodemon": "3.1.4"

*cdgf*
* mensagem de bem vindo, quando iniciar o backend, em `navio.js`

*cdgf/config*
* tentativa de retirar o warning DeprecationWarning useNewUrlParser. Aparentemente deu certo com as edições feitas no `mongoose_conxao.js`

*cdgf/models/esquemas*
`conves.js` e `salaTesouro.js`
* Correção nos Schemas criados. Estavam com o .model errado tanto na referencia usando mongoose.padrao que nem é do código quando usando dadosSchema que também não é. 
* colocado a função para inicializar um dado fantasma na collection
* externalizado o modelo, com o Schema correto, no app pelo module.exports