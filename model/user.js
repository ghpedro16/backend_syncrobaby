/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de USUÁRIO da aplicação SyncroBaby
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')
const bcrypt = require('bcrypt')

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

const getUserByEmail = async function (email) {
    try {
        
        let dados = await db('tbl_guardian')
        .select('*')
        .where({email: email})

        if(dados.length > 0)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const getUserByLogin = async function (user) {

    try {

        let dados = await db('tbl_guardian')
            .select('*')
            .where({
                email: user.email
            })

        if (!dados)
            return false

        const senhaValida = await bcrypt.compare(
            user.password,
            dados[0].password
        )

        if (!senhaValida)
            return false

        return dados

    } catch (error) {
        return false
    }
}

const setInsertUser = async function (user) {

    try {

        // gera hash da senha
        const senhaCriptografada = await bcrypt.hash(user.password, 10)

        let dados = await db('tbl_guardian')
            .insert({
                guardian_name: user.guardian_name,
                email: user.email,
                password: senhaCriptografada,
                profile_picture: user.profile_picture
            })


        if (dados.length > 0)
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
    getUserByEmail,
    getUserByLogin,
    setInsertUser,
    setUpdateUser,
    setDeleteUser
}