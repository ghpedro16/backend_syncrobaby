/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de REGISTRO BANHO da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getBathById = async function (id){
    try {
        let dados = await db('tbl_bath_log')
        .select('*')
        .where('id_bath', id)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertBath = async function(bath){
    try {
        
        let dados = await db('tbl_bath_log')
        .insert({
            start_time: `${bath.start_time}`,
            end_time: `${bath.end_time}`,
            description: `${bath.description}`,
            fk_id_child: `${bath.fk_id_child}`
        })

        if(dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteBath = async function(id){
    try {
        
        let dados = await db('tbl_bath_log')
        .where('id_bath', id)
        .delete()

        if(dados > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getBathById,
    setInsertBath,
    setDeleteBath
}