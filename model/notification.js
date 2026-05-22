/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de NOTIFICACAO da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getNotificationByUserId = async function (id_user) {
    try {
        let dados = await db('tbl_notification')
        .select('*')
        .where({
            fk_id_guardian: id_user
        })

        if(dados.length > 0)
            return dados
        else 
            return false

    } catch (error) {
        return false
    }
}

const getNotificationByChildId = async function (id_child) {
    try {
        let dados = await db('tbl_notification')
        .select('*')
        .where({
            fk_id_child: id_child
        })

        if(dados.length > 0)
            return dados
        else 
            return false

    } catch (error) {
        return false
    }
}

const setInsertNotification = async function(notification){
    try {
        let dados = await db('tbl_notification')
        .insert({
            title: notification.title,
            message: notification.message,
            fk_id_child: notification.fk_id_child,
            fk_id_guardian: notification.fk_id_guardian,
            fk_id_notification_type: notification.fk_id_notification_type
        })

        if(dados.length > 0)
            return dados
        else 
            return false

    } catch (error) {
        return false
    }
}

const setUpdateReadNotification = async function(id){
    try {
        let dados = await db('tbl_notification')
        .update({
            read_status: true
        })
        .where({
            id_notification: id
        })

        if(dados > 0)
            return dados
        else 
            return false

    } catch (error) {
        return false
    }
}

const setDeleteNotification = async function(id){
    try {
        let dados = await db('tbl_notification')
        .where({
            id_notification: id
        })
        .delete()

        if(dados > 0)
            return dados
        else 
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getNotificationByChildId,
    getNotificationByUserId,
    setInsertNotification,
    setUpdateReadNotification,
    setDeleteNotification
}