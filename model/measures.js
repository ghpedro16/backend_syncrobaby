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
        .select('perimetro_cefalico', 'data')
        .where('fk_id_filho', id)

        if(dados.length > 0)
            return dados
        else
            return false

   } catch (error) {
        return false
   }
}

const setInsertMeasures = async function(medidas){
    try {
        let dados = await db('tbl_measurement_history')
        .insert({
            peso: `${medidas.peso}`,
            altura: `${medidas.altura}`,
            perimetro_cefalico: `${medidas.perimetro_cefalico}`,
            descricao: `${medidas.descricao}`,
            fk_id_historico_medidas: `${medidas.fk_id_historico_medidas}`
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
    getHeightByChildrenId,
    getWeightByChildrenId,
    getBmiByChildrenId,
    getHeadCircumferenceByChildrenId,
    setInsertMeasures
}
