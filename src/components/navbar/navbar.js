import { findByLabelText } from '@testing-library/dom';
import React, { Component } from 'react'

const navBarUl = {
    listStyleType: 'none',
    backgroundColor: 'black',
    color: 'white',
    padding: '3em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 10,
    margin: 0,

    
}


const navBarStyle = {
    position: 'sticky',
    top: 0,
}

class Navbar extends Component {
    render() {
        return (
            <div className="navbar" style={navBarStyle}>
                <ul style={navBarUl}>

                    <li name="music">Music</li>

                    <li name="videos">Videos</li>

                    <li name="logo">FOREST ISLAND</li>

                    <li name="gigs">Gigs</li>

                    <li name="shop">Shop</li>

                    <li name="contact">Contact</li>

                </ul>
            </div>
        )
    }
}

export default Navbar;