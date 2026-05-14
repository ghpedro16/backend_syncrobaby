/*************************************************************************************************************
 * Objetivo: Arquivo responsavel pela criação das funções de CRIAR e VALIDAR o token de autenticidade JWT
 * Data: 02/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * **********************************************************************************************************/

require('dotenv').config()

const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET
const EXPIRES = '7d'

const createJWT = async function(payLoad) {
    const token = jwt.sign({userID: payLoad}, SECRET, {expiresIn: EXPIRES})

    return token
}

const validateJWT = function(token){

    try {

        const decoded = jwt.verify(token, SECRET)

        return decoded

    } catch (error) {

        return false
    }
}

module.exports = {
    createJWT,
    validateJWT
}