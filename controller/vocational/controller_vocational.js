/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const vocationalDAO = require('../../model/vocational.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listVocationalById = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultVocational = await vocationalDAO.getVocationalById(id)

        if(resultVocational){
            if(resultVocational.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.vocational = resultVocational

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

const listVocationalByChildrenId = async function (id_children) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultVocational = await vocationalDAO.getVocationalByChildrenId(id_children)

        if(resultVocational){
            if(resultVocational.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.vocational = resultVocational

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

const listVocationalBySpecialty = async function (id_specialty, id_children) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultVocational = await vocationalDAO.getVocationalByChildrenId(id_specialty, id_children)

        if(resultVocational){
            if(resultVocational.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.vocational = resultVocational

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

const insertVocational = async function (vocational, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(vocational)

            if(!validar){

                let resultVocational = vocationalDAO.setInsertVocational(vocational)

                if(resultVocational){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.response = vocational

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

const updateVocational = async function (vocational, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(vocational)

            if(!validar){

                let validarId = listVocationalById(id)

                if(validarId.status_code == 200){

                    vocational.id = Number(id)

                    let resultVocational = vocationalDAO.setUpdateVocational(vocational)
                    if(resultVocational){
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.response = vocational
    
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

const deleteVocational = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (isNaN(id) && id != '' && id != null && id > 0) {

            let validarId = await listVocationalById(id)

            if(validarId.status_code == 200){

                let resultVocational = await vocationalDAO.setDeleteVocational(id)

                if(resultVocational){
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

const validarDados = async function(vocational){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(vocational.nome == '' || vocational.nome == undefined || vocational.nome == null || vocational.nome.length > 150){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(vocational.telefone == null || vocational.telefone == undefined || vocational.telefone == '' || vocational.telefone.length > 15){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Telefone incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(vocational.endereco == null || vocational.endereco == undefined || vocational.endereco == '' || vocational.endereco.length > 500){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Endereco incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(vocational.ultima_consulta == null || vocational.ultima_consulta == undefined || vocational.ultima_consulta == '' || new Date(vocational.ultima_consulta) > new Date()){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Ultima Consulta incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(vocational.fk_id_filho == undefined || vocational.fk_id_filho == null || vocational.fk_id_filho == '' || isNaN(vocational.fk_id_filho) || vocational.fk_id_filho <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(vocational.fk_id_especializacao == undefined || vocational.fk_id_especializacao == null || vocational.fk_id_especializacao == '' || isNaN(vocational.fk_id_especializacao) || vocational.fk_id_especializacao <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}