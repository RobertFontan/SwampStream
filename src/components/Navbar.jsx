import React from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar';
import { NavbarBrand } from 'react-bootstrap';
function NavBar(){

    return(
        <Navbar className='nav'>
            <Navbar.Brand>SwampStream</Navbar.Brand>
            <Link to="/"> Home </Link>
            <Link to="/watching">Watching</Link>
            <Link to="/notes">Notes</Link>
            <Link to="/saved">Saved Videos</Link>
            <Link to="/history">History</Link>
        </Navbar>
    )

}

export default NavBar