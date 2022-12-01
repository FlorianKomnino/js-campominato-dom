console.log('Hello World!');


//^===============================================================================
//^================================  FUNZIONI  ===================================
//^===============================================================================

//^_______________________________________________________________________________
//funzione che crea un elemento html
function getElementDiv (contentText, whereWillGo, numberToPrint, exceptionsList) {
    let createdElement = document.createElement('div');
    // il testo contenuto all'interno dell'elemento é l'argomento inserito
    createdElement.innerText = contentText;
    // aggiungo classi casella e p-2
    createdElement.classList.add('casella', 'p-2');
    // appendo l'elemento alla variabile gameArea
    whereWillGo.append(createdElement);
    
    createdElement.id = contentText

    //eventListener sulla casella creata
    if (exceptionsList.includes(parseInt(createdElement.innerText))) {
            createdElement.addEventListener ('click', function() {
                alert('Acciderbolina! Hai perso!!!!');
                console.log(numberToPrint);
            });
        } else {
            createdElement.addEventListener ('click', function() {
            createdElement.classList.add('bgAlternativo');

        })
    }
    return createdElement;
}
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

//^===============================================================================
//^==============================  FINE FUNZIONI  ================================
//^===============================================================================

let gameArea = document.getElementById('gameArea');

//variabile assegnata all'id del playButton
let playButton = document.getElementById('playButton');

//creazione array vuoto per la creazione delle mine
let minesArray = [];

//creazione variabile : quantitá di mine richiesta
const numberOfMines = 16;

//creazione variabile : quantitá di celle richiesta
let gameAreaCells = 100;

// event listener che permette l'interazione con il playButton
playButton.addEventListener ('click', function() {
    // svuoto l'area prima di iniziare il ciclo che inserisce gli elementi
    gameArea.innerHTML = '';
    // ciclo che esegue la funzione getElementDiv 100 volte, inserendo ogni volta il numero dell'interazione come testo dell'elemento inserito
    minesArray = [];

    for ( let i = 0 ; i < numberOfMines ; i++) {
        singleMinePositionGenerator(minesArray, 1, gameAreaCells)
    }

    console.log(minesArray)
    
    for ( let i = 1 ; i < gameAreaCells + 1 ; i++) {
        getElementDiv(i, gameArea, i, minesArray);
    }

})