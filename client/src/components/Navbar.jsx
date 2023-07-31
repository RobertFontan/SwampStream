import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink, useLocation} from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar';

function NavBar(){
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    useEffect(() => {

    }, [location])
    return(
        <Navbar className='nav'>
            <Navbar.Brand>SwampStream</Navbar.Brand>
            <NavLink className={splitLocation[1] === "home" ? "active" : ""} to="/"> HOME </NavLink>
            <NavLink className={splitLocation[1].indexOf("watching") != -1 ? "active" : ""} to="/watching">WATCHING</NavLink>
            <NavLink className={splitLocation[1] === "notes" ? "active" : ""} to="/notes">NOTES</NavLink>
            <NavLink className={splitLocation[1] === "saved" ? "active" : ""} to="/saved">SAVED VIDEOS</NavLink>
            <NavLink className={splitLocation[1] === "history" ? "active" : ""} to="/history">HISTORY</NavLink>
        </Navbar>
    )

}

export default NavBar