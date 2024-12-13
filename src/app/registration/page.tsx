'use client'

import { useState } from 'react'
import { Container, Typography, TextField, Button, Box } from '@mui/material'
import Link from 'next/link'

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        nome: '',
        sobrenome: '',
        telefone: '',
        senha: '',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Aqui você adicionaria a lógica para enviar os dados do formulário para o backend
        console.log(formData) // Exemplo: exibir os dados no console
    }

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
                Cadastro
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    sx={{
                        input: { color: '#ffffff' },
                        '.MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#ffffff' },
                            '&:hover fieldset': { borderColor: '#ff6f00' }, // Cor da borda ao passar o mouse
                        },
                        style: { color: '#ffffff' },
                    }}
                />
                <TextField
                    label="Nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    fullWidth
                    sx={{
                        input: { color: '#ffffff' },
                        '.MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#ffffff' },
                            '&:hover fieldset': { borderColor: '#ff6f00' }, // Cor da borda ao passar o mouse
                        },
                        style: { color: '#ffffff' },
                    }}
                />
                <TextField
                    label="Sobrenome"
                    name="sobrenome"
                    value={formData.sobrenome}
                    onChange={handleChange}
                    fullWidth
                    sx={{
                        input: { color: '#ffffff' },
                        '.MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#ffffff' },
                            '&:hover fieldset': { borderColor: '#ff6f00' }, // Cor da borda ao passar o mouse
                        },
                        style: { color: '#ffffff' },
                    }}
                />
                <TextField
                    label="Telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    fullWidth
                    sx={{
                        input: { color: '#ffffff' },
                        '.MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#ffffff' },
                            '&:hover fieldset': { borderColor: '#ff6f00' }, // Cor da borda ao passar o mouse
                        },
                        style: { color: '#ffffff' },
                    }}
                />
                <TextField
                    label="Senha"
                    name="senha"
                    type="password"
                    value={formData.senha}
                    onChange={handleChange}
                    fullWidth
                    sx={{
                        input: { color: '#ffffff' },
                        '.MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#ffffff' },
                            '&:hover fieldset': { borderColor: '#ff6f00' }, // Cor da borda ao passar o mouse
                        },
                        style: { color: '#ffffff' },
                    }}
                />

                <Link href="/questions" passHref legacyBehavior>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ backgroundColor: '#ff6f00' }}
                    >
                        Cadastrar
                    </Button>
                </Link>
            </Box>
        </Container>
    )
}

export default RegistrationPage
