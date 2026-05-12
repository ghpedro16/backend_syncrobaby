/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de PRODUTO da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getProductByType = async function (id_type) {
    try {
        
        let dados = await db('tbl_product')
        .select('*')
        .where('fk_id_product_type', id_type)

        if(dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getProductByType
}