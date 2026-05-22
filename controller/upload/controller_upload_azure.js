/**************************************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo upload de arquivos de imagem no servidor da AZURE
 * Data: 22/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 ***************************************************************************************************************************************************************/

const AZURE = require('../modulo/config_upload_azure.js')

//Import da dependencia para realizar uma requisicao http
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const uploadFiles = async function (file) {
    //Insere data e hora no nome do arquivo para impedir repetições
    let fileName = Date.now() + file.originalname

    //Url para banco de dados
    let urlFile = `https://${AZURE.ACCOUNT}.blob.core.windows.net/${AZURE.CONTAINER}/${fileName}`

    //Url para o container da azure
    let urlFileToken = `${urlFile}?${AZURE.TOKEN}`

    let response = await fetch(urlFileToken, {
        method: 'PUT',
        headers: {
            'x-ms-blob-type': 'BlockBlob',
            'Content-Type': 'application/octet-stream'
        },
        body: file.buffer
    })

    if(response.status == 201)
        return urlFile
    else 
        return false
}

module.exports = {uploadFiles}