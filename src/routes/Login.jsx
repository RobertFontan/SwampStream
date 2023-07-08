import React from 'react'
import { Link } from 'react-router-dom'


function Login() {
  return (
    <div>
        <form className='login-form'>
            <h3>SwampStream</h3>
            <input type="text" placeholder='Username'/>
            <input type="text" placeholder='Password'/>
            <Link to="/home">Sign In</Link>
        </form>
        
    </div>
  )
}

export default Login