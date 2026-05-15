/******************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD referente a tabela de DIÁRIO da aplicação SyncroBaby
 * Data: 27/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************/

const db = require("../config/connection.js");

const getDiaryByChildrenId = async function (id_children) {
  try {
    let dados = await db("tbl_diary_note")
      .select("*")
      .where("fk_id_child", id_children);

    if (dados.length > 0) return dados;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getDiaryById = async function (id) {
  try {
    let dados = await db("tbl_diary_note")
      .select("*")
      .where("id_diary_note", id);

    if (dados.length > 0) return dados;
    else return false;
  } catch (error) {
    return false;
  }
};

const setInsertDiary = async function (diary) {
  try {
    let dados = await db("tbl_diary_note").insert({
      title: `${diary.title}`,
      date: `${diary.date}}`,
      content: `${diary.content}`,
      media: `${diary.media}`,
      color: `${diary.color}`,
      fk_id_child: `${diary.fk_id_child}`,
    });

    if (dados.length > 0) return dados;
    else return false;
  } catch (error) {
    return false;
  }
};

const setUpdateDiary = async function (diary, id) {
  try {
    let dados = await db("tbl_diary_note")
      .update({
        title: `${diary.title}`,
        date: `${diary.date}}`,
        content: `${diary.content}`,
        media: `${diary.media}`,
        color: `${diary.color}`,
        fk_id_child: `${diary.fk_id_child}`,
      })
      .where("id_diary_note", id);

    if (dados.length > 0) return dados;
    else return false;
  } catch (error) {
    return false;
  }
};

const setDeleteDiary = async function (id) {
  try {
    let dados = await db("tbl_diary_note").where("id_diary_note", id).delete();

    if (dados > 0) return dados;
    else return false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  getDiaryByChildrenId,
  getDiaryById,
  setInsertDiary,
  setUpdateDiary,
  setDeleteDiary,
};
