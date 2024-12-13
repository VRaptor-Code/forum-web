import { render, screen, fireEvent } from '@testing-library/react'
import QuestionsPage from './../page'
import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

describe('QuestionsPage Component', () => {
    // Testes Unitários
    it('renders question input and button', () => {
        render(<QuestionsPage />)
        expect(screen.getByText('Faça uma Pergunta')).toBeInTheDocument()
        expect(screen.getByLabelText('Digite sua pergunta')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /Confirmar/i }),
        ).toBeInTheDocument()
    })

    it('updates question state on input change', () => {
        render(<QuestionsPage />)
        const input = screen.getByLabelText('Digite sua pergunta')
        fireEvent.change(input, {
            target: { value: 'How to test React components?' },
        })
        expect(input).toHaveValue('How to test React components?')
    })

    // Teste de Snapshot
    it('matches snapshot', () => {
        const tree = renderer.create(<QuestionsPage />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Teste de Acessibilidade
    it('should have no accessibility violations', async () => {
        const { container } = render(<QuestionsPage />)
        expect(await axe(container)).toHaveNoViolations()
    })
})
