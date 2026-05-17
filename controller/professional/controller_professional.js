/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const vocationalDAO = require("../../model/professional.js");
const specialtyDAO = require("../../model/professional_specialty.js");
const childrenDAO = require("../../model/children.js");

const DEFAULT_MESSAGES = require("../modulo/config_messages.js");

const listVocationalById = async function (id) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

  try {
    let resultVocational = await vocationalDAO.getVocationalById(id);

    if (resultVocational) {
      if (resultVocational.length > 0) {
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status;
        MESSAGES.DEFAULT_HEADER.status_code =
          MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.response.vocational = resultVocational;

        return MESSAGES.DEFAULT_HEADER; // 200
      } else {
        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
      }
    } else {
      return MESSAGES.ERROR_NOT_FOUND; // 404
    }
  } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
};

const listVocationalByChildrenId = async function (id_children, id_guardian) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

  try {
    let resultChildren = await childrenDAO.getChildrenById(
      id_children,
      id_guardian,
    );
    if (resultChildren) {
      let resultVocational =
        await vocationalDAO.getVocationalByChildrenId(id_children);
      if (resultVocational) {
        if (resultVocational.length > 0) {
          MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status;
          MESSAGES.DEFAULT_HEADER.status_code =
            MESSAGES.SUCCESS_REQUEST.status_code;
          MESSAGES.DEFAULT_HEADER.response.vocational = resultVocational;

          return MESSAGES.DEFAULT_HEADER; // 200
        } else {
          return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
        }
      } else {
        return MESSAGES.ERROR_NOT_FOUND; // 404
      }
    } else {
      MESSAGES.ERROR_RELATIONAL_INSERTION.message +=
        " [Chave estrangeira de filho não encontrada!]";
      return MESSAGES.ERROR_RELATIONAL_INSERTION; // 404
    }
  } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
};

const listVocationalBySpecialty = async function (
  id_specialty,
  id_children,
  id_guardian,
) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

  try {
    let resultSpecialty =
      await specialtyDAO.getVocationalSpecialtyById(id_specialty);

    if (resultSpecialty) {
      let resultChildren = await childrenDAO.getChildrenById(
        id_children,
        id_guardian,
      );

      if (resultChildren) {
        let resultVocational = await vocationalDAO.getVocationalBySpecialty(
          id_specialty,
          id_children,
        );

        if (resultVocational) {
          if (resultVocational.length > 0) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status;
            MESSAGES.DEFAULT_HEADER.status_code =
              MESSAGES.SUCCESS_REQUEST.status_code;
            MESSAGES.DEFAULT_HEADER.response.vocational = resultVocational;

            return MESSAGES.DEFAULT_HEADER; // 200
          } else {
            return MESSAGES.ERROR_NOT_FOUND; // 404
          }
        } else {
          return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
        }
      } else {
        MESSAGES.ERROR_RELATIONAL_INSERTION.message +=
          " [Chave estrangeira de filho não encontrada!]";
        return MESSAGES.ERROR_RELATIONAL_INSERTION; // 404
      }
    } else {
      MESSAGES.ERROR_RELATIONAL_INSERTION.message +=
        " [Chave estrangeira de especialidade não encontrada!]";
      return MESSAGES.ERROR_RELATIONAL_INSERTION; // 404
    }
  } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
};

const insertVocational = async function (vocational, contentType, id_guardian) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

  try {
    if (String(contentType).toUpperCase() == "APPLICATION/JSON") {
      let validar = await validarDados(vocational);

      if (!validar) {
        let resultChildren = await childrenDAO.getChildrenById(
          vocational.fk_id_child,
          id_guardian,
        );

        if (resultChildren) {
          let resultSpecialty = await specialtyDAO.getVocationalSpecialtyById(
            vocational.fk_id_specialization,
          );

          if (resultSpecialty) {
            let resultVocational =
              await vocationalDAO.setInsertVocational(vocational);

            if (resultVocational) {
              MESSAGES.DEFAULT_HEADER.status =
                MESSAGES.SUCCESS_CREATE_ITEM.status;
              MESSAGES.DEFAULT_HEADER.status_code =
                MESSAGES.SUCCESS_CREATE_ITEM.status_code;
              MESSAGES.DEFAULT_HEADER.response = vocational;

              return MESSAGES.DEFAULT_HEADER; // 201
            } else {
              return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
          } else {
            MESSAGES.ERROR_RELATIONAL_INSERTION.message +=
              " [ID de Especialidade encontrado!]";
            return MESSAGES.ERROR_RELATIONAL_INSERTION; // 404
          }
        } else {
          MESSAGES.ERROR_RELATIONAL_INSERTION.message +=
            " [ID de Filho encontrado!]";
          return MESSAGES.ERROR_RELATIONAL_INSERTION; // 404
        }
      } else {
        return validar;
      }
    } else {
      return MESSAGES.ERROR_CONTENT_TYPE; // 415
    }
  } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
};

const updateVocational = async function (
  vocational,
  id,
  contentType,
  id_guardian,
) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

  try {
    if (String(contentType).toUpperCase() == "APPLICATION/JSON") {
      let validar = await validarDados(vocational);

      if (!validar) {
        let validarId = await listVocationalById(id);

        if (validarId.status_code == 200) {
          let resultChildren = await childrenDAO.getChildrenById(
            vocational.fk_id_child,
            id_guardian,
          );

          if (resultChildren) {
            let resultSpecialty = await specialtyDAO.getVocationalSpecialtyById(
              vocational.fk_id_specialization,
            );
            if (resultSpecialty) {
              vocational.id = Number(id);

              let resultVocational = await vocationalDAO.setUpdateVocational(
                vocational,
                id,
              );

              if (resultVocational) {
                MESSAGES.DEFAULT_HEADER.status =
                  MESSAGES.SUCCESS_UPDATE_ITEM.status;
                MESSAGES.DEFAULT_HEADER.status_code =
                  MESSAGES.SUCCESS_CREATE_ITEM.status_code;
                MESSAGES.DEFAULT_HEADER.response = vocational;

                return MESSAGES.DEFAULT_HEADER;
              } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
              }
            } else {
              MESSAGES.ERROR_RELATIONAL_INSERTION.message +=
                " [ID de especialidade  não encontrado!]";
              return MESSAGES.ERROR_RELATIONAL_INSERTION; // 404
            }
          } else {
            MESSAGES.ERROR_RELATIONAL_INSERTION.message +=
              " [ID de Filho  não encontrado!]";
            return MESSAGES.ERROR_RELATIONAL_INSERTION; // 404
          }
        } else {
          return validarId;
        }
      } else {
        return validar;
      }
    } else {
      return MESSAGES.ERROR_CONTENT_TYPE; // 415
    }
  } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
};

const deleteVocational = async function (id) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

  try {
    if (!isNaN(id) && id != "" && id != null && id > 0) {
      let validarId = await listVocationalById(id);

      if (validarId.status_code == 200) {
        let resultVocational = await vocationalDAO.setDeleteVocational(id);

        if (resultVocational) {
          MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status;
          MESSAGES.DEFAULT_HEADER.status_code =
            MESSAGES.SUCCESS_DELETE_ITEM.status_code;
          MESSAGES.DEFAULT_HEADER.message =
            MESSAGES.SUCCESS_DELETE_ITEM.message;

          return MESSAGES.DEFAULT_HEADER; // 200
        } else {
          return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
        }
      } else {
        return MESSAGES.ERROR_NOT_FOUND; // 404
      }
    } else {
      MESSAGES.ERROR_REQUIRED_FIELDS.message += " [ID Incorreto!]";
      return MESSAGES.ERROR_REQUIRED_FIELDS; // 400
    }
  } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
};

const validarDados = async function (vocational) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

  if (
    vocational.professional_name == "" ||
    vocational.professional_name == undefined ||
    vocational.professional_name == null ||
    vocational.professional_name.length > 150
  ) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += " [Nome incorreto]";
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  } else if (
    vocational.phone == null ||
    vocational.phone == undefined ||
    vocational.phone == "" ||
    vocational.phone.length > 15
  ) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += " [Telefone incorreto]";
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  } else if (
    vocational.address == null ||
    vocational.address == undefined ||
    vocational.address == "" ||
    vocational.address.length > 500
  ) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += " [Endereco incorreto]";
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  } else if (
    vocational.last_consultation == null ||
    vocational.last_consultation == undefined ||
    vocational.last_consultation == "" ||
    new Date(vocational.last_consultation) > new Date()
  ) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += " [Ultima Consulta incorreto]";
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  } else if (
    vocational.fk_id_child == undefined ||
    vocational.fk_id_child == null ||
    vocational.fk_id_child == "" ||
    isNaN(vocational.fk_id_child) ||
    vocational.fk_id_child <= 0
  ) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message +=
      " [ID (chave estrangeira) incorreto]";
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  } else if (
    vocational.fk_id_specialization == undefined ||
    vocational.fk_id_specialization == null ||
    vocational.fk_id_specialization == "" ||
    isNaN(vocational.fk_id_specialization) ||
    vocational.fk_id_specialization <= 0
  ) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message +=
      " [ID (chave estrangeira) incorreto]";
    return MESSAGES.ERROR_REQUIRED_FIELDS;
  } else {
    return false;
  }
};

module.exports = {
  listVocationalById,
  listVocationalByChildrenId,
  listVocationalBySpecialty,
  insertVocational,
  deleteVocational,
  updateVocational,
};
