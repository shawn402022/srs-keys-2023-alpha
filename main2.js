//function removeSVG(){
// const body = document.querySelector('body')
//const piano = document.querySelector('svg')
//body.removeChild(piano)
//}

//removeSVG()


const whiteKeyWidth = 80;
const pianoHeight = 400;
const naturalNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const naturalNotesSharps = ['C','D','F','G','A']
const naturalNotesFlats = ['D','E','G','A','B']
const range = ['C2', 'C7'];



const piano = document.querySelector('#piano');

const app = {
  setupPiano() {
    const allNaturalNotes = this.getAllNaturalNotes(range);
    const pianoWidth = allNaturalNotes.length * whiteKeyWidth;

    const SVG = this.createMainSVG(pianoWidth, pianoHeight)
    // add main SVG to paino div
    piano.appendChild(SVG)
    

    // add white Keys
    let whiteKeyPositionX = 0;
    for(let i = 0; i < allNaturalNotes.length; i++) {
      const whiteKey = this.createKey({ className: "white-key", width: whiteKeyWidth, height: pianoHeight});
      whiteKey.setAttribute("x", whiteKeyPositionX);
        whiteKey.setAttribute('data-note-name', allNaturalNotes[i])
      whiteKeyPositionX += whiteKeyWidth;
      SVG.appendChild(whiteKey)
    }

    //add black keys
    let blackKeyPositionX = 60;
    allNaturalNotes.forEach((naturalNote, index, array) => {
      const blackKeY = this.createKey( {className: 'black-key', width: whiteKeyWidth /2, height: pianoHeight /1.6})
      blackKeY.setAttribute('x', blackKeyPositionX);

      for(let i = 0; i < naturalNotesSharps.length; i++) {
        let naturalSharpNoteName = naturalNotesSharps[i];
        let naturalFlatNoteName = naturalNotesFlats[i];
        if (naturalSharpNoteName === naturalNote[0]) {
          blackKeY.setAttribute('data-sharp-name', `${naturalSharpNoteName}# ${ naturalNote[1]}`);
          blackKeY.setAttribute('data-flat-name', `${naturalFlatNoteName}b ${ naturalNote[1]}`);
          // add double spacing between D# and A#
          if(naturalSharpNoteName === "D" || naturalSharpNoteName === "A") {
            blackKeyPositionX += whiteKeyWidth * 2;
          } else {
            blackKeyPositionX += whiteKeyWidth;
          }
          // if last iteration of keys, do not add black key
          if(index !== array.length - 1) {
            SVG.appendChild(blackKeY)
          }
          
        }

      }

    })

 
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
        naturalNotes
          .slice(firstNotePosition)
          .forEach((noteName) => {
            allNaturalNotes.push(noteName + octaveNumber); 
          });
        
        
        // handle last octave
      } else if (octaveNumber === lastOctaveNumber) {
        naturalNotes
          .slice(0, lastNotePosition + 1)
          .forEach((noteName) => {
            allNaturalNotes.push(noteName + octaveNumber);
          });
        
        console.log(allNaturalNotes);
      } else {
        naturalNotes.forEach((noteName) => {
          allNaturalNotes.push(noteName + octaveNumber)

        });
      }
    }
    return allNaturalNotes;
    console.log(allNaturalNotes);
  },

  createMainSVG(pianoWidth, pianoHeight) {
    const svg = utils.createSVGElement("svg");

    svg.setAttribute("width", "100%");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute("viewBox", `0 0 ${pianoWidth} ${pianoHeight}`);

    return svg;

  }
};

const utils = {
  createSVGElement(el) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', el);
    return element;
  },
};

app.setupPiano();
app.getAllNaturalNotes(range);
