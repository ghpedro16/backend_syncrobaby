/**************************************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela inicialização da API
 * Data: 22/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 ***************************************************************************************************************************************************************/

//Import das dependencias da API
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Criando uma instancia de uma classe do express
const app = express();

const PORT = process.PORT || 8080;

//Configuração de permissoes
app.use(cors({
  origin: [
    'https://frontendsyncrobabyvercel.vercel.app' // troque pela URL real do seu frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

//Importa as rotas
const routesUser = require('./routes/routes_user.js')
const routesChild = require('./routes/routes_child.js')
const routesNotification = require('./routes/routes_notification.js')
const routesArticle = require('./routes/routes_article.js')
const routesVaccine = require('./routes/routes_vaccine.js')
const routesAgeGroup = require('./routes/routes_age_group.js')
const routesRoutines = require('./routes/routes_routines.js')
const routesStock = require('./routes/routes_stock.js')
const routesProduct = require('./routes/routes_product.js')
const routesMeasures = require('./routes/routes_measures.js')
const routesIllness = require("./routes/routes_illness.js")
const routesProfessional = require("./routes/routes_professional.js")
const routesSpecialty = require("./routes/routes_specialty.js")
const routesDiary = require("./routes/routes_diary.js")

//Inicia a API
app.listen(PORT, function () {
  console.log("API aguardando requisições...");
});

//Utiliza as rotas
app.use(routesUser)
app.use(routesChild)
app.use(routesNotification)
app.use(routesArticle)
app.use(routesVaccine)
app.use(routesAgeGroup)
app.use(routesRoutines)
app.use(routesStock)
app.use(routesProduct)
app.use(routesMeasures)
app.use(routesIllness)
app.use(routesProfessional)
app.use(routesSpecialty)
app.use(routesDiary)
