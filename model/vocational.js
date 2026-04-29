/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de PROFISSIONAL da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getVocationalById = async function (id) {
    try {
        let dados = await db('tbl_profissional')
        .select('*')
        .where('id_profissional', id)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const getVocationalByChildrenId = async function (id_children) {
    try {
        let dados = await db('tbl_profissional')
        .select('*')
        .where('fk_id_filho', id_children)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const getVocationalBySpecialty = async function (id_specialty, id_children) {
    try {
        let dados = await db('tbl_profissional')
        .select('*')
        .where({
            fk_id_especializacao: `${id_specialty}`,
            fk_id_filho: `${id_children}`
        })

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertVocational = async function (vocational) {
    try {
        let dados = await db('tbl_profissional')
        .insert({
            nome: `${vocational.nome}`,
            telefone: `${vocational.telefone}`,
            ultima_consulta: `${vocational.ultima_consulta}`,
            endereco: `${vocational.endereco}`,
            fk_id_filho: `${vocational.fk_id_filho}`,
            fk_id_especializacao: `${vocational.fk_id_especializacao}`
        })

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateVocational = async function (vocational, id) {
    try {
        let dados = await db('tbl_profissional')
        .insert({
            nome: `${vocational.nome}`,
            telefone: `${vocational.telefone}`,
            ultima_consulta: `${vocational.ultima_consulta}`,
            endereco: `${vocational.endereco}`,
            fk_id_especializacao: `${vocational.fk_id_especializacao}`
        })
        .where('id_profissional', id)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteVocational = async function (id) {
    try {
        let dados = await db('tbl_profissional')
        .where('id_profissional', id)
        .delete()

        if (dados > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getVocationalById,
    getVocationalByChildrenId,
    getVocationalBySpecialty,
    setInsertVocational,
    setUpdateVocational,
    setDeleteVocational
}