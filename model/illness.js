/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de ENFERMIDADE da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getIllnessById = async function(id){
    try {
        let dados = await db('tbl_illness')
        .select('*')
        .where('id_illness', id)

        if(dados.length > 0)
            return dados
        else
            return false

   } catch (error) {
        return false
   }
}
 
const getIllnessByChildId = async function(id_child){
    try {
        let dados = await db('tbl_illness')
        .select('*')
        .where('fk_id_child', id_child)

        if(dados.length > 0)
            return dados
        else
            return false

   } catch (error) {
        return false
   }
}

const getIllnessByType = async function(type){
    try {
        let dados = await db('tbl_illness')
        .select('*')
        .where('illness_type', type)

        if(dados.length > 0)
            return dados
        else
            return false

   } catch (error) {
        return false
   }
}

const setInsertIllness = async function(illness){
    try {
        let dados = await db('tbl_illness')
        .insert({
            illness_name: `${illness.illness_name}`,
            start_date: `${illness.start_date}`,
            end_date: `${illness.end_date}`,
            description: `${illness.description}`,
            illness_type: `${illness.illness_type}`,
            medication: `${illness.medication}`,
            fk_id_child: `${illness.fk_id_child}`
        })

        if(dados.length > 0)
            return dados
        else
            return false

   } catch (error) {
        return false
   }
}

const setDeleteIllness = async function(id){
    try {
        let dados = await db('tbl_illness')
        .where('id_illness', id)
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
    getIllnessById,
    getIllnessByChildId,
    getIllnessByType,
    setInsertIllness,
    setDeleteIllness
}