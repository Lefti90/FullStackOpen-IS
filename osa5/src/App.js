import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' //login
import './app.css' //custom error message

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) //login
  const [title, setTitle] = useState('') //create blog
  const [author, setAuthor] = useState('') //create blog
  const [url, setUrl] = useState('') //create blog
  const [errorMessage, setErrorMessage] = useState(null) //custom error message
  const [message, setMessage] = useState(null) //custom succesful message

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //if local storage has user info, do this
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = () =>{
    if (errorMessage === null && message === null){
      return null
    }

    if (errorMessage !== null){
      return (
        <div className='error'>
          {errorMessage}
        </div>
      )
    }

    if (message !== null){
      return(
      <div className='message'>
        {message}
      </div>
      )
    }
  }

  //login
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Login succesful')
      setTimeout(()=>{
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //logout
  const handleLogout = (event) =>{
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  //create blog
  const createBlog = async (event) =>{
    event.preventDefault()
    //console.log(title, author, url)
    
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      }
  
      const createdBlog = await blogService.create(newBlog)
      setBlogs([...blogs, createdBlog])
      console.log('On send:',title, author)
      setMessage(`Added new blog: ${title} by ${author}`)
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(()=>{
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Error creating new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  if (user !== null){
  //if logged in
  return (    
    // Title and login status
    <div>
      <Notification />
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <p>
        <button onClick={handleLogout}>Logout</button>
      </p>
      <div>
    {/* New blog */}
    <h2>Create new blog</h2>
    <p></p>
    <form onSubmit={createBlog}>
        <div>
          title: 
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author: 
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url: 
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
    {/* Blogs */}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
 }else{
  return(
    <div>
    <Notification />
    <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username: 
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password: 
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
 }
}

export default App