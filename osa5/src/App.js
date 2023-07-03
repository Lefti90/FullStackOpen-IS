import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' //login
import './app.css' //custom error message
import LoginForm from './components/LoginForm' //togglable login form
import Togglable from './components/Togglable' //togglable forms
import BlogForm from './components/BlogForm' //togglable blog form

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) //login
  // const [title, setTitle] = useState('') //create blog
  // const [author, setAuthor] = useState('') //create blog
  // const [url, setUrl] = useState('') //create blog
  const [errorMessage, setErrorMessage] = useState(null) //custom error message
  const [message, setMessage] = useState(null) //custom succesful message
  //const [loginVisible, setLoginVisible] = useState(false) //togglable form
  const blogFormRef = useRef() //toggle thang

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


  // //Togglable login form
  // const TogglableLogin = () => {
  //   return(
  //     <Togglable buttonLabel='login'>
  //       <LoginForm
  //         username={username}
  //         password={password}
  //         handleUsernameChange={({ target }) => setUsername(target.value)}
  //         handlePasswordChange={({ target }) => setPassword(target.value)}
  //         handleSubmit={handleLogin}/>
  //     </Togglable>
  //   )
  // }

  //Togglable blog form
  const TogglableBlog = () => {

    return(
      <Togglable buttonLabel='Create' ref={blogFormRef}>
        <BlogForm 
        handleBlogCreation={createBlog}/>
      </Togglable>
    )
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
  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`Added new blog: ${returnedBlog.title} by ${returnedBlog.author}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch((error) => {
        setErrorMessage("Error creating new blog")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
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
      <TogglableBlog />
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
    {/* Login form */}
    <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}/>
    </div>
  )
 }
}

export default App