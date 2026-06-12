const mockSetInsertFeeding = jest.fn()
const mockGetLastId = jest.fn()
const mockInsertFeedingStock = jest.fn()

jest.mock('../../model/feeding.js', () => ({
    setInsertFeeding: mockSetInsertFeeding,
    getLastId: mockGetLastId,
}))

jest.mock('../../model/feeding_stock.js', () => ({
    insertFeedingStock: mockInsertFeedingStock,
}))

const { insertFeeding } = require('../../controller/routines/feeding/controller_feeding.js')

const CONTENT_TYPE_JSON = 'application/json'
const ID_GUARDIAN = 1

const feedingValido = {
    date_time: '2024-01-01 10:00:00',
    description: 'Mamadeira',
    fk_id_child: 1,
    fk_id_product_type: 2,
    product_id: [
        { id: 1, quantity_product: 2 }
    ]
}

describe('feedingController - insertFeeding', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    // ── Cenário 2: Content-Type errado 
    it('deve retornar erro 415 quando o content-type não é application/json', async () => {
        const resultado = await insertFeeding(feedingValido, ID_GUARDIAN, 'text/plain')

        expect(resultado.status_code).toBe(415)
        expect(mockSetInsertFeeding).not.toHaveBeenCalled()
    })

    // ── Cenário 3: Dados Inválidos
    it('deve retornar erro 400 quando date_time não está inserido', async () => {
        const resultado = await insertFeeding({ ...feedingValido, date_time: undefined }, ID_GUARDIAN, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(400)
        expect(mockSetInsertFeeding).not.toHaveBeenCalled()
    })

    it('deve retornar erro 400 quando fk_id_child não está inserido', async () => {
        const resultado = await insertFeeding({ ...feedingValido, fk_id_child: null }, ID_GUARDIAN, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(400)
        expect(mockSetInsertFeeding).not.toHaveBeenCalled()
    })

    it('deve retornar erro 400 quando fk_id_product_type não está inserido', async () => {
        const resultado = await insertFeeding({ ...feedingValido, fk_id_product_type: null }, ID_GUARDIAN, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(400)
        expect(mockSetInsertFeeding).not.toHaveBeenCalled()
    })

    // ── Cenário 4: Falha no insert da model
    it('deve retornar erro 500 quando o model retorna false no insert', async () => {
        mockSetInsertFeeding.mockResolvedValue(false)

        const resultado = await insertFeeding(feedingValido, ID_GUARDIAN, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(500)
    })

    // ── Cenário 5: Falha no getLastId 
    it('deve retornar erro 500 quando getLastId retorna false', async () => {
        mockSetInsertFeeding.mockResolvedValue([1])
        mockGetLastId.mockResolvedValue(false)

        const resultado = await insertFeeding(feedingValido, ID_GUARDIAN, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(500)
    })

    // ── Cenário 6: Falha no insertFeedingStock
    it('deve retornar erro 500 quando insertFeedingStock falha', async () => {
        mockSetInsertFeeding.mockResolvedValue([1])
        mockGetLastId.mockResolvedValue([{ id_feeding: 10 }])
        mockInsertFeedingStock.mockResolvedValue({ status_code: 500 })

        const resultado = await insertFeeding(feedingValido, ID_GUARDIAN, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(500)
    })

    // ── Cenário 7: Exceção inesperada
    it('deve retornar erro 500 quando uma exceção inesperada é lançada', async () => {
        mockSetInsertFeeding.mockRejectedValue(new Error('Falha inesperada'))

        const resultado = await insertFeeding(feedingValido, ID_GUARDIAN, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(500)
    })
})