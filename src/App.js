import './App.css';
import React from 'react';

const btnData = [
  { 
    key: "Q",
    name: "Heater-1",
    link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    key: "W",
    name: "Heater-2",
    link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    key: "E",
    name: "Heater-3",
    link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    key: "A",
    name: "Heater-4",
    link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    key: "S",
    name: "Clap",
    link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    key: "D",
    name: "Open-HH",
    link: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    key: "Z",
    name: "Kick-n-Hat",
    link: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    key: "X",
    name: "Kick",
    link: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    key: "C",
    name: "Closed-HH",
    link: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      powerBtn: false,
      display: "Off",
      volume: 0.3
    };
    this.powerSwitch = this.powerSwitch.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }
  changeVolume(val) {
    this.setState({
      volume: val
    });
    this.updateDisplay("Volume: " + Math.floor(val * 100) + "%");
    document.querySelectorAll("audio").forEach( el => (el.volume = val));
  }
  powerSwitch() {
    this.setState({
      powerBtn: !this.state.powerBtn,
      display: this.state.powerBtn ? "Off" : "Power On"
    });
    return this.state.powerBtn;
  }
  updateDisplay(val) {
    this.setState({
      display: val
    });
  }
  render() {
    return (
      <div className="App-widget mx-auto w-50" id="drum-machine">
        <ControlBoard pwr={this.state.powerBtn} powerSwitch={this.powerSwitch} dsp={this.state.display} cVol={this.changeVolume}/>
        <DrumBoard pwr={this.state.powerBtn} dsp={this.updateDisplay} vol={this.state.volume}/>
      </div>
    );
  }
}

class DrumBoard extends React.Component {
  constructor(props) {
    super(props);
    // bind this
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
// add and remove event listeners
componentDidMount() {
  document.addEventListener("keydown", this.handleKeyPress);
}
componentWillUnmount() {
  document.removeEventListener("keydown", this.handleKeyPress);
}
// handle key presses
handleKeyPress(event) {
  btnData.forEach(({key,name}) => {
    if (event.key.toUpperCase() === key) {
      this.handleClick(key, name);
    }
  });
}
  handleClick(key, name) {
    if (this.props.pwr) {
      document.getElementById(key).play();
      this.props.dsp(name);
    }
  }
  render() {
    const temphtml = btnData.map( ({key,name,link}, index) => {
      return <><button key={index} className="drum-pad shadow bg-dark m-4 p-4 text-secondary" id={name} type="button" onClick={() => this.handleClick(key, name)}>
        <audio className="clip" id={key} src={link}>{name}</audio>{key}</button></>;
      });
    return (
      <div className="col-7" id="key-container">{temphtml}</div>
    );
  }
};

class ControlBoard extends React.Component {
  constructor(props) {
    super(props);
    this.changeVol = this.changeVol.bind(this);
  }
  changeVol() {
    this.props.cVol(document.getElementById("volumeRange").value);
  }
  render() {
    return (
      <div className="controls-container col-5 text-center card card-body bg-dark">
        <div id="display" className="row">{this.props.dsp}</div>
        <div className="row">
          <label htmlFor="volumeRange" className="volume-label col-5 my-3 me-1">Volume</label>
          <input type="range" onChange={this.changeVol} className="volume-slider col-6 my-3 bg-secondary" id="volumeRange" max="1" min="0" step="0.01"  defaultValue="1.0"/>
          <button id="pwr-btn" onClick={this.props.powerSwitch}>Power</button>
        </div>
      </div>
    );
  }
};

function App() {
  return (
    <div className="App container-fluid">
      <h1 className="text-center">Drum Machine</h1>
      <DrumMachine />
    </div>
  );
}

export default App;
