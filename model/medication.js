/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de REGISTRO MEDICAMENTO da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/


const db = require('../config/connection.js')

const getMedicationById = async function (id){
    try {
        let dados = await db('tbl_registro_medicacao')
        .select('*')
        .where('id_medicacao', id)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertMedication = async function (medication) {
    try {

        let dados = await db('tbl_registro_medicacao')
            .insert({
                data_hora: `${medication.data_hora}`,
                descricao: `${medication.descricao}`,
                fk_id_filho: `${medication.fk_id_filho}`
            })

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteMedication = async function (id) {
    try {

        let dados = await db('tbl_registro_medication')
            .where('id_medication', id)
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
    getMedicationById,
    setInsertMedication,
    setDeleteMedication
}