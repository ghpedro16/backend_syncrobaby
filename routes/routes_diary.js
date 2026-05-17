/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de Diario
 * Data: 14/05/2026
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

const controller_diary = require("../controller/diary/controller_diary.js");

// Retorna diarios filtrado pela criança
app.get("/syncrobaby/diary/child/:id", verifyJWT, cors(), async (request, response) => {
    let childId = request.params.id

    let user = await controller_diary.listDiaryByChildren(childId)

    response.status(user.status_code).json(user)
})

// Insere novo diario
app.post("/syncrobaby/diary", verifyJWT, cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers["content-type"]

    let diary = await controller_diary.insertDiary(dadosBody, contentType)
    response.status(diary.status_code).json(diary)
})

// Atualiza um diario
app.put("/syncrobaby/diary/:id", verifyJWT, cors(), bodyParserJSON, async (request, response) => {
    let diaryId = request.params.id
    let dadosBody = request.body
    let contentType = request.headers["content-type"]

    let diary = await controller_diary.updateDiary(dadosBody, diaryId, contentType)
    response.status(diary.status_code).json(diary)
})

// Deleta um diario
app.delete("/syncrobaby/diary/:id", verifyJWT, cors(), async (request, response) => {
    let diaryId = request.params.id

    let diary = await controller_diary.deleteDiary(diaryId)
    response.status(diary.status_code).json(diary)
})

module.exports = app;
