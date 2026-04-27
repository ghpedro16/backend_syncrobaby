/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de USUÁRIO da aplicação SyncroBaby
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

//Criar variavel para conexao com o banco

const getUserById = async function (id) {
    try {
        //Script sql
        let sql = null

        //Variavel de encaminhamento ao banco
        let result = null

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getUserByLogin = async function (email, password) {
    try {
        //Script sql
        let sql = null

        //Variavel de encaminhamento ao banco
        let result = null

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertUser = async function (user) {

}

const setUpdateUser = async function (id, user) {

}

const setDeleteUser = async function (id) {

}

module.exports = {
    getUserById,
    getUserByLogin,
    setInsertUser,
    setUpdateUser,
    setDeleteUser
}