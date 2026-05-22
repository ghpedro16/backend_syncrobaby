/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de HISTORICO DE MEDIDAS
 * Data: 14/05/2026
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

const controller_measures = require('../controller/measures/controller_measures.js')

//Retorna altura do filho
app.get('/syncrobaby/measures/height/:id', verifyJWT, cors(), async (request, response) => {
    let childId = request.params.id

    let child = await controller_measures.listHeightByChildId(childId)
    response.status(child.status_code).json(child)
})

//Retorna peso do filho
app.get('/syncrobaby/measures/weight/:id', verifyJWT, cors(), async (request, response) => {
    let childId = request.params.id

    let child = await controller_measures.listWeightByChildId(childId)
    response.status(child.status_code).json(child)
})

//Retorna IMC do filho
app.get('/syncrobaby/measures/bmi/:id', verifyJWT, cors(), async (request, response) => {
    let childId = request.params.id

    let child = await controller_measures.listBmiByChildId(childId)
    response.status(child.status_code).json(child)
})

//Retorna perimetro cefalico do filho
app.get('/syncrobaby/measures/head/:id', verifyJWT, cors(), async (request, response) => {
    let childId = request.params.id

    let child = await controller_measures.listHeadCircumferenceByChildId(childId)
    response.status(child.status_code).json(child)
})

//Insere novas medidas do filho
app.post('/syncrobaby/measures', verifyJWT, cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let measures = await controller_measures.insertMeasures(dadosBody, contentType)
    response.status(measures.status_code).json(measures)
})

module.exports = app