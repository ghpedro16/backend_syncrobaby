/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
*****************************************************************************************************************************************/

const feedingDAO = require('../../../model/feeding.js')
const controllerFeedingStock = require('../../stock/feeding/controller_feeding_stock.js')

const DEFAULT_MESSAGES = require('../../modulo/config_messages.js')

const listFeedingId = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultFeeding = await feedingDAO.getFeedingById(id)

        if (resultFeeding) {
            if (resultFeeding.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.feeding = resultFeeding

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const insertFeeding = async function (feeding, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(feeding)

            if (!validar) {

                let resultFeeding = await feedingDAO.setInsertFeeding(feeding)

                if (resultFeeding) {

                    let lastId = await feedingDAO.getLastId()

                    if (lastId) {

                        for (product of feeding.product_id) {
                            let feedingStock = { fk_id_feeding: lastId[0].id_feeding, fk_id_stock_registry: product.id, quantity: product.quantity_product }

                            let resultFeedingStock = await controllerFeedingStock.insertFeedingStock(feedingStock, contentType)

                            if (resultFeedingStock.status_code != 201) {
                                return MESSAGES.ERROR_RELATIONAL_INSERTION // 500
                            }
                        }
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.response = feeding

                        return MESSAGES.DEFAULT_HEADER // 201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const deleteFeeding = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarId = await listFeedingId(id)

            if (validarId.status_code == 200) {

                let resultFeeding = await feedingDAO.setDeleteFeeding(id)

                if (resultFeeding) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message

                    return MESSAGES.DEFAULT_HEADER // 200
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND // 404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto!]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const validarDados = async function (feeding) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (!feeding.date_time || Number.isNaN(new Date(feeding.date_time).getTime()) || new Date(feeding.date_time) > new Date()) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (feeding.description == undefined || feeding.description.length > 255) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Descricao incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (feeding.fk_id_child == undefined || feeding.fk_id_child == null || feeding.fk_id_child == '' || isNaN(feeding.fk_id_child) || feeding.fk_id_child <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (feeding.fk_id_product_type == undefined || feeding.fk_id_product_type == null || feeding.fk_id_product_type == '' || isNaN(feeding.fk_id_product_type) || feeding.fk_id_product_type <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listFeedingId,
    insertFeeding,
    deleteFeeding
}