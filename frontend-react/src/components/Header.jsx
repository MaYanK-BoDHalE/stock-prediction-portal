import React from 'react'
import Button from './Button'

const Header = () => {
  return (
    <>

<nav class="navbar navbar-light bg-light pt-3 align-items-start" >
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1">Stock Prediction Portal</span>
    <div className='ms-auto'>
    <Button text='Login'class='btn-outline-info me-2'/>
    <Button text='Register' class='btn-info'/>
    </div>
  </div>
  
</nav>
    
    
    </>
  )
}

export default Header