/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 01/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const bathStockDAO = require('../../../model/bath_stock.js')

const DEFAULT_MESSAGES = require('../../modulo/config_messages.js')

const listBathStock = async function(id_bath) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultBath = await bathStockDAO.getBathStockByBathId(id_bath)

        if(resultBath){
            if(resultBath.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.bath = resultBath

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

const insertBathStock = async function(bath, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(bath)

            if(!validar){

                let resultBath = bathStockDAO.setInsertBathStock(bath)

                if(resultBath){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.response = bath

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

const validarDados = async function(bath) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(bath.quantity == undefined || bath.quantity == null || bath.quantity == '' || isNaN(bath.quantity) || bath.quantity <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Quantidade incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(bath.fk_id_bath == undefined || bath.fk_id_bath == null || bath.fk_id_bath == '' || isNaN(bath.fk_id_bath) || bath.fk_id_bath <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(bath.fk_id_stock_registry == undefined || bath.fk_id_stock_registry == null || bath.fk_id_stock_registry == '' || isNaN(bath.fk_id_stock_registry) || bath.fk_id_stock_registry <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}

module.exports = {
    listBathStock,
    insertBathStock
}