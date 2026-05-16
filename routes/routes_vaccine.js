/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de VACINA
 * Data: 16/05/2026
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

const controller_vaccine = require('../controller/vaccine/controller_vaccine.js')

//Retorna vacinas do filho por status
app.get('/syncrobaby/vaccine/status', verifyJWT, cors(), async (request, response) => {
    let status = request.query.status
    let childId = request.query.child

    let vaccine = await controller_vaccine.listVaccineByStatus(status, childId)
    response.status(vaccine.status_code).json(vaccine)
})

//Retorna todas as vacinas
app.get('/syncrobaby/vaccine', verifyJWT, cors(), async (request, response) => {
    let vaccine = await controller_vaccine.listVaccines()
    response.status(vaccine.status_code).json(vaccine)
})

//Retorna vacinas por faixa etaria
app.get('/syncrobaby/vaccine/age/:id', verifyJWT, cors(), async (request, response) => {
    let ageGroup = request.params.id

    let vaccine = await controller_vaccine.listVaccineByAgeGroup(ageGroup)
    response.status(vaccine.status_code).json(vaccine)
})

//Atualiza status de vacinação
app.put('/syncrobaby/vaccine/status', verifyJWT, cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let vaccine = await controller_vaccine.updateStatusVaccine(dadosBody, contentType)
    response.status(vaccine.status_code).json(vaccine)
})

module.exports = app

