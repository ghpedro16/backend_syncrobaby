/*************************************************************************************************************
 * Objetivo: Arquivo responsavel pela verificação do token de autenticidade JWT
 * Data: 02/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 * **********************************************************************************************************/

const jwt = require('./middleware_jwt.js')

const verifyJWT = async function(request, response, next) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        return response.status(401).json({
            erro: 'Token não fornecido'
        })
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.validateJWT(token)

    if (!decoded) {
        return response.status(403).json({
            erro: 'Token inválido'
        })
    }

    request.user = decoded

    return next()
}

module.exports = verifyJWT