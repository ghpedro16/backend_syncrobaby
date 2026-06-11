// Mock da model
const mockSetInsertStockProduct = jest.fn()

jest.mock('../../model/stock.js', () => ({
    setInsertStockProduct: mockSetInsertStockProduct,
}))

const { insertStock } = require('../../controller/stock/controller_stock.js')

const stockValido = {
    description: 'Produto Teste',
    quantity: 10,
    volume: 5,
    fk_id_child: 1,
    fk_id_product: 2,
}

const CONTENT_TYPE_JSON = 'application/json'

describe('stockController - insertStock', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    // ── Cenário 1: Sucesso 
    it('deve retornar status code 201 quando os dados são válidos e o insert funciona', async () => {
        mockSetInsertStockProduct.mockResolvedValue([1])

        const resultado = await insertStock(stockValido, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(201)
    })

    // ── Cenário 2: Content-Type errado
    it('deve retornar erro 415 quando o content-type não é application/json', async () => {
        const resultado = await insertStock(stockValido, 'text/plain')

        expect(resultado.status_code).toBe(415)
        expect(mockSetInsertStockProduct).not.toHaveBeenCalled()
    })

    // ── Cenário 3: Quantidade inválida 
    it('deve retornar erro 400 quando quantidade não está inserida', async () => {
        const resultado = await insertStock({ ...stockValido, quantity: null }, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(400)
        expect(resultado.message).toContain('[Quantidade incorreto]')
        expect(mockSetInsertStockProduct).not.toHaveBeenCalled()
    })

    it('deve retornar erro 400 quando quantidade é negativa', async () => {
        const resultado = await insertStock({ ...stockValido, quantity: -1 }, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(400)
        expect(resultado.message).toContain('[Quantidade incorreto]')
    })

    // ── Cenário 4: Volume inválido
    it('deve retornar erro 400 quando volume é NaN', async () => {
        const resultado = await insertStock({ ...stockValido, volume: 'abc' }, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(400)
        expect(resultado.message).toContain('[Volume incorreto]')
    })

    // ── Cenário 5: Descrição inválida
    it('deve retornar erro 400 quando descrição não está inserida', async () => {
        const resultado = await insertStock({ ...stockValido, description: undefined }, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(400)
        expect(resultado.message).toContain('[Descricao incorreto]')
    })

    it('deve retornar erro 400 quando descrição tem mais de 255 caracteres', async () => {
        const resultado = await insertStock({ ...stockValido, description: 'a'.repeat(256) }, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(400)
        expect(resultado.message).toContain('[Descricao incorreto]')
    })

    // ── Cenário 6: fk_id_child inválido
    it('deve retornar erro 400 quando fk_id_child está ausente', async () => {
        const resultado = await insertStock({ ...stockValido, fk_id_child: null }, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(400)
        expect(resultado.message).toContain('[ID (chave estrangeira) incorreto]')
    })

    // ── Cenário 7: fk_id_product inválido
    it('deve retornar erro 400 quando fk_id_product está ausente', async () => {
        const resultado = await insertStock({ ...stockValido, fk_id_product: null }, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(400)
        expect(resultado.message).toContain('[ID (chave estrangeira) incorreto]')
    })

    // ── Cenário 8: Falha na model
    it('deve retornar erro 500 quando o model retorna false', async () => {
        mockSetInsertStockProduct.mockResolvedValue(false)

        const resultado = await insertStock(stockValido, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(500)
    })

    // ── Cenário 9: Exceção inesperada
    it('deve retornar erro 500 quando uma exceção inesperada é lançada', async () => {
        mockSetInsertStockProduct.mockRejectedValue(new Error('Falha inesperada'))

        const resultado = await insertStock(stockValido, CONTENT_TYPE_JSON)

        expect(resultado.status_code).toBe(500)
    })
})