import React, { Component } from 'react'
import blendedTrees from '../../img/blendedTrees.jpg'

const imgstyle = {
    width: '100%',
}

class ContactPage extends Component {
    render() {
        return (
            <React.Fragment>
                <img src={blendedTrees} style={imgstyle}></img>
            </React.Fragment>
            )
    }
}

export default ContactPage;