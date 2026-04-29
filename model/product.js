/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de PRODUTO da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getProductByType = async function (id_type) {
    try {
        
        let dados = await db('tbl_produto')
        .select('*')
        .where('fk_id_tipo_produto', id_type)

        if(dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertProduct = async function (product) {
    try {
        
        let dados = await db('tbl_produto')
        .insert({
            nome_produto: `${product.nome_produto}`,
            fk_id_tipo_produto: `${product.fk_id_tipo_produto}`,
            fk_id_grandeza: `${product.fk_id_grandeza}`
        })

        if(dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getProductByType,
    setInsertProduct
}