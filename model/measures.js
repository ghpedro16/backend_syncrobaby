/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de MEDIDAS da aplicação SyncroBaby
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')
 
const getHeightByChildrenId = async function(id){
    try {
        let dados = await db('tbl_measurement_history')
        .select('height', 'update_date')
        .where('fk_id_child', id)

        if(dados.length > 0)
            return dados
        else
            return false

   } catch (error) {
        return false
   }
}

const getWeightByChildrenId = async function(id){
    try {
        let dados = await db('tbl_measurement_history')
        .select('weight', 'update_date')
        .where('fk_id_child', id)

        if(dados.length > 0)
            return dados
        else
            return false

   } catch (error) {
        return false
   }
}

const getBmiByChildrenId = async function(id){
    try {
        let dados = await db('tbl_measurement_history')
        .select('bmi', 'update_date')
        .where('fk_id_child', id)

        if(dados.length > 0)
            return dados
        else
            return false

   } catch (error) {
        return false
   }
}

const getHeadCircumferenceByChildrenId = async function(id){
    try {
        let dados = await db('tbl_measurement_history')
        .select('head_circumference', 'update_date')
        .where('fk_id_child', id)

        if(dados.length > 0)
            return dados
        else
            return false

   } catch (error) {
        return false
   }
}

const setInsertMeasures = async function(measurement){
    try {
        let dados = await db('tbl_measurement_history')
        .insert({
            description: measurement.description,
            fk_id_child: measurement.fk_id_child,
            head_circumference: measurement.head_circumference,
            height: measurement.height,
            weight: measurement.weight
        })

        if(dados.length > 0)
            return dados
        else
            return false

   } catch (error) {
       console.log(error)
        return false
   }
}

module.exports = {
    getHeightByChildrenId,
    getWeightByChildrenId,
    getBmiByChildrenId,
    getHeadCircumferenceByChildrenId,
    setInsertMeasures
}
