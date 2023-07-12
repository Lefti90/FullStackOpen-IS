import { useDispatch } from 'react-redux'

const AnecdoteForm = () =>{
const dispatch = useDispatch()

const create = (event) =>{
  event.preventDefault()
  const newAnecdote = event.target.anecdote.value
  dispatch({
    type: 'CREATE',
    payload: newAnecdote
  })
  event.target.anecdote.value =''
}
    return (
        <div>
          <h2>create new</h2>
          <form onSubmit={create}>
            <div><input name='anecdote' placeholder='New anecdote'/></div>
            <button type="submit">create</button>
          </form>
        </div>
      )
    }

export default AnecdoteForm