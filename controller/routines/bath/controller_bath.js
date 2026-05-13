/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
*****************************************************************************************************************************************/

const bathDAO = require('../../../model/bath.js')
const controllerBathStock = require('../../stock/bath/controller_bath_stock.js')

const DEFAULT_MESSAGES = require('../../modulo/config_messages.js')

const listBathId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultBath = await bathDAO.getBathById(id)

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
 
const insertBath = async function(bath, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(bath)

            if(!validar){

                let resultBath = await bathDAO.setInsertBath(bath)

                if(resultBath){

                    let lastId = await bathDAO.getLastId()

                    if(lastId){

                        for(product of bath.product_id){
                            let bathStock = {fk_id_bath: lastId[0].id_bath, fk_id_stock_registry: product.id, quantity: product.quantity_product}

                            let resultBathStock = await controllerBathStock.insertBathStock(bathStock, lastId[0].fk_id_child, contentType)

                            if(resultBathStock.status_code != 201){
                                return MESSAGES.ERROR_RELATIONAL_INSERTION // 500
                            }
                        }

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.response = bath
    
                        return MESSAGES.DEFAULT_HEADER // 201
                    }else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
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
 
const deleteBath = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarId = await listBathId(id)

            if(validarId.status_code == 200){

                let resultBath = await bathDAO.setDeleteBath(id)

                if(resultBath){
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

const validarDados = async function(bath){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(!bath.start_time || Number.isNaN(new Date(bath.start_time).getTime()) || new Date(bath.start_time) > new Date()){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data inicio incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(!bath.end_time || Number.isNaN(new Date(bath.end_time).getTime()) || new Date(bath.end_time) > new Date() || bath.end_time < bath.start_time){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data termino incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(bath.description == undefined || bath.description.length > 255){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Descricao incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(bath.fk_id_child == undefined || bath.fk_id_child == null || bath.fk_id_child == '' || isNaN(bath.fk_id_child) || bath.fk_id_child <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}

module.exports = {
    listBathId,
    insertBath,
    deleteBath
}