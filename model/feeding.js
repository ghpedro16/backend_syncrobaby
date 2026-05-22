/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de REGISTRO ALIMENTAÇÃO da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getFeedingById = async function (id){
    try {
        let dados = await db('tbl_feeding_log')
        .select('*')
        .where('id_feeding', id)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const getLastId = async function () {
    try {
        let dados = await db('tbl_feeding_log')
            .select('id_feeding')
            .orderBy('id_feeding', 'desc')
            .limit(1)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertFeeding = async function (feeding) {
    try {

        let dados = await db('tbl_feeding_log')
            .insert({
                date_time: `${feeding.date_time}`,
                description: `${feeding.description}`,
                fk_id_child: `${feeding.fk_id_child}`,
                fk_id_product_type: `${feeding.fk_id_product_type}`
            })

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteFeeding = async function (id) {
    try {

        let dados = await db('tbl_feeding_log')
            .where('id_feeding', id)
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
    getFeedingById,
    getLastId,
    setInsertFeeding,
    setDeleteFeeding
}