/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
*****************************************************************************************************************************************/

const diaperDAO = require('../../../model/diaper.js')

const DEFAULT_MESSAGES = require('../../modulo/config_messages.js')

const listDiaperId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultDiaper = await diaperDAO.getDiaperById(id)

        if(resultDiaper){
            if(resultDiaper.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.diaper = resultDiaper

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
 
const insertDiaper = async function(diaper, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(diaper)

            if(!validar){

                let resultDiaper = diaperDAO.setInsertDiaper(diaper)

                if(resultDiaper){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.response = diaper

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
 
const deleteDiaper = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (isNaN(id) && id != '' && id != null && id > 0) {

            let validarId = await listDiaperId(id)

            if(validarId.status_code == 200){

                let resultDiaper = await diaperDAO.setDeleteDiaper(id)

                if(resultDiaper){
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

const validarDados = async function(diaper){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(!diaper.data_hora || Number.isNaN(new Date(diaper.data_hora).getTime()) || new Date(diaper.data_hora) > new Date()){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(diaper.tipo == null || diaper.tipo == undefined || diaper.tipo == ''){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Tipo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(diaper.descricao == undefined || diaper.descricao.length > 255){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Descricao incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(diaper.fk_id_filho == undefined || diaper.fk_id_filho == null || diaper.fk_id_filho == '' || isNaN(diaper.fk_id_filho) || diaper.fk_id_filho <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}

module.exports = {
    listDiaperId,
    insertDiaper,
    deleteDiaper
}