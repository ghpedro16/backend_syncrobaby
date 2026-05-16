/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de VACINA da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require('../config/connection.js')

const getVaccineByStatus = async function (status, id_child) {
    try {
        let dados = await db('vw_vaccination_status')
            .select('vaccine', 'observation', 'prevented_diseases', 'application_status', 'application_date', 'id_child')
            .where({
                application_status: status,
                id_child: id_child
            })

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const getAllVaccines = async function () {
    try {
        let dados = await db('tbl_vaccine')
            .select('*')

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const getVaccineByAgeGroup = async function (id_age_group) {
    try {
        let dados = await db('vw_vaccination_status')
            .select('vaccine', 'observation', 'prevented_diseases', 'id_age_group', 'age_group_name')
            .where('id_age_group', id_age_group)

        if (dados.length > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateVaccineStatus = async function (vaccine) {
    try {
        let dados = await db('tbl_child_vaccine')
            .update({
                application_status: vaccine.application_status,
                application_date: vaccine.application_date
            })
            .where({
                fk_id_child: vaccine.fk_id_child,
                fk_id_vaccine: vaccine.fk_id_vaccine
            })

        if (dados > 0)
            return dados
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getAllVaccines,
    getVaccineByStatus,
    getVaccineByAgeGroup,
    setUpdateVaccineStatus
}