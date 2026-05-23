/**************************************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo upload de arquivos de imagem no servidor da AZURE
 * Data: 22/05/2026
 * Autor: SyncroBaby
 * Versão: 1.0
 ***************************************************************************************************************************************************************/

const AZURE = require('../modulo/config_upload_azure.js')

const uploadFiles = async function (file) {
    try {
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
                'Content-Type': file.mimetype
            },
            body: file.buffer
        })

        if (response.status == 201)
            return { success: true, url: urlFile }
        else
            return false

    } catch (err) {
        console.error('Erro no upload:', err)
        return { error: err.message }
    }
}

const deleteFile = async function (urlFile) {
    try {
        // Adiciona o token na URL existente para ter permissão de deletar
        let urlFileToken = `${urlFile}?${AZURE.TOKEN}`

        let response = await fetch(urlFileToken, {
            method: 'DELETE',
            headers: {
                'x-ms-version': '2026-02-06'
            }
        })

        return response.status === 202 ? true : false

    } catch (error) {
        console.error('Erro ao deletar arquivo:', error)
        return false
    }
}

module.exports = { uploadFiles, deleteFile }