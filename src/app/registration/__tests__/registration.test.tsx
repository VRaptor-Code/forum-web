import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RegistrationPage from './../page'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'

describe('RegistrationPage Component', () => {
    // Testes Unitários
    it('renders registration form', () => {
        render(
            <BrowserRouter>
                <RegistrationPage />
            </BrowserRouter>,
        )
        expect(screen.getByText('Cadastro')).toBeInTheDocument()
        expect(screen.getByLabelText('Email')).toBeInTheDocument()
        expect(screen.getByLabelText('Nome')).toBeInTheDocument()
        expect(screen.getByLabelText('Sobrenome')).toBeInTheDocument()
        expect(screen.getByLabelText('Telefone')).toBeInTheDocument()
        expect(screen.getByLabelText('Senha')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /Cadastrar/i }),
        ).toBeInTheDocument()
    })

    it('updates form data on change', () => {
        render(
            <BrowserRouter>
                <RegistrationPage />
            </BrowserRouter>,
        )
        const emailInput = screen.getByLabelText('Email')
        const nomeInput = screen.getByLabelText('Nome')
        const sobrenomeInput = screen.getByLabelText('Sobrenome')
        const telefoneInput = screen.getByLabelText('Telefone')
        const senhaInput = screen.getByLabelText('Senha')

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        fireEvent.change(nomeInput, { target: { value: 'John' } })
        fireEvent.change(sobrenomeInput, { target: { value: 'Doe' } })
        fireEvent.change(telefoneInput, { target: { value: '1234567890' } })
        fireEvent.change(senhaInput, { target: { value: 'password123' } })

        expect(emailInput).toHaveValue('test@example.com')
        expect(nomeInput).toHaveValue('John')
        expect(sobrenomeInput).toHaveValue('Doe')
        expect(telefoneInput).toHaveValue('1234567890')
        expect(senhaInput).toHaveValue('password123')
    })

    // Teste de Snapshot
    it('matches snapshot', () => {
        const tree = renderer
            .create(
                <BrowserRouter>
                    <RegistrationPage />
                </BrowserRouter>,
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Teste de Acessibilidade
    it('should have no accessibility violations', async () => {
        const { container } = render(
            <BrowserRouter>
                <RegistrationPage />
            </BrowserRouter>,
        )
        expect(await axe(container)).toHaveNoViolations()
    })
})
