import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getFormattedDate, useLocale } from '../utils'

function NoteItem({ id, title, body, createdAt }) {
    const { content } = useLocale()

    return (
        <article className="note-item">
            <h3>
                <Link className="title" to={`/notes/${id}`}>
                    {title}
                </Link>
            </h3>
            <p className="date">{getFormattedDate(createdAt, content('id', 'en'))}</p>
            <p className="body">
                {body}
            </p>
        </article>
    )
}

NoteItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,

}

export default NoteItem