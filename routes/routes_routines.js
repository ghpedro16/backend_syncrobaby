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
const controller_diaper = require('../controller/routines/diaper/controller_diaper.js')
const controller_bath = require('../controller/routines/bath/controller_bath.js')
const controller_medication = require('../controller/routines/medication/controller_medication.js')

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

//Insere rotina de FRALDA
app.post('/syncrobaby/routines/diaper', verifyJWT, cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let diaper = await controller_diaper.insertDiaper(dadosBody, contentType)
    response.status(diaper.status_code).json(diaper)
})

//Deleta rotina de FRALDA
app.delete('/syncrobaby/routines/diaper/:id', verifyJWT, cors(), async (request, response) => {
    let diaperId = request.params.id

    let diaper = await controller_diaper.deleteDiaper(diaperId)
    response.status(diaper.status_code).json(diaper)
})

//Insere rotina de BANHO
app.post('/syncrobaby/routines/bath', verifyJWT, cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let bath = await controller_bath.insertBath(dadosBody, contentType)
    response.status(bath.status_code).json(bath)
})

//Deleta rotina de BANHO
app.delete('/syncrobaby/routines/bath/:id', verifyJWT, cors(), async (request, response) => {
    let bathId = request.params.id

    let bath = await controller_bath.deleteBath(bathId)
    response.status(bath.status_code).json(bath)
})

//Insere rotina de MEDICAMENTO
app.post('/syncrobaby/routines/medication', verifyJWT, cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let medication = await controller_medication.insertMedication(dadosBody, contentType)
    response.status(medication.status_code).json(medication)
})

//Deleta rotina de MEDICAMENTO
app.delete('/syncrobaby/routines/medication/:id', verifyJWT, cors(), async (request, response) => {
    let medicationId = request.params.id

    let medication = await controller_medication.deleteMedication(medicationId)
    response.status(medication.status_code).json(medication)
})

module.exports = app