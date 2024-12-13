describe('Tests Integrados', () => {
    // Testes Integrados
    it('redirects to /topicoList with question parameter on button click', () => {
        const mockPush = jest.fn()
        ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })

        render(<QuestionsPage />)

        const input = screen.getByLabelText('Digite sua pergunta')
        fireEvent.change(input, { target: { value: 'Testing Next.js apps' } })

        fireEvent.click(screen.getByRole('button', { name: /Confirmar/i }))

        expect(mockPush).toHaveBeenCalledWith(
            '/topicoList?pergunta=Testing%20Next.js%20apps',
        )
    })

    it('redirects to /topicoList with question parameter on Enter key press', () => {
        const mockPush = jest.fn()
        ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })

        render(<QuestionsPage />)

        const input = screen.getByLabelText('Digite sua pergunta')
        fireEvent.change(input, { target: { value: 'Testing with Enter key' } })

        fireEvent.keyDown(input, { key: 'Enter', code: 13 }) // Simulate Enter key press

        expect(mockPush).toHaveBeenCalledWith(
            '/topicoList?pergunta=Testing%20with%20Enter%20key',
        )
    })

    it('does not redirect if question is empty', () => {
        const mockPush = jest.fn()
        ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })

        render(<QuestionsPage />)

        fireEvent.click(screen.getByRole('button', { name: /Confirmar/i }))

        expect(mockPush).not.toHaveBeenCalled()
    })
})
