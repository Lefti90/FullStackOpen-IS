/* Blogit menee piiloon kun kirjoittaa.  ¯\_(ツ)_/¯

omaksi muistutukseksi:
forwardRef: It is a function used for passing a ref from a parent component to a child component.
 It allows the child component to access and interact with the DOM node or React component 
 instance that the ref is attached to. In the modified code, we use forwardRef to pass the ref
  from the App component to the Togglable component.

useImperativeHandle: It is a hook used in a child component to customize the instance value 
that is exposed to the parent component when using ref. It allows you to define functions on
 the child component that can be invoked from the parent component using the ref of the child
  component. In the modified code, we use useImperativeHandle to expose the toggleVisibility 
  function from the Togglable component, allowing the parent component (App) to call it.

useRef: It is a hook used for creating a mutable value that persists across component renders. 
It returns a mutable ref object that can hold any value, similar to the ref attribute in class 
components. In the modified code, we use useRef to create a ref in the TogglableBlog component, 
which is then passed to the Togglable component using ref={togglableRef}. This allows us to access 
the toggleVisibility function of the Togglable component through the ref.
*/

import { useState, useImperativeHandle, forwardRef } from 'react'


const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )

})

export default Togglable
