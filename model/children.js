/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de FILHO da aplicação SyncroBaby
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getAllChildrenByIdUser = async function (id_guardian) {
     try {
          let dados = await db('tbl_child')
               .select('*')
               .where('fk_id_guardian', id_guardian)

          if (dados.length > 0)
               return dados
          else
               return false

     } catch (error) {
          return false
     }
}

const getChildrenById = async function (id) {
     try {
          let dados = await db('tbl_child')
               .select('*')
               .where('id_child', id)

          if (dados.length > 0)
               return dados
          else
               return false

     } catch (error) {
          return false
     }
}

const setInsertChildren = async function (child) {
     try {
          let dados = await db('tbl_child')
               .insert({
                    child_name: `${child.child_name}`,
                    height: `${child.height}`,
                    weight: `${child.weight}`,
                    birth_date: `${child.birth_date}`,
                    blood_type: `${child.blood_type}`,
                    gender: `${child.gender}`,
                    photo: `${child.photo}`,
                    fk_id_guardian: `${child.fk_id_guardian}`
               })

          if (dados.length > 0)
               return dados
          else
               return false

     } catch (error) {
          return false
     }
}

const setUpdateChildren = async function (child) {
     try {
          let dados = await db('tbl_filho')
               .update({
                    child_name: `${child.child_name}`,
                    height: `${child.height}`,
                    weight: `${child.weight}`,
                    birth_date: `${child.birth_date}`,
                    blood_type: `${child.blood_type}`,
                    gender: `${child.gender}`,
                    photo: `${child.photo}`
               })
               .where({id_child: child.id_child})

          if (dados > 0)
               return dados
          else
               return false

     } catch (error) {
          return false
     }
}

const setDeleteChildren = async function (id) {
     try {
          let dados = await db('tbl_child')
               .update({
                    active: false
               })
               .where('id_child', id)

          if (dados > 0)
               return dados
          else
               return false

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