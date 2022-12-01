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

