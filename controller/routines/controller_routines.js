/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
*****************************************************************************************************************************************/

const routinesDAO = require('../../model/routines.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listRoutines = async function (id_child, date) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!Number.isNaN(new Date(date).getTime())) {

            let resultRoutines = await routinesDAO.getRoutinesByCurrentDate(id_child, date)

            if (resultRoutines) {
                if (resultRoutines.length > 0) {
                    
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.routines = resultRoutines

                    return MESSAGES.DEFAULT_HEADER // 200
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    listRoutines
}