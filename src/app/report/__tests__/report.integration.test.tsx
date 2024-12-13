describe('Teste Integrados', () => {
    // Testes Integrados (Não há muita lógica para testar de forma integrada neste componente simples. O teste unitário já cobre a renderização.)
    it('renders the correct number of list items', () => {
        render(<Report />)
        expect(screen.getAllByRole('listitem').length).toBe(8) // Verifica se 8 itens de lista são renderizados
    })
})
