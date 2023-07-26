const whiteKeyWidth = 80;
const pianoHeight = 400;
const naturalNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const naturalNotesSharps = ['C', 'D', 'F', 'G', 'A'];
const naturalNotesFlats = ['D', 'E', 'G', 'A', 'B'];


// range of keys on keyboard that show in screen.
const range = ['C2', 'C7'];

//midi list with the note names  not a string
const currentMidiList = [];
//midi list with the notames is a string
const midiNoteShow = [];
//howler sounds used for keyboard works with line 359

//----------------------------------------
//----------------------------------------
//----------------------------------------
//----------------------------------------

const app = {
  checkMidiAccess() {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(success, failure);
    }

    function success(midiAccess) {
      //console.log(midiAccess);
      midiAccess.addEventListener('statechange', updateDevices);
      const inputs = midiAccess.inputs;
      //console.log(inputs)
      inputs.forEach((input) => {
        //console.log(input)
        input.addEventListener('midimessage', handleInput);
      });

      console.log('success');
    }

    function failure() {
      console.log('could not connect');
    }

    function updateDevices(event) {
      console.log(event);
    }

    function getHowl() {
      var music = new Howl({
        src: ['assets/C3.mp3'],
      });
    }
    getHowl();

    function handleInput(input) {
      const command = input.data[0];
      const note = input.data[1];
      const velocity = input.data[2];
      const midiNote = Tonal.Midi.midiToNoteName(note);
      const midiNoteT = Tonal.Midi.midiToNoteName(note);
      //const midiChord =

      switch (command) {
        case 144: // note is on
          if (velocity > 0) {
            noteOn(note, velocity);
            midiNoteShow.push(midiNote.toString());
            console.log(midiNoteShow);
            console.log(midiNoteT);
            //keys light up when pressed
            app.displayNotesKeyboard(midiNoteShow);
            //notes appear in text form inside of dotted border when pressed
            app.displayNotesBox(midiNoteShow);
            app.displayChordNotes(midiNoteShow);

            for (const key in music._sprite)
              if (midiNoteT === key) {
                music.play(key)
              }

            //handleSound(midiNoteT);
            //console.log(handleSound);
          } else {
            noteOff(note);
            midiNoteShow.length = 0;
            console.log(midiNoteShow);
            app.displayNotesKeyboard(midiNoteShow);
            app.displayNotesBox(midiNoteShow);
            app.displayChordNotes(midiNoteShow);
            music.stop();
          }
          break;
        case 128:
          noteOff(note);
          midiNoteShow.length = 0;
          console.log(midiNoteShow);
          app.displayNotesKeyboard(midiNoteShow);
          app.displayNotesBox(midiNoteShow);
          app.displayChordNotes(midiNoteShow)
          music.stop();
          break;
      }
    }

    {
      var music = new Howl({
        src: ['assets/k-piano-c1-c8-6000.mp3'],
        sprite: {
          C1: [0, 6000],
          Db1: [6000, 12000],
          D1: [12000, 18000],
          Eb1: [18000, 24000],
          E1: [24000, 30000],
          F1: [30000, 36000],
          Gb1: [36000, 42000],
          G1: [42000, 48000],
          Ab1: [48000, 54000],
          A1: [54000, 60000],
          Bb1: [60000, 66000],
          B1: [66000, 72000],
          C2: [72000, 78000],
          Db2: [78000, 84000],
          D2: [84000, 90000],
          Eb2: [90000, 96000],
          E2: [96000, 102000],
          F2: [102000, 108000],
          Gb2: [108000, 114000],
          G2: [114000, 120000],
          Ab2: [120000, 126000],
          A2: [126000, 132000],
          Bb2: [132000, 138000],
          B2: [138000, 144000],
          C3: [144000, 150000],
          Db3: [150000, 156000],
          D3: [156000, 162000],
          Eb3: [162000, 168000],
          E3: [168000, 174000],
          F3: [174000, 180000],
          Gb3: [180000, 186000],
          G3: [186000, 192000],
          Ab3: [192000, 198000],
          A3: [198000, 204000],
          Bb3: [204000, 210000],
          B3: [210000, 216000],
          C4: [216000, 2222000],
          Db4: [222000, 228000],
          D4: [228000, 234000],
          Eb4: [234000, 240000],
          E4: [240000, 246000],
          F4: [246000, 252000],
          Gb4: [252000, 258000],
          G4: [258000, 264000],
          Ab4: [264000, 270000],
          A4: [270000, 276000],
          Bb4: [276000, 282000],
          B4: [282000, 288000],
          C5: [288000, 294000],
          Db5: [294000, 300000],
          D5: [300000, 306000],
          Eb5: [306000, 312000],
          E5: [312000, 318000],
          F5: [318000, 324000],
          Gb5: [324000, 330000],
          G5: [330000, 336000],
          Ab5: [336000, 342000],
          A5: [342000, 348000],
          Bb5: [348000, 354000],
          B5: [354000, 360000],
          C6: [360000, 366000],
          Db6: [366000, 372000],
          D6: [372000, 378000],
          Eb6: [378000, 384000],
          E6: [384000, 390000],
          F6: [390000, 396000],
          Gb6: [396000, 402000],
          G6: [402000, 408000],
          Ab6: [408000, 414000],
          A6: [414000, 420000],
          Bb6: [420000, 426000],
          B6: [426000, 432000],
          C7: [432000, 438000],
          Db7: [438000, 414000],
          D7: [444000, 450000],
          Eb7: [450000, 456000],
          E7: [456000, 462000],
          F7: [462000, 468000],
          Gb7: [468000, 474000],
          G7: [474000, 480000],
          Ab7: [480000, 486000],
          A7: [486000, 452000],
          Bb7: [452000, 458000],
          B7: [458000, 464000],
          C8: [464000, 470000],
        },
      });

      console.log(music);
    }

    /*
    function handleSound(noteT) {
      
      snippets = music._sprite;

      console.log(snippets);

      for (const key in snippets)
        if (noteT === key) {
          music.play(key);
          console.log(music);
        } 

      //return pSrc
    }
    */

    function noteOn(note, velocity) {
      //console.log(note,velocity)
    }

    function noteOff(note) {
      //console.log(note)
    }
  },

  //----------------------------------------
  //----------------------------------------

  setupPiano() {
    const piano = document.querySelector('#piano');
    const allNaturalNotes = this.getAllNaturalNotes(range);
    const pianoWidth = allNaturalNotes.length * whiteKeyWidth;

    const SVG = this.createMainSVG(pianoWidth, pianoHeight);

    // add white Keys
    let whiteKeyPositionX = 0;

    allNaturalNotes.forEach((noteName) => {
      const whiteKeyTextGroup = utils.createSVGElement('g');
      const whiteKey = this.createKey({
        className: 'white-key',
        width: whiteKeyWidth,
        height: pianoHeight,
      });
      const text = utils.createSVGElement('text');

      utils.addTextContent(text, noteName);
      utils.setAttributes(whiteKeyTextGroup, { width: whiteKeyWidth });
      utils.setAttributes(text, {
        x: whiteKeyPositionX + whiteKeyWidth / 2,
        y: 380,
        'text-anchor': 'middle',
      });
      utils.setAttributes(whiteKey, {
        x: whiteKeyPositionX,
        'data-note-name': noteName,
      });

      text.classList.add('white-key-text');
      whiteKeyTextGroup.appendChild(whiteKey);
      whiteKeyTextGroup.appendChild(text);
      SVG.appendChild(whiteKeyTextGroup);

      // increment spacing between white keys
      whiteKeyPositionX += whiteKeyWidth;
    });

    //add black keys
    let blackKeyPositionX = 60;
    allNaturalNotes.forEach((naturalNote, index, array) => {
      // if last iteration of keys, do not add black key
      if (index === array.length - 1) {
        return;
      }

      const blackKeyTextGroup = utils.createSVGElement('g');
      const blackKey = this.createKey({
        className: 'black-key',
        width: whiteKeyWidth / 2,
        height: pianoHeight / 1.6,
      });
      const flatNameText = utils.createSVGElement('text');
      const sharpNameText = utils.createSVGElement('text');

      utils.setAttributes(blackKeyTextGroup, { width: whiteKeyWidth / 2 });

      for (let i = 0; i < naturalNotesSharps.length; i++) {
        let naturalSharpNoteName = naturalNotesSharps[i];
        let naturalFlatNoteName = naturalNotesFlats[i];

        if (naturalSharpNoteName === naturalNote[0]) {
          utils.setAttributes(blackKey, {
            x: blackKeyPositionX,
            'data-sharp-name': `${naturalSharpNoteName}#${naturalNote[1]}`,
            'data-flat-name': `${naturalFlatNoteName}b${naturalNote[1]}`,
          });

          utils.setAttributes(sharpNameText, {
            'text-anchor': 'middle',
            y: 215,
            x: blackKeyPositionX + whiteKeyWidth / 4,
          });

          utils.setAttributes(flatNameText, {
            'text-anchor': 'middle',
            y: 235,
            x: blackKeyPositionX + whiteKeyWidth / 4,
          });

          utils.addTextContent(sharpNameText, `${naturalSharpNoteName}♯`);
          utils.addTextContent(flatNameText, `${naturalFlatNoteName}♭`);

          flatNameText.classList.add('black-key-text');
          sharpNameText.classList.add('black-key-text');

          // add double spacing between D# and A#
          if (naturalSharpNoteName === 'D' || naturalSharpNoteName === 'A') {
            blackKeyPositionX += whiteKeyWidth * 2;
          } else {
            blackKeyPositionX += whiteKeyWidth;
          }

          blackKeyTextGroup.appendChild(blackKey);
          blackKeyTextGroup.appendChild(flatNameText);
          blackKeyTextGroup.appendChild(sharpNameText);
        }
      }
      SVG.appendChild(blackKeyTextGroup);
    });
    // add main SVG to paino div
    piano.appendChild(SVG);
  },



  //----------------------------------------
  //----------------------------------------

  createOctave(octaveNumber) {
    const octave = utils.createSVGElement('g');
    octave.classList.add('octave');
    octave.setAttribute(
      'transform',
      `translate(${octaveNumber * octaveWidth}, 0)`
    );
    return octave;
  },

  //----------------------------------------
  //----------------------------------------

  createKey({ className, width, height }) {
    const key = utils.createSVGElement('rect');
    key.classList.add(className, 'key');

    utils.setAttributes(key, {
      width: width,
      height: height,
    });

    return key;
  },

  //----------------------------------------
  //----------------------------------------

  getAllNaturalNotes([firstNote, lastNote]) {
    //assign octave number, notes and positions to variables
    const firstNoteName = firstNote[0];
    const firstOctaveNumber = parseInt(firstNote[1]);
    const lastNoteName = lastNote[0];
    const lastOctaveNumber = parseInt(lastNote[1]);
    const firstNotePosition = naturalNotes.indexOf(firstNoteName);
    const lastNotePosition = naturalNotes.indexOf(lastNoteName);

    const allNaturalNotes = [];

    for (
      let octaveNumber = firstOctaveNumber;
      octaveNumber <= lastOctaveNumber;
      octaveNumber++
    ) {
      // handle first octave
      if (octaveNumber === firstOctaveNumber) {
        naturalNotes.slice(firstNotePosition).forEach((noteName) => {
          allNaturalNotes.push(noteName + octaveNumber);
        });

        // handle last octave
      } else if (octaveNumber === lastOctaveNumber) {
        naturalNotes.slice(0, lastNotePosition + 1).forEach((noteName) => {
          allNaturalNotes.push(noteName + octaveNumber);
        });
      } else {
        naturalNotes.forEach((noteName) => {
          allNaturalNotes.push(noteName + octaveNumber);
        });
      }
    }
    return allNaturalNotes;
    //console.log(allNaturalNotes);
  },

  //----------------------------------------
  //----------------------------------------

  createMainSVG(pianoWidth, pianoHeight) {
    const svg = utils.createSVGElement('svg');

    utils.setAttributes(svg, {
      width: '100%',
      version: '1.1',
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
      viewBox: `0 0 ${pianoWidth} ${pianoHeight}`,
    });

    return svg;
  },

  //----------------------------------------
  //----------------------------------------

  displayNotesBox() {
    const notesDisplay = document.querySelector('.notebox');

    notesDisplay.innerText = ` ${midiNoteShow}`;
    console.log(notesDisplay.innerText);
  },

  /*
  playHowler(noteT){
    function test(){
      
      var pSound = new Howl ({
        src: `['assets/${noteT}.mp3']`
      })
      console.log(pSound)
      

      for (let mp3 of playNotes){
        //console.log(mp)
        if (mp3 === noteT) {
          
          console.log(pSound._src)

          pSound.play
          
        }
      }
    
    }
    test()

    //howler sounds used for keyboard works with line 30
    /*
    if (noteT === "C3") {
      mp.play()
      console.log(noteT)
      
    }
    
  },
  */

  //----------------------------------------
  //----------------------------------------

  displayChordBox() {
    const chordDisplay = document.querySelector('.chordbox');
    chordDisplay.innerText = `${midiNoteShow}`;
    //chords = Tonal.Chord.detect(notes)
    console.log(chordDisplay.innerText);
  },

  //----------------------------------------
  //----------------------------------------

  displayNotesKeyboard(notes) {
    const pianoKeys = document.querySelectorAll('.key');
    utils.removeClassFromNodeCollection(pianoKeys, 'show');

    notes.forEach((noteName) => {
      pianoKeys.forEach((key) => {
        const naturalName = key.dataset.noteName;
        const sharpName = key.dataset.sharpName;
        const flatName = key.dataset.flatName;

        if (
          naturalName === noteName ||
          sharpName === noteName ||
          flatName === noteName
        ) {
          key.classList.add('show');
        }
      });
    });

    //console.log(pianoKeys)
  },

  //----------------------------------------
  //----------------------------------------

  displayChordNotes(notes) {
    const chordDisplay = document.querySelector('.chordbox');
    chords = Tonal.Chord.detect(notes);
    chordDisplay.innerText = `${chords}`;

    console.log(chords);
  },
};

//----------------------------------------
//----------------------------------------
//----------------------------------------
//----------------------------------------



const utils = {
  clearMidiLists() {
    currentMidiList.clear();
    midiNoteShow.clear();
  },

  createSVGElement(el) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', el);
    return element;
  },
  setAttributes(el, attrs) {
    for (let key in attrs) el.setAttribute(key, attrs[key]);
  },

  addTextContent(el, content) {
    el.textContent = content;
  },

  removeClassFromNodeCollection(nodeCollection, classToRemove) {
    nodeCollection.forEach((node) => {
      if (node.classList.contains(classToRemove)) {
        node.classList.remove(classToRemove);
      }
    });
  },
};

/*
function test(){
  for (let mp of playNotes){
    console.log(mp)
  }

}
test()
*/

//----------------------------------------
//----------------------------------------
//----------------------------------------
//----------------------------------------

app.checkMidiAccess();
app.setupPiano();

