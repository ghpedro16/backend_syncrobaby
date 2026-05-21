/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const vaccineDAO = require('../../model/vaccine.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listVaccineByStatus = async function (status, id_child) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultVaccine = await vaccineDAO.getVaccineByStatus(status, id_child)

        if (resultVaccine) {
            if (resultVaccine.length > 0) {

                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.vaccine = resultVaccine

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return MESSAGES.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const listVaccines = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultVaccine = await vaccineDAO.getAllVaccines()

        if (resultVaccine) {
            if (resultVaccine.length > 0) {

                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.vaccine = resultVaccine

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return MESSAGES.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const listVaccineByAgeGroup = async function (id_age_group) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultVaccine = await vaccineDAO.getVaccineByAgeGroup(id_age_group)
        
        if (resultVaccine) {
            if (resultVaccine.length > 0) {

                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.vaccine = resultVaccine

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return MESSAGES.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const updateStatusVaccine = async function (vaccine, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(vaccine)

            if (!validar) {

                let resultVaccine = await vaccineDAO.setUpdateVaccineStatus(vaccine)

                if (resultVaccine) {

                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.vaccine = vaccine

                    return MESSAGES.DEFAULT_HEADER // 201
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

const validarDados = async function (vaccine) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (vaccine.application_status != true && vaccine.application_status != false) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Status de Aplicacao incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if (vaccine.application_date == null || vaccine.application_date == undefined || vaccine.application_date == '' || new Date(vaccine.application_date) > new Date()) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de Aplicacao incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (vaccine.fk_id_child == undefined || vaccine.fk_id_child == null || vaccine.fk_id_child == '' || isNaN(vaccine.fk_id_child) || vaccine.fk_id_child <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (vaccine.fk_id_vaccine == undefined || vaccine.fk_id_vaccine == null || vaccine.fk_id_vaccine == '' || isNaN(vaccine.fk_id_vaccine) || vaccine.fk_id_vaccine <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listVaccines,
    listVaccineByStatus,
    listVaccineByAgeGroup,
    updateStatusVaccine
}
