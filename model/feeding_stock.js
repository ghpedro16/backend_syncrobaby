/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de ESTOQUE ALIMENTAÇÃO da aplicação SyncroBaby
 * Data: 01/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getFeedingStockByFeedingId = async function (id_feeding) {
        try {
        let dados = await db('tbl_stock_feeding')
        .select('*')
        .where('fk_id_feeding', id_feeding)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertFeedingStock = async function (feeding) {
    try {
        let dados = await db('tbl_stock_feeding')
        .insert({
            quantidade: `${feeding.quantidade}`,
            fk_id_feeding: `${feeding.fk_id_feeding}`,
            fk_id_stock_registry: `${feeding.fk_id_stock_registry}`
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
    getFeedingStockByFeedingId,
    setInsertFeedingStock
}