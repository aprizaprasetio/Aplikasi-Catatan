import React from 'react'
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import {
    getAccessToken,
    putAccessToken,
    dropAccessToken,
    login,
    register,
    getUserLogged,
    addNote,
    getNote,
    archiveNote,
    unarchiveNote,
    deleteNote,
} from './api'

function useInput(first = '') {
    const [input, setInput] = React.useState(first)

    function inputHandler(Event) {
        setInput(Event.target.value)
    }

    return [
        input,
        inputHandler,
        setInput
    ]
}

function useLogin(email, password) {
    const { setIsAuth } = useAuth()

    function loginHandler(Event) {
        Event.preventDefault()
        login({ email, password }).then(response => {
            putAccessToken(response.data.accessToken)
            setIsAuth(true)
        })
    }
    return loginHandler
}

function useRegister(name, email, password, confirm) {
    const navigate = useNavigate()

    function registerHandler(Event) {
        Event.preventDefault()

        if (password !== confirm) {
            alert('Password does not match')
            return
        }

        register({ name, email, password }).then(() => {
            navigate('/')
        })
    }

    return registerHandler
}

function useLogout() {
    const { setIsAuth, setUser } = useAuth()
    const navigate = useNavigate()
    function logoutHandler() {
        dropAccessToken()
        setIsAuth(false)
        setUser(null)
        navigate('/')
    }

    return logoutHandler
}

function useAdd(title, body) {
    const navigate = useNavigate()

    function addHandler(Event) {
        Event.preventDefault()

        if (body === '') {
            alert('Please fill the body note')
            return
        }

        addNote({ title, body }).then(response => {
            const { id } = response.data
            navigate(`/notes/${id}`)
        })
    }

    return addHandler
}

function useNotes(callback) {
    const [notes, setNotes] = React.useState(null)

    React.useEffect(() => {
        callback().then(response => {
            setNotes(response.data)
        })
    }, [])

    return notes
}

function useDetail() {
    const [note, setNote] = React.useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    function statusHandler() {
        if (note?.archived === false) {
            archiveNote(id)
            return
        }
        unarchiveNote(id)
    }

    function removeHandler() {
        deleteNote(id)
        if (note?.archived === false) {
            navigate('/')
            return
        }
        navigate('/archives')
    }

    React.useEffect(() => {
        getNote(id).then(response => {
            setNote(response.data)
        })
    })

    return [
        note,
        statusHandler,
        removeHandler
    ]
}

function useSearch() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, searchHandler] = useInput(searchParams.get('title') ?? '')
    const { pathname } = useLocation()

    React.useEffect(() => {
        if (search === '') {
            setSearchParams({})
            searchParams.delete('empty')
            return
        }
        setSearchParams({ title: search })
    }, [search, pathname])

    return {
        search,
        searchHandler
    }
}

function useSearcher(notes, searchKey) {
    const [searched, setSearched] = React.useState(null)

    React.useEffect(() => {
        if (notes === null) return
        const result = notes.filter(
            note => note.title.toLowerCase().includes(searchKey.toLowerCase())
        )
        setSearched(result)
    }, [searchKey, notes])

    return searched
}

const AuthContext = React.createContext()
const ThemeContext = React.createContext()
const LocaleContext = React.createContext()

function useAuth() {
    const context = React.useContext(AuthContext)
    return {
        ...context
    }
}

function useLocale() {
    const { currentLocale, localeHandler } = React.useContext(LocaleContext)

    function content(id, en) {
        return currentLocale === 'id' ? id : en
    }

    return {
        content,
        localeHandler
    }
}

function AuthProvider({ children }) {
    const token = getAccessToken()
    const [isAuth, setIsAuth] = React.useState(!!token)
    const [user, setUser] = React.useState(null)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    function checkAuth() {
        getUserLogged().then(response => {
            if (response.error === false) return
            dropAccessToken()
            setIsAuth(false)
            if (pathname !== '/register') navigate('/')
        })
    }

    React.useEffect(() => {
        if (token === null) return
        getUserLogged().then(response => {
            setUser(response.data)
        })
    }, [isAuth])

    const memo = React.useMemo(() => {
        return {
            isAuth,
            setIsAuth,
            user,
            setUser,
            checkAuth
        }
    })

    return (
        <AuthContext.Provider value={memo}>
            {children}
        </AuthContext.Provider>
    )
}

function ThemeProvider({ children }) {
    const [currentTheme, setCurrentTheme] = React.useState(localStorage.getItem('theme') ?? 'light')

    function themeHandler() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        localStorage.setItem('theme', newTheme)
        setCurrentTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    React.useEffect(() => {
        if (localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', currentTheme)
        }
        document.documentElement.setAttribute('data-theme', currentTheme)
    }, [])

    return (
        <ThemeContext.Provider value={{ currentTheme, themeHandler }}>
            {children}
        </ThemeContext.Provider>
    )
}

function LocaleProvider({ children }) {
    const [currentLocale, setLocale] = React.useState(localStorage.getItem('locale') ?? 'id')

    function localeHandler() {
        const newLocale = currentLocale === 'id' ? 'en' : 'id'
        localStorage.setItem('locale', newLocale)
        setLocale(newLocale)
    }

    React.useEffect(() => {
        if (localStorage.getItem('locale') === null) {
            localStorage.setItem('locale', currentLocale)
        }
    }, [])

    return (
        <LocaleContext.Provider value={{ currentLocale, localeHandler }}>
            {children}
        </LocaleContext.Provider>
    )
}

function getFormattedDate(date, lang) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    const langOption = {
        id: 'id-ID',
        en: 'en-US'
    }
    return new Date(date).toLocaleDateString(langOption[lang], options)
}

export {
    useInput,
    useLogin,
    useRegister,
    useLogout,
    useAdd,
    useNotes,
    useDetail,
    useSearch,
    useSearcher,
    ThemeContext,
    useAuth,
    useLocale,
    AuthProvider,
    ThemeProvider,
    LocaleProvider,
    getFormattedDate
}