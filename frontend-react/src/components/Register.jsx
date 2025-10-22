import React,{useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faSpinner } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
  
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState({})
  const [success,setSuccess]=useState(false)
  const [loading,setLoading]=useState(false)


  const handleRegister=async(e)=>{
    e.preventDefault();
    setLoading(true);
    
    const userData={
      username,email,password
    }
    try{ 
      const response=await axios.post('http://127.0.0.1:8000/api/v1/register/',userData)
      console.log('response.data:',response.data);
      console.log('User registered successfully');
      setError({});
      setSuccess(true);
      
    }catch(error){
      setError(error.response.data);
      console.log('Registration failed',error.response.data);
    }finally{
      setLoading(false);
    }
  }

  return (
    <>
     <div className='container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-6 registerform'>
          <h3 className='text-center '> Creat Account</h3>
          <form onSubmit={handleRegister}>
            <div className='mb-3' >
            <input type="text" className='form-control' placeholder='Enter your name' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <small>{error.username && <div className='text-danger'>{error.username}</div>}</small>
            </div>
            <div>
            <input type="email" className='form-control mb-3' placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className='mb-3'>
            <input type="password" className='form-control ' placeholder='password'value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <small>{error.password && <div className='text-danger'>{error.password}</div>}</small>
            </div>
            <div className='mb-3'>
            {loading ? (<button className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin />Loading...</button> ):(  
            <button type='Submit' className='btn btn-info d-block mx-auto'>Submit</button>)}
            </div>
            {success && <div className='text-success text-center mt-3'>Registration successful!</div>}
            
          </form>
        </div>
      </div>
     </div>

    </>
  )

}

export default Register