import React from 'react';
import Sketch from './components/sketch/Sketch'
import Navbar from './components/navbar/navbar'
import MusicPage from './components/music/music'
import VideoPage from './components/videos/videos'
import GigsPage from './components/gigs/gigs'
import ContactPage from './components/contact/contact'

import './App.css';

const style = {
  height: "100%"
}

function App() {
  return (
    <div className="App" id="main-content" style={style}>
      <Sketch />
      <Navbar />
      <MusicPage />
      <VideoPage />
      <GigsPage />
      <ContactPage />

    </div>
  );
}

export default App;
