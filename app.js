/**************************************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela inicialização da API
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
***************************************************************************************************************************************************************/

//Import das dependencias da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Criando uma instancia de uma classe do express
const app = express()

const PORT = process.PORT || 8080

//Configuração de permissoes
app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*') 
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()
})

const routesChild = require('./routes/routes_child.js')

app.use(routesChild)

//Inicia a API
app.listen(PORT, function () {
    console.log('API aguardando requisições...')
})