import React from 'react'
import { Link } from 'react-router-dom'
import { useDetail, useLocale, getFormattedDate } from '../utils'
import BottomBar from '../components/BottomBar'

function NoteDetail() {
    const [note, statusHandler, removeHandler] = useDetail()
    const { content } = useLocale()

    if (note === null) {
        return (
            <div className="note-list">
                <h2 className="info">
                    {content('Memuat ...', 'Loading ...')}
                </h2>
            </div>
        )
    }

    return (
        <>
            <article className="page-detail">
                <h2>
                    <Link className="title" to={`/notes/${note.id}`}>
                        {note.title}
                    </Link>
                </h2>
                <div className="body">
                    <p className="date">
                        {getFormattedDate(note.createdAt, content('id', 'en'))}
                        <span className="status">
                            {
                                note.archived ?
                                    content('Terarsip', 'Archived')
                                    :
                                    content('Aktif', 'Active')
                            }
                        </span>
                    </p>
                    <p className="text">
                        {note.body}
                    </p>
                    <div className="container">
                        <button className="button" onClick={statusHandler}>
                            {
                                note.archived ?
                                    content('Aktifkan', 'Active')
                                    :
                                    content('Arsipkan', 'Archive')
                            }
                        </button>
                        <button className="button outline" onClick={removeHandler}>
                            {content('Hapus', 'Remove')}
                        </button>
                    </div>
                </div>
            </article>
            <BottomBar />
        </>
    )
}

export default NoteDetail