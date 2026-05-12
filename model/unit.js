/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de GRANDEZA da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getUnitById = async function (id) {
    try {
        let dados = await db('tbl_unit')
        .select('*')
        .where('id_unit', id)
        .first()

        if(dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const getAllUnit = async function () {
    try {
        let dados = await db('tbl_unit')
        .select('*')

        if(dados.length > 0)
            return dados
        else
            return false
        
    } catch (error) {
        return false
    }
}

module.exports = {
    getUnitById,
    getAllUnit
}