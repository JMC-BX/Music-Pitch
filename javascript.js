
const choices = document.querySelector('.choices'); //all button choices

//each scale button node
const cMajorScale = document.getElementById('Cmaj');
const cSharpMajorScale = document.getElementById('Csharp');
const dMajorScale = document.getElementById('Dmaj');
const dSharpMajorScale = document.getElementById('Dsharp');
const eMajorScale = document.getElementById('Emaj');
const fMajorScale = document.getElementById('Fmaj');
const fSharpMajorScale = document.getElementById('Fsharp');
const gMajorScale = document.getElementById('Gmaj');
const gSharpMajorScale = document.getElementById('Gsharp');
const aMajorScale = document.getElementById('Amaj');
const aSharpMajorScale = document.getElementById('Asharp');
const bMajorScale = document.getElementById('Bmaj');


//all the audio files in variables
const c1 = new Audio("c1.mp3");
const cSharp1 = new Audio('Csharp1.mp3');
const d1 = new Audio('d1.mp3');
const dSharp1 = new Audio('dsharp1.mp3');
const e1 = new Audio('e1.mp3');
const f1 = new Audio('f1.mp3');
const fSharp1 = new Audio('fsharp1.mp3');
const g1 = new Audio('g1.mp3');
const gSharp1 = new Audio('gsharp1.mp3');
const a1 = new Audio('a1.mp3');
const aSharp1 = new Audio('asharp1.mp3');
const b1 = new Audio("b1.mp3");
const c2 = new Audio("c2.mp3");
const cSharp2 = new Audio('csharp2.mp3');
const d2 = new Audio('d2.mp3');
const dSharp2 = new Audio('dsharp2.mp3');
const e2 = new Audio('e2.mp3');
const f2 = new Audio('f2.mp3');
const fSharp2 = new Audio('fsharp2.mp3');
const g2 = new Audio('g2.mp3');
const gSharp2 = new Audio('gsharp2.mp3');
const a2 = new Audio('a2.mp3');
const aSharp2 = new Audio('sharp2.mp3');
const b2 = new Audio("b2.mp3");

//structure of note names and its audio file
const theNotes = {
    notes: ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B", "C2", "C#/Db 2", "D2", "D#/Eb 2", "E2", "F2", "F#/Gb 2", "G2", "G#/Ab 2", "A2", "A#/Bb 2", "B2"],
    notesAudio: [c1, cSharp1, d1, dSharp1, e1, f1, fSharp1, g1, gSharp1, a1, aSharp1, b1, c2, cSharp2, d2, dSharp2, e2, f2, fSharp2, g2, gSharp2, a2, aSharp2, b2]
};

//sets random note that will constantly change when playReplayReset() or reset() is called
// let newScale = [];
let randomNote = undefined;
let score = 0;
let total = 0;

let newScale = [];


const majorScale = (scale) => {
    //when a new scale is clicked, checks for previous displayed scale elements and removes it
    if (choices.childElementCount > 0) {
        for (let i = 0; i <= 10; i++){
        choices.firstElementChild.remove();
        randomNote = undefined;
    }
        
        score = 0;
        total = 0;
}
    //declares a scale array and pushes 8 major scale notes audio files into the new array, based off index of scale and major scale formula "W-W-H-W-W-W-H"
    newScale = [];
    const indexScale = theNotes.notesAudio.indexOf(scale);
    newScale.push(scale);
    newScale.push(theNotes.notesAudio[indexScale + 2]);
    newScale.push(theNotes.notesAudio[indexScale + 4]);
    newScale.push(theNotes.notesAudio[indexScale + 5]);
    newScale.push(theNotes.notesAudio[indexScale + 7]);
    newScale.push(theNotes.notesAudio[indexScale + 9]);
    newScale.push(theNotes.notesAudio[indexScale + 11]);
    newScale.push(theNotes.notesAudio[indexScale + 12]);

    //cycles through newly created newScale array and adds an HTML button along with its class ~btn-button.~ Then adds inner text to that button based off the index of the audio file.
    newScale.forEach( (note) => {
        const newButton = document.createElement('button');
        newButton.classList.add("btn-primary");
        newButton.innerText = theNotes.notes[theNotes.notesAudio.indexOf(note)];
        choices.append(newButton);
        
        //add function to button by playing its corresponding audio track when clicked.
        newButton.addEventListener('click', () => {
            note.play();
            //if note is incorrect it changes the button background from blue to red
            if (randomNote != undefined && note != newScale[randomNote])
            {
                newButton.classList.replace("btn-primary", "btn-danger");
                choices.lastChild.innerText = `${score}/${++total}`;
            }
           else if (note === newScale[randomNote]){
               reset();
               choices.lastChild.innerText = `${++score}/${++total}`;
           }
        });
    });
    playReplayReset();
}

const playReplayReset = () => { 
    //creates play and reset buttons, and appends it to choices.  additionally gives them inner text and event listeners
    const playReplayButton = document.createElement('button');
    const resetButton = document.createElement('button'); 
    const scoreKeeper = document.createElement('h2');
    playReplayButton.innerText = "Play/Replay"
    resetButton.innerText = "Reset"
    scoreKeeper.innerText = `${score}/${total}`;
    playReplayButton.classList.add("btn-primary", "playReset");
    resetButton.classList.add("btn-primary", "playReset");
    choices.append(playReplayButton, resetButton, scoreKeeper);

    //when play button if clicked, checks if note if randomNote is defined.  If not, it is given a random number based from the notes of scale
    playReplayButton.addEventListener("click", () => {
        
        if (randomNote === undefined)
            randomNote = Math.floor(Math.random() * 8); //assigns random note a number when clicked for first time

        newScale[randomNote].play();
        newScale[randomNote].currentTime = 0; //setting current time to 0 allows for instant repeat plays
    })

    resetButton.addEventListener("click", () => {
        randomNote = undefined;
        reset(false);
        score = 0; 
        total = 0; 
        choices.lastChild.innerText = `${score}/${total}`; 

    })
}

const reset = (resetNote = true) => 
{
    const buttonReset = document.querySelectorAll('.choices button');
    buttonReset.forEach((choice) => 
    {
        choice.classList.replace("btn-danger", "btn-primary");
    })
    if (resetNote === true)
    {
        newScale[randomNote].pause();
        randomNote = Math.floor(Math.random() * 8);
        newScale[randomNote].play();
    }

}



cMajorScale.addEventListener('click', majorScale.bind(this, c1));
cSharpMajorScale.addEventListener('click', majorScale.bind(this, cSharp1));
dMajorScale.addEventListener('click', majorScale.bind(this, d1));
dSharpMajorScale.addEventListener('click', majorScale.bind(this, dSharp1));
eMajorScale.addEventListener('click', majorScale.bind(this, e1));
fMajorScale.addEventListener('click', majorScale.bind(this, f1));
fSharpMajorScale.addEventListener('click', majorScale.bind(this, fSharp1));
gMajorScale.addEventListener('click', majorScale.bind(this, g1));
gSharpMajorScale.addEventListener('click', majorScale.bind(this, gSharp1)); 
aMajorScale.addEventListener('click', majorScale.bind(this, a1));
aSharpMajorScale.addEventListener('click', majorScale.bind(this, aSharp1));
bMajorScale.addEventListener('click', majorScale.bind(this, b1)); 

