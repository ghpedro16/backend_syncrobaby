/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de REGISTRO FRALDA da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getDiaperById = async function (id){
    try {
        let dados = await db('tbl_registro_fralda')
        .select('*')
        .where('id_fralda', id)

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

        let dados = await db('tbl_registro_fralda')
            .insert({
                data_hora: `${diaper.data_hora}`,
                descricao: `${diaper.descricao}`,
                tipo: `${diaper.tipo}`,
                fk_id_filho: `${diaper.fk_id_filho}`
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

        let dados = await db('tbl_registro_fralda')
            .where('id_fralda', id)
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
    setInsertDiaper,
    setDeleteDiaper
}