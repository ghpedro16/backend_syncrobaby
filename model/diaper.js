/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de REGISTRO FRALDA da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getDiaperById = async function (id){
    try {
        let dados = await db('tbl_diaper_log')
        .select('*')
        .where('id_diaper', id)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const getLastId = async function () {
    try {
        let dados = await db('tbl_diaper_log')
            .select('id_diaper')
            .orderBy('id_diaper', 'desc')
            .limit(1)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertDiaper = async function (diaper) {
    try {

        let dados = await db('tbl_diaper_log')
            .insert({
                date_time: `${diaper.date_time}`,
                description: `${diaper.description}`,
                type: `${diaper.type}`,
                fk_id_child: `${diaper.fk_id_child}`
            })

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteDiaper = async function (id) {
    try {

        let dados = await db('tbl_diaper_log')
            .where('id_diaper', id)
            .delete()

        if (dados > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getDiaperById,
    getLastId,
    setInsertDiaper,
    setDeleteDiaper
}