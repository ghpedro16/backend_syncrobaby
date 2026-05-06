/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de USUÁRIO
 * Data: 06/05/2026
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

const controller_user = require('../controller/user/controller_user.js')

//Retorna Usuário
app.get('/syncrobaby/user/:id', verifyJWT, cors(), async (request, response) => {
    let userId = request.params.id
    let user = await controller_user.listUserId(userId)

    response.status(user.status_code).json(user)
})

//Login do Usuário
app.get('/syncrobaby/user/auth', cors(), async (request, response) => {
    let email = request.query.email
    let password = request.query.password

    let auth = await controller_user.listUserLogin(email, password)
    response.status(auth.status_code).json(auth)
})

//Criar um Usuário
app.post('/syncrobaby/user', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let user = await controller_user.insertUser(dadosBody, contentType)

    response.status(user.status_code).json(user)
})

//Atualiza um Usuario
app.put('/syncrobaby/user/:id', verifyJWT, cors(), bodyParserJSON, async (request, response) => {
    let idUser = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let user = await controller_user.updateUser(dadosBody, idUser, contentType)
    response.status(user.status_code).json(user)
})

module.exports = app