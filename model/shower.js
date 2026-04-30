/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de REGISTRO BANHO da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getShowerById = async function (id){
    try {
        let dados = await db('tbl_registro_banho')
        .select('*')
        .where('id_banho', id)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertShower = async function(shower){
    try {
        
        let dados = await db('tbl_registro_banho')
        .insert({
            horario_inicio: `${shower.horario_inicio}`,
            horario_termino: `${shower.horario_termino}`,
            descricao: `${shower.descricao}`,
            fk_id_filho: `${shower.fk_id_filho}`
        })

        if(dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteShower = async function(id){
    try {
        
        let dados = await db('tbl_registro_banho')
        .where('id_banho', id)
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
    getShowerById,
    setInsertShower,
    setDeleteShower
}