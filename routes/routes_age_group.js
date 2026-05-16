/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de USUÁRIO
 * Data: 16/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import das dependencias da API
const express = require('express')
const cors = require('cors')
const verifyJWT = require('../middleware/verify_jwt.js')

//Criando uma instancia de uma classe do express 
const app = express()

const controller_age_group = require('../controller/age_group/controller_age_group.js')

//Retorna faixa etaria por id
app.get('/syncrobaby/age/:id', verifyJWT, cors(), async (request, response) => {
    let ageId = request.params.id

    let ageGroup = await controller_age_group.listAgeGroupById(ageId)
    response.status(ageGroup.status_code).json(ageGroup)
})

//Retorna todas as faixas etarias
app.get('/syncrobaby/age', verifyJWT, cors(), async (request, response) => {
    let ageGroup = await controller_age_group.listAllAgeGroup()
    response.status(ageGroup.status_code).json(ageGroup)
})

module.exports = app