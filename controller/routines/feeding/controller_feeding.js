/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
*****************************************************************************************************************************************/

const feedingDAO = require('../../../model/feeding.js')

const DEFAULT_MESSAGES = require('../../modulo/config_messages.js')

const listFeedingId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultFeeding = await feedingDAO.getFeedingById(id)

        if(resultFeeding){
            if(resultFeeding.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.feeding = resultFeeding

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
 
const insertFeeding = async function(feeding, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(feeding)

            if(!validar){

                let resultFeeding = feedingDAO.setInsertFeeding(feeding)

                if(resultFeeding){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.response = feeding

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
 
const deleteFeeding = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (isNaN(id) && id != '' && id != null && id > 0) {

            let validarId = await listFeedingId(id)

            if(validarId.status_code == 200){

                let resultFeeding = await feedingDAO.setDeleteFeeding(id)

                if(resultFeeding){
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

const validarDados = async function(feeding){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(!feeding.data_hora || Number.isNaN(new Date(feeding.data_hora).getTime()) || new Date(feeding.data_hora) > new Date()){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(feeding.descricao == undefined || feeding.descricao.length > 255){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Descricao incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(feeding.fk_id_filho == undefined || feeding.fk_id_filho == null || feeding.fk_id_filho == '' || isNaN(feeding.fk_id_filho) || feeding.fk_id_filho <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(feeding.fk_id_tipo_produto == undefined || feeding.fk_id_tipo_produto == null || feeding.fk_id_tipo_produto == '' || isNaN(feeding.fk_id_tipo_produto) || feeding.fk_id_tipo_produto <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}

module.exports = {
    listFeedingId,
    insertFeeding,
    deleteFeeding
}