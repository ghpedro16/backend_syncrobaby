/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const ageGroupDAO = require('../../model/age_group.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listAgeGroupById = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultAgeGroup = await ageGroupDAO.getAgeGroupById(id)

        if(resultAgeGroup){
            if(resultAgeGroup.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.age_group = resultAgeGroup

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

const listAllAgeGroup = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultAgeGroup = await ageGroupDAO.getAllAgeGroup()

        if(resultAgeGroup){
            if(resultAgeGroup.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.age_group = resultAgeGroup

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

module.exports = {
    listAgeGroupById,
    listAllAgeGroup
}