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
function getElementDiv (contentText, whereWillGo, idArray) {
    let createdElement = document.createElement('div');
    // il testo contenuto all'interno dell'elemento é l'argomento inserito
    createdElement.innerText = contentText;
    // aggiungo classi casella e p-2
    createdElement.classList.add('casella', 'p-2');
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









// event listener che permette l'interazione con il playButton
playButton.addEventListener ('click', function() {
    // svuoto l'area prima di iniziare il ciclo che inserisce gli elementi
    gameArea.innerHTML = '';
    // setto variabili su false per far interagire gli event listener
    gameOver = false;
    gameWin = false;
    // azzero il punteggio
    punteggio = 0;

    console.log(gameOver, gameWin, punteggio);
    // ciclo che esegue la funzione getElementDiv 100 volte, inserendo ogni volta il numero dell'interazione come testo dell'elemento inserito
    minesArray = [];

    for ( let i = 0 ; i < numberOfMines ; i++) {
        singleMinePositionGenerator(minesArray, 1, gameAreaCells)
    }
    console.log(minesArray)
    
    for ( let i = 1 ; i < gameAreaCells + 1 ; i++) {
    getElementDiv(i, gameArea, idNamesList);
    }

    for ( let i = 1 ; i < gameAreaCells + 1 ; i++) {
        let elementId = document.getElementById(i);
        cellsInteraction(minesArray, elementId)
    }
})


