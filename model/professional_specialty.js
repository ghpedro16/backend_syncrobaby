/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de ESPECIALIZACAO PROFISSIONAL da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require("../config/connection.js");

const getProfessionalSpecialtyById = async function (id) {
  try {
    let dados = await db("tbl_specialization")
      .select("*")
      .where("id_specialization", id);

    if (dados.length > 0) return dados;
    else return false;
  } catch (error) {
    return false;
  }
};

const getAllProfessionalSpecialty = async function () {
  try {
    let dados = await db("tbl_specialization").select("*");

    if (dados.length > 0) return dados;
    else return false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  getAllProfessionalSpecialty,
  getProfessionalSpecialtyById
};
