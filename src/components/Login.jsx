import { Link } from 'react-router-dom'
import { useInput, useLogin, useLocale } from '../utils'

function Login() {
    const [email, emailHandler] = useInput()
    const [password, passwordHandler] = useInput()
    const loginHandler = useLogin(email, password)
    const { content } = useLocale()

    return (
        <form className="form-auth"
            onSubmit={loginHandler}>
            <input className="control" type="email" placeholder="Email"
                value={email} onChange={emailHandler} />
            <input className="control" type="password" placeholder={content('Kata Sandi', 'Password')}
                value={password} onChange={passwordHandler} />
            <button className="submit" type="submit">
                {content('Masuk', 'Login')}
            </button>
            <p>
                {content('Belum mempunyai akun?', 'Don boy have an account yet?')}
                <Link to="/register" >  {content('Daftar sekarang', 'Register now')}</Link>
            </p>
        </form >
    )
}

export default Login