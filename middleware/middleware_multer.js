const multer = require('multer')

// memoryStorage mantém o arquivo em memória (file.buffer)
// necessário para enviar pra Azure
const upload = multer({ storage: multer.memoryStorage() })

module.exports = { upload }