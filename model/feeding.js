/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de REGISTRO ALIMENTAÇÃO da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getFeedingById = async function (id){
    try {
        let dados = await db('tbl_registro_alimentacao')
        .select('*')
        .where('id_alimentacao', id)

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

        let dados = await db('tbl_registro_alimentacao')
            .insert({
                data_hora: `${feeding.data_hora}`,
                descricao: `${feeding.descricao}`,
                fk_id_filho: `${feeding.fk_id_filho}`,
                fk_id_tipo_produto: `${feeding.fk_id_tipo_produto}`
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

        let dados = await db('tbl_registro_alimentacao')
            .where('id_alimentacao', id)
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
    setInsertFeeding,
    setDeleteFeeding
}