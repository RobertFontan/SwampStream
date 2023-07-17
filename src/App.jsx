//import { useState } from 'react'
import { Link, Routes, Route, BrowserRouter} from "react-router-dom"
import './App.css'


import 'bootstrap/dist/css/bootstrap.min.css';


import Login from './routes/Login'
import History from './routes/History'
import Home from './routes/Home'
import Notes from './routes/Notes'
import Saved from './routes/Saved'
import Watching from './routes/Watching'




function App() {

  return (
    <BrowserRouter>
      <div className='App'>
        {/* <nav>
            <h3>SwampStream</h3>
            <Link to="/"> Home </Link>
            <Link to="/watching">Watching</Link>
            <Link to="/notes">Notes</Link>
            <Link to="/saved">Saved Videos</Link>
            <Link to="/history">History</Link>
        </nav> */}
        <div className="content">
          <Routes>
               <Route path="/" element={<Home />}/>
               <Route path="/watching/:videoID" element={<Watching />}/>
               <Route path="/notes" element={<Notes />}/>
               <Route path="/saved" element={<Saved />}/>
               <Route path="/history" element={<History />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
