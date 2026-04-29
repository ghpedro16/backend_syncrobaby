/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de VACINA da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')
 
const getVaccineByStatus = async function(id_status){
    try {
        let dados = await db('tbl_vacina')
        .join('tbl_filho_vacina')
        .where()

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
        let dados = await db('tbl_vacina')
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
        let dados = await db('tbl_vacina')
        .select('*')

        if(dados.length > 0)
            return result
        else
            return false

   } catch (error) {
        return false
   }
}