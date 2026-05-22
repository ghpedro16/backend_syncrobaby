/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de ARTIGOS
 * Data: 06/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import das dependencias da API
const express = require('express')
const cors = require('cors')
const verifyJWT = require('../middleware/verify_jwt.js')

//Criando uma instancia de uma classe do express 
const app = express()

const controller_article = require('../controller/article/controller_article.js')

//Retorna todos os artigos
app.get('/syncrobaby/article', verifyJWT, cors(), async (request, response) => {

    let article = await controller_article.listAllArticles()

    response.status(article.status_code).json(article)
})

//Retorna artigos por id
app.get('/syncrobaby/article/:id', verifyJWT, cors(), async (request, response) => {
    let articleId = request.params.id
    let article = await controller_article.listArticleById(articleId)

    response.status(article.status_code).json(article)
})

//Retorna artigos por faixa etaria
app.get('/syncrobaby/article/age/:id', verifyJWT, cors(), async (request, response) => {
    let ageId = request.params.id
    let article = await controller_article.listArticleByAgeGroup(ageId)

    response.status(article.status_code).json(article)
})

module.exports = app