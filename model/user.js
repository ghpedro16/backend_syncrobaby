/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de USUÁRIO da aplicação SyncroBaby
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getUserById = async function (id) {
    try {
        
        let dados = await db('tbl_guardian')
        .select('*')
        .where('id_guardian', id)

        if(dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const getUserByLogin = async function (email, password) {
    try {

        let dados = await db('tbl_guardian')
        .select('*')
        .where({
            email: `${email}`,
            password: `${password}`
        })

        if(dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertUser = async function (user) {
    try {

        let dados = await db('tbl_guardian')
        .insert({
            guardian_name: `${user.guardian_name}`,
            email: `${user.email}`,
            password: `${user.password}`,
            profile_picture: `${user.profile_picture}`
        })

        if(dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateUser = async function (user) {
    try {

        let dados = await db('tbl_guardian')
        .update({
            guardian_name: `${user.guardian_name}`,
            email: `${user.email}`,
            password: `${user.password}`,
            profile_picture: `${user.profile_picture}`
        })
        .where({id_guardian: `${user.id_guardian}`})

        if(dados > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteUser = async function (id, password) {
    try {

        let dados = await db('tbl_guardian')
        .update({
            active: false
        })
        .where({
            id_guardian: `${id}`,
            password: `${password}`
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
    getUserById,
    getUserByLogin,
    setInsertUser,
    setUpdateUser,
    setDeleteUser
}