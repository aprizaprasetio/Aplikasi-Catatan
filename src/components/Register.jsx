import React from 'react'
import { Link } from 'react-router-dom'
import { useInput, useRegister, useLocale } from '../utils'

function Login() {
    const [name, nameHandler] = useInput()
    const [email, emailHandler] = useInput()
    const [password, passwordHandler] = useInput()
    const [confirm, confirmHandler] = useInput()
    const registerHandler = useRegister(name, email, password, confirm)
    const { content } = useLocale()

    return (
        <form className="form-auth"
            onSubmit={registerHandler}>
            <input className="control" type="text" placeholder={content('Nama', 'Name')}
                value={name} onChange={nameHandler} />
            <input className="control" type="email" placeholder="Email"
                value={email} onChange={emailHandler} />
            <input className="control" type="password" placeholder={content('Kata Sandi', 'Password')}
                value={password} onChange={passwordHandler} />
            <input className="control" type="password" placeholder={content('Konfirmasi Kata Sandi', 'Password Confirmation')}
                value={confirm} onChange={confirmHandler} />
            <button className="submit" type="submit">
                {content('Daftar', 'Register')}
            </button>
            <p>
                {content('Sudah mempunyai akun?', 'Already have an account?')} <Link to="/">{content('Masuk sekarang', 'Login now')}</Link>
            </p>
        </form>
    )
}

export default Login