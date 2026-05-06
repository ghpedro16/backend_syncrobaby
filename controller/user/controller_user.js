/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const userDAO = require('../../model/user.js')
const jwt = require('../../middleware/middleware_jwt.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listUserId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultUser = await userDAO.getUserById(id)

        if(resultUser){
            if(resultUser.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.user = resultUser

                return MESSAGES.DEFAULT_HEADER // 200
            }else{
                return MESSAGES.ERROR_NOT_FOUND // 404
            }
        }else{
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const listUserLogin = async function(email, password){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultUser = await userDAO.getUserByLogin(email, password)

        if(resultUser.status_code != 200){

            if(resultUser){

                if(resultUser.length > 0){
                    let tokenUser = await jwt.createJWT(resultUser[0].id_guardian)
    
                    resultUser[0].token = tokenUser
    
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.response.user = resultUser
    
                    return MESSAGES.DEFAULT_HEADER // 200
                }else{
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }else{
            return MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Usuário ou Senha inválidos]'
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const insertUser = async function(user, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(user)

            if(!validar){

                let resultUser = userDAO.setInsertUser(user)

                if(resultUser){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.response = user

                    return MESSAGES.DEFAULT_HEADER // 201
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }else{
                return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const updateUser = async function(user, id, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            
            let validar = await validarDados(user)

            if(!validar){
                let validarId = await listUserId(id)

                if(validarId.status_code == 200){
                    user.id_guardian = Number(id)

                    let resultUser = await userDAO.setUpdateUser(user)

                    if(resultUser){
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.response.user = user

                        return MESSAGES.DEFAULT_HEADER // 200
                    }else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                }else{
                    return validarId
                }
            }else{
                return validar
            }
        }else{
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const deleteUser = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (isNaN(id) && id != '' && id != null && id > 0) {
            let validarId = await listUserId(id)

            if(validarId.status_code == 200){

                let resultUser = await userDAO.setDeleteUser(id)

                if(resultUser){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message
    
                    return MESSAGES.DEFAULT_HEADER // 200
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

const validarDados = async function(user){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(user.guardian_name == '' || user.guardian_name == undefined || user.guardian_name == null || user.guardian_name.length > 150){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(user.email == '' || user.email == undefined || user.email == null || user.email.length > 255){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [E-mail incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(user.password == '' || user.password == undefined || user.password == null || user.password.length > 15){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Senha incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(user.profile_picture == undefined || user.profile_picture.length > 255){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [URL da Foto incorreto]'
    }else{
        return false
    }
}

module.exports = {
    listUserId,
    listUserLogin,
    insertUser,
    updateUser,
    deleteUser
}