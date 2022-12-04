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
                // codice da eseguire se la partita è stata già persa
                if (gameWin) {
                    alert('Hai vinto la partita');
                //codice da esguire se il gioco è ancora in corso
                } else if (!gameOver) {
                    for (i=0 ; i < exceptionsList.length ; i++){
                        let bombElement = document.getElementById(`${exceptionsList[i]}`)
                        bombElement.classList.add('bomb')
                    }
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
                    //codice da esguire se la casella non è ancora stat cliccata
                    if (!element.classList.contains('bgAlternativo')) {
                        punteggio++;
                        element.classList.add('bgAlternativo');
                        element.innerText = '0';
                        console.log(punteggio);

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

for (let i = gameAreaCells - side + 2 ; i < gameAreaCells - 1 ; i++) {
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

//dichiaro array delle celle che circondano angolo alto sinistra e lo popolo
const leftTopCornerProximityArray = [2];
leftTopCornerProximityArray.push(1 + side, 2 + side);

console.log(leftTopCornerProximityArray);

//dichiaro array delle celle che circondano angolo alto destra e lo popolo
const rightTopCornerProximityArray = [];
rightTopCornerProximityArray.push(side - 1, side + side - 1, side + side);

console.log(rightTopCornerProximityArray);

//dichiaro array delle celle che circondano angolo basso destra e lo popolo
const rightBottomCornerProximityArray = [];
rightBottomCornerProximityArray.push(gameAreaCells - side - 1, gameAreaCells - side, gameAreaCells - 1);

console.log(rightBottomCornerProximityArray);

//dichiaro array delle celle che circondano angolo basso sinistra e lo popolo
const leftBottomCornerProximityArray = [];
leftBottomCornerProximityArray.push(gameAreaCells - side + 1, gameAreaCells - side - side + 1, gameAreaCells - side - side);

console.log(leftBottomCornerProximityArray);



// $ liste di array____________________________________________________
//dichiaro array contenente gli arrey dei lati in senso orario da quello alto
let arrayOfSidesArrays = [topSideArray, rightSideArray, bottomSideArray, leftSideArray];


//dichiaro array contenente gli array di prossimità degli angoli in senso orario da alto sinistra
let arrayOfCornersProximityArrays = [leftTopCornerProximityArray, rightTopCornerProximityArray, rightBottomCornerProximityArray, leftBottomCornerProximityArray];

console.log(arrayOfCornersProximityArrays[0].length);
// $___________________________________________________________________

// % ==================================================================
// % ================= Funzioni parte dedicata ========================

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
*/
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


// dichiaro funzione per capire dove mi trovo
function cellLocalizer (cornersArray, clickedCell) {
    if (clickedCell == 1) {

    } else if (clickedCell == sideSize) {

    } else if (clickedCell == totalCells - sideSize + 1) {

    } else if (clickedCell == totalCells) {

    } else if (leftSideArray.includes(clickedCell)) {

    } else if (topSideArray.includes(clickedCell)) {

    } else if (rightSideArray.includes(clickedCell)) {

    } else if (bottomSideArray.includes(clickedCell)) {

    } else if (leftSideArray.includes(clickedCell)) {

    } else {

    }
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

function bombsDetector (relativeProximityArray){
    proximityIndex = 0;
    for (i=0 ; i < relativeProximityArray.length ; i++) {
        if (givenBombsArray.includes(relativeProximityArray[i])) {
            proximityIndex++;
        }
    }
    return proximityIndex;
}

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


