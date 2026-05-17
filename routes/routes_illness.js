/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de ENFERMIDADES
 * Data: 11/05/2026
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

const controller_illness = require("../controller/illness/controller_illness.js");

// Retorna todas enfermidades da criança
app.get("/syncrobaby/illness/child/:childId", verifyJWT, cors(), async (request, response) => {
  let childId = request.params.childId

  let illness = await controller_illness.listIllnessByChildId(childId)
  response.status(illness.status_code).json(illness)
})

// Retorna enfermidades pelo tipo
app.get("/syncrobaby/illness/type", verifyJWT, cors(), async (request, response) => {
  let type = request.query.type
  let child = request.query.child

  let illness = await controller_illness.listIllnessByType(type, child)
  response.status(illness.status_code).json(illness)
})

// Registrar Enfermidade
app.post("/syncrobaby/illness", verifyJWT, cors(), bodyParserJSON, async (request, response) => {
  let dadosBody = request.body
  let contentType = request.headers["content-type"]

  let illness = await controller_illness.insertIllness(dadosBody, contentType)

  response.status(illness.status_code).json(illness)
})

// Atualizar Enfermidade
app.put("/syncrobaby/illness/:id_illness", verifyJWT, cors(), bodyParserJSON, async (request, response) => {
  let dadosBody = request.body
  let id = request.params.id_illness
  let contentType = request.headers["content-type"]

  let illness = await controller_illness.updateIllness(dadosBody, id, contentType)

  response.status(illness.status_code).json(illness)
})

// Deletar Enfermidade
app.delete("/syncrobaby/illness/:id", verifyJWT, cors(), async (request, response) => {
  let id = request.params.id

  let illness = await controller_illness.deleteIllness(id)

  response.status(illness.status_code).json(illness)
})

module.exports = app;
