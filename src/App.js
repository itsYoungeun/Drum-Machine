import { useEffect, useState } from "react";
import './App.css';

function App() {
  const drumPads = [
    {
      keyCode: 81,
      keyTrigger: "Q",
      id: "Heater-1",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      id: "Heater-2",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      id: "Heater-3",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      id: "Heater-4",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      id: "Clap",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      id: "Open-HH",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Kick-n'-Hat",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      id: "Kick",
      src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      id: "Closed-HH",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }
  ];
  
  const pianoPads = [
    {
      keyCode: 81,
      keyTrigger: "Q",
      id: "Chord-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      id: "Chord-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      id: "Chord-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      id: "Shaker",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Punchy-Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      id: "Side-Stick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      id: "Snare",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
    }
  ];

  const [activeKey, setActiveKey] = useState('');
  const [padType, setPadType] = useState('drums');
  const [volume, setVolume] = useState(1);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [padColors, setPadColors] = useState({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      playSound(event.key.toUpperCase());
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function playSound(selector) {
    if (!isSoundOn) return;
    const currentPads = padType === 'drums' ? drumPads : pianoPads;
    const pad = currentPads.find(pad => pad.keyTrigger === selector);
  
    if (pad) {
      const audio = document.getElementById(selector);
      audio.volume = volume;
      audio.play();
      setActiveKey(pad.id);
  
      const padIndex = currentPads.indexOf(pad);
      const randomColor = getRandomColor();
      setPadColors((prev) => ({
        ...prev,
        [pad.keyTrigger]: randomColor,
      }));
  
      setTimeout(() => {
        setPadColors((prev) => ({
          ...prev,
          [pad.keyTrigger]: '#FFF',
        }));
      }, 200);
    }
  }

  function toggleSound() {
    setIsSoundOn((prev) => !prev);
  }

  function togglePads() {
    setPadType((prevType) => (prevType === 'drums' ? 'piano' : 'drums'));
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const currentPads = padType === 'drums' ? drumPads : pianoPads;

  return (
    <div className="App">
      <div id="drum-machine">

        <div className="controls">
          <div className="toggle-container">
            <span className="slider-title">{isSoundOn ? 'Power On' : 'Power Off'}</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={isSoundOn} 
                onChange={toggleSound} 
              />
              <span className="slider sound-toggle"></span>
            </label>
          </div>
          <div className="toggle-container">
            <span className="slider-title">{padType === 'drums' ? 'Heater Kit' : 'Smooth Piano Kit'}</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={padType === 'piano'} 
                onChange={togglePads} 
              />
              <span className={`slider ${padType === 'drums' ? 'drum-toggle' : 'piano-toggle'}`}></span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="volume-slider"><b>Volume </b>{Math.round(volume * 100)}% </label>
          <input 
            id="volume-slider"
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>

        <div id="display">{isSoundOn ? activeKey : ''}</div>

        <div className="drum-pads">
          {currentPads.map((pad) => (
            <div 
              key={pad.src}
              onClick={() => playSound(pad.keyTrigger)}  
              className="drum-pad"
              id="trigger"
              style={{ backgroundColor: padColors[pad.keyTrigger] || '#FFF' }}
            >
              {pad.keyTrigger}
              <audio 
                className="clip"
                id={pad.keyTrigger}  
                src={pad.src || pad.url}
              ></audio>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;