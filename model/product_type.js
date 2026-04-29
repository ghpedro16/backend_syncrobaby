/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de TIPO PRODUTO da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getProductTypeById = async function (id) {
    try {
        let dados = await db('tbl_tipo_produto')
        .select('*')
        .where('id_tipo_produto', id)
        .first()

        if(dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const getAllProductType = async function () {
    try {
        let dados = await db('tbl_tipo_produto')
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
    getProductTypeById,
    getAllProductType
}