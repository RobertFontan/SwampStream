import { useState } from 'react'
import './App.css'
import Login from './routes/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      Hello
      <Login />
    </div>
  )
}

export default App
