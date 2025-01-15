
// Création du "corps" de l'HTML
let body = document.querySelector('body');
let h1 = document.createElement('h1');
let titre = document.createTextNode('♡Calculatrice très girly♡');
h1.appendChild(titre);
body.appendChild(h1);

let calculatorContainer = document.createElement('div');
calculatorContainer.classList.add('calculator');
body.appendChild(calculatorContainer); 
// Je crée une div pour contenir la calculatrice aini qu'une class calculator pour travailler avec par la suite


const display = document.createElement('input');
display.setAttribute("placeholder", "♡");
display.setAttribute('type', 'text');
display.setAttribute('id', 'result');
display.setAttribute('readonly', 'readonly'); 
calculatorContainer.append(display);  

// Je crée un display de la calculatrice que je viens contenir dans le calculatorContainer
// l'input aura donc le valeur 0 par défaut , le type texte ,l'id result , 
// le readonly est pour que l'utilisateur ne puisse pas le modifier directement

// Je rajoute des clips audio mp3 pour que mes touches de calculatrices fasse du bruit
const equalSound = new Audio('public/sounds/equalSound.mp3');
const buttonSound = new Audio('public/sounds/buttonSound.mp3') ;
const errorSound = new Audio('public/sounds/errorSound.mp3');
const deleteSound = new Audio('public/sounds/deleteSound.mp3');


const buttons = [
    ['C', '←', '.', '*'],
    ['1', '2', '3', '/'],
    ['4', '5', '6', '-'],
    ['7', '8', '9', '+'],
    ['0', '00', '=', '♡'],
];
// Je stocke mes valeurs pour mes boutons dans un index composé de 5 tableaux qui représente chaque rangée de ma calc
buttons.forEach((row, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row'); 
    // Pour chaque row on rajoute une div avec la classe row 

    row.forEach(buttonValue => {
        const button = document.createElement('button');
        button.textContent = buttonValue; 
        // Création des "boutons" pour la const buttons créée 

        const idMap = {
            "C": "clear",
            "+": "add",
            "-": "subtract",
            "*": "multi",
            "/": "division",
            ".": "dot",
            "=": "equal"
        }; // Map d'ID pour éviter les if/else pour chaque valeur , une map permet de définir des 
       // valeurs claires et permet d'avoir plus de flexibilité dans l'assignation de valeurs 

        button.setAttribute('id', idMap[buttonValue] || buttonValue.toString());
        // L'id sera soit celui du map ci-dessus soit converti en string grâce au to.String()

        // Ajouter l'événement de clic , quand on click sur le bouton il va récuperer la valeur 
        button.onclick = () => ClickBouton(buttonValue);

        // Ajouter le bouton à la ligne
        rowElement.appendChild(button); 
    });

    // Ajouter la ligne au conteneur principal
    calculatorContainer.appendChild(rowElement);
});


// On crée une variable qui va stocker ce qui est affiché sur la calculatrice
let Valuecalc = "";

// Fonction principale pour gérer les clicks sur les boutons
function ClickBouton(valeur) {
    // Si on clique sur =, on calcule le résultat
    if (valeur === '=') {
        calculate();
    }
    // Si on clique sur C, on efface tout
    else if (valeur === 'C') {
        clearall();
    }
    // Si on clique sur la flèche arrière, on efface le dernier caractère
    else if (valeur === '←') {
        deletelast();
    }
    // Pour tous les autres boutons (chiffres et opérateurs)
    else {
        addtodisplay(valeur);
    }
}

// Fonction pour ajouter un nouveau caractère à l'affichage
function addtodisplay(valeur) {
    Valuecalc = Valuecalc + valeur;
    display.value = Valuecalc;
    buttonSound.play();
}  // on calcule la valeur grâce à la variable qu'on stock sur Valuecalc

// Fonction pour effacer tout l'affichage
function clearall() {
    Valuecalc = "";
    display.value = Valuecalc;
    errorSound.play();
    
} 

// Fonction pour calculer le résultat
function calculate() {
    try {
       
        Valuecalc = eval(Valuecalc); // eval sert à calculer et afficher le resultat du display.value
        display.value = Valuecalc;
        equalSound.play();
    } catch (erreur) {
        // Si il y a une erreur, on affiche "Erreur"
        display.value = 'Erreur'; // fonction ajoutée en cas d'erreur
    }
}

// Fonction pour effacer le dernier caractère
function deletelast() {
    if (Valuecalc.length > 0) {
        // On enlève le dernier caractère de la chaîne
        Valuecalc = Valuecalc.slice(0, -1);
        display.value = Valuecalc;
       
        
    }
}  // on utilise la fonction slice pour effacé le dernier élement 



// Gestion du clavier
document.addEventListener('keyup', function(event) {
    const touch = event.key; 
    // on récupère la valeur de la "touch" qu'on a touché grâce au .key 
    //qui à été enclenché juste avant par le 'keyup'
    
    // Si on appuie sur Entrée, c'est comme si on appuyait sur =
    if (touch === 'Enter') {
        ClickBouton('=');
    }
    // Si on appuie sur Backspace, on efface le dernier caractère
    else if (touch === 'Backspace') {
        deletelast();
    }
    // Si on appuie les chiffres et opérateurs cela va récupérerleur valeur (Clickbouton)
    else if ('0123456789+-*/.='.includes(touch)) {
        ClickBouton(touch);
    }
});

    

    