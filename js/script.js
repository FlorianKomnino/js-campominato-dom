console.log('Hello World!');

let gameArea = document.getElementById('gameArea');

//funzione che crea un elemento html
function getElementDiv (contentText, whereWillGo, numberToPrint) {
    let createdElement = document.createElement('div');
    // il testo contenuto all'interno dell'elemento é l'argomento inserito
    createdElement.innerText = contentText;
    // aggiungo classi casella e p-2
    createdElement.classList.add('casella', 'p-2');
    // appendo l'elemento alla variabile gameArea
    whereWillGo.append(createdElement);
    createdElement.addEventListener ('click', function() {
        createdElement.classList.toggle('bgAlternativo');
        console.log(numberToPrint)
    })
    return createdElement;
}

//variabile assegnata all'id del playButton
let playButton = document.getElementById('playButton');

// event listener che permette l'interazione con il playButton
playButton.addEventListener ('click', function() {
    // svuoto l'area prima di iniziare il ciclo che inserisce gli elementi
    gameArea.innerHTML = '';
    // ciclo che esegue la funzione getElementDiv 100 volte, inserendo ogni volta il numero dell'interazione come testo dell'elemento inserito
    for ( let i = 1 ; i < 101 ; i++) {
        getElementDiv(i, gameArea, i);
    }
})

//funzione per generare un numero randomico tra due valori
function randomNumberBetweenLimits (minValue, maxValue) {
    const generatedNumber = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);

    return generatedNumber;
}

let minesArray = [];

const numberOfMines = 16;

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

console.log(singleMinePositionGenerator(minesArray, 1, 15));
console.log(singleMinePositionGenerator(minesArray, 1, 15));
console.log(singleMinePositionGenerator(minesArray, 1, 15));
console.log(singleMinePositionGenerator(minesArray, 1, 15));
console.log(singleMinePositionGenerator(minesArray, 1, 15));
console.log(singleMinePositionGenerator(minesArray, 1, 15));
console.log(minesArray);