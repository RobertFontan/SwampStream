import React from 'react'

function Login() {
  return (
    <div>
        <form className="login-form">          
            <label> SwampStream </label>
            <input type="text" id="username" />
            <input type="text" id="password" />
        </form>

    </div>
  )
}

export default Login