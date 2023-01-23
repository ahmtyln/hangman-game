const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const massage_el = document.getElementById("success-massage");
const wrong_letters = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const massage = document.querySelector("#massage");
const playAgainBtn = document.querySelector("#play-again");


let correctLetters = [];
let wrongLetters = [];
let selectedWord = getRandomWord(); 

function getRandomWord(){
    const words = ["javascript", "java","python","askimseyda"]

    return words[Math.floor(Math.random()*words.length)]
}


function displayWord(){
    word_el.innerHTML = `

        ${selectedWord.split("").map(letter => 
            `<div class="letter">
                ${correctLetters.includes(letter) ? letter : "" }
            </div>`
        ).join("")}
    
    `;


    const w = word_el.innerText.replace(/\n/g,"");
    if(w === selectedWord){
        popup.style.display = "flex";
        massage_el.innerHTML = "Congratulations you win"
    }
}

function updateWrongLetters(){
    
    wrong_letters.innerHTML = `
        ${wrongLetters.length>0 ? `<h3>Wrong letters</h3>` : ""}
        ${wrongLetters.map(letter =>
            `
                <span class="wrong-letters">
                    ${wrongLetters.includes(letter) ? letter : "" }
                </span>
            `  
        )}
    
    `;

    items.forEach((item,index) =>{
        const errorCount = wrongLetters.length;

        if(index<errorCount){
            item.style.display = "block";
        }else{
            item.style.display = "none";
        }
    });

    if(wrongLetters.length === items.length){
        popup.style.display = "flex";
        massage_el.innerHTML = "You lose"
    }
}

function displayMassage(){
    massage.classList.add("show");
    setTimeout(function(){
        massage.classList.remove("show");
    },1000)
}


playAgainBtn.addEventListener("click",function(){
    correctLetters = [];
    wrongLetters = [];
    selectedWord = getRandomWord(); 
    displayWord();
    updateWrongLetters();
    popup.style.display = "none";
})

window.addEventListener("keydown",function(e){
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord()
            }else{
                displayMassage();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
                displayMassage();
            }
        }
    }
})

displayWord()