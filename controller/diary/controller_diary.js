/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 27/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const diaryDAO = require('../../model/diary.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listDiaryByChildren = async function (id_children) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultDiary = await diaryDAO.getDiaryByChildrenId(id_children)

        if(resultDiary){
            if(resultDiary.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.diary = resultDiary

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

const listDiaryById = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultDiary = await diaryDAO.getDiaryById(id)

        if(resultDiary){
            if(resultDiary.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.diary = resultDiary

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

const insertDiary = async function (diary, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(diary)

            if(!validar){

                let resultDiary = diaryDAO.setInsertDiary(diary)

                if(resultDiary){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.response = diary

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

const updateDiary = async function (diary, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(diary)

            if(!validar){

                let validarId = listDiaryById(id)

                if(validarId.status_code == 200){

                    diary.id = Number(id)

                    let resultDiary = childrenDAO.setUpdateChildren(children)

                    if(resultDiary){
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.response = diary
    
                        return MESSAGES.DEFAULT_HEADER // 201
                    }else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                }else{
                    return validarId
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

const deleteDiary = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (isNaN(id) && id != '' && id != null && id > 0) {

            let validarId = await listDiaryById(id)

            if(validarId.status_code == 200){

                let resultDiary = await diaryDAO.setDeleteDiary(id)

                if(resultDiary){
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

const validarDados = async function(diary){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(diary.titulo == '' || diary.titulo == undefined || diary.titulo == null || diary.titulo.length > 150){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Titulo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(diary.conteudo == '' || diary.conteudo == undefined || diary.conteudo == null || diary.conteudo.length > 2000){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Conteudo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(diary.midia == undefined || diary.midia.length > 255){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Midia incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(diary.cor == undefined || diary.cor.length > 30 || diary.cor == null || diary.cor == ''){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Cor incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(diary.fk_id_filho == undefined || diary.fk_id_filho == null || diary.fk_id_filho == '' || isNaN(diary.fk_id_filho) || diary.fk_id_filho <= 0){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else{
        return false
    }
}