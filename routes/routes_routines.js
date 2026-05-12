/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de ROTINAS
 * Data: 12/05/2026
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

//Import das controllers de rotina
const controller_sleep = require('../controller/routines/sleep/controller_sleep.js')

//Insere rotina de SONO
app.post('/syncrobaby/routines/sleep', verifyJWT, cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let sleep = await controller_sleep.insertSleep(dadosBody, contentType)
    response.status(sleep.status_code).json(sleep)
})

//Deleta rotina de SONO
app.delete('/syncrobaby/routines/sleep/:id', verifyJWT, cors(), async (request, response) => {
    let sleepId = request.params.id

    let sleep = await controller_sleep.deleteSleep(sleepId)
    response.status(sleep.status_code).json(sleep)
})

module.exports = app