/* Explicação das Mudanças:

jest.mock('next/navigation', ...): Este mock agora inclui useRouter. Isso permite simular o comportamento do useRouter do Next.js dentro do seu componente.
mockPush: Criamos um mock para a função push do useRouter, que é usada para redirecionar o usuário.
waitFor: Usamos waitFor para garantir que o teste espere o redirecionamento acontecer após o clique do botão.
Remoção de onLoginSubmit: Como o componente Login original não usa uma prop onLoginSubmit, este teste integrado agora simula o clique direto no botão de login.
Simulação do useRouter: Usamos (useRouter as jest.Mock).mockReturnValue({ push: mockPush }); para simular o retorno do useRouter e garantir que o mockPush seja chamado corretamente.
Como usar:
Certifique-se de ter as bibliotecas @testing-library/react, @testing-library/jest-dom, react-test-renderer e react-router-dom instaladas.
Crie um arquivo chamado login.test.tsx (ou similar) na pasta __tests__ ao lado do seu componente Login.
Cole o código do teste no arquivo.
Execute o comando pnpm test (ou o comando que você usa para executar os testes) para rodar o teste.
Este teste integrado agora verifica o fluxo completo do seu componente Login, simulando o clique no botão e o subsequente redirecionamento. Lembre-se de ajustar o caminho de redirecionamento (/registration) se necessário. */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from './../page'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { useRouter } from 'next/navigation'

// Mock para simular o useRouter do Next.js
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

describe('Login Component - Testes Integrados', () => {
    test('preenche o formulário, chama a função de login e redireciona', async () => {
        const mockPush = jest.fn()
        ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>,
        )

        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'test@example.com' },
        })
        fireEvent.change(screen.getByLabelText('Senha'), {
            target: { value: 'password123' },
        })

        fireEvent.click(screen.getByRole('button', { name: /Login/i }))

        // Aguarda a simulação do login e o redirecionamento
        await waitFor(() =>
            expect(mockPush).toHaveBeenCalledWith('/registration'),
        )
    })
})
