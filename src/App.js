import React, { Component } from 'react';
import { connect } from "react-redux"
import { mapDispatchToProps, mapStateToProps } from './redux/index'
import Start from './containers/Start';
import MathQuiz from './containers/MathQuiz';
import './App.css';
import backgroundGIF from './assets/gif/background.gif'

import Footer from './components/Footer';
import sessionData from './utils/sessionData';
import grocerySound from './assets/sounds/grocerySound.mp3'
import Hints from './components/Hints';
import on from './assets/sound.png'
import off from './assets/mute.png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class App extends Component {
  state = {
    img: on,
    // sound: false,
    // curr: this.notPlayAudioWithVideo
    sound: new Audio(grocerySound)
  }
  gameStart = () => {
    this.props.onStartGame();
  }
  handleURL() {
    // const query = new URLSearchParams(this.props.location.search);
    // const token = query.get('id')
    // const queryParams = new URLSearchParams(window.location.search);
    // const id = queryParams.get('id');

    // alert(id)
  }
  componentDidMount() {
    this.state.sound.play()
  }
  handleSoundClick = () => {
    if (!this.state.sound.paused) {
      this.state.sound.pause()
      this.setState({
        img: off
      })
    }
    else if (this.state.sound.paused) {
      this.state.sound.play()
      this.setState({
        img: on
      })
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {sessionData.dif == "b" ? <img src={backgroundGIF} id="bg" alt="" /> : <img src={backgroundGIF} id="bg" alt="" />}
          <div >
            <img alt="mute" src={this.state.img} style={{ position: "absolute", top: "20px", left: "20px", maxWidth: "40px", width: "100%", zIndex: 4 }} onClick={this.handleSoundClick} />
          </div>
          
          {
            !this.props.isStarted ? (
              <Start startPressed={this.gameStart} />
            ) : (
              <MathQuiz {...this.props} gameStart={this.gameStart} />
            )
          }
        </header>
        {/* <Footer></Footer> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
