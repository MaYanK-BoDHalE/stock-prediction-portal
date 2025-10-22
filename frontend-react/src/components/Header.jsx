import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>

<nav className="navbar navbar-light bg-light pt-3 align-items-start" >
  <div className="container-fluid">
    <Link className="navbar-brand mb-0 h1" to='/'>Stock Prediction Portal</Link>
    <div className='ms-auto'>
    <Button text='Login'class='btn-outline-info me-2' url='/login'/>
    <Button text='Register' class='btn-info' url='/register'/>
    </div>
  </div>
  
</nav>
    
    
    </>
  )
}

export default Header