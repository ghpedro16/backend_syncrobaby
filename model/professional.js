/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de PROFISSIONAL da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require("../config/connection.js");

const getVocationalById = async function (id) {
  try {
    let dados = await db("tbl_professional")
      .select("*")
      .where("id_professional", id);
    if (dados.length > 0) return dados;
    else return false;
  } catch (error) {
    return false;
  }
};

const getVocationalByChildrenId = async function (id_children) {
  try {
    let dados = await db("tbl_professional")
      .select("*")
      .where("fk_id_child", id_children);
    if (dados.length > 0) return dados;
    else return false;
  } catch (error) {
    return false;
  }
};

const getVocationalBySpecialty = async function (id_specialty, id_children) {
  try {
    let dados = await db("tbl_professional")
      .select("*")
      .where({
        fk_id_specialization: `${id_specialty}`,
        fk_id_child: `${id_children}`,
      });
    if (dados.length > 0) return dados;
    else return false;
  } catch (error) {
    return false;
  }
};

const setInsertVocational = async function (vocational) {
  try {
    let dados = await db("tbl_professional").insert({
      professional_name: `${vocational.professional_name}`,
      phone: `${vocational.phone}`,
      last_consultation: `${vocational.last_consultation}`,
      address: `${vocational.address}`,
      fk_id_child: `${vocational.fk_id_child}`,
      fk_id_specialization: `${vocational.fk_id_specialization}`,
    });

    if (dados.length > 0) return dados;
    else return false;
  } catch (error) {
    return false;
  }
};

const setUpdateVocational = async function (vocational, id) {
  try {
    let dados = await db("tbl_professional")
      .update({
        professional_name: `${vocational.professional_name}`,
        phone: `${vocational.phone}`,
        last_consultation: `${vocational.last_consultation}`,
        address: `${vocational.address}`,
        fk_id_specialization: `${vocational.fk_id_specialization}`,
      })
      .where("id_professional", id);
    if (dados > 0) return dados;
    else return false;
  } catch (error) {
    return false;
  }
};

const setDeleteVocational = async function (id) {
  try {
    let dados = await db("tbl_professional")
      .where("id_professional", id)
      .delete();

    if (dados > 0) return dados;
    else return false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  getVocationalById,
  getVocationalByChildrenId,
  getVocationalBySpecialty,
  setInsertVocational,
  setUpdateVocational,
  setDeleteVocational,
};
