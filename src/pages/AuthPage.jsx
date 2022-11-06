import { useLocation } from 'react-router-dom'
import { useLocale } from '../utils'
import Login from '../components/Login'
import Register from '../components/Register'

function AuthPage() {
    const { pathname } = useLocation()
    const { content } = useLocale()

    return (
        <article className="page-auth">
            <h2 className="title">
                {
                    pathname === '/register' ?
                        content('Bergabung sekarang juga', 'Join right now')
                        :
                        content('Masuk ke catatan', 'Go to notes')
                }
            </h2>
            {
                pathname === '/register' ?
                    <Register /> : <Login />
            }
        </article>
    )
}

export default AuthPage