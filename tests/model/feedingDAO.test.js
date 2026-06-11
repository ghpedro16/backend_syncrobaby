const mockInsert = jest.fn()
const mockDb = jest.fn(() => ({ insert: mockInsert }))

//Mock do banco de dados
jest.mock('../../config/connection.js', () => mockDb) 

const feedingDAO = require('../../model/feeding.js') 

const feedingValido = {
    date_time: '2024-01-01 10:00:00',
    description: 'Mamadeira',
    fk_id_child: 1,
    fk_id_product_type: 2,
}

describe('feedingDAO - setInsertFeeding', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('deve retornar os dados inseridos quando o insert é bem-sucedido', async () => {
        const resultadoEsperado = [1]
        mockInsert.mockResolvedValue(resultadoEsperado)

        const resultado = await feedingDAO.setInsertFeeding(feedingValido)

        expect(resultado).toEqual(resultadoEsperado)
    })

    it('deve retornar false quando o banco retorna array vazio', async () => {
        mockInsert.mockResolvedValue([])

        const resultado = await feedingDAO.setInsertFeeding(feedingValido)

        expect(resultado).toBe(false)
    })

    it('deve retornar false quando o banco lança uma exceção', async () => {
        mockInsert.mockRejectedValue(new Error('Erro de conexão'))

        const resultado = await feedingDAO.setInsertFeeding(feedingValido)

        expect(resultado).toBe(false)
    })

    it('deve chamar o insert com os campos corretos', async () => {
        mockInsert.mockResolvedValue([1])

        await feedingDAO.setInsertFeeding(feedingValido)

        expect(mockDb).toHaveBeenCalledWith('tbl_feeding_log')
        expect(mockInsert).toHaveBeenCalledWith({
            date_time: '2024-01-01 10:00:00',
            description: 'Mamadeira',
            fk_id_child: '1',
            fk_id_product_type: '2',
        })
    })
})