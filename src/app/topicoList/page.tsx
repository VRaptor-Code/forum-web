'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Button,
  TextField,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useSearchParams } from 'next/navigation'

// Simulando o enum StatusTopico do backend
enum StatusTopico {
  ABERTO = 'Aberto',
  FECHADO = 'Fechado',
  EM_ANDAMENTO = 'Em Andamento',
}

interface Topico {
  id: number
  titulo: string
  mensagem: string
  status: StatusTopico
  dataCriacao: string
  dataAlteracao?: string
}

// ... (código anterior do enum StatusTopico e interface Topico)

function TopicoList() {
  const searchParams = useSearchParams()
  const perguntaParam = searchParams.get('pergunta')

  const [editing, setEditing] = useState<{
    id: number
    novoTitulo: string
  } | null>(null)

  const [topicos, setTopicos] = useState<Topico[]>([
    {
      id: 1,
      titulo: perguntaParam || 'Kotlin', // Usar perguntaParam se existir, senão um valor padrão
      mensagem: 'Kotlin é uma linguagem de programação...',
      status: StatusTopico.ABERTO,
      dataCriacao: '2024-08-01T10:00:00Z',
    },
    {
      id: 2,
      titulo: perguntaParam || 'JavaScript', // Usar perguntaParam se existir, senão um valor padrão
      mensagem: 'JavaScript é uma linguagem de programação...',
      status: StatusTopico.ABERTO,
      dataCriacao: '2024-08-01T10:00:00Z',
    },
    {
      id: 1,
      titulo: perguntaParam || 'Java ', // Usar perguntaParam se existir, senão um valor padrão
      mensagem: 'Java é uma linguagem de programação...',
      status: StatusTopico.ABERTO,
      dataCriacao: '2024-08-01T10:00:00Z',
    },
    {
      id: 1,
      titulo: perguntaParam || 'Pergunta padrão', // Usar perguntaParam se existir, senão um valor padrão
      mensagem: 'Python é uma linguagem de programação...',
      status: StatusTopico.ABERTO,
      dataCriacao: '2024-08-01T10:00:00Z',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const handleDelete = (id: number) => {
    setTopicos(topicos.filter((t) => t.id !== id))
  }

  const handleEdit = (id: number) => {
    const topicoAEditar = topicos.find((t) => t.id === id)
    if (topicoAEditar) {
      setEditing({ id, novoTitulo: topicoAEditar.titulo })
    }
  }

  const handleConfirmEdit = () => {
    if (editing) {
      setTopicos((prevTopicos) =>
        prevTopicos.map((topico) =>
          topico.id === editing.id
            ? { ...topico, titulo: editing.novoTitulo }
            : topico
        )
      )
      setEditing(null)
    }
  }

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editing) {
      setEditing({ ...editing, novoTitulo: event.target.value })
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredTopicos = topicos.filter((topico) => {
    return (
      topico.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topico.mensagem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(topico.id).includes(searchTerm)
    )
  })

  return (
    <Container
      maxWidth="sm"
      sx={{
        bgcolor: '#121212',
        color: '#ffffff',
        minHeight: '100vh',
        padding: 4,
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Tópicos
      </Typography>
      <Link href="/questions" passHref legacyBehavior>
        <Button variant="contained" sx={{ backgroundColor: '#ff6f00', mb: 2 }}>
          Novo Tópico
        </Button>
      </Link>
      <TextField
        label="Buscar Tópicos"
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
        sx={{
          input: { color: '#ffffff' },
          '.MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#ffffff' },
            '&:hover fieldset': { borderColor: '#ff6f00' },
          },
          mb: 2,
        }}
      />
      <List>
        {filteredTopicos.map((topico) => (
          <ListItem
            key={topico.id}
            sx={{ bgcolor: '#1e1e1e', borderRadius: 2, mb: 1, p: 2 }}
          >
            {editing?.id === topico.id ? ( // Renderiza o TextField para edição
              <TextField
                value={editing.novoTitulo}
                onChange={handleEditChange}
                autoFocus
                onBlur={handleConfirmEdit} // Confirma ao perder o foco
                sx={{
                  input: { color: '#ffffff' },
                  '.MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#ffffff' },
                    '&:hover fieldset': { borderColor: '#ff6f00' },
                  },
                }}
              />
            ) : (
              // Renderiza o ListItemText normal
              <>
                <ListItemButton
                  component={Link}
                  href={`/topicos/${topico.id}`}
                  passHref
                  sx={{ color: 'inherit' }}
                >
                  <ListItemText
                    primary={topico.titulo}
                    secondary={topico.mensagem}
                    sx={{
                      color: 'inherit',
                      '& .MuiListItemText-secondary': { color: '#ff6f00' },
                    }}
                  />
                </ListItemButton>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  sx={{ color: '#ffffff' }}
                  onClick={() => handleEdit(topico.id)}
                >
                  <EditIcon />
                </IconButton>
              </>
            )}

            {/* Ícone de excluir */}
            <IconButton
              edge="end"
              aria-label="delete"
              sx={{ color: '#ffffff' }}
              onClick={() => handleDelete(topico.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default TopicoList
