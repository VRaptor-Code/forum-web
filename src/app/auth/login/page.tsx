'use client'


import { useState } from 'react'
import { TextField, Button, Container, Typography, Box } from '@mui/material'
import Link from 'next/link'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Simulação de login (adapte para seu backend)
    console.log('Email:', email, 'Password:', password)
  }

  return (
    <Container
      maxWidth='md' // Aumentei o maxWidth para corresponder ao QuestionsPage
      sx={{
        bgcolor: '#121212', // Mantendo o fundo escuro
        color: '#ffffff', // Texto branco
        minHeight: '100vh', // Altura mínima de 100vh
        padding: 4, // Padding consistente
        display: 'flex', // Centralizando verticalmente
        flexDirection: 'column',
        alignItems: 'center', // Centralizando horizontalmente
        justifyContent: 'center',
      }}
    >
      <Typography variant='h4' align='center' sx={{ mb: 4 }}>
        Login
      </Typography>
      <Box
        component='form' // Usando Box como formulário
        sx={{ width: '100%', maxWidth: 400 }} // Largura máxima para o formulário
      >
        <TextField
          label='Email'
          variant='outlined'
          fullWidth
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            input: { color: '#ffffff' },
            '.MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffffff' },
              '&:hover fieldset': { borderColor: '#ff6f00' }, // Cor da borda ao passar o mouse
            },
            style: { color: '#ffffff' }  // Label branca
          }}
        />
        <TextField
          label='Senha'
          type='password'
          variant='outlined'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            input: { color: '#ffffff' },
            '.MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffffff' },
              '&:hover fieldset': { borderColor: '#ff6f00' }, // Cor da borda ao passar o mouse
            },
            style: { color: '#ffffff' }
          }}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={handleLogin}
          sx={{ mt: 2, backgroundColor: '#ff6f00' }} // Estilizando o botão
        >
          Login
        </Button>

        <Link href='/registration' passHref legacyBehavior>
          <Button
            variant='outlined' // Alterado para outlined para contraste
            color='secondary' // Cor secundária
            fullWidth
            sx={{ mt: 2, borderColor: '#ffffff' }} // Borda branca
          >
            Cadastrar
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

export default Login
