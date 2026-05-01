/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 01/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const diaperStockDAO = require('../../../model/diaper_stock.js')

const DEFAULT_MESSAGES = require('../../modulo/config_messages.js')

const listDiaperStock = async function(id_diaper) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultDiaper = await diaperStockDAO.getDiaperStockByDiaperId(id_diaper)

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

const insertDiaperStock = async function(diaper, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(diaper)

            if(!validar){

                let resultDiaper = diaperStockDAO.setInsertDiaperStock(diaper)

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

const validarDados = async function(diaper) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(diaper.quantity == undefined || diaper.quantity == null || diaper.quantity == '' || isNaN(diaper.quantity) || diaper.quantity <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Quantidade incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(diaper.fk_id_diaper == undefined || diaper.fk_id_diaper == null || diaper.fk_id_diaper == '' || isNaN(diaper.fk_id_diaper) || diaper.fk_id_diaper <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(diaper.fk_id_stock_registry == undefined || diaper.fk_id_stock_registry == null || diaper.fk_id_stock_registry == '' || isNaN(diaper.fk_id_stock_registry) || diaper.fk_id_stock_registry <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}

module.exports = {
    listDiaperStock,
    insertDiaperStock
}