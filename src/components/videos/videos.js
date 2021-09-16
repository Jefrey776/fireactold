import React, { Component } from 'react'
import northernlights from '../../img/northernlights.png'

const imgstyle = {
    width: '100%',
}

class VideoPage extends Component {
    render() {
        return (
            <React.Fragment>
                <img src={northernlights} style={imgstyle}></img>
            </React.Fragment>
            )
    }
}

export default VideoPage;