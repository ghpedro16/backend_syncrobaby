/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de PRODUTO
 * Data: 13/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import das dependencias da API
const express = require('express')
const cors = require('cors')
const verifyJWT = require('../middleware/verify_jwt.js')

//Criando uma instancia de uma classe do express 
const app = express()

const controller_product = require('../controller/product/controller_product.js')
const controller_type = require('../controller/product/controller_product_type.js')

//Retorna produtos pelo TIPO
app.get('/syncrobaby/product/:id', verifyJWT, cors(), async (request, response) => {
    let typeId = request.params.id
   
    let type = await controller_product.listProductByType(typeId)

    response.status(type.status_code).json(type)
})

//Retorna todos os TIPOS de produto
app.get('/syncrobaby/type/product', verifyJWT, cors(), async (request, response) => {   
    let type = await controller_type.listAllProductType()

    response.status(type.status_code).json(type)
})

module.exports = app