/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de FILHO
 * Data: 15/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import das dependencias da API
const express = require('express')
const cors = require('cors')
const verifyJWT = require('../middleware/verify_jwt.js')

//Criando uma instancia de uma classe do express 
const app = express()

const controller_notification = require('../controller/notification/controller_notification.js')

//Retorna notificacoes do filho por ID
app.get('/syncrobaby/notifications/child/:id', verifyJWT, cors(), async (request, response) => {
    let childId = request.params.id

    let nots = await controller_notification.listNotificationByChild(childId)
    response.status(nots.status_code).json(nots)
})

//Retorna notificacoes do usuario por ID
app.get('/syncrobaby/notifications/user', verifyJWT, cors(), async (request, response) => {
    let userId = request.user.userID

    let nots = await controller_notification.listNotificationByUser(userId)
    response.status(nots.status_code).json(nots)
})

//Retorna notificacoes do filho por ID
app.patch('/syncrobaby/notifications/:id', verifyJWT, cors(), async (request, response) => {
    let notificationId = request.params.id

    let nots = await controller_notification.updateNotification(notificationId)
    response.status(nots.status_code).json(nots)
})

//Retorna notificacoes do filho por ID
app.delete('/syncrobaby/notifications/:id', verifyJWT, cors(), async (request, response) => {
    let notificationId = request.params.id

    let nots = await controller_notification.deleteNotification(notificationId)
    response.status(nots.status_code).json(nots)
})

module.exports = app