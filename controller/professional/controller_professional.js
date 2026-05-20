/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 24/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const professionalDAO = require("../../model/professional.js");

const DEFAULT_MESSAGES = require("../modulo/config_messages.js");

const listProfessionalById = async function (id) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

  try {
    let resultProfessional = await professionalDAO.getProfessionalById(id)

    if (resultProfessional) {

      if (resultProfessional.length > 0) {

        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
        MESSAGES.DEFAULT_HEADER.professional = resultProfessional

        return MESSAGES.DEFAULT_HEADER // 200

      } else {
        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
      }

    } else {
      return MESSAGES.ERROR_NOT_FOUND // 404
    }

  } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
  }
}

const listProfessionalByChildrenId = async function (id_children) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

  try {

    let resultProfessional = await professionalDAO.getProfessionalByChildrenId(id_children)

    if (resultProfessional) {

      if (resultProfessional.length > 0) {

        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
        MESSAGES.DEFAULT_HEADER.professional = resultProfessional

        return MESSAGES.DEFAULT_HEADER // 200

      } else {
        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
      }

    } else {
      return MESSAGES.ERROR_NOT_FOUND // 404
    }

  } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
  }
}

const listProfessionalBySpecialty = async function (id_specialty, id_children) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

  try {
    let resultProfessional = await professionalDAO.getProfessionalBySpecialty(id_specialty, id_children)

    if (resultProfessional) {

      if (resultProfessional.length > 0) {

        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
        MESSAGES.DEFAULT_HEADER.professional = resultProfessional

        return MESSAGES.DEFAULT_HEADER // 200

      } else {
        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
      }

    } else {
      return MESSAGES.ERROR_NOT_FOUND // 404
    }

  } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
  }
}

const insertProfessional = async function (professional, contentType) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

  try {

    if (String(contentType).toUpperCase() == "APPLICATION/JSON") {
      let validar = await validarDados(professional)

      if (!validar) {

        let resultProfessional = await professionalDAO.setInsertProfessional(professional)

        if (resultProfessional) {

          MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code

          return MESSAGES.DEFAULT_HEADER // 201

        } else {
          return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }

      } else {
        return validar
      }

    } else {
      return MESSAGES.ERROR_CONTENT_TYPE // 415
    }

  } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
  }
}

const updateProfessional = async function (professional, id, contentType) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

  try {

    if (String(contentType).toUpperCase() == "APPLICATION/JSON") {
      let validar = await validarDados(professional)

      if (!validar) {
        let validarId = await listProfessionalById(id)

        if (validarId.status_code == 200) {

          let resultProfessional = await professionalDAO.setUpdateProfessional(professional, id)

          if (resultProfessional) {
            
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
            MESSAGES.DEFAULT_HEADER.professional = professional

            return MESSAGES.DEFAULT_HEADER // 200

          } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
          }

        } else {
          return validarId
        }

      } else {
        return validar
      }

    } else {
      return MESSAGES.ERROR_CONTENT_TYPE // 415
    }

  } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
  }
}

const deleteProfessional = async function (id) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

  try {

    if (!isNaN(id) && id != "" && id != null && id > 0) {
      let validarId = await listProfessionalById(id)

      if (validarId.status_code == 200) {
        let resultProfessional = await professionalDAO.setDeleteProfessional(id)

        if (resultProfessional) {
          
          MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
          MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message

          return MESSAGES.DEFAULT_HEADER // 200

        } else {
          return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }

      } else {
        return MESSAGES.ERROR_NOT_FOUND // 404
      }

    } else {
      MESSAGES.ERROR_REQUIRED_FIELDS.message += " [ID Incorreto!]"

      return MESSAGES.ERROR_REQUIRED_FIELDS // 400
    }

  } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
  }
}

const validarDados = async function (professional) {
  let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

  if (professional.professional_name == "" || professional.professional_name == undefined || professional.professional_name == null || professional.professional_name.length > 150) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += " [Nome incorreto]"

    return MESSAGES.ERROR_REQUIRED_FIELDS
  }

  else if (professional.phone == null || professional.phone == undefined || professional.phone == "" || professional.phone.length > 15) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += " [Telefone incorreto]"

    return MESSAGES.ERROR_REQUIRED_FIELDS
  }

  else if (professional.address == null || professional.address == undefined || professional.address == "" || professional.address.length > 500) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += " [Endereco incorreto]"

    return MESSAGES.ERROR_REQUIRED_FIELDS
  }

  else if (professional.last_consultation == null || professional.last_consultation == undefined || professional.last_consultation == "" || new Date(professional.last_consultation) > new Date()) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += " [Ultima Consulta incorreto]"

    return MESSAGES.ERROR_REQUIRED_FIELDS
  }

  else if (professional.fk_id_child == undefined || professional.fk_id_child == null || professional.fk_id_child == "" || isNaN(professional.fk_id_child) || professional.fk_id_child <= 0) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += " [ID (chave estrangeira) incorreto]"

    return MESSAGES.ERROR_REQUIRED_FIELDS
  }

  else if (professional.fk_id_specialization == undefined || professional.fk_id_specialization == null || professional.fk_id_specialization == "" || isNaN(professional.fk_id_specialization) || professional.fk_id_specialization <= 0) {
    MESSAGES.ERROR_REQUIRED_FIELDS.message += " [ID (chave estrangeira) incorreto]"

    return MESSAGES.ERROR_REQUIRED_FIELDS
  }

  else {
    return false
  }
}
module.exports = {
  listProfessionalById,
  listProfessionalByChildrenId,
  listProfessionalBySpecialty,
  insertProfessional,
  updateProfessional,
  deleteProfessional
};
