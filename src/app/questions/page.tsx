'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation' // Importe o useRouter
import { Container, Typography, TextField, Button } from '@mui/material'

const QuestionsPage = () => {
    const [newQuestion, setNewQuestion] = useState('')
    const router = useRouter() // Inicialize o useRouter

    const handleAddQuestion = () => {
        if (newQuestion.trim()) {
            // Redireciona para /topicoList com a pergunta como parâmetro de consulta
            router.push(
                `/topicoList?pergunta=${encodeURIComponent(newQuestion)}`,
            )
        }
    }

    return (
        <Container
            maxWidth="md"
            sx={{
                bgcolor: '#121212',
                color: '#ffffff',
                minHeight: '100vh',
                padding: 4,
            }}
        >
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                Faça uma Pergunta
            </Typography>

            <TextField
                label="Digite sua pergunta"
                variant="outlined"
                fullWidth
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddQuestion()
                    }
                }}
                sx={{
                    input: { color: '#ffffff' },
                    '.MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#ffffff' },
                        '&:hover fieldset': { borderColor: '#ff6f00' },
                        '&.Mui-focused fieldset': { borderColor: '#ff6f00' },
                    },
                    style: { color: '#ffffff' },
                    mb: 2,
                }}
            />

            <Button
                variant="contained"
                onClick={handleAddQuestion}
                sx={{ backgroundColor: '#ff6f00' }}
            >
                Confirmar
            </Button>
        </Container>
    )
}

export default QuestionsPage
