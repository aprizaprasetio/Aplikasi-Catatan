import PropTypes from 'prop-types'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useNotes, useSearch, useSearcher, useLocale } from '../utils'
import { getActiveNotes, getArchivedNotes } from '../utils/api'
import NoteList from '../components/NoteList'
import BottomBar from '../components/BottomBar'

function ActiveNotes({ searchKey }) {
    const actives = useNotes(getActiveNotes)
    const searched = useSearcher(actives, searchKey)
    const { content } = useLocale()

    return (
        <div className="page-notes">
            <h2 className="header">
                {content('Catatan Aktif', 'Active Notes')}
            </h2>
            <NoteList notes={searched ?? actives} />
        </div>
    )
}

function ArchivedNotes({ searchKey }) {
    const archives = useNotes(getArchivedNotes, searchKey)
    const searched = useSearcher(archives, searchKey)
    const { content } = useLocale()

    return (
        <div className="page-notes">
            <h2 className="header">
                {content('Catatan Arsip', 'Archived Notes')}
            </h2>
            <NoteList notes={searched ?? archives} />
        </div>
    )
}

function NotesPage() {
    const { pathname } = useLocation()
    const search = useSearch()
    const title = search.search

    return (
        <>
            {
                pathname === '/archives' ?
                    <ArchivedNotes searchKey={title} /> : <ActiveNotes searchKey={title} />
            }
            <BottomBar {...search} />
        </>
    )
}

ActiveNotes.propTypes = {
    searchKey: PropTypes.string.isRequired
}

ArchivedNotes.propTypes = {
    searchKey: PropTypes.string.isRequired
}

export default NotesPage