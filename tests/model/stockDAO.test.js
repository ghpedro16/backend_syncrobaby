// Mock do banco de dados (knex)
const mockInsert = jest.fn()
const mockDb = jest.fn(() => ({ insert: mockInsert }))

jest.mock('../../config/connection.js', () => mockDb) 

const stockDAO = require('../../model/stock.js')

const stockValido = {
    description: 'Produto Teste',
    quantity: 10,
    volume: 5,
    fk_id_child: 1,
    fk_id_product: 2,
}

describe('stockDAO - setInsertStockProduct', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    // ── Cenário 1: inserção bem-sucedida ──────
    it('deve retornar os dados inseridos quando o insert é bem-sucedido', async () => {
        const resultadoEsperado = [1] // knex retorna array com o id inserido
        mockInsert.mockResolvedValue(resultadoEsperado)

        const resultado = await stockDAO.setInsertStockProduct(stockValido)

        expect(resultado).toEqual(resultadoEsperado)
    })

    // ── Cenário 2: banco retorna array vazio ──
    it('deve retornar false quando o banco retorna array vazio', async () => {
        mockInsert.mockResolvedValue([])

        const resultado = await stockDAO.setInsertStockProduct(stockValido)

        expect(resultado).toBe(false)
    })

    // ── Cenário 3: erro no banco ───────────────
    it('deve retornar false quando o banco lança uma exceção', async () => {
        mockInsert.mockRejectedValue(new Error('Erro de conexão'))

        const resultado = await stockDAO.setInsertStockProduct(stockValido)

        expect(resultado).toBe(false)
    })

    // ── Cenário 4: verifica os campos enviados ─
    it('deve chamar o insert com os campos corretos', async () => {
        mockInsert.mockResolvedValue([1])

        await stockDAO.setInsertStockProduct(stockValido)

        expect(mockDb).toHaveBeenCalledWith('tbl_stock_registry')
        expect(mockInsert).toHaveBeenCalledWith({
            description: 'Produto Teste',
            quantity: '10',
            volume: '5',
            fk_id_child: '1',
            fk_id_product: '2',
        })
    })
})