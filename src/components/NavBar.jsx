import React from 'react'
import { Link } from 'react-router-dom'
import { FiLogOut, FiSun, FiMoon } from 'react-icons/fi'
import { useLogout, useAuth, useLocale, ThemeContext } from '../utils'

function NavBar() {
    const { user } = useAuth()
    const logoutHandler = useLogout()
    const { currentTheme, themeHandler } = React.useContext(ThemeContext)
    const { content, localeHandler } = useLocale()

    return (
        <nav className="navbar">
            <div className="left">
                <Link to="/">
                    <h1>
                        {content('Catatan Aplikasi', 'Note App')}
                    </h1>
                </Link>
            </div>
            <div className="right">
                <button className="button" onClick={localeHandler}>
                    {content('English', 'Bahasa')}
                </button>
                <button className="button" onClick={themeHandler}>
                    {content('Ganti Tema ', 'Change Theme ')}
                    {currentTheme === 'light' ? <FiMoon /> : <FiSun />}
                </button>
                <button className="button" onClick={logoutHandler}>
                    {user?.name} <FiLogOut />
                </button>
            </div>
        </nav>
    )
}

export default NavBar