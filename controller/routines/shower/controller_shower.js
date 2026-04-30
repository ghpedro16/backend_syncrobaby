/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
*****************************************************************************************************************************************/

const showerDAO = require('../../../model/shower.js')

const DEFAULT_MESSAGES = require('../../modulo/config_messages.js')

const listShowerId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultShower = await showerDAO.getShowerById(id)

        if(resultShower){
            if(resultShower.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.shower = resultShower

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
 
const insertShower = async function(shower, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(shower)

            if(!validar){

                let resultShower = showerDAO.setInsertShower(shower)

                if(resultShower){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.response = shower

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
 
const deleteShower = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (isNaN(id) && id != '' && id != null && id > 0) {

            let validarId = await listShowerId(id)

            if(validarId.status_code == 200){

                let resultShower = await showerDAO.setDeleteShower(id)

                if(resultShower){
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

const validarDados = async function(shower){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(!shower.horario_inicio || Number.isNaN(new Date(shower.horario_inicio).getTime()) || new Date(shower.horario_inicio) > new Date()){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data inicio incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(!shower.horario_termino || Number.isNaN(new Date(shower.horario_termino).getTime()) || new Date(shower.horario_termino) > new Date()){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data termino incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(shower.descricao == undefined || shower.descricao.length > 255){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Descricao incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(shower.fk_id_filho == undefined || shower.fk_id_filho == null || shower.fk_id_filho == '' || isNaN(shower.fk_id_filho) || shower.fk_id_filho <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}

module.exports = {
    listShowerId,
    insertShower,
    deleteShower
}