import { render, screen } from '@testing-library/react'
import Report from './../page'
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'

describe('Report Component', () => {
    // Testes Unitários
    it('renders report title and list items', () => {
        render(<Report />)
        expect(
            screen.getByRole('heading', {
                name: /Relatório de Tópicos por Categoria/i,
            }),
        ).toBeVisible()

        // Verifica se os itens da lista são renderizados
        expect(screen.getByText('Kotlin')).toBeInTheDocument()
        expect(screen.getByText('Quantidade: 15')).toBeInTheDocument()
        // ... outros itens
    })

    // Teste de Snapshot
    it('matches snapshot', () => {
        const tree = renderer.create(<Report />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Teste de Acessibilidade
    it('should have no accessibility violations', async () => {
        const { container } = render(<Report />)
        expect(await axe(container)).toHaveNoViolations()
    })
})
