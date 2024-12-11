'use client'

import { useState } from 'react'
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

interface TopicoPorCategoriaDto {
  categoria: string
  quantidade: number
}

function Report() {
  const [topicosPorCategoria, setTopicosPorCategoria] = useState<
    TopicoPorCategoriaDto[]
  >([
    { categoria: 'Kotlin', quantidade: 15 },
    { categoria: 'React', quantidade: 22 },
    { categoria: 'Angular', quantidade: 8 },
    { categoria: 'Next.js', quantidade: 12 },
    { categoria: 'JavaScript', quantidade: 30 },
    { categoria: 'TypeScript', quantidade: 25 },
    { categoria: 'Java', quantidade: 10 },
    { categoria: 'Python', quantidade: 18 },
  ])

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
        Relatório de Tópicos por Categoria
      </Typography>

      <List>
        {topicosPorCategoria.map((item) => (
          <ListItem
            key={item.categoria}
            sx={{ bgcolor: '#1e1e1e', borderRadius: 2, mb: 1, p: 2 }}
          >
            <ListItemText
              primary={item.categoria}
              secondary={`Quantidade: ${item.quantidade}`}
              sx={{ color: 'inherit' }} // Define a cor do texto como padrão (branco neste caso)
            />
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default Report
