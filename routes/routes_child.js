/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de FILHO
 * Data: 06/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import das dependencias da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

//Criando uma instancia de uma classe do express 
const app = express()

const controller_children = require('../controller/children/controller_children.js')

app.get('/syncrobaby/child/:id', cors(), async (request, response) => {
    let userId = request.params.id
    let user = await controller_children.listChildrenByUserId(userId)

    response.status(user.status_code).json(user)
})

app.post('/syncrobaby/child', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let child = await controller_children.insertChildren(dadosBody, contentType)

    response.status(child.status_code).json(child)
})

module.exports = app