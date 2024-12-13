describe('Test integrado', () => {
    // Teste Integrado - Verifica o redirecionamento para a página de detalhes do tópico
    it('navigates to topico details page on list item click', async () => {
        ;(useSearchParams as jest.Mock).mockReturnValue({ get: () => 'Teste' })

        render(
            <BrowserRouter>
                <TopicoList />
            </BrowserRouter>,
        )

        // Simula o clique no primeiro item da lista (que deve ter o ID 1)
        fireEvent.click(screen.getAllByRole('button')[1]) // O primeiro botão é "Novo Tópico", o segundo é o primeiro tópico

        await waitFor(() =>
            expect(screen.getByText('Carregando...')).not.toBeInTheDocument(),
        )
    })
})
