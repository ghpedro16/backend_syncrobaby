/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de ARTIGO da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getAllArticles = async function () {
    try {
        let dados = await db('tbl_article')
        .select('*')

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const getArticleById = async function(id){
    try {
        let dados = await db('tbl_article')
        .select('*')
        .where('id_article', id)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const getArticlesByAgeGroup = async function (age_group) {
    try {
        let dados = await db('vw_article_by_age_group')
        .select('*')
        .where('fk_id_age_group', age_group)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getAllArticles,
    getArticleById,
    getArticlesByAgeGroup
}