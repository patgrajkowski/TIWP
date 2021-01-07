const language = localStorage.getItem("language");
const mode = localStorage.getItem("mode");
const question = document.getElementById('question');
const english = ['car', 'woman', 'cat', 'dog', 'train', 'screen', 'word', 'help', 'castle', 'balloon', 'apple', 'clock', 'banana', 'fruit', 'head'];
const polish = ['samochód', 'kobieta', 'kot', 'pies', 'pociąg', 'ekran', 'słowo', 'pomoc', 'zamek', 'balon', 'jabłko', 'zegar', 'banan', 'owoc', 'głowa'];
const nextButton = document.getElementById('next-button');
const endButton = document.getElementById('end-button');
const answer = document.getElementById('answer');
const askedQuestions = [];
let x = 0
const finalScore = [];
let score = 0;
let goodAnswer;
$( "#progressbar" ).progressbar({value: (x/15)*100});
const getRandom = (array) => {
    return Math.floor(Math.random() * (15));
}
const backToMainPage = () =>{
    location.replace('./index.html');
}
const addAnswerToResult = () => {
    if(goodAnswer){
        if(answer.value.toLowerCase().trim() === goodAnswer){
            finalScore.push(`Pytanie ${x}: Poprawnie`)
            score++;
        }else{
            finalScore.push(`Pytanie ${x}: Niepoprawnie - poprawna odpowiedź to: ${goodAnswer}`)
        }
    }
    localStorage.setItem("finalScore", JSON.stringify(finalScore));
    localStorage.setItem('score', score);
}
const goToResultPage = () => {
    addAnswerToResult();
    location.replace('./result.html');

}
const loadQuestion = () => {
    if(mode === 'Ćwiczenia'){
        addAnswerToResult();
        if(askedQuestions.length !== english.length){
            nextButton.innerHTML = 'Dalej';
            let randomWord;
            do{
                randomWord = getRandom();
            }while(askedQuestions.indexOf(randomWord)!==-1)
            x++;
            askedQuestions.push(randomWord);
            let englishWord = english[randomWord];
            let polishWord = polish[randomWord];
            question.innerText = `Słowo ${englishWord} oznacza ${polishWord}`;
            $( "#progressbar" ).progressbar({value: (x/15)*100});

        }
        if(askedQuestions.length === english.length){
            nextButton.innerHTML = 'Wróć';
            nextButton.addEventListener('click', backToMainPage)
        }
    }
    if(mode === 'Test'){
        answer.style.display = "block";
        document.getElementById('answer-label').style.display = 'block';
        if(askedQuestions.length !== english.length){
            nextButton.innerHTML = 'Dalej';
            if(goodAnswer){
                if(answer.value.toLowerCase().trim() === goodAnswer){
                    finalScore.push(`Pytanie ${x}: Poprawnie`)
                }else{
                    finalScore.push(`Pytanie ${x}: Niepoprawnie - poprawna odpowiedź to: ${goodAnswer}`)
                }
            }
            localStorage.setItem("finalScore", finalScore);
            let randomWord;
            do{
                randomWord = getRandom();
            }while(askedQuestions.indexOf(randomWord)!==-1)
            askedQuestions.push(randomWord);
            let englishWord = english[randomWord];
            let polishWord = polish[randomWord];
            if(language === 'Angielski'){
                question.innerText = `Co oznacza słowo ${englishWord}?`;
                goodAnswer = polishWord;
            }else {
                question.innerText = `Jak powiesz po angielsku ${polishWord}?`;
                goodAnswer = englishWord;
            }
            x++;
            $( "#progressbar" ).progressbar({value: (x/15)*100});

        }
        if(askedQuestions.length === english.length){
            nextButton.innerHTML = 'Zakończ test';
            endButton.style.display = 'none';
            nextButton.addEventListener('click', goToResultPage)
        }
    }
}
$(function() {
    $("#dialog").dialog({
      autoOpen : false, modal : true, show : "fade", hide : "fade", buttons: {
        "Zakończ": function() {
          $( this ).dialog( "close" );
          goToResultPage();
        },'Wróć do testu': function() {
            $( this ).dialog( "close" );
          }
        }
    });
    $("#end-button").click(function() {
      $("#dialog").dialog("open");
      return false;
    });
  });
nextButton.addEventListener('click', loadQuestion);
nextButton.addEventListener('click', () => {
    endButton.style.display = 'block';
}, {once : true});

