/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const notificationDAO = require('../../model/notification.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listNotificationByUser = async function (id_user) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let resultNotification = await notificationDAO.getNotificationByUserId(id_user)

        if (resultNotification) {
            if (resultNotification.length > 0) {
                MESSAGES.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.notification = resultNotification

                return MESSAGES // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return MESSAGES.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const listNotificationByChild = async function (id_child) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let resultNotification = await notificationDAO.getNotificationByChildId(id_child)

        if (resultNotification) {
            if (resultNotification.length > 0) {
                MESSAGES.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.notification = resultNotification

                return MESSAGES // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return MESSAGES.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const insertNotification = async function (notification, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(notification)

            if (!validar) {

                let resultNotification = await notificationDAO.setInsertNotification(notification)

                if (resultNotification) {

                    MESSAGES.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.message = MESSAGES.SUCCESS_CREATE_ITEM.message

                    return MESSAGES // 201
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const updateNotification = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarId = await listNotificationByChild(id)

            if(validarId.status_code == 200){

                let resultNotification = await notificationDAO.setUpdateReadNotification(id)

                if(resultNotification){

                    MESSAGES.status_code = MESSAGES.SUCCESS_MODIFIED_ITEM.status_code
    
                    return MESSAGES // 200
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }else{
                MESSAGES.ERROR_NOT_FOUND // 404
            }
        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto!]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const deleteNotification = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarId = await listNotificationByChild(id)

            if(validarId.status_code == 200){

                let resultNotification = await notificationDAO.setDeleteNotification(id)

                if(resultNotification){
                    MESSAGES.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                    MESSAGES.message = MESSAGES.SUCCESS_DELETE_ITEM.message
    
                    return MESSAGES // 200
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }else{
                MESSAGES.ERROR_NOT_FOUND // 404
            }
        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto!]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    } 
}

const validarDados = async function(notification){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (notification.title == '' || notification.title == undefined || notification.title == null || notification.title.length > 150) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Titulo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (notification.message == '' || notification.message == undefined || notification.message == null || notification.message.length > 255) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Mensagem incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(notification.fk_id_guardian == undefined || notification.fk_id_guardian == null || notification.fk_id_guardian == '' || isNaN(notification.fk_id_guardian) || notification.fk_id_guardian <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(notification.fk_id_child == undefined || notification.fk_id_child == null || notification.fk_id_child == '' || isNaN(notification.fk_id_child) || notification.fk_id_child <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(notification.fk_id_notification_type == undefined || notification.fk_id_notification_type == null || notification.fk_id_notification_type == '' || isNaN(notification.fk_id_notification_type) || notification.fk_id_notification_type <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}

module.exports = {
    listNotificationByChild,
    listNotificationByUser,
    insertNotification,
    updateNotification,
    deleteNotification
}