/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const measuresDAO = require('../../model/measures.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listHeightByChildId = async function(id_child){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultMeasure = await measuresDAO.getHeightByChildrenId(id_child)

        if(resultMeasure){
            if(resultMeasure.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.height = resultMeasure

                return MESSAGES.DEFAULT_HEADER // 200
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }else{
            return MESSAGES.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const listWeightByChildId = async function(id_child){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultMeasure = await measuresDAO.getWeightByChildrenId(id_child)

        if(resultMeasure){
            if(resultMeasure.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.weight = resultMeasure

                return MESSAGES.DEFAULT_HEADER // 200
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }else{
            return MESSAGES.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const listBmiByChildId = async function(id_child){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultMeasure = await measuresDAO.getBmiByChildrenId(id_child)

        if(resultMeasure){
            if(resultMeasure.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.bmi = resultMeasure

                return MESSAGES.DEFAULT_HEADER // 200
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }else{
            return MESSAGES.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const listHeadCircumferenceByChildId = async function(id_children){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultMeasure = await measuresDAO.getHeadCircumferenceByChildrenId(id_children)

        if(resultMeasure){
            if(resultMeasure.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.head_circumference = resultMeasure

                return MESSAGES.DEFAULT_HEADER // 200
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }else{
            return MESSAGES.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const insertMeasures = async function(measures, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(measures)

            if(!validar){

                let resultMeasure = await measuresDAO.setInsertMeasures(measures)

                if(resultMeasure){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.response = measures

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

const validarDados = async function(measures){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(isNaN(measures.head_circumference) || measures.head_circumference == undefined || measures.head_circumference < 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Perímetro Cefálico incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(isNaN(measures.height) || measures.height == undefined || measures.height < 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Altura incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(isNaN(measures.weight) || measures.weight == undefined || measures.weight < 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Peso incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(measures.description == undefined || measures.description.length > 255){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Descricao incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(measures.fk_id_child == undefined || measures.fk_id_child == null || measures.fk_id_child == '' || isNaN(measures.fk_id_child) || measures.fk_id_child <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}

module.exports = {
    listHeightByChildId,
    listWeightByChildId,
    listBmiByChildId,
    listHeadCircumferenceByChildId,
    insertMeasures
}