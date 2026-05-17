/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 01/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const feedingStockDAO = require('../../../model/feeding_stock.js')

const DEFAULT_MESSAGES = require('../../modulo/config_messages.js')

const listFeedingStock = async function(id_feeding) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultFeeding = await feedingStockDAO.getFeedingStockByFeedingId(id_feeding)

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

const insertFeedingStock = async function(feeding, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(feeding)

            if(!validar){

                let resultFeeding = feedingStockDAO.setInsertFeedingStock(feeding)

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

const validarDados = async function(feeding) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(feeding.quantity == undefined || feeding.quantity == null || feeding.quantity == '' || isNaN(feeding.quantity) || feeding.quantity <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Quantidade incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(feeding.fk_id_feeding == undefined || feeding.fk_id_feeding == null || feeding.fk_id_feeding == '' || isNaN(feeding.fk_id_feeding) || feeding.fk_id_feeding <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(feeding.fk_id_stock_registry == undefined || feeding.fk_id_stock_registry == null || feeding.fk_id_stock_registry == '' || isNaN(feeding.fk_id_stock_registry) || feeding.fk_id_stock_registry <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}

module.exports = {
    listFeedingStock,
    insertFeedingStock
}