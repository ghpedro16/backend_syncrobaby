/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de REGISTRO SONO da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getSleepById = async function (id){
    try {
        let dados = await db('tbl_sleep_log')
        .select('*')
        .where('id_sleep', id)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertSleep = async function (sleep) {
    try {

        let dados = await db('tbl_sleep_log')
        .insert({
            start_time: `${sleep.start_time}`,
            end_time: `${sleep.end_time}`,
            description: `${sleep.description}`,
            fk_id_child: `${sleep.fk_id_child}`
        })

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteSleep = async function (id, id_child) {
    try {

        let dados = await db('tbl_sleep_log')
            .where({
                id_sleep: id
            })
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
    getSleepById,
    setInsertSleep,
    setDeleteSleep
}