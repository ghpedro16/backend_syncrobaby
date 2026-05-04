/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const illnessDAO = require('../../model/illness.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listIllnessById = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultIllness = await illnessDAO.getIllnessById(id)

        if(resultIllness){
            if(resultIllness.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.illness = resultIllness

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

const listIllnessByChildId = async function (id_child) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultIllness = await illnessDAO.getIllnessByChildId(id_child)

        if(resultIllness){
            if(resultIllness.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.illness = resultIllness

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

const listIllnessByType = async function (type) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultIllness = await illnessDAO.getIllnessByType(type)

        if(resultIllness){
            if(resultIllness.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.illness = resultIllness

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

const insertIllness = async function (illness, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(illness)

            if(!validar){

                let resultIllness = illnessDAO.setInsertIllness(illness)

                if(resultIllness){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.response = illness

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

const deleteIllness = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (isNaN(id) && id != '' && id != null && id > 0) {

            let validarId = await listIllnessById(id)

            if(validarId.status_code == 200){

                let resultIllness = await illnessDAO.setDeleteIllness(id)

                if(resultIllness){
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

const validarDados = async function(illness){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(illness.illness_name == null || illness.illness_name == undefined || illness.illness_name == '' || illness.illness_name.length > 150){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(illness.start_date == undefined || new Date(illness.start_date) > new Date() || illness.start_date == null || illness.start_date == ''){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data Inicio incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(illness.end_date == undefined || new Date(illness.end_date) > new Date() || illness.end_date == null || illness.end_date == ''){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data Fim incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(illness.description == undefined || illness.description.length > 255){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Descricao incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(illness.illness_type == undefined || illness.illness_type == null || illness.illness_type == ''){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Tipo Doença incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(illness.medication == undefined || illness.medication.length > 150){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Medicacao incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(illness.fk_id_child == undefined || illness.fk_id_child == null || illness.fk_id_child == '' || isNaN(illness.fk_id_child) || illness.fk_id_child <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}