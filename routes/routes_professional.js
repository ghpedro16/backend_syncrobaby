/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de PROFISSIONAIS
 * Data: 12/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import das dependencias da API
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const verifyJWT = require("../middleware/verify_jwt.js");

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json();

//Criando uma instancia de uma classe do express
const app = express();

const controller_professional = require("../controller/professional/controller_professional.js");

// Retorna todos os profissionais filtrado por especialização
app.get("/syncrobaby/professional/specialty", verifyJWT, cors(), async (request, response) => {
  let specialtyId = request.query.specialty
  let childrenId = request.query.child

  let professional = await controller_professional.listProfessionalBySpecialty(specialtyId, childrenId)

  response.status(professional.status_code).json(professional)
})

// Retorna todos profissionais filtrado pela criança
app.get("/syncrobaby/professional/child/:childId", verifyJWT, cors(), async (request, response) => {
  let childId = request.params.childId

  let professional = await controller_professional.listProfessionalByChildrenId(childId)

  response.status(professional.status_code).json(professional)
})

// Registrar profissional
app.post("/syncrobaby/professional", verifyJWT, cors(), bodyParserJSON, async (request, response) => {
  let dadosBody = request.body
  let contentType = request.headers["content-type"]

  let professional = await controller_professional.insertProfessional(dadosBody, contentType)
  response.status(professional.status_code).json(professional)
})

// Atualizar um profissional
app.put("/syncrobaby/professional/:id", verifyJWT, cors(), bodyParserJSON, async (request, response) => {
  let dadosBody = request.body
  let id = request.params.id
  let contentType = request.headers["content-type"]

  let professional = await controller_professional.updateProfessional(dadosBody, id, contentType)
  response.status(professional.status_code).json(professional)
})

// Deletar um profissional
app.delete("/syncrobaby/professional/:id", verifyJWT, cors(), async (request, response) => {
  let id = request.params.id

  let professional = await controller_professional.deleteProfessional(id)

  response.status(professional.status_code).json(professional)
})

module.exports = app;
