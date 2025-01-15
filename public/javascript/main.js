
// Création du "corps" de l'HTML
let body = document.querySelector('body');
let h1 = document.createElement('h1');
titre = document.createTextNode('Calculatrice');
h1.appendChild(titre);
body.appendChild(h1);

let calculatorContainer = document.createElement('div');
calculatorContainer.classList.add('calculator');
body.appendChild(calculatorContainer); 
// Je crée une div pour contenir la calculatrice aini qu'une class calculator pour travailler avec par la suite


const display = document.createElement('input');
display.setAttribute("placeholder", "0");
display.setAttribute('type', 'text');
display.setAttribute('id', 'result');
display.setAttribute('readonly', 'readonly'); 
calculatorContainer.append(display);  

// Je crée un display de la calculatrice que je viens contenir dans le calculatorContainer
// l'input aura donc le valeur 0 par défaut , le type texte ,l'id result , 
// le readonly est pour que l'utilisateur ne puisse pas le modifier directement


const buttons = [
    ['C', '←', '.', '*'],
    ['1', '2', '3', '/'],
    ['4', '5', '6', '-'],
    ['7', '8', '9', '+'],
    ['0', '00', '='],
];
// Je stocke mes valeurs pour mes boutons dans un index composé de 5 tableaux qui représente chaque rangée de ma calc

buttons.forEach((row, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');  // pour chaque row on rajoute une div avec la classe row 
    row.forEach(buttonValue => {
        const button = document.createElement('button');
        button.textContent = buttonValue;  // création des "boutons" pour la const buttons créée 
    
        
        const idMap = {
            "C": "clear",
            "+": "add",
            "-": "subtract",
            "*": "multi",
            "/": "division",
            ".": "dot",
            "=": "equal"
        }; // Afin de raccourcir mon code j'ai créé un Map d'ID pour ne pas devoir faire de if/else pour chaque valeur 

        button.setAttribute('id', idMap[buttonValue] || buttonValue.toString());
        // pour le button créé l'id sera soit celui retrouvé dans l'index au dessus soit sera transcrit en string pour pouvoir réaliser le calcul
        


        // Ajouter l'événement de clic
        button.onclick = () => handleButtonClick(buttonValue);
    
        // Ajouter le bouton à la ligne
        rowElement.appendChild(button);
    });

    // Ajouter la ligne au conteneur principal
    calculatorContainer.appendChild(rowElement);
}

    

    