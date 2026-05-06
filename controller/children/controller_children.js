/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const childrenDAO = require('../../model/children.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listChildren = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultChildren = await childrenDAO.getChildrenById(id)

        if(resultChildren){
            if(resultChildren.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.children = resultChildren

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

const listChildrenByUserId = async function(id_user){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultChildren = await childrenDAO.getAllChildrenByIdUser(id_user)

        if(resultChildren){
            if(resultChildren.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.children = resultChildren

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

const insertChildren = async function(children, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(children)

            if(!validar){

                let resultChildren = childrenDAO.setInsertChildren(children)

                if(resultChildren){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.response = children

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

const updateChildren = async function(children, id, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(children)

            if(!validar){

                let validarId = listChildren(id)

                if(validarId.status_code == 200){

                    children.id = Number(id)

                    let resultChildren = childrenDAO.setUpdateChildren(children)

                    if(resultChildren){
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.response = children
    
                        return MESSAGES.DEFAULT_HEADER // 201
                    }else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                }else{
                    return validarId
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

const deleteChildren = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (isNaN(id) && id != '' && id != null && id > 0) {

            let validarId = await listChildren(id)

            if(validarId.status_code == 200){

                let resultChildren = await childrenDAO.setDeleteChildren(id)

                if(resultChildren){
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

const validarDados = async function(child) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(child.child_name == '' || child.child_name == undefined || child.child_name == null || child.child_name.length > 150){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(isNaN(child.height) || child.height == undefined || child.height < 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Altura incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(isNaN(child.weight) || child.weight == undefined || child.weight < 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Peso incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(child.birth_date == null || child.birth_date == undefined || child.birth_date == '' || new Date(child.birth_date) > new Date()){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de Nascimento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(child.blood_type == undefined || child.blood_type.length > 3){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Tipo Sanguíneo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(child.photo == undefined || child.photo.length > 255){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Foto incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(child.gender == undefined || child.gender == null || child.gender == ''){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Gênero incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(child.fk_id_guardian == undefined || child.fk_id_guardian == null || child.fk_id_guardian == '' || isNaN(child.fk_id_guardian) || child.fk_id_guardian <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}

module.exports = {
    listChildren,
    listChildrenByUserId,
    insertChildren,
    updateChildren,
    deleteChildren
}