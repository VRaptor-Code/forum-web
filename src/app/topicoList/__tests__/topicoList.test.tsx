/*Testes de acessibilidade: Geralmente são integrados aos testes unitários/de integração,
 usando bibliotecas como axe-core, e não precisam de pastas separadas.*/
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TopicoList from './../page'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'
import { useSearchParams } from 'next/navigation'

// Mock para o useSearchParams
jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
}))

describe('TopicoList Component', () => {
    // Testes Unitários
    it('renders topic list', () => {
        ;(useSearchParams as jest.Mock).mockReturnValue({ get: () => 'Teste' })
        render(
            <BrowserRouter>
                <TopicoList />
            </BrowserRouter>,
        )

        expect(screen.getByRole('heading', { name: /Tópicos/i })).toBeVisible()
        expect(
            screen.getByRole('button', { name: /Novo Tópico/i }),
        ).toBeVisible()
        // Verifica se os tópicos de exemplo são renderizados
        expect(screen.getByText('Teste')).toBeInTheDocument()
    })

    it('updates search term on change', () => {
        ;(useSearchParams as jest.Mock).mockReturnValue({ get: () => 'Teste' })

        render(
            <BrowserRouter>
                <TopicoList />
            </BrowserRouter>,
        )
        const searchInput = screen.getByLabelText('Buscar Tópicos')
        fireEvent.change(searchInput, { target: { value: 'javascript' } })
        expect(searchInput.value).toBe('javascript')
    })

    it('filters topicos based on search term', () => {
        ;(useSearchParams as jest.Mock).mockReturnValue({ get: () => 'Teste' })

        render(
            <BrowserRouter>
                <TopicoList />
            </BrowserRouter>,
        )
        const searchInput = screen.getByLabelText('Buscar Tópicos')

        fireEvent.change(searchInput, { target: { value: 'java' } })

        expect(screen.getByText('Teste')).toBeVisible()

        fireEvent.change(searchInput, { target: { value: 'xyz' } })

        expect(screen.queryByText('Teste')).not.toBeInTheDocument()
    })

    it('updates editing state on edit button click', () => {
        ;(useSearchParams as jest.Mock).mockReturnValue({ get: () => 'Teste' })

        render(
            <BrowserRouter>
                <TopicoList />
            </BrowserRouter>,
        )

        fireEvent.click(screen.getAllByLabelText('edit')[0])

        expect(screen.getByRole('textbox')).toBeVisible()
    })

    it('updates topico title on confirm edit', () => {
        ;(useSearchParams as jest.Mock).mockReturnValue({ get: () => 'Teste' })

        render(
            <BrowserRouter>
                <TopicoList />
            </BrowserRouter>,
        )

        fireEvent.click(screen.getAllByLabelText('edit')[0])

        const editInput = screen.getByRole('textbox')
        fireEvent.change(editInput, { target: { value: 'Novo Título' } })
        fireEvent.blur(editInput)

        expect(screen.getByText('Novo Título')).toBeVisible()
    })

    it('deletes topico on delete button click', () => {
        ;(useSearchParams as jest.Mock).mockReturnValue({ get: () => 'Teste' })

        render(
            <BrowserRouter>
                <TopicoList />
            </BrowserRouter>,
        )

        fireEvent.click(screen.getAllByLabelText('delete')[0])

        expect(screen.queryByText('Teste')).not.toBeInTheDocument()
    })

    // Teste de Snapshot
    it('matches snapshot', () => {
        ;(useSearchParams as jest.Mock).mockReturnValue({ get: () => 'Teste' })

        const tree = renderer
            .create(
                <BrowserRouter>
                    <TopicoList />
                </BrowserRouter>,
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Teste de Acessibilidade
    it('should have no accessibility violations', async () => {
        ;(useSearchParams as jest.Mock).mockReturnValue({ get: () => 'Teste' })

        const { container } = render(
            <BrowserRouter>
                <TopicoList />
            </BrowserRouter>,
        )
        expect(await axe(container)).toHaveNoViolations()
    })
})
