/*************************************************************************************************************
 * Objetivo: Arquivo responsavel pela verificação do token de autenticidade JWT
 * Data: 02/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * **********************************************************************************************************/

const jwt = require('./middleware_jwt.js')

const verifyJWT = async function(request, response, next) {
    let token = request.headers['x-access-token']

    const autenticidadeJWT = jwt.validateJWT(token)

    if(autenticidadeJWT)
        next()
    else
        return response.status(401).end()
}