/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de VACINA da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')
 
const getVaccineByStatus = async function(status){
    try {
        let dados = await db('vw_vaccination_status')
        .select('*')
        .where('application_status', status)

        if(dados.length > 0)
            return result
        else
            return false

   } catch (error) {
        return false
   }
}

const getAllVaccines = async function(){
    try {
        let dados = await db('tbl_vaccine')
        .select('*')

        if(dados.length > 0)
            return result
        else
            return false

   } catch (error) {
        return false
   }
}

const getVaccineByAgeGroup = async function(age_group){
    try {
        let dados = await db('vw_application_status')
        .select('*')
        .where('age_group', age_group)

        if(dados.length > 0)
            return result
        else
            return false

   } catch (error) {
        return false
   }
}

module.exports = {
    getAllVaccines,
    getVaccineByStatus,
    getVaccineByAgeGroup
}