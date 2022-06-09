import axios from 'axios'
import { useEffect, useState } from 'react'

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

function App() {
	const [note, setNote] = useState<string>('')
	const [notes, setNotes] = useState<any[]>([])

	useEffect(() => {
		axios
			.get('/note')
			.then((res) => res.data.data)
			.then((notes) => setNotes(notes))
	}, [])

	const handleMoreNote = () => {
		if (note === '') {
			return
		}

		axios
			.post('/note', {
				content: note,
			})
			.then((res) => res.data.data)
			.then((note) => {
				setNotes([...notes, note])
			})

		setNote('')
	}

	const handleRemoveNote = (id: string) => {
		axios.delete('note/' + id)

		//remove in notes
		const temp = notes.filter((note) => {
			if (note._id === id) {
				return
			}
			return note
		})

		setNotes(temp)
	}

	return (
		<div>
			<h1 className='title'>Notes Management</h1>
			<div className='more-container'>
				<input
					type='search'
					className='more'
					placeholder='More'
					value={note}
					onChange={(e) => setNote(e.target.value)}
				/>
				<button className='more-btn' onClick={() => handleMoreNote()}>
					More
				</button>
			</div>
			<div className='notes-container'>
				{notes.length > 0 &&
					notes.map((note) => (
						<div className='note' key={note._id}>
							<div className='w-full'>
								<p className='content'>{note.content}</p>
								<p className='createdAt'>{note.createdAt}</p>
							</div>
							<button
								className='delete-btn'
								onClick={() => {
									handleRemoveNote(note._id)
								}}>
								x
							</button>
						</div>
					))}
			</div>
		</div>
	)
}

export default App
