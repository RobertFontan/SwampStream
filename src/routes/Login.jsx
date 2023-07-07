import React from 'react'

function Login() {
  return (
    <div>
        <form className='login-form'>
            <input type="text" placeholder='Username'/>
            <input type="text" placeholder='Password'/>
            <button>Sign In</button>
        </form>
    </div>
  )
}

export default Login