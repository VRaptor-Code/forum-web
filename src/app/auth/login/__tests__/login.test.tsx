//Vamos criar uma suíte abrangente de testes para o componente Login:

import { render, screen, fireEvent } from '@testing-library/react'
import Login from './../page' // Importe o componente
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom' // Adicione o roteamento simulado
import renderer from 'react-test-renderer'
import { render, axe } from 'react-testing-library'

/* @testing-library/jest-dom: Fornece matchers personalizados para Jest para testar elementos DOM.
   @testing-library/react: Fornece utilitários para testar componentes React.
   @axe-core/react: Integra o mecanismo de teste de acessibilidade axe com React.
   react-test-renderer: Fornece um renderizador para React que pode ser usado para testes de snapshot.
   react-router-dom: Habilita funcionalidades de roteamento para testar componentes que usam roteamento. */

describe('Login Component', () => {
    test('renders login form', () => {
        render(
            <BrowserRouter>
                {' '}
                <Login />
            </BrowserRouter>,
        )
        expect(screen.getByText('Login')).toBeInTheDocument() // Verifica o título
        expect(screen.getByLabelText('Email')).toBeInTheDocument() // Verifica o campo de email
        expect(screen.getByLabelText('Senha')).toBeInTheDocument() // Verifica o campo de senha
        expect(
            screen.getByRole('button', { name: /Login/i }),
        ).toBeInTheDocument() // Verifica o botão de login
    })

    test('updates email and password state', () => {
        render(
            <BrowserRouter>
                {' '}
                <Login />
            </BrowserRouter>,
        )
        const emailInput = screen.getByLabelText('Email')
        const passwordInput = screen.getByLabelText('Senha')

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        expect(emailInput).toHaveValue('test@example.com')

        fireEvent.change(passwordInput, { target: { value: 'password123' } })
        expect(passwordInput).toHaveValue('password123')
    })

    test('calls handleLogin on button click', () => {
        const handleLoginMock = jest.fn() // Crie um mock para a função handleLogin
        render(
            <BrowserRouter>
                {' '}
                <Login handleLogin={handleLoginMock} />
            </BrowserRouter>,
        ) // Passe o mock como prop
        const loginButton = screen.getByRole('button', { name: /Login/i })
        fireEvent.click(loginButton)
        expect(handleLoginMock).toHaveBeenCalledTimes(1) // Verifica se a função foi chamada
    })

    test('renders Cadastrar button with link', () => {
        render(
            <BrowserRouter>
                {' '}
                <Login />
            </BrowserRouter>,
        )
        const cadastrarLink = screen.getByRole('link', { name: /Cadastrar/i })
        expect(cadastrarLink).toBeInTheDocument()
        expect(cadastrarLink.closest('a')).toHaveAttribute(
            'href',
            '/registration',
        )
    })

    //Testes de Snapshot:
    //Os testes de snapshot são úteis para detectar mudanças indesejadas no componente. Execute jest -u para atualizar os snapshots.
    test('matches snapshot', () => {
        const tree = renderer
            .create(
                <BrowserRouter>
                    <Login />
                </BrowserRouter>,
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    //Testes de Acessibilidade:
    //Os testes de acessibilidade ajudam a garantir que seu componente seja utilizável por todos.
    test('has no accessibility violations', async () => {
        const { container } = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>,
        )
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
})
