/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de FILHO da aplicação SyncroBaby
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getAllChildrenByIdUser = async function(id_user){
   try {
        let dados = await db('tbl_filho')
        .select('*')
        .where('fk_id_responsavel', id_user)

        return dados || false

   } catch (error) {
        return false
   }
}

const getChildrenById = async function(id){
   try {
        let dados = await db('tbl_filho')
        .select('*')
        .where('id_filho', id)

        return dados || false
        
   } catch (error) {
        return false
   }
}

const setInsertChildren = async function(children){
    try {
        let dados = await db('tbl_filho')
        .insert({
            nome_filho: `${children.nome_filho}`,
            altura: `${children.altura}`,
            peso: `${children.peso}`,
            data_nascimento: `${children.data_nascimento}`,
            imc: `${children.imc}`,
            tipo_sanguineo: `${children.tipo_sanguineo}`,
            genero: `${children.genero}`,
            foto: `${children.foto}`,
            fk_id_responsavel: `${children.fk_id_responsavel}`,
        })

        return dados || false
        
   } catch (error) {
        return false
   }
}

const setUpdateChildren = async function(children, id){
    try {
        let dados = await db('tbl_filho')
        .update({
            nome_filho: `${children.nome_filho}`,
            altura: `${children.altura}`,
            peso: `${children.peso}`,
            data_nascimento: `${children.data_nascimento}`,
            imc: `${children.imc}`,
            tipo_sanguineo: `${children.tipo_sanguineo}`,
            genero: `${children.genero}`,
            foto: `${children.foto}`
        })
        .where('id_filho', id)

        return dados || false
        
   } catch (error) {
        return false
   }
}

const setDeleteChildren = async function(id){
    try {
        let dados = await db('tbl_filho')
        .update({
            ativo: false
        })
        .where('id_filho', id)

        return dados || false
        
   } catch (error) {
        return false
   }
}

module.exports = {
    getChildrenById,
    getAllChildrenByIdUser,
    setInsertChildren,
    setUpdateChildren,
    setDeleteChildren
}