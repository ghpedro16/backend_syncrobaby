/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de PROFISSIONAL da aplicação SyncroBaby
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require("../config/connection.js");

const getProfessionalById = async function (id) {
  try {
    let dados = await db("tbl_professional")
      .select("*")
      .where("id_professional", id)

    if (dados.length > 0)
      return dados

    else
      return false

  } catch (error) {
    return false
  }
}

const getProfessionalByChildrenId = async function (id_children) {
  try {
    let dados = await db("tbl_professional")
      .select("*")
      .where("fk_id_child", id_children)

    if (dados.length > 0)
      return dados

    else
      return false

  } catch (error) {
    return false
  }
}

const getProfessionalBySpecialty = async function (id_specialty, id_children) {
  try {
    let dados = await db("tbl_professional")
      .select("*")
      .where({
        fk_id_specialization: `${id_specialty}`,
        fk_id_child: `${id_children}`,
      })

    if (dados.length > 0)
      return dados

    else
      return false

  } catch (error) {
    return false
  }
}

const setInsertProfessional = async function (professional) {
  try {
    let dados = await db("tbl_professional")
      .insert({
        professional_name: `${professional.professional_name}`,
        phone: `${professional.phone}`,
        last_consultation: `${professional.last_consultation}`,
        address: `${professional.address}`,
        fk_id_child: `${professional.fk_id_child}`,
        fk_id_specialization: `${professional.fk_id_specialization}`,
      })

    if (dados.length > 0)
      return dados

    else
      return false

  } catch (error) {
    return false
  }
}

const setUpdateProfessional = async function (professional, id) {
  try {
    let dados = await db("tbl_professional")
      .update({
        professional_name: `${professional.professional_name}`,
        phone: `${professional.phone}`,
        last_consultation: `${professional.last_consultation}`,
        address: `${professional.address}`,
        fk_id_specialization: `${professional.fk_id_specialization}`,
      })
      .where("id_professional", id)

    if (dados > 0)
      return dados

    else
      return false

  } catch (error) {
    return false
  }
}

const setDeleteProfessional = async function (id) {
  try {
    let dados = await db("tbl_professional")
      .where("id_professional", id)
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
  getProfessionalById,
  getProfessionalByChildrenId,
  getProfessionalBySpecialty,
  setInsertProfessional,
  setUpdateProfessional,
  setDeleteProfessional
};
