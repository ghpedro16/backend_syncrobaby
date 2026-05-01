/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de ESTOQUE MEDICAÇÃO da aplicação SyncroBaby
 * Data: 01/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getMedicationStockByMedicationId = async function (id_medication) {
        try {
        let dados = await db('tbl_stock_medication')
        .select('*')
        .where('fk_id_medication', id_medication)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertMedicationStock = async function (medication) {
    try {
        let dados = await db('tbl_stock_medication')
        .insert({
            quantidade: `${medication.quantidade}`,
            fk_id_medication: `${medication.fk_id_medication}`,
            fk_id_stock_registry: `${medication.fk_id_stock_registry}`
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
    getMedicationStockByMedicationId,
    setInsertMedicationStock
}