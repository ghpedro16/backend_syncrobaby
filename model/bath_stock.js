/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de ESTOQUE BANHO da aplicação SyncroBaby
 * Data: 01/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getBathStockByBathId = async function (id_bath) {
        try {
        let dados = await db('tbl_stock_bath')
        .select('*')
        .where('fk_id_bath', id_bath)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertBathStock = async function (bath) {
    try {
        let dados = await db('tbl_stock_bath')
        .insert({
            quantidade: `${bath.quantidade}`,
            fk_id_bath: `${bath.fk_id_bath}`,
            fk_id_stock_registry: `${bath.fk_id_stock_registry}`
        })

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getBathStockByBathId,
    setInsertBathStock
}