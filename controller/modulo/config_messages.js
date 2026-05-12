/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelos padrões de mensagens de validações que o projeto devolverá, sempre no formato JSON para informar sucessos, erros, etc.
 * Data: 21/04/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

const dataAtual = new Date()

/********************************************************************   MENSAGENS PADRONIZADAS  ********************************************************************/

const DEFAULT_HEADER = {

    development: 'SyncroBaby',
    api_description: 'API para manipular dados da aplicação SyncroBaby',
    status: Boolean,
    status_code: Number,
    request_date: dataAtual.toLocaleString(),
    response: {}

}

/********************************************************************   MENSAGENS DE SUCESSO    ********************************************************************/

const SUCCESS_REQUEST = {status: true, status_code: 200, message: 'Requisição bem sucedida...'}

const SUCCESS_CREATE_ITEM = {status: true, status_code: 201, message: 'Requisição bem sucedida...'}

const SUCCESS_UPDATE_ITEM = {status: true, status_code: 200, message: 'Item atualizado com sucesso...'}

const SUCCESS_DELETE_ITEM = {status: true, status_code: 200, message: 'Item excluído com sucesso...'}

const SUCCESS_MODIFIED_ITEM = {status: true, status_code: 204, message: 'Item modificado com sucesso!'}

const SUCCESS_REACTIVATE_ITEM = {status: true, status_code: 200, message: 'Item reativado com sucesso!'}

const SUCCESS_DEACTIVATE_ITEM = {status: true, status_code: 204, message: 'Item desativado com sucesso!'}

/********************************************************************    MENSAGENS DE ERRO      ********************************************************************/

const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados dados de retorno!'}

const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição devido a erros internos no servidor. (CONTROLLER)'}

const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição devido a erros internos no servidor. (MODEL) '}

const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Existem campos obrigatórios que não foram preenchidos ou estão inválidos!'}

const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message: 'Não foi possível processar a requisição, pois o tipo de dado enviado no corpo deve ser JSON'}

const ERROR_RELATIONAL_INSERTION = {status: false, status_code: 500, message: 'A requisição do item principal foi processada com sucesso, porém houveram problemas ao inserir dados na tabela de relação!'}

const ERROR_UNIQUE_CONFLICT = {status: false, status_code: 409, message: "Não foi possivel processar a requisição pois o item principal causará um conflito na base de dados."}

const ERROR_DISABLED_USER = {status: false, status_code: 403, message: "Não foi possível acessar esse usuário."}

const ERROR_INVALID_PASSWORD = {status: false, status_code: 401, message: "Senha incorreta!"}

module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATE_ITEM,
    ERROR_CONTENT_TYPE,
    SUCCESS_UPDATE_ITEM,
    SUCCESS_DELETE_ITEM,
    ERROR_RELATIONAL_INSERTION,
    ERROR_UNIQUE_CONFLICT,
    ERROR_DISABLED_USER,
    ERROR_INVALID_PASSWORD,
    SUCCESS_MODIFIED_ITEM,
    SUCCESS_DEACTIVATE_ITEM,
    SUCCESS_REACTIVATE_ITEM
}