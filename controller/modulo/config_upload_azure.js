//Criação das variaveis de configuração da AZURE
const TOKEN = process.env.AZURE_TOKEN
const ACCOUNT = process.env.AZURE_ACCOUNT
const CONTAINER = process.env.AZURE_CONTAINER

module.exports = {
    TOKEN,
    ACCOUNT,
    CONTAINER
}
