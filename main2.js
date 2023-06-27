//function removeSVG(){
// const body = document.querySelector('body')
//const piano = document.querySelector('svg')
//body.removeChild(piano)
//}

//removeSVG()



let numberOfOctaves = 6;
const octaveWidth = 560;
const naturalNotes = ['C','D','E','F','G','A','B'];
const range = ['F3','A7']

const SVG = `<svg width="100%" 
    viewBox="0 0 ${numberOfOctaves * octaveWidth} 400" 
    version="1.1" xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    > 
    <g id="piano-keyboard"> 
    </g> 
</svg>`;

const piano = document.querySelector('#piano');

const app = {
  setupPiano() {
    // add main SVG to paino div
    piano.innerHTML = SVG;
    const pianoKeyboard = document.querySelector('#piano-keyboard');

    // Create octaves
    for (let i = 0; i < numberOfOctaves; i++) {
      const octave = this.createOctave(i);

      let whiteKeyXPosition = 0;
      let blackKeyXPosition = 60;

      // Add white keys to octave
      for (let i = 0; i < 7; i++) {
        const whiteKey = this.createKey({
          className: 'white-key',
          width: 80,
          height: 400,
        });
        whiteKey.setAttribute('x', whiteKeyXPosition);
        whiteKeyXPosition += 80;
        octave.appendChild(whiteKey);
      }

      // add black keys to octave
      for (let i = 0; i < 5; i++) {
        const blackKey = this.createKey({
          className: 'black-key',
          width: 40,
          height: 250,
        });
        blackKey.setAttribute('x', blackKeyXPosition);

        if (i === 1) {
          blackKeyXPosition += 160;
        } else {
          blackKeyXPosition += 80;
        }
        octave.appendChild(blackKey);
      }

      pianoKeyboard.appendChild(octave);
    }
  },
  createOctave(octaveNumber) {
    const octave = utils.createSVGElement('g');
    octave.classList.add('octave');
    octave.setAttribute(
      'transform',
      `translate(${octaveNumber * octaveWidth}, 0)`
    );
    return octave;
  },

  createKey({ className, width, height }) {
    const key = utils.createSVGElement('rect');
    key.classList.add(className);
    key.setAttribute('width', width);
    key.setAttribute('height', height);
    return key;
  },

  getAllNaturalNotes([firstNote, lastNote]) {
    //assign octave number, notes and positions to variables
    const firstNoteName = firstNote[0];
    const firstOctaveNumber = parseInt(firstNote[1]);
    
    const lastNoteName = lastNote[0];
    const lastOctaveNumber = parseInt(lastNote[1]);

    const firstNotePosition = naturalNotes.indexOf(firstNoteName)
    const lastNotePosition = naturalNotes.indexOf(lastNoteName)

    const allNaturalNotes = []
    for (let octaveNumber = firstOctaveNumber; octaveNumber <= lastOctaveNumber; octaveNumber ++) {
        // handle first octave
        if(octaveNumber === firstOctaveNumber) {
          const firstOctave = naturalNotes.slice(firstNotePosition).map((noteName) => {
            return noteName + octaveNumber;
          });
          allNaturalNotes.push(firstOctave)
        // handle last octave
        } else if (octaveNumber === lastOctaveNumber) {
          const lastOctave = naturalNotes.slice(0,lastNotePosition + 1).map((noteName) => {
            return noteName + octaveNumber
          });
          allNaturalNotes.push(lastOctave);
          console.log(allNaturalNotes)

        }else{
          allNaturalNotes.push(naturalNotes.map((noteName) => {
            return noteName + octaveNumber
          }))
        }
    }
    return allNaturalNotes
    console.log(allNaturalNotes)
  }
};

const utils = {
  createSVGElement(el) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', el);
    return element;
  },
};

app.setupPiano();
app.getAllNaturalNotes(range)


