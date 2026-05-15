const knex = require('knex');
const config = require('./knexfile');

// Define o ambiente (development por padrão)
const environment = process.env.NODE_ENV || 'development';

// Cria a conexão com base no ambiente
const db = knex(config[environment]);

// Exporta a conexão
module.exports = db;