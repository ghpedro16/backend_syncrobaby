/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const measuresDAO = require('../../model/measures.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listHeightByChildrenId = async function(id_children){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultMeasure = await measuresDAO.getHeightByChildrenId(id_children)

        if(resultMeasure){
            if(resultMeasure.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.height = resultMeasure

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

const listWeightByChildrenId = async function(id_children){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultMeasure = await measuresDAO.getWeightByChildrenId(id_children)

        if(resultMeasure){
            if(resultMeasure.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.weight = resultMeasure

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

const listBmiByChildrenId = async function(id_children){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultMeasure = await measuresDAO.getBmiByChildrenId(id_children)

        if(resultMeasure){
            if(resultMeasure.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.bmi = resultMeasure

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

const listHeadCircumferenceByChildrenId = async function(id_children){
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
                return MESSAGES.ERROR_NOT_FOUND // 404
            }
        }else{
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const insertMeasures = async function(measures){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(measures)

            if(!validar){

                let resultMeasure = userDAO.setInsertUser(user)

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

    if(isNaN(measures.perimetro_cefalico) || measures.perimetro_cefalico == undefined || measures.perimetro_cefalico < 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Perímetro Cefálico incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(isNaN(measures.altura) || measures.altura == undefined || measures.altura < 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Altura incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(isNaN(measures.peso) || measures.peso == undefined || measures.peso < 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Peso incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(measures.data == null || measures.data == undefined || measures.data == '' || new Date(measures.data) > new Date()){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de Nascimento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(measures.descricao == undefined || measures.descricao.length > 255){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Tipo Sanguíneo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(measures.fk_id_filho == undefined || measures.fk_id_filho == null || measures.fk_id_filho == '' || isNaN(measures.fk_id_filho) || measures.fk_id_filho <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}