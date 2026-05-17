/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de ESPECIALIZACAO DOS PROFISSIONAIS
 * Data: 12/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import das dependencias da API
const express = require("express");
const cors = require("cors");
const verifyJWT = require("../middleware/verify_jwt.js");

//Criando uma instancia de uma classe do express
const app = express();

const controller_specialty = require("../controller/professional/controller_professional_specialty.js");

// Retorna todos as especializações do profissional
app.get("/syncrobaby/specialty", verifyJWT, cors(), async (request, response) => {

  let specialty = await controller_specialty.listAllProfessionalSpecialty()

  response.status(specialty.status_code).json(specialty)
})

// Retorna especializacao filtrando por ID
app.get("/syncrobaby/specialty/:id", verifyJWT, cors(), async (request, response) => {
  let specialtyId = request.params.id

  let specialty = await controller_specialty.listProfessionalSpecialtyById(specialtyId)

  response.status(specialty.status_code).json(specialty)
})

module.exports = app