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
