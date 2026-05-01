/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 01/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const medicationStockDAO = require('../../../model/medication_stock.js')

const DEFAULT_MESSAGES = require('../../modulo/config_messages.js')

const listMedicationStock = async function(id_medication) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultMedication = await medicationStockDAO.getMedicationStockByMedicationId(id_medication)

        if(resultMedication){
            if(resultMedication.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.medication = resultMedication

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

const insertMedicationStock = async function(medication, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(medication)

            if(!validar){

                let resultMedication = medicationStockDAO.setInsertMedicationStock(medication)

                if(resultMedication){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.response = medication

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

const validarDados = async function(medication) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(medication.quantity == undefined || medication.quantity == null || medication.quantity == '' || isNaN(medication.quantity) || medication.quantity <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Quantidade incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(medication.fk_id_medication == undefined || medication.fk_id_medication == null || medication.fk_id_medication == '' || isNaN(medication.fk_id_medication) || medication.fk_id_medication <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(medication.fk_id_stock_registry == undefined || medication.fk_id_stock_registry == null || medication.fk_id_stock_registry == '' || isNaN(medication.fk_id_stock_registry) || medication.fk_id_stock_registry <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}

module.exports = {
    listMedicationStock,
    insertMedicationStock
}