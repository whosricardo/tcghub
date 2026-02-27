import { render, screen } from '@/lib/test-utils'

describe('Primeiro teste - verificação', () => {
    it('deve passar', () => {
        render(<div>Teste</div>)

        expect(screen.getByText('Teste')).toBeInTheDocument()
    })
})
