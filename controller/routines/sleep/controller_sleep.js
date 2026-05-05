/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
*****************************************************************************************************************************************/

const sleepDAO = require('../../../model/sleep.js')

const DEFAULT_MESSAGES = require('../../modulo/config_messages.js')

const listSleepId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultSleep = await sleepDAO.getSleepById(id)

        if(resultSleep){
            if(resultSleep.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.sleep = resultSleep

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
 
const insertSleep = async function(sleep, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(sleep)

            if(!validar){

                let resultSleep = sleepDAO.setInsertSleep(sleep)

                if(resultSleep){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.response = sleep

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
 
const deleteSleep = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (isNaN(id) && id != '' && id != null && id > 0) {

            let validarId = await listSleepId(id)

            if(validarId.status_code == 200){

                let resultSleep = await sleepDAO.setDeleteSleep(id)

                if(resultSleep){
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

const validarDados = async function(sleep){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(!sleep.horario_inicio || Number.isNaN(new Date(sleep.horario_inicio).getTime()) || new Date(sleep.horario_inicio) > new Date()){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data inicio incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(!sleep.horario_termino || Number.isNaN(new Date(sleep.horario_termino).getTime()) || new Date(sleep.horario_termino) > new Date()){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data termino incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(sleep.descricao == undefined || sleep.descricao.length > 255){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Descricao incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(sleep.fk_id_filho == undefined || sleep.fk_id_filho == null || sleep.fk_id_filho == '' || isNaN(sleep.fk_id_filho) || sleep.fk_id_filho <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}

module.exports = {
    listSleepId,
    insertSleep,
    deleteSleep
}