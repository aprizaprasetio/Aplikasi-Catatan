import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useAuth } from './utils'
import AuthPage from './pages/AuthPage'
import NotesPage from './pages/NotesPage'
import NoteAdd from './pages/NoteAdd'
import NoteDetail from './pages/NoteDetail'
import Error404Page from './pages/Error404Page'
import NavBar from './components/NavBar'

function App() {
  const { isAuth, checkAuth } = useAuth()
  const { pathname, search } = useLocation()

  React.useEffect(checkAuth, [pathname, search])
  if (isAuth === false) {
    return (
      <Routes>
        <Route path="/">
          <Route index element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
        </Route>
        <Route path="*" element={<Error404Page />} />
      </Routes>
    )
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/">
          <Route index element={<NotesPage />} />
          <Route path="/archives" element={<NotesPage />} />
          <Route path="/notes/new" element={<NoteAdd />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
        </Route>
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </>
  )
}

export default App
