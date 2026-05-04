/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const articleDAO = require('../../model/article.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listAllArticles = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultArticle = await articleDAO.getAllArticles()

        if(resultArticle){
            if(resultArticle.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.article = resultArticle

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

const listArticleByAgeGroup = async function (age_group) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultArticle = await articleDAO.getArticlesByAgeGroup(age_group)

        if(resultArticle){
            if(resultArticle.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.article = resultArticle

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
    listAllArticles,
    listArticleByAgeGroup
}