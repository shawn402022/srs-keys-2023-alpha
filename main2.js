

const whiteKeyWidth = 80;
const pianoHeight = 400;
const naturalNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const naturalNotesSharps = ['C', 'D', 'F', 'G', 'A'];
const naturalNotesFlats = ['D', 'E', 'G', 'A', 'B'];
const playNotes = [
  'A0','A1','A2','A3','A4','A5','A6','A7','A8',
  'B0','B1','B2','B3','B4','B5','B6','B7','B8',
  'C0','C1','C2','C3','C4','C5','C6','C7','C8',
  'D0','D1','D2','D3','D4','D5','D6','D7','D8',
  'E0','E1','E2','E3','E4','E5','E6','E7','E8',
  'F0','F1','F2','F3','F4','F5','F6','F7','F8',
  'G0','G1','G2','G3','G4','G5','G6','G7','G8',
  
]

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

    function getHowl(){
      var music = new Howl({
        src: ['assets/C3.mp3']
      })
    }
    getHowl()

    function handleInput(input) {
      const command = input.data[0];
      const note = input.data[1];
      const velocity = input.data[2];
      const midiNote = Tonal.Midi.midiToNoteName(note);
      const midiNoteT = Tonal.Midi.midiToNoteName(note)
      //const midiChord =

      switch (command) {
        case 144: // note is on
          if (velocity > 0) {
            noteOn(note, velocity);
            midiNoteShow.push(midiNote.toString());
            console.log(midiNoteShow);
            console.log(midiNoteT)
            //keys light up when pressed
            app.displayNotesKeyboard(midiNoteShow);
            //notes appear in text form inside of dotted border when pressed
            app.displayNotesBox(midiNoteShow);
            app.displayChordNotes(midiNoteShow);
            handleSound(midiNoteT)
            console.log(handleSound)




          } else {
            noteOff(note);
            midiNoteShow.length = 0;
            console.log(midiNoteShow);
            app.displayNotesKeyboard(midiNoteShow);
            app.displayNotesBox(midiNoteShow);
            app.displayChordNotes(midiNoteShow);
          }
          break;
        case 128:
          noteOff(note);
          midiNoteShow.length = 0;
          console.log(midiNoteShow);
          app.displayNotesKeyboard(midiNoteShow);
          app.displayNotesBox(midiNoteShow);
          app.displayChordNotes(midiNoteShow);
          break;
      }

      
    }

    {
      var music = new Howl({
        src: ['assets/C3.mp3']
      }) 
      console.log(music)



    }



    function handleSound(noteT){
      for(let mp3 of playNotes){
        if(mp3 === noteT) {
          music._src = `assets/${noteT}.mp3`
          console.log(music._src)
          console.log(music)
          music.play()
          //pSrc = `"assets/${noteT}.mp3"`
        }
      }
      /*
      console.log(pSrc)

      if (noteT === "C3") {
        music.play()
        console.log(music)
        
      }
      return pSrc
      */
    }

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






