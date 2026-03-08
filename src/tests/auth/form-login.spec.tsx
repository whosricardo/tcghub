import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import FormLogin from '../../components/auth/layout/form-login'

describe('Formulário de login', () => {
    it('Deve preencher e enviar o formulário de login ', async () => {
        const user = userEvent.setup()

        const inputEmail = screen.getByLabelText('Email')
        const inputPassword = screen.getByLabelText('Senha')

        await user.type(inputEmail, 'zorosola123@gmail.com')
        await user.type(inputPassword, 'katana123')

        const submitButton = screen.getByRole('button', { name: 'Entrar' })
        await user.click(submitButton)

        expect()
    })
})
