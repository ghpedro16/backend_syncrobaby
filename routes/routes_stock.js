/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de ESTOQUE
 * Data: 13/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import das dependencias da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const verifyJWT = require('../middleware/verify_jwt.js')

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

//Criando uma instancia de uma classe do express 
const app = express()

const controller_stock = require('../controller/stock/controller_stock.js')

//Retorna estoque por id do FILHO
app.get('/syncrobaby/stock/child/:id', verifyJWT, cors(), async (request, response) => {
    let childId = request.params.id
    
    let stock = await controller_stock.listStockByIdChild(childId)

    response.status(stock.status_code).json(stock)
})

//Retorna estoque por id do FILHO filtrando por id do TIPO PRODUTO
app.get('/syncrobaby/stock/type', verifyJWT, cors(), async (request, response) => {
    let childId = request.query.child
    let typeId = request.query.type
    
    let stock = await controller_stock.listStockByType(childId, typeId)

    response.status(stock.status_code).json(stock)
})

//Insere novo produto em estoque
app.post('/syncrobaby/stock', verifyJWT, cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let stock = await controller_stock.insertStock(dadosBody, contentType)
    response.status(stock.status_code).json(stock)
})

//Deleta produto do estoque
app.delete('/syncrobaby/stock/:id', verifyJWT, cors(), async (request, response) => {
    let stockId = request.params.id
    
    let stock = await controller_stock.deleteStock(stockId)

    response.status(stock.status_code).json(stock)
})

module.exports = app