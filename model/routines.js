/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a funcionalidade de ROTINAS da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getRoutinesByCurrentDate = async function(id_child, date){
    try {
        let dados = await db('vw_routine_timeline')
        .select('*')
        .where({
            child: id_child,
            date: date
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
    getRoutinesByCurrentDate
}