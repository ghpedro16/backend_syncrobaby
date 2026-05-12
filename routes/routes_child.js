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
const verifyJWT = require('../middleware/verify_jwt.js')

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

//Criando uma instancia de uma classe do express 
const app = express()

const controller_children = require('../controller/children/controller_children.js')

//Retorna filho por ID
app.get('/syncrobaby/child/:id', verifyJWT, cors(), async (request, response) => {
    let childId = request.params.id
    let userId = request.user.userID
    let user = await controller_children.listChildren(childId, userId)

    response.status(user.status_code).json(user)
})

//Retorna filhos do Usuario
app.get('/syncrobaby/user/child', verifyJWT, cors(), async (request, response) => {
    let userId = request.user.userID
    let user = await controller_children.listChildrenByUserId(userId)

    response.status(user.status_code).json(user)
})

//Retorna filhos desativados do Usuario
app.get('/syncrobaby/user/child/deactivate', verifyJWT, cors(), async (request, response) => {
    let userId = request.user.userID
    let user = await controller_children.listDeactivateChildren(userId)

    response.status(user.status_code).json(user)
})

//Insere novo filho
app.post('/syncrobaby/child', verifyJWT, cors(), bodyParserJSON, async (request, response) => {
    let idUser = request.user.userID
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let child = await controller_children.insertChildren(dadosBody, idUser, contentType)

    response.status(child.status_code).json(child)
})

//Atualiza perfil do filho
app.put('/syncrobaby/child/:id', verifyJWT, cors(), bodyParserJSON, async function (request, response){
    let idChild = request.params.id
    let dadosBody = request.body
    dadosBody.fk_id_guardian = request.user.userID
    let contentType = request.headers['content-type']

    let child = await controller_children.updateChildren(idChild, dadosBody, contentType)
    response.status(child.status_code).json(child)
})

//Desativa perfil do filho
app.patch('/syncrobaby/child/deactivate/:id', verifyJWT, cors(), bodyParserJSON, async function (request, response){
    let idChild = request.params.id
    let dadosBody = request.body
    dadosBody.fk_id_guardian = request.user.userID
    let contentType = request.headers['content-type']

    let child = await controller_children.deactivateChildren(idChild, dadosBody, contentType)
    response.status(child.status_code).json(child)
})

//Reativa perfil do filho
app.patch('/syncrobaby/child/reactivate/:id', verifyJWT, cors(), async function (request, response){
    let idChild = request.params.id
    let idUser = request.user.userID

    let child = await controller_children.reactivateChildren(idChild, idUser)
    response.status(child.status_code).json(child)
})

module.exports = app