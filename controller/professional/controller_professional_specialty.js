/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const professionalSpecialtyDAO = require("../../model/professional_specialty.js");

const DEFAULT_MESSAGES = require("../modulo/config_messages.js");

const listProfessionalSpecialtyById = async function (id) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

  try {
    let resultSpecialty = await professionalSpecialtyDAO.getProfessionalSpecialtyById(id);

    if (resultSpecialty) {
      if (resultSpecialty.length > 0) {
  
        MESSAGES.DEFAULT_HEADER.status_code =
          MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.specialty = resultSpecialty;

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

const listAllProfessionalSpecialty = async function () {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

  try {
    let resultSpecialty = await professionalSpecialtyDAO.getAllProfessionalSpecialty();

    if (resultSpecialty) {
      if (resultSpecialty.length > 0) {
        
        MESSAGES.DEFAULT_HEADER.status_code =
          MESSAGES.SUCCESS_REQUEST.status_code;
        MESSAGES.DEFAULT_HEADER.specialty = resultSpecialty;

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

module.exports = {
  listProfessionalSpecialtyById,
  listAllProfessionalSpecialty,
};
