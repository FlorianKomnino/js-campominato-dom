console.log('Hello World!');


//^===============================================================================
//^================================  FUNZIONI  ===================================
//^===============================================================================

//^_______________________________________________________________________________
//funzione per generare un numero randomico tra due valori
function randomNumberBetweenLimits (minValue, maxValue) {
    const generatedNumber = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);

    return generatedNumber;
}

//^_______________________________________________________________________________
//crea una mina restituendo un numero randomico che ne determina la posizione, assicurandosi di non ripetere mai la posizione
function singleMinePositionGenerator (generatedUniqueNumbersList, minSquareNumber, maxSquareNumber) {
    let isValid = false;
    let randomUniqueNumber;

    while (isValid === false) {
        randomUniqueNumber = randomNumberBetweenLimits(minSquareNumber, maxSquareNumber);

        if (!generatedUniqueNumbersList.includes(randomUniqueNumber)) {
            generatedUniqueNumbersList.push(randomUniqueNumber);
            isValid = true;
        }
    }
    return randomUniqueNumber;
}
//^_______________________________________________________________________________
//funzione che crea un elemento html
function getElementDiv (contentText, whereWillGo, idArray, cellsPerRow) {
    let createdElement = document.createElement('div');
    // il testo contenuto all'interno dell'elemento é l'argomento inserito
    createdElement.innerText = contentText;
    // aggiungo classi casella e p-2
    createdElement.classList.add('casella', 'p-2');
    createdElement.style.width = `calc(100% / ${cellsPerRow})`
    createdElement.style.height = `calc(100% / ${cellsPerRow})`
    // appendo l'elemento alla variabile gameArea
    whereWillGo.append(createdElement);
    
    //aggiungo id all'elemento
    createdElement.id = contentText

    //aggiungo l'id dell'elemento a una lista
    idArray.push(createdElement.id)

    return createdElement;
}
//^_______________________________________________________________________________
//funzione che aggiunge un addEventListener ad un div con relativo id
    //eventListener sulla casella creata
    function cellsInteraction (exceptionsList, element) {
        //codice da esguire se l'elemento inserito nella funzione è una mina
        if (exceptionsList.includes(parseInt(element.innerText))) {
            element.addEventListener ('click', function () {
                // codice da eseguire se la partita è stata vinta
                if (gameWin) {
                    alert('Hai vinto la partita');
                //codice da esguire se il gioco è ancora in corso
                } else if (!gameOver) {
                    //codice da eseguire se la cella non è una mina
                    for (i=0 ; i < exceptionsList.length ; i++){
                        let bombElement = document.getElementById(`${exceptionsList[i]}`)
                        bombElement.classList.add('bomb')
                    }
                    //codice da eseguire se la cella è una mina
                    alert('Acciderbolina! Hai perso!!!!');
                    gameOver = true;
                }
            });
        } else {
        //codice da esguire se l'elemento inserito NON è una mina
            element.addEventListener ('click', function () {
                // codice da eseguire se la partita è stata già persa
                if (gameWin) {
                    alert('Hai vinto la partita');
                //codice da esguire se il gioco è ancora in corso
                } else if (!gameOver) {
                    //codice da esguire se la casella non è ancora stata cliccata
                    if (!element.classList.contains('bgAlternativo')) {
                        punteggio++;
                        element.classList.add('bgAlternativo');
                        element.innerText = `${getElementColored(element, exceptionsList)}`;
                        if (punteggio == gameAreaCells - numberOfMines) {
                            gameWin = true;
                        }
                        
                        if (gameWin === true) {
                            alert('Hai vinto la partita');
                        }
                    //else if sottointeso, se la casella è già stata cliccata non fare nulla
                    }

                } else {
                    console.log('Inizia un\'altra partita premendo il tasto play');
                }
            })
        }
    }

//^_______________________________________________________________________________
//funzione per produrre il numero di mine nelle 8 caselle circostanti

//^===============================================================================
//^==============================  FINE FUNZIONI  ================================
//^===============================================================================

let gameArea = document.getElementById('gameArea');

//variabile assegnata all'id del playButton
let playButton = document.getElementById('playButton');

//creo arrey con i numeri a fare da riferimento agli id
const idNamesList = [];

//creazione array vuoto per la creazione delle mine
let minesArray = [];

//creazione variabile : quantitá di mine richiesta
const numberOfMines = 16;

//creazione variabile : quantitá di celle richiesta
let gameAreaCells = 100;

//creo variabili di gioco
let gameOver = false;
let punteggio = 0;
let gameWin = false;

// % ==================================================================
// % Sezione dedicata a inserire il numero di bombe nelle caselle vicine
// % ==================================================================

let side = Math.sqrt(gameAreaCells);
console.log(side);


/*
//dichiaro array degli angoli e lo popolo da in alto a sinistra in senso orario
const cornersCells = [1];

cornersCells.push(side);
cornersCells.push(gameAreaCells);
cornersCells.push(gameAreaCells - side + 1);

//dichiaro array del lato in alto e lo popolo
let topSideArray = [];

for (let i = 2 ; i < side ; i++) {
    topSideArray.push(i)
}

//dichiaro array del lato destro e lo popolo
let rightSideArray = [];

for (let i = side * 2 ; i < gameAreaCells ; i = i + side) {
    rightSideArray.push(i)
}

//dichiaro array del lato in basso e lo popolo
let bottomSideArray = [];

for (let i = gameAreaCells - side + 2 ; i < gameAreaCells ; i++) {
    bottomSideArray.push(i)
}

//dichiaro array del lato sinistro e lo popolo
let leftSideArray = [];

for (let i = side + 1 ; i < gameAreaCells - side ; i = i + side) {
    leftSideArray.push(i)
}

//dichiaro array di tutte le celle restanti e lo popolo
let centralCellsArray = [];

for ( i=1 ; i < gameAreaCells ; i++) {
    if (!cornersCells.includes(i) && !topSideArray.includes(i) && !leftSideArray.includes(i) && !rightSideArray.includes(i) && !bottomSideArray.includes(i)) {
        centralCellsArray.push(i);
    }
}

//stampa in console per effettuare check
console.log(cornersCells);
console.log(topSideArray);
console.log(leftSideArray);
console.log(rightSideArray);
console.log(bottomSideArray);
console.log(centralCellsArray);

//dichiaro variabile di prossimità
let proximityIndex = 0;

//funzione per agoli

//dichiaro proximityArray delle celle che circondano angolo alto sinistra e lo popolo
const topLeftCornerProximityArray = [2];
topLeftCornerProximityArray.push(1 + side, 2 + side);

console.log(topLeftCornerProximityArray);

//dichiaro proximityArray delle celle che circondano angolo alto destra e lo popolo
const topRightCornerProximityArray = [];
topRightCornerProximityArray.push(side - 1, side + side - 1, side + side);

console.log(topRightCornerProximityArray);

//dichiaro proximityArray delle celle che circondano angolo basso destra e lo popolo
const bottomRightCornerProximityArray = [];
bottomRightCornerProximityArray.push(gameAreaCells - side - 1, gameAreaCells - side, gameAreaCells - 1);

console.log(bottomRightCornerProximityArray);

//dichiaro proximityArray delle celle che circondano angolo basso sinistra e lo popolo
const bottomLeftCornerProximityArray = [];
bottomLeftCornerProximityArray.push(gameAreaCells - side + 1, gameAreaCells - side - side + 1, gameAreaCells - side - side);

console.log(bottomLeftCornerProximityArray);

//dichiaro proximityArray delle celle del lato alto, in ordine di creazione delle celle prossimali e lo popolo
const topSideProximityArray = [];
topSideProximityArray.push(-1, 1, side - 1, side, side + 1);

console.log(topSideProximityArray);

//dichiaro proximityArray delle celle del lato destro, in ordine di creazione delle celle prossimali e lo popolo
const rightSideProximityArray = [];
rightSideProximityArray.push(- side - 1,- side, - 1, side - 1, side);

console.log(rightSideProximityArray);

//dichiaro proximityArray delle celle del lato basso, in ordine di creazione delle celle prossimali e lo popolo
const bottomSideProximityArray = [];
bottomSideProximityArray.push(- side - 1,- side, - side + 1, - 1, 1);

console.log(bottomSideProximityArray);

//dichiaro proximityArray delle celle del lato sinistro, in ordine di creazione delle prossimali celle e lo popolo
const leftSideProximityArray = [];
leftSideProximityArray.push(- side,- side + 1, + 1, side, side + 1);

console.log(leftSideProximityArray);

//dichiaro proximityArray di tutte le restanti celle, in ordine di creazione delle celle prossimali e lo popolo
const innerCellsProximityArray = [];
innerCellsProximityArray.push(- side - 1, - side, - side + 1, - 1, + 1, side - 1, side, side + 1);

console.log(innerCellsProximityArray);



// $ liste di array____________________________________________________
//dichiaro array contenente gli arrey dei lati in senso orario da quello alto
let arrayOfSidesArrays = [topSideArray, rightSideArray, bottomSideArray, leftSideArray];


//dichiaro array contenente gli array di prossimità degli angoli in senso orario da alto sinistra
let arrayOfCornersProximityArrays = [topLeftCornerProximityArray, topRightCornerProximityArray, bottomRightCornerProximityArray, bottomLeftCornerProximityArray];

console.log(arrayOfCornersProximityArrays[0].length);
// $___________________________________________________________________
*/
// % ==================================================================
// % ================= Funzioni parte dedicata ========================

const proximityArrayGeneral = [-11, -10, -9, -1, 1, 9, 10, 11];
const proximityArrayLeft = [-10, -9, 1, 10, 11];
const proximityArrayRight = [-11, -10, -1, 9, 10];

function getElementColored(checkedElement, bombList){
    checkedElement.addEventListener('click', function(){
        let base = 0;

        const lastDigit = String(checkedElement.innerText).slice(-1);

        if (parseInt(lastDigit) != 1 & parseInt(lastDigit) != 0){
            checkedElement.append('');
            for (i=0; i<proximityArrayGeneral.length; i++){
                if (bombList.includes(checkedElement.innerText + proximityArrayGeneral[i])){
                    base += 1;
                    console.log(proximityArrayGeneral[i]);
                } else {
                    console.log('tranquillo');
                }
            }
            checkedElement.innerHTML = base;
            checkedElement.classList.add('right-square');

        } else if (lastDigit == 1){
            checkedElement.append('');
            for (i=0; i<proximityArrayLeft.length; i++){
                if (bombList.includes(d + proximityArrayLeft[i])){
                    base += 1;
                    console.log(proximityArrayLeft[i]);
                } else {
                    console.log('tranquillo');
                }
            }
            checkedElement.innerHTML = base;
            checkedElement.classList.add('bgAlternativo');
        } else if (lastDigit == 0){
            checkedElement.append('');
            for (i=0; i<proximityArrayRight.length; i++){
                if (bombList.includes(checkedElement.innerText + proximityArrayRight[i])){
                    base += 1;
                    console.log(proximityArrayRight[i]);
                } else {
                    console.log('tranquillo');
                }
            }
            checkedElement.innerHTML = base;
            checkedElement.classList.add(`bgAlternativo`);
        }
    })
}

// &______________

/*
questa funzione non serve più perché questo check viene fatto durante le condizioni di cellLocalizer()
//dichiaro funzione per scegliere l'angolo giusto quando sono in un angolo
function cornerDetector (categoryArray, clickedCell) {
    //eseguo un ciclo for per controllare in quale angolo mi trovo
    for ( i=0 ; i<categoryArray.length ; i++) {
        if (categoryArray[i] == clickedCell) {
            return i;
        }
    }
}

console.log(cornerDetector(cornersCells, 10));
//dichiaro funzione per scegliere il lato giusto quando sono in un lato
function sideDetector (categoryArray, clickedCell) {
    //eseguo un ciclo for per controllare in quale lato mi trovo
    for ( i=0 ; i<categoryArray.length ; i++) {
        if (categoryArray[i].includes(clickedCell)) {
            return i;
        }
    }
}

console.log(sideDetector(arrayOfSidesArrays, 81));
*/
//&________________________________________
/*
// dichiaro funzione per capire dove mi trovo con all'interno le funzioni di rilevamento diprossimità
function cellLocalizer (
    //lista degli argomenti
    clickedCell, 
    sideSize, 
    totalCells, 
    givenBombsArray, 

    proximityIndexVariable,

    customTopLeftCornerProximityArray,
    customTopRightCornerProximityArray,
    customBottomRightCornerProximityArray,
    customBottomLeftCornerProximityArray,

    customTopSideArray, 
    customRightSideArray, 
    customBottomSideArray, 
    customLeftSideArray,
    
    customTopProximityArray,
    customRightProximityArray,
    customBottomProximityArray,
    customLeftProximityArray,
    customInnerCellsProximityArray) {

    if (clickedCell == 1) {
        bombsDetector (proximityIndexVariable, customTopLeftCornerProximityArray, givenBombsArray)
        console.log(customTopLeftCornerProximityArray);
        console.log(proximityIndexVariable);
    } else if (clickedCell == sideSize) {
        bombsDetector (proximityIndexVariable, customTopRightCornerProximityArray, givenBombsArray)
        console.log(customTopRightCornerProximityArray);
        console.log(proximityIndexVariable);
    } else if (clickedCell == totalCells - sideSize + 1) {
        bombsDetector (proximityIndexVariable, customBottomLeftCornerProximityArray, givenBombsArray)
        console.log(customBottomRightCornerProximityArray);
        console.log(proximityIndexVariable);
    } else if (clickedCell == totalCells) {
        bombsDetector (proximityIndexVariable, customBottomRightCornerProximityArray, givenBombsArray)
        console.log(customBottomLeftCornerProximityArray);
        console.log(proximityIndexVariable);
    } else if (customTopSideArray.includes(clickedCell)) {
        bombsDetector (proximityIndexVariable, customTopProximityArray, givenBombsArray)
        console.log(customTopProximityArray);
        console.log(proximityIndexVariable);
    } else if (customRightSideArray.includes(clickedCell)) {
        bombsDetector (proximityIndexVariable, customRightProximityArray, givenBombsArray)
        console.log(customRightProximityArray);
        console.log(proximityIndexVariable);
    } else if (customBottomSideArray.includes(clickedCell)) {
        bombsDetector (proximityIndexVariable, customBottomProximityArray, givenBombsArray)
        console.log(customBottomProximityArray);
        console.log(proximityIndexVariable);
    } else if (customLeftSideArray.includes(clickedCell)) {
        bombsDetector (proximityIndexVariable, customLeftProximityArray, givenBombsArray)
        console.log(customLeftProximityArray);
        console.log(proximityIndexVariable);
    } else {
        bombsDetector (proximityIndexVariable, customInnerCellsProximityArray, givenBombsArray)
        console.log(customInnerCellsProximityArray);
        console.log(proximityIndexVariable);
    }
    console.log(proximityIndexVariable)
    return proximityIndexVariable;
}





/*
function cornerDetector (categoryArray,) {

    for ( i=0 ; i<categoryArray.length ; i++) {


        // condizione per decidere a quale array di prossimità andare ad accedere
        if (cornerValue = categoryArray[i]) {
            bombsDetector (relativeProximityArray)
        }
    }
}        
*/
/*
function bombsDetector (proximityIndexVariable, relativeProximityArray, givenBombsArray){
    proximityIndexVariable = 0;
    for (i=0 ; i < relativeProximityArray.length ; i++) {
        if (givenBombsArray.includes(relativeProximityArray[i])) {
            proximityIndexVariable++;
        }
    }
    return proximityIndexVariable;
}
*/
// % ==================================================================
// % =================Fine Sezione dedicata============================
// % ==================================================================


// event listener che permette l'interazione con il playButton
playButton.addEventListener ('click', function() {
    // svuoto l'area prima di iniziare il ciclo che inserisce gli elementi
    gameArea.innerHTML = '';
    // setto variabili su false per far interagire gli event listener
    gameOver = false;
    gameWin = false;
    // azzero il punteggio
    punteggio = 0;

    // ciclo che esegue la funzione getElementDiv 100 volte, inserendo ogni volta il numero dell'interazione come testo dell'elemento inserito
    minesArray = [];

    for ( let i = 0 ; i < numberOfMines ; i++) {
        singleMinePositionGenerator(minesArray, 1, gameAreaCells)
    }
    console.log(minesArray)
    
    for ( let i = 1 ; i < gameAreaCells + 1 ; i++) {
    getElementDiv(i, gameArea, idNamesList, side);
    }

    for ( let i = 1 ; i < gameAreaCells + 1 ; i++) {
        let elementId = document.getElementById(i);
        cellsInteraction(minesArray, elementId)
    }
})


