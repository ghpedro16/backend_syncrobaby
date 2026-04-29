/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de DIÁRIO da aplicação SyncroBaby
 * Data: 27/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')
 
const getDiaryByChildrenId = async function(id_children){
    try {
        let dados = await db('tbl_nota_diario')
        .select('*')
        .where('fk_id_filho', id_children)

        if(dados.length > 0)
            return dados
        else
            return false

   } catch (error) {
        return false
   }
}

const getDiaryById = async function(id){
    try {
        let dados = await db('tbl_nota_diario')
        .select('*')
        .where('id_nota_diario', id)

        if(dados.length > 0)
            return dados
        else
            return false

   } catch (error) {
        return false
   }
}

const setInsertDiary = async function(diary){
    try {
        let dados = await db('tbl_nota_diario')
        .insert({
            titulo: `${diary.titulo}`,
            conteudo: `${diary.conteudo}`,
            midia: `${diary.midia}`,
            cor: `${diary.cor}`,
            fk_id_filho: `${diary.fk_id_filho}`
        })

        if(dados.length > 0)
            return dados
        else
            return false

   } catch (error) {
        return false
   }
}

const setUpdateDiary = async function(diary, id){
    try {
        let dados = await db('tbl_nota_diario')
        .update({
            titulo: `${diary.titulo}`,
            conteudo: `${diary.conteudo}`,
            midia: `${diary.midia}`,
            cor: `${diary.cor}`,
            fk_id_filho: `${diary.fk_id_filho}`
        })
        .where('id_nota_diario', id)

        if(dados.length > 0)
            return dados
        else
            return false

   } catch (error) {
        return false
   }
}

const setDeleteDiary = async function(id){
    try {
        let dados = await db('tbl_nota_diario')
        .where('id_nota_diario', id)
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
    getDiaryByChildrenId,
    getDiaryById,
    setInsertDiary,
    setUpdateDiary,
    setDeleteDiary
}