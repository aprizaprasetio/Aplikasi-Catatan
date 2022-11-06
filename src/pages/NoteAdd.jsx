import { useInput, useAdd, useLocale } from '../utils'
import BottomBar from '../components/BottomBar'

function NoteAdd() {
    const [title, titleHandler] = useInput()
    const [body, bodyHandler] = useInput()
    const addHandler = useAdd(title, body)
    const { content } = useLocale()

    return (
        <>
            <div className="page-add">
                <h2 className="header">
                    {content('Tambah catatan', 'Add note')}
                </h2>
                <form className="form" onSubmit={addHandler}>
                    <input className="control" type="text" placeholder={content('Judul', 'Subject')}
                        value={title} onChange={titleHandler} />
                    <textarea className="control" rows="10" placeholder={content('Saya mau menulis ...', 'I want to write ...')}
                        value={body} onChange={bodyHandler}></textarea>
                    <button className="submit" type="submit">
                        {content('Tambah', 'Add')}
                    </button>
                </form>
            </div>
            <BottomBar />
        </>
    )
}

export default NoteAdd