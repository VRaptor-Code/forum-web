describe('Test integrado', () => {
    // Teste Integrado
    it('submits the form with correct data', async () => {
        const handleSubmitMock = jest.fn()

        render(
            <BrowserRouter>
                <RegistrationPage onSubmit={handleSubmitMock} />
            </BrowserRouter>,
        )

        const emailInput = screen.getByLabelText('Email')
        const nomeInput = screen.getByLabelText('Nome')
        const sobrenomeInput = screen.getByLabelText('Sobrenome')
        const telefoneInput = screen.getByLabelText('Telefone')
        const senhaInput = screen.getByLabelText('Senha')

        // Preencher os campos
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        fireEvent.change(nomeInput, { target: { value: 'John' } })
        fireEvent.change(sobrenomeInput, { target: { value: 'Doe' } })
        fireEvent.change(telefoneInput, { target: { value: '1234567890' } })
        fireEvent.change(senhaInput, { target: { value: 'password123' } })

        fireEvent.submit(screen.getByRole('button', { name: /Cadastrar/i }))

        expect(handleSubmitMock).toHaveBeenCalledWith({
            email: 'test@example.com',
            nome: 'John',
            sobrenome: 'Doe',
            telefone: '1234567890',
            senha: 'password123',
        })
    })
})
