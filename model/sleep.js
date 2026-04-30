/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de REGISTRO SONO da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getSleepById = async function (id){
    try {
        let dados = await db('tbl_registro_sono')
        .select('*')
        .where('id_sono', id)

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

        let dados = await db('tbl_registro_sono')
        .insert({
            horario_inicio: `${sleep.horario_inicio}`,
            horario_termino: `${sleep.horario_termino}`,
            data: `${sleep.data}`,
            descricao: `${sleep.descricao}`,
            fk_id_filho: `${sleep.fk_id_filho}`
        })

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteSleep = async function (id) {
    try {

        let dados = await db('tbl_registro_sono')
            .where('id_sono', id)
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