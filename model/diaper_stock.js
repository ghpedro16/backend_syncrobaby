/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de ESTOQUE FRALDA da aplicação SyncroBaby
 * Data: 01/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getDiaperStockByDiaperId = async function (id_diaper) {
        try {
        let dados = await db('tbl_stock_diaper')
        .select('*')
        .where('fk_id_diaper', id_diaper)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertDiaperStock = async function (diaper) {
    try {
        let dados = await db('tbl_stock_diaper')
        .insert({
            quantidade: `${diaper.quantidade}`,
            fk_id_diaper: `${diaper.fk_id_diaper}`,
            fk_id_stock_registry: `${diaper.fk_id_stock_registry}`
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
    getDiaperStockByDiaperId,
    setInsertDiaperStock
}