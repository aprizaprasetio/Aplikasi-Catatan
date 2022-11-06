import PropTypes from 'prop-types'
import { useParams, Link, useLocation } from 'react-router-dom'
import { FaRegStickyNote } from 'react-icons/fa'
import { GoArchive } from 'react-icons/go'
import { AiOutlineFolderAdd } from 'react-icons/ai'
import { useLocale } from '../utils'

function BottomBar({ search, searchHandler }) {
    const { pathname } = useLocation()
    const { id } = useParams()
    const isShow = (pathname !== `/notes/${id}`) && (pathname !== '/notes/new')
    const { content } = useLocale()

    return (
        <nav className="bottom-bar">
            <div className="container">
                <div className="item">
                    <Link to="/">
                        <FaRegStickyNote />
                        <span className="title">
                            {content('Aktif', 'Active')}
                        </span>
                    </Link>
                </div>
                <div className="item">
                    <Link to="/archives">
                        <GoArchive />
                        <span className="title">
                            {content('Arsip', 'Archive')}
                        </span>
                    </Link>
                </div>
                {
                    isShow &&
                    <div className="item">
                        <input className="search-bar" type="text" placeholder={content('Pencarian', 'Search')}
                            value={search} onChange={searchHandler} />
                    </div>
                }
                <div className="item">
                    <Link to="/notes/new">
                        <AiOutlineFolderAdd />
                        <span className="title">
                            {content('Baru', 'New')}
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

BottomBar.propTypes = {
    search: PropTypes.string,
    searchHandler: PropTypes.func
}

export default BottomBar