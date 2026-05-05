/*************************************************************************************************************
 * Objetivo: Arquivo responsavel pela criação das funções de CRIAR e VALIDAR o token de autenticidade JWT
 * Data: 02/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * **********************************************************************************************************/

require('dotenv').config()

const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET
const EXPIRES = 60

const createJWT = async function(payLoad) {
    const token = jwt.sign({userID: payLoad}, SECRET, {expiresIn: EXPIRES})

    return token
}

const validateJWT = async function(token){
    let status

    jwt.verify(token, SECRET, async function (err, decode) {

        if(err != null)
            status = false
        else
            status = true
    })

    return status
}

module.exports = {
    createJWT,
    validateJWT
}