/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de TIPO NOTIFICACAO da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getNotificationTypeById = async function(id){
    try {
        let dados = await db('tbl_notification_type')
        .select('*')
        .where({
            id_notification_type: id
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
    getNotificationTypeById
}