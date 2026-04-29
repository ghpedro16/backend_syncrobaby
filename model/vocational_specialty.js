/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de ESPECIALIZACAO PROFISSIONAL da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getVocationalSpecialtyById = async function (id) {
    try {
        let dados = await db('tbl_especializacao')
        .select('*')
        .where('id_especializacao', id)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const getAllVocationalSpecialty = async function () {
    try {
        let dados = await db('tbl_especializacao')
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
    getVocationalSpecialtyById,
    getAllVocationalSpecialty
}