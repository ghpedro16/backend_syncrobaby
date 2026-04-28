/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de USUÁRIO da aplicação SyncroBaby
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getUserById = async function (id) {
    try {
        
        let dados = await db('tbl_responsavel')
        .select('*')
        .where('id_responsavel', id)
        .first()

        return dados || false

    } catch (error) {
        return false
    }
}

const getUserByLogin = async function (email, password) {
    try {

        let dados = await db('tbl_responsavel')
        .select('*')
        .where({
            email: `${email}`,
            senha: `${password}`
        })
        .first()

        return dados || false

    } catch (error) {
        return false
    }
}

const setInsertUser = async function (user) {
    try {

        let dados = await db('tbl_responsavel')
        .insert({
            nome_responsavel: `${user.nome_responsavel}`,
            email: `${user.email}`,
            senha: `${user.senha}`,
            foto_perfil: `${user.foto_perfil}`
        })

        return dados || false

    } catch (error) {
        return false
    }
}

const setUpdateUser = async function (id, user) {
    try {

        let dados = await db('tbl_responsavel')
        .update({
            nome_responsavel: `${user.nome_responsavel}`,
            email: `${user.email}`,
            senha: `${user.senha}`,
            foto_perfil: `${user.foto_perfil}`
        })
        .where('id_responsavel', id)

        return dados || false

    } catch (error) {
        return false
    }
}

const setDeleteUser = async function (id, password) {
    try {

        let dados = await db('tbl_responsavel')
        .update({
            ativo: false
        })
        .where({
            id_responsavel: `${id}`,
            senha: `${password}`
        })

        return dados || false

    } catch (error) {
        return false
    }
}

module.exports = {
    getUserById,
    getUserByLogin,
    setInsertUser,
    setUpdateUser,
    setDeleteUser
}