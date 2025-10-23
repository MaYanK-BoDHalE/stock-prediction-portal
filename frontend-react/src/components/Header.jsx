import React from 'react'
import Button from './Button'
import { useContext } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Header = () => {
  const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext);
  const navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    navigate('/login');
  }
  return (
    <>

<nav className="navbar navbar-light bg-light pt-3 align-items-start" >
  <div className="container-fluid">
    <Link className="navbar-brand mb-0 h1" to='/'>Stock Prediction Portal</Link>
    <div >
     {isLoggedIn ? (
      <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
     ):(
      <>
      <Button text='Login'class='btn-outline-info me-2' url='/login'/>
      <Button text='Register' class='btn-info' url='/register'/>
      </>
     )}
    </div>
  </div>
  
</nav>
    
    
    </>
  )
}

export default Header