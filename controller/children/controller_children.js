/******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação dos dados entre a model (banco de dados) e o arquivo app (inicializacão do endpoint)
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * ****************************************************************************************************************************************/

const childrenDAO = require('../../model/children.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listChildren = async function (id, id_guardian) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let resultChildren = await childrenDAO.getChildrenById(id, id_guardian)

        if (resultChildren) {
            if (resultChildren.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.children = resultChildren

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

const listChildrenByUserId = async function (id_user) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultChildren = await childrenDAO.getAllChildrenByIdUser(id_user)

        if (resultChildren) {
            if (resultChildren.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.children = resultChildren

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

const listDeactivateChildren = async function (id_user) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultChildren = await childrenDAO.getDeactivateChildren(id_user)

        if (resultChildren) {
            if (resultChildren.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.children = resultChildren

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

const insertChildren = async function (child, id_guardian, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            child.fk_id_guardian = id_guardian

            let validar = await validarDados(child)

            if (!validar) {

                let resultChildren = await childrenDAO.setInsertChildren(child)

                if (resultChildren) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.response = child

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

const updateChildren = async function (id, child, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarUpdate(child)

            if (!validar) {

                let validarId = await listChildren(id, child.fk_id_guardian)


                if (validarId.status_code == 200) {

                    child.id_child = Number(id)

                    let resultChildren = await childrenDAO.setUpdateChildren(child)

                    if (resultChildren) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.response = child

                        return MESSAGES.DEFAULT_HEADER // 201
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

const deactivateChildren = async function (id, child, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validarId = await childrenDAO.getChildrenById(id, child.fk_id_guardian)

            if (validarId) {

                if (validarId[0].child_name == child.child_name) {

                    let resultUser = await childrenDAO.setDeactivateChildren(id, child.fk_id_guardian)

                    if (resultUser) {

                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DEACTIVATE_ITEM.status_code

                        return MESSAGES.DEFAULT_HEADER // 204
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome Incorreto!]'
                    return MESSAGES.ERROR_REQUIRED_FIELDS // 400
                }
            } else {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto!]'
                return MESSAGES.ERROR_REQUIRED_FIELDS // 400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const reactivateChildren = async function (id, idUser) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let validarId = await listChildren(id, idUser)

        if (validarId.status_code == 200) {

            let resultUser = await childrenDAO.setReactivateChildren(id, idUser)

            if (resultUser) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REACTIVATE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REACTIVATE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REACTIVATE_ITEM.message

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto!]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const validarDados = async function (child) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (child.child_name == '' || child.child_name == undefined || child.child_name == null || child.child_name.length > 150) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(child.height) || child.height == undefined || child.height < 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Altura incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(child.weight) || child.weight == undefined || child.weight < 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Peso incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (child.birth_date == null || child.birth_date == undefined || child.birth_date == '' || new Date(child.birth_date) > new Date()) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de Nascimento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (child.blood_type == undefined || child.blood_type.length > 3) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Tipo Sanguíneo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (child.photo == undefined || child.photo.length > 255) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Foto incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (child.gender == undefined || child.gender == null || child.gender == '') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Gênero incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (child.fk_id_guardian == undefined || child.fk_id_guardian == null || child.fk_id_guardian == '' || isNaN(child.fk_id_guardian) || child.fk_id_guardian <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID (chave estrangeira) incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

const validarUpdate = async function (child) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (child.child_name == '' || child.child_name == undefined || child.child_name == null || child.child_name.length > 150) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (child.birth_date == null || child.birth_date == undefined || child.birth_date == '' || new Date(child.birth_date) > new Date()) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de Nascimento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (child.blood_type == undefined || child.blood_type.length > 3) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Tipo Sanguíneo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (child.photo == undefined || child.photo.length > 255) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Foto incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (child.gender == undefined || child.gender == null || child.gender == '') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Gênero incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listChildren,
    listChildrenByUserId,
    listDeactivateChildren,
    insertChildren,
    updateChildren,
    deactivateChildren,
    reactivateChildren
}