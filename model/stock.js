/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de ESTOQUE da aplicação SyncroBaby
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')
 
const getStockRegistryById = async function(id){
    try {
        let dados = await db('tbl_stock_registry')
        .select('*')
        .where('id_stock_registry', id)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const getStockByChildrenId = async function(id_child){
    try {
        let dados = await db('tbl_stock_registry')
        .select('*')
        .where('fk_id_child', id_child)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertStockProduct = async function(stock_product){
    try {
        let dados = await db('tbl_stock_registry')
        .insert({
            description: `${stock_product.description}`,
            quantity: `${stock_product.quantity}`,
            volume: `${stock_product.volume}`,
            fk_id_child: `${stock_product.fk_id_child}`,
            fk_id_product: `${stock_product.fk_id_product}`
        })

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteStockProduct = async function(id){
    try {
        let dados = await db('tbl_stock_registry')
        .where('id_stock_registry', id)
        .delete()

        if (dados > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getStockRegistryById,
    getStockByChildrenId,
    setInsertStockProduct,
    setDeleteStockProduct
}