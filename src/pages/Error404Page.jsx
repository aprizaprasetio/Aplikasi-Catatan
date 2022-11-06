import { Link } from 'react-router-dom'
import { useLocale } from '../utils'

function Error404Page() {
    const { content } = useLocale()

    return (
        <article className="page-error404">
            <h2 className="title">Error 404</h2>
            <p className="text">
                {content('Halaman ini tidak tersedia, kembali ke ', 'This page not available, go back to ')}
                <Link to="/">{content('Halaman utama', 'Main page')}</Link>
            </p>
        </article>
    )
}

export default Error404Page