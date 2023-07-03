import React, { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleDetails}>{showDetails ? "Hide" : "Show"} details</button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes} <button>Like</button>
          </div>
          <div>Added by {blog.user.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
