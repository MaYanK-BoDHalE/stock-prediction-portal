import React from 'react'
import { useState,useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Login = () => {
   const [username,setUsername]=useState('')
   const [password,setPassword]=useState('')
   const [loading,setLoading]=useState(false)
   const navigate=useNavigate()
   const [error,setError]=useState('')
   const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext);

    const handleLogin=async(e)=>{
    e.preventDefault();
    setLoading(true);
    
    const userData={username,password}
    console.log('Login data:',userData);

    try{
      const response=await axios.post('http://127.0.0.1:8000/api/v1/token/',userData)
      localStorage.setItem('access_token',response.data.access)
      localStorage.setItem('refresh_token',response.data.refresh)
      console.log('User logged in successfully');
      navigate('/');
      setIsLoggedIn(true);
    }catch(error){
      console.log('Login failed',error);
      setError('Invalid username or password');
    }finally{
      setLoading(false);
    }
  }

  return (
     <>
     <div className='container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-6 registerform'>
          <h3 className='text-center '> Login </h3>
          <form onSubmit={handleLogin}>
            <div className='mb-3' >
            <input type="text" className='form-control' placeholder='Enter your name' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
           
            <div className='mb-3'>
            <input type="password" className='form-control ' placeholder='password'value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className='mb-3'>
              {error && <div className='text-danger text-center mb-3'>{error}</div>} 
            {loading ? (<button className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin />Loading...</button> ):(  
            <button type='Submit' className='btn btn-info d-block mx-auto'>Login</button>)}
            </div>
            
            
          </form>
        </div>
      </div>
     </div>

    </>
  )
}

export default Login