/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de FILHO da aplicação SyncroBaby
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

//Criar variavel para conexao com o banco

const getAllChildrenByIdUser = async function (id_user) {
  try {
    //Script sql
    let sql = null;

    //Variavel de encaminhamento ao banco
    let result = null;

    if (Array.isArray(result)) return result;
    else return false;
  } catch (error) {
    return false;
  }
};

const getChildrenById = async function (id) {
  try {
    let result = await db("tbl_child").select("*").where("id_child", id);

    if (Array.isArray(result)) return result;
    else return false;
  } catch (error) {
    return false;
  }
};

const setInsertChildren = async function () {};

const setUpdateChildren = async function (id) {};

const setDeleteChildren = async function (id) {};

module.exports = {
  getAllChildrenByIdUser,
  getChildrenById,
  setInsertChildren,
  setUpdateChildren,
  setDeleteChildren,
};
