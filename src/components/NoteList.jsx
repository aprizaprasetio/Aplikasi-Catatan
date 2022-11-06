import PropTypes from 'prop-types'
import NoteItem from './NoteItem'
import { useLocale } from '../utils'

function NoteList({ notes }) {
    const { content } = useLocale()

    if (notes === null) {
        return (
            <div className="note-list">
                <h2 className="info">
                    {content('Memuat ...', 'Loading ...')}
                </h2>
            </div>
        )
    }

    if (notes.length === 0) {
        return (
            <div className="note-list">
                <h2 className="info">
                    {content('Tidak ada catatan yang terekam.', 'No notes were recorded.')}
                </h2>
            </div>
        )
    }

    return (
        <div className="note-list">
            {
                notes.map(
                    item => {
                        return <NoteItem key={item.id} {...item} />
                    }
                )
            }
        </div>
    )
}

NoteList.propTypes = {
    notes: PropTypes.array
}

export default NoteList