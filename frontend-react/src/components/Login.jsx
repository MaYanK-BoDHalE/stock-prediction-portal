import React from 'react'

const Login = () => {
  return (
     <>
     <div className='container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-6 registerform'>
          <h3 className='text-center '> Login to your Account</h3>
          <form action="">
            
            <input type="email" className='form-control mb-3' placeholder='Enter your email' />
            <input type="password" className='form-control mb-3' placeholder='password' />
            <button type='Submit' className='btn btn-info d-block mx-auto'>Submit</button>
            
          </form>
        </div>
      </div>
     </div>

    </>
  )
}

export default Login