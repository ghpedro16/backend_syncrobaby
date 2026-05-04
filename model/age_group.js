/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de FAIXA ETÁRIA da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getAgeGroupById = async function (id) {
    try {
        let dados = await db('tbl_faixa_etaria')
            .select('*')
            .where('id_faixa_etaria', id)

        if (dados.length > 0)
            return dados
        else
            return false
    } catch (error) {
        return false
    }
}

const getAllAgeGroup = async function () {
    try {
        let dados = await db('tbl_faixa_etaria')
            .select('*')

        if (dados.length > 0)
            return dados
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getAgeGroupById,
    getAllAgeGroup
}