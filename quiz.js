const startButton = document.getElementById('play');
const nextButton = document.getElementById('next-btn')
const exitButton = document.getElementById('exit-btn')
const restartButton = document.getElementById('restart-btn')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer')
const startElement = document.getElementById('start-page')
const gameElement = document.getElementById('play-game')
const endElement = document.getElementById('game-end')
const winnings = document.getElementById('winning-section')
const child = document.getElementById('show-winnings')
const alert = document.getElementById('alert')
const fiftyButton = document.getElementById('fifty')
const phoneButton = document.getElementById('phone')
const audienceButton = document.getElementById('audience')
const audienceVoters = document.getElementById('audience-vote')
//
const finalScoreEl = document.getElementById("finalScore")
const highscoreContainer = document.getElementById("highscoreContainer")
const highscoreDiv = document.getElementById("high-scorePage")
const highscoreInputName = document.getElementById("initials")
const highscoreDisplayName = document.getElementById("highscore-initials")
//
const submitScoreBtn = document.getElementById("submitScore")
const highscoreDisplayScore = document.getElementById("highscore-score")
const highscoreDisplayDate = document.getElementById("highscore-startTime") 
const highscoreDisplayElapsedTime = document.getElementById("highscore-elapsedTime")
//



let shuffledQuestions, shuffledQuestionsNonInOrdine, shuffledAnswers, currentQuestionIndex, currentWinningIndex
let winningMessage
let score = 0;


startButton.addEventListener('click', startGame)

function startGame(){
    for(let i=0; i<10; i++){    /*Remove any classlist indicating colors on the winnings*/
        winnings.children[i].classList.remove('correctly')
        winnings.children[i].classList.remove('wrongly')
    } 
    startElement.classList.add('hide')
    gameElement.classList.remove('hide')
    endElement.classList.add('hide')
    highscoreContainer.classList.add('hide')
    
    generateQuestion()
}

function generateQuestion(){
    startTime = new Date();
    startTimeFormat = startTime.toLocaleDateString();
    nextButton.classList.remove('hide')
    exitButton.classList.remove('hide')
    
    shuffledQuestionsNonInOrdine = _.sample(questions, 10); /*estraggo casualmente 10 domande con le relative rispostee dall'array*/
    shuffledQuestions = shuffledQuestionsNonInOrdine.sort(function(a, b){return a.value - b.value}) //ordino le dieci domande in base alla difficoltà
    currentQuestionIndex = 0
    currentWinningIndex = 9
    showQuestion(shuffledQuestions[currentQuestionIndex])
}


function showQuestion(question){
    questionElement.innerHTML= question.question;
    shuffledAnswers = _.shuffle(question.answers);
    shuffledAnswers.forEach(answer => {
        const newButton = document.createElement('button') /*create a new button elements for the answers*/
        newButton.classList.add('btn')
        newButton.innerHTML = answer.text
        if(answer.correct){
            newButton.dataset.correct = answer.correct /*check if the answer is right or wrong */
        }
        answerButtonsElement.appendChild(newButton)
        newButton.addEventListener('click', checkAnswer)
    })
}

function checkAnswer(ans){

    const selectedButton = ans.target;
    const answer = selectedButton.dataset.correct /*Chechinkg if the answer is right or wrong using data attributes*/
    const totalWinnings = document.createElement('div') /*create a new elements to represent total winnings for the answers*/
    
    if (answer && score <11 && shuffledQuestions.length > currentQuestionIndex + 1){/*Chech if the answer is correct or wrong and if there are still questions unanswered*/
     nxtqst = true;
        selectedButton.classList.add('correct')
        winnings.children[currentWinningIndex].classList.add('correctly')
        score++
    } else if (!answer) {
        score =0;
        selectedButton.classList.add('wrong')
        winnings.children[currentWinningIndex].classList.add('wrongly')
        //Looping through the answers button

        Array.from(answerButtonsElement.children).forEach(button =>{
            setStatusClass(button, button.dataset.correct)
        })
        /*Create a winning Message at the end of the game with the amount won*/
    
        if(score<10){
            winningMessage = document.createTextNode(`Désolé vous rentrez chez vous avec 0 btc. Le néant!! Réessayez la prochaine fois`)
        } 
        
        else {
            winningMessage = document.createTextNode('')
        }
        totalWinnings.appendChild(winningMessage)
        endElement.insertBefore(totalWinnings, child) 
        setTimeout(gameOver, 1000)
    }
    else {
        selectedButton.classList.add('correct')
        winnings.children[currentWinningIndex].classList.add('correctly')
        setTimeout(gameOver, 1000)
    }
    if (score === 10) {
        winningMessage = document.createTextNode(`Bravo vous avez répondu correctement a tous les questions, vous remportez 1023 btc!!!`)
        totalWinnings.appendChild(winningMessage)
        endElement.insertBefore(totalWinnings, child) 
        setTimeout(gameOver, 1000)
    } 
}

function setStatusClass(element, correct){
    if(correct){
        element.classList.add('correct')
    } 
}

exitButton.addEventListener('click', exitGame)
function exitGame(){
    const totalWinnings = document.createElement('div')
    if (score === 0) {
        winningMessage = document.createTextNode(`Désolé rentrez chez vous avec 0 btc. Le néant!! Réessayez la prochaine fois`)
        totalWinnings.appendChild(winningMessage)
        endElement.insertBefore(totalWinnings, child) 
        setTimeout(gameOver, 1000)
    }
    if (score === 1) {
        winningMessage = document.createTextNode(`Vous avez répondu correctement à 1 question ! Vous remportez donc 1 btc`)
        totalWinnings.appendChild(winningMessage)
        endElement.insertBefore(totalWinnings, child) 
        setTimeout(gameOver, 1000)
    }
    if (score === 2) {
        winningMessage = document.createTextNode(`Vous avez répondu correctement à 2 questions ! Vous remportez donc 3 btc`)
        totalWinnings.appendChild(winningMessage)
        endElement.insertBefore(totalWinnings, child) 
        setTimeout(gameOver, 1000)
    }
    if (score === 3) {
        winningMessage = document.createTextNode(`Vous avez répondu correctement à 3 questions ! Vous remportez donc 7 btc`)
        totalWinnings.appendChild(winningMessage)
        endElement.insertBefore(totalWinnings, child) 
        setTimeout(gameOver, 1000)
    }
    if (score === 4) {
        winningMessage = document.createTextNode(`Vous avez répondu correctement à 4 questions ! Vous remportez donc 15 btc`)
        totalWinnings.appendChild(winningMessage)
        endElement.insertBefore(totalWinnings, child) 
        setTimeout(gameOver, 1000)
    }
    if (score === 5) {
        winningMessage = document.createTextNode(`Vous avez répondu correctement à 5 questions ! Vous remportez donc 31 btc`)
        totalWinnings.appendChild(winningMessage)
        endElement.insertBefore(totalWinnings, child) 
        setTimeout(gameOver, 1000)
    }
    if (score === 6) {
        winningMessage = document.createTextNode(`Félicitations, vous avez répondu correctement à 6 questions ! Vous pouvez désormais rentrer chez vous avec une récompense de 63 btc.`)
        totalWinnings.appendChild(winningMessage)
        endElement.insertBefore(totalWinnings, child) 
        setTimeout(gameOver, 1000)
    }
    if (score === 7) {
        winningMessage = document.createTextNode(`Félicitations, vous avez répondu correctement à 7 questions ! Vous pouvez désormais rentrer chez vous avec une récompense de 127 btc.`)
        totalWinnings.appendChild(winningMessage)
        endElement.insertBefore(totalWinnings, child) 
        setTimeout(gameOver, 1000)
    }
    if (score === 8) {
        winningMessage = document.createTextNode(`Félicitations, vous avez répondu correctement à 8 questions ! Vous pouvez désormais rentrer chez vous avec une récompense de 255 btc.`)
        totalWinnings.appendChild(winningMessage)
        endElement.insertBefore(totalWinnings, child) 
        setTimeout(gameOver, 1000)
    }
    if (score === 9) {
        winningMessage = document.createTextNode(`Félicitations, vous avez répondu correctement à 9 questions ! Vous pouvez désormais rentrer chez vous avec une récompense de 511 btc.`)
        totalWinnings.appendChild(winningMessage)
        endElement.insertBefore(totalWinnings, child) 
        setTimeout(gameOver, 1000)
    }
}

nextButton.addEventListener('click', nextquestion)

function nextquestion(){
    if (nxtqst == true) {
        currentQuestionIndex++
        currentWinningIndex--
        nxtqst = false;
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])}
}

function resetState(){
    while(answerButtonsElement.firstChild){ /*Remove previous answers*/
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    alert.classList.remove('show')
    audienceVoters.classList.remove('show')
}


function gameOver(){
    endTime = new Date();
    endTimeFormat = endTime.toLocaleDateString();
    elapsedTime = endTime - startTime;
    elapsedTime /= 1000;
    elapsedTimeFormat = Math.round(elapsedTime);
    gameElement.classList.add('hide')
    endElement.classList.remove('hide')
    highscoreContainer.classList.add('hide')
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "Le " + startTimeFormat + " vous avez commencé le jeu et répondu correctement à " + score +" question"+ (score > 1 ? "s" : "") +
    " Votre session de jeu a duré " + elapsedTimeFormat + "seconde" + (elapsedTimeFormat > 1 ? "s" : "");
}

submitScoreBtn.addEventListener('click',highscore)
function highscore(){
    if (highscoreInputName.value.trim() === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score,
            starttime : startTimeFormat,
            elapsedtime : elapsedTimeFormat + " secondes"
        };
        
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
    endElement.classList.add('hide')
}
//


function generateHighscores() {
    // Efface d'abord le contenu précédent du classement
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    highscoreDisplayDate.innerHTML = "";
    highscoreDisplayElapsedTime.innerHTML = "";
  
    // Récupère les scores depuis le stockage local
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    
    // Limite le nombre de scores à afficher (par exemple, 50 premiers scores)
    var limit = Math.min(50, highscores.length);
  
    // Boucle pour afficher chaque score dans le classement
    for (var i = 0; i < limit; i++) {
      // Crée de nouveaux éléments pour afficher les détails du score
      var newHighscoreDiv = document.createElement("div");
      var newMedalImg = document.createElement("img");
      var newNameSpan = document.createElement("span");
      var newScoreSpan = document.createElement("span");
      var newStartTimeSpan = document.createElement("span");
  
      // Si le score est parmi les trois premiers, ajoute l'image de la médaille correspondante
      if (i < 3) {
        if (i === 0) {
          newMedalImg.setAttribute("src", "images/1.png");
          newMedalImg.setAttribute("alt", "Médaille d'or");
        } else if (i === 1) {
          newMedalImg.setAttribute("src", "images/2.png");
          newMedalImg.setAttribute("alt", "Médaille d'argent");
        } else if (i === 2) {
          newMedalImg.setAttribute("src", "images/3.png");
          newMedalImg.setAttribute("alt", "Médaille de bronze");
        }
        newMedalImg.style.width = "20px"; // Ajuste la taille de l'image de la médaille
        newMedalImg.style.height = "20px"; // Ajuste la taille de l'image de la médaille
        newHighscoreDiv.appendChild(newMedalImg); // Ajoute l'image de la médaille dans le div du score
      }
  
      // Affiche les valeurs récupérées dans la console pour vérification
      console.log("Nom d'utilisateur :", highscores[i].name);
      console.log("Score :", highscores[i].score);
      console.log("Date de début :", highscores[i].starttime);
      console.log("Temps écoulé :", highscores[i].elapsedtime);
  
      // Met à jour les éléments HTML avec les données récupérées
      newNameSpan.textContent = highscores[i].name; // Ajoute le nom d'utilisateur
      newScoreSpan.textContent = highscores[i].score;
      newStartTimeSpan.textContent = highscores[i].starttime;
  
      // Ajoute les éléments au div du score pour les afficher dans le classement
      newHighscoreDiv.appendChild(newNameSpan);
      newHighscoreDiv.appendChild(newScoreSpan);
      newHighscoreDiv.appendChild(newStartTimeSpan);
  
      // Ajoute le div du score au classement
      highscoreDisplayName.appendChild(newHighscoreDiv);
    }
  }
  

//
function showHighscore(){
    endElement.classList.add('hide')
    startElement.classList.add('hide')
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    generateHighscores();
}


//
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
    highscoreDisplayDate.textContent = "";
    highscoreDisplayElapsedTime.textContent = "";
}



restartButton.addEventListener('click', restartGame)

function restartGame(){
    score = 0
    winningMessage.remove()  /*Remove the winning message everytime restart button is clicked so a new one can be printed at the end of the game*/
    resetState()
    fiftyButton.addEventListener('click', fiftyFifty, {once: true}) /*So your fiftyFity lifeline can be active again*/
    phoneButton.addEventListener('click', callFriend, {once: true} )
    audienceButton.addEventListener('click', askAudience, {once: true})
    fiftyButton.classList.remove('hide')
    phoneButton.classList.remove('hide')
    audienceButton.classList.remove('hide')
    startGame()
}

function checkWinnings(){
    for (let i=winnings.children.length-1; i>=0; i--){
        winnings.children[i].classList.add('correct')
    }
}

//LifeLines

fiftyButton.addEventListener('click', fiftyFifty, {once: true})
phoneButton.addEventListener('click', callFriend, {once: true} )
audienceButton.addEventListener('click', askAudience, {once: true})

function fiftyFifty() {
   
    let rand = Math.floor(Math.random()*3)
    let newArr = [] //Create a new array to push 2 wrongs options into
    audienceVoters.classList.remove('show')
    alert.classList.remove('show')
    for (let i=0; i<2; i++){
        for (let j=0; j<4; j++){
            if(!answerButtonsElement.children[j].dataset.correct && newArr.length<2){
                newArr.push(answerButtonsElement.children[j]) 
            }
        }
    }
    for (let i=0; i<newArr.length; i++){
        newArr[i].classList.add('nothing')   
    }
    fiftyButton.classList.add('hide')
}

function callFriend(){ 
    audienceVoters.classList.remove('show')
    alert.classList.add('show')
    for (let i=0; i<4; i++){
        if(answerButtonsElement.children[i].dataset.correct){
            answer = answerButtonsElement.children[i].innerText
            //create an array of possible answer and generate a random one
            friendsAnswer = [`As-tu bien lu la question ? \n Vraiment tu m'appelles pour une question de ce genre ? \n La réponse est certainement  ${answer}`,
                             `Je ne suis pas sur mais je pense que la réponse est ${answer}`,
                             `Celle-là je la connais ! La réponse est ${answer}`,
                             `Désolé, mais je ne sais pas. Bonne chance !`,
                             `Je suis indécis, peut-être que c'est ${answer}`   
                            ]
            alert.innerHTML =  friendsAnswer[Math.floor(Math.random()*friendsAnswer.length)]
        }
    }  
    phoneButton.classList.add('hide')
}

function askAudience(){
  
    alert.classList.remove('show')
    audienceVoters.classList.add('show')
    let A = document.getElementById('a')
    let B = document.getElementById('b')
    let C = document.getElementById('c')
    let D = document.getElementById('d')
    let correctHeight = ['150px', '120px', '165px', '110px', '145px'] //Create an array of height so you can have a random value
    let wrongHeight = ['30px', '20px', '90px', '45px', '80px', '25px', '40px', '100px', '85px', '55px', '43px']

    if (answerButtonsElement.children[0].dataset.correct){
        A.style.height = correctHeight[Math.floor(Math.random()*correctHeight.length)]
        B.style.height = wrongHeight[Math.floor(Math.random()*wrongHeight.length)]
        C.style.height = wrongHeight[Math.floor(Math.random()*wrongHeight.length)]
        D.style.height = wrongHeight[Math.floor(Math.random()*wrongHeight.length)]
    }
    else if (answerButtonsElement.children[1].dataset.correct){
        A.style.height = wrongHeight[Math.floor(Math.random()*wrongHeight.length)]
        B.style.height = correctHeight[Math.floor(Math.random()*correctHeight.length)]
        C.style.height = wrongHeight[Math.floor(Math.random()*wrongHeight.length)]
        D.style.height = wrongHeight[Math.floor(Math.random()*wrongHeight.length)]
    }
    else if (answerButtonsElement.children[2].dataset.correct){
        A.style.height = wrongHeight[Math.floor(Math.random()*wrongHeight.length)]
        B.style.height = wrongHeight[Math.floor(Math.random()*wrongHeight.length)]
        C.style.height = correctHeight[Math.floor(Math.random()*correctHeight.length)]
        D.style.height = wrongHeight[Math.floor(Math.random()*wrongHeight.length)]
    }
    else if (answerButtonsElement.children[3].dataset.correct){
        A.style.height = wrongHeight[Math.floor(Math.random()*wrongHeight.length)]
        B.style.height = wrongHeight[Math.floor(Math.random()*wrongHeight.length)]
        C.style.height = wrongHeight[Math.floor(Math.random()*wrongHeight.length)]
        D.style.height = correctHeight[Math.floor(Math.random()*correctHeight.length)]
    }
    audienceButton.classList.add('hide')
}



const questions = [
   {
        question: 'Buckingham Palace se trouve à...',
        answers: [
          {text: 'Paris',correct:false},
          {text: 'Bari' ,correct:false},
          {text: 'Londres' ,correct:true},
        {text: 'Lisbonne' ,correct:false}
    ], value: 1
   },
   {
    question: 'La Divine Comédie a été écrite par…',
    answers: [
        {text: 'Francesco Petrarca',correct:false},
        {text: 'Dante Alighieri ',correct:true},
        {text: ' Torquato Tasso',correct:false},
        {text: ' Giovanni Pascoli',correct:false}
   ], value: 1
   },
   
   {
    question: ' Le crocodile est un ...',
    answers: [
        {text: 'Mammifère ',correct:false},
        {text: 'Oiseau',correct:false},
        {text: ' Reptile',correct:true},
        {text: 'Amphibien',correct:false}
   ], value: 1
   },
   
   {
    question: 'Les koalas se trouvent principalement en…',
    answers: [
        {text: 'Australie',correct:true},
        {text: 'Allemagne',correct:false},
        {text: 'Venezuela',correct:false},
        {text: 'Chine',correct:false}
   ], value: 1 
   },
   
   {
    question: 'Les alpes ne traversent pas...',
    answers: [
        {text: 'la Savoie',correct:false},
        {text: 'Les alpes maritimes',correct:false},
        {text: 'Le Finistère',correct:true},
        {text: 'Le Vaucluse',correct:false}
   ], value: 1
   },
    
   {
    question: 'Venise est connue pour…',
    answers: [
        {text: 'La tour penchée',correct:false},
        {text: 'La pêche sportive',correct:false},
        {text: 'Les gondoles',correct:true},
        {text: 'Le célèbre musée dédié à De Vinci ',correct:false}
   ], value: 1
   },
    
   {
    question: "Quelle couleur est le maillot porté par l'équipe nationale italienne aux championnats du monde ? ",
    answers: [
        {text: 'Rose ',correct:false},
        {text: 'Bleu',correct:true},
        {text: 'Noire ',correct:false},
        {text: 'Vert',correct:false}
   ], value: 1
   },
   
   {
    question: 'Stonehenge est situé en…',
    answers: [
        {text: 'France ',correct:false},
        {text: 'Angleterre',correct:true},
        {text: 'Danemark ',correct:false},
        {text: ' Suède',correct:false}
   ], value: 1
   },
  
    {
    question: 'La Grande Muraille est située…',
    answers: [
        {text: 'Au Pérou',correct:false},
        {text: 'En Allemagne',correct:false},
        {text: 'En Chine',correct:true},
        {text: 'Au Pakistan',correct:false}
   ], value: 1
   },
   
   {
    question: 'Une adresse e-mail contiendra toujours le symbole…',
    answers: [
        {text: '# ',correct:false},
        {text: '$ ',correct:false},
        {text: '@ ',correct:true},
        {text: '% ',correct:false}
   ], value: 1
   },
   
   
   {
    question: 'Le conflit de la Première Guerre mondiale débute le 28 juillet 1914 avec la déclaration de guerre…',
    answers: [
     	{text: "De l'Allemagne à la Serbie",correct:false},
        {text: "De l'Autriche à la Serbie", correct:true},
        {text: "'De la France à la Serbie'",correct:false},
        {text: "'De l'Italie à la Serbie'",correct:false}
   ], value: 2
   },
   
   
   {
    question: 'Pour naviguer sur le Web, vous devez avoir installé…',
    answers: [
        {text: 'Un bureau',correct:false},
        {text: 'Un navigateur',correct:true},
        {text: 'Une imprimante ',correct:false},
        {text: 'Une sourie',correct:false}
   ], value: 2
   },
   
    {
    question: 'Quelle est la capitale de la Russie ?',
    answers: [
        {text: 'Genève',correct:false},
        {text: 'Budapest ',correct:false},
        {text: 'Prague ',correct:false},
        {text: 'Moscou ',correct:true}
   ], value: 2
   },
   
   
   {
    question: "Pablo Picasso n'a pas peint…",
    answers: [
        {text: 'Guernica ',correct:false},
        {text: ' Le rêve ',correct:false},
        {text: 'La femme qui pleure',correct:false},
        {text: ' La nuit étoilée',correct:true}
   ], value: 2
   },
   
   
   {
    question: 'Qui a peint La Cène ?',
    answers: [
        {text: ' Léonard de Vinci ',correct:true},
        {text: ' Léonard Sciascia ',correct:false},
        {text: 'Il Giorgione ',correct:false},
        {text: 'Caravage ',correct:false}
   ], value: 2
   },
   
      {
    question: ' Francisco Franco était le dictateur ',
    answers: [
        {text: "De l'Espagne ",correct:true},
        {text: ' De la France',correct:false},
        {text: ' Du Portugal',correct:false},
        {text: "De l'Angleterre",correct:false}
   ], value: 2
   },

   
   {
    question: "Le dadaïsme est un mouvement d'avant-garde de ",
    answers: [
        {text: '600 ',correct:false},
        {text: ' 700',correct:false},
        {text: '800 ',correct:false},
        {text: '900 ',correct:true}
   ], value: 2
   },
      {
    question: 'Sur quelle ville japonaise la première bombe atomique a-t-elle été larguée ?',
    answers: [
        {text: 'Hiroshima ',correct:true},
        {text: 'Kyushu',correct:false},
        {text: 'Nagasaki ',correct:false},
        {text: 'Niigata ',correct:false}
   ], value: 2
   },   
   
   {
    question: 'Quel est le symbole du Magnésium ?',
    answers: [
        {text: 'M ',correct:false},
        {text: 'Mg ',correct:true},
        {text: 'Hg ',correct:false},
        {text: 'H ',correct:false}
   ], value: 2
   },
   
      {
    question: 'La capitale du Brésil est…',
    answers: [
        {text: 'Sao Paulo ',correct:false},
        {text: 'Brasilia ',correct:true},
        {text: 'Rio de Janeiro ',correct:false},
        {text: 'Salvador ',correct:false}
   ], value: 2
   },
   
   {
    question: "François-Ferdinand, héritier du trône d'Autriche, a été tué à…",
    answers: [
        {text: 'Monaco ',correct:false},
        {text: 'Paris',correct:false},
        {text: 'Sarajevo ',correct:true},
        {text: 'Milan ',correct:false}
   ], value: 3
   },

   {
    question: "Trouvez le nombre manquant dans l'ordre suivant : 1 1 2 3 5 ... 13 21 :",
    answers: [
        {text: ' 6',correct:false},
        {text: '8 ',correct:true},
        {text: '9 ',correct:false},
        {text: '10 ',correct:false}
   ], value: 3
   },
   
   {
    question: 'Un passionné de cinema est ',
    answers: [
        {text: 'Un cinophile ',correct:false},
        {text: 'Un cinématographique ',correct:false},
        {text: 'Un cinématique ',correct:false},
        {text: 'Un cinéphile ',correct:true}
   ], value: 3
   },
   
      {
    question: "Qu'est-ce qu'Isaac Newton a découvert ?",
    answers: [
        {text: 'Les atomes',correct:false},
        {text: 'Le magnésium',correct:false},
        {text: 'La force de gravité ',correct:true},
        {text: "L'Australie",correct:false}
   ], value: 3
   },
   
   {
    question: "'Les demoiselles d'Avignon' est une œuvre célèbre de…",
    answers: [
        {text: 'Pablo Picasso ',correct:true},
        {text: 'Joan Mirò ',correct:false},
        {text: 'Amedeo Modigliani',correct:false},
        {text: 'André Salmon ',correct:false}
   ], value: 3
   },
   
   {
    question: 'Laquelle de ces villes est une capitale ? ',
    answers: [
        {text: ' Strasbourg',correct:false},
        {text: 'Casablanca',correct:false},
        {text: 'Genève ',correct:false},
        {text: 'Caracas',correct:true}
   ], value: 3
   },
   
   {
    question: "L'armée italienne est entrée à Rome, en 1870, par la brèche...",
    answers: [
        {text: ' de la Porta Maggiore ',correct:false},
        {text: 'De Porta Pia ',correct:true},
        {text: 'de Corallina',correct:false},
        {text: 'de Capraia',correct:false}
   ], value: 3
   },
   
   {
    question: '"C’est n’est pas une pipe" est un opéra de',
    answers: [
        {text: ' Rene Magritte ',correct:true},
        {text: ' Andy Warhol ',correct:false},
        {text: 'Salvador Dalì ',correct:false},
        {text: 'Joseph Koons ',correct:false}
   ], value: 3
   },
   
   {
    question: 'En quelle année a eu lieu la première édition de la coupe du monde de football ?',
    answers: [
        {text: '1940 ',correct:false},
        {text: '1900 ',correct:false},
        {text: '1930 ',correct:true},
        {text: '1948 ',correct:false}
   ], value: 3
   },
   
   {
    question: "Le juge de paix est un organe de justice",
    answers: [
        {text: 'à la fois au pénal et au civil ',correct:true},
        {text: 'criminel',correct:false},
        {text: 'civil ',correct:false},
        {text: 'militaire ',correct:false}
   ], value: 3
   },
   
  {
    question: "Lequel des pays suivants n'est pas membre de l'Union européenne ?",
    answers: [
        {text: ' Suisse ',correct:true},
        {text: 'Slovénie ',correct:false},
        {text: 'Roumanie ',correct:false},
        {text: 'Allemagne ',correct:false}
   ], value: 4
   },
   
   
   {
    question: "Qu'est-ce que Samuel Morse a inventé ?",
    answers: [
        {text: 'Le télégraphe sans fil ',correct:false},
        {text: 'La lampe à incandescence ',correct:false},
        {text: 'Le pneu ',correct:false},
        {text: 'Le télégraphe électrique',correct:true}
   ], value: 4
   },
   
   
   {
    question: 'La plus petite planète de notre système solaire est...',
    answers: [
        {text: 'Mars ',correct:false},
        {text: 'Vénus ',correct:false},
        {text: 'Mercure ',correct:true},
        {text: 'Neptune ',correct:false}
   ], value: 4
   },
   
   
   {
    question: "Lequel de ces recueils de poésie n'est pas de Charles Baudelaire ?",
    answers: [
        {text: "L'Albatros",correct:false},
        {text: "Demain, dès l'aube",correct:true},
        {text: "Le Cygne",correct:false},
        {text: 'Les Paradis artificiels',correct:false}
   ], value: 4
   },
   
   
   {
    question: '"Le Dormeur du Val" est un poème de ...',
    answers: [
        {text: 'Victor Hugo ',correct:false},
        {text: 'Paul Verlaine ',correct:false},
        {text: 'Arthur Rimbaud',correct:true},
        {text: 'Guillaume Apollinaire ',correct:false}
   ], value: 4
   },
   
    
   {
    question: 'En 1931, Salvador Dali peint ...',
    answers: [
        {text: 'La persistance de la mémoire',correct:true},
        {text: 'Le Cri' ,correct:false},
        {text: "Rêve causé par le vol d'une abeille autour d'une grenade juste avant de se réveiller", correct:false},
        {text: 'Nu descendant les escaliers',correct:false}
   ], value: 4
   },
   
   
   {
    question: "Que s'est-il passé le 2 juin 1946 en Italie ?",
    answers: [
        {text: "Le centenaire de l'unification italienne est célébré",correct:false},
        {text: "L'industrie affiche une croissance de 84 % sur l'année précédente ",correct:false},
        {text: 'La fin de la seconde guerre mondiale',correct:false},
        {text: ' Un référendum institutionnel marque la fin de la monarchie et la naissance de la République italienne ',correct:true}
   ], value: 4
   },
   
   {
    question: 'Quand a eu lieu la 1ère élection présidentielle française ?',
    answers: [
        {text: '1905 ',correct:false},
        {text: ' 1848 ',correct:true},
        {text: ' 1826 ',correct:false},
        {text: '1923',correct:false}
   ], value: 4
   },
   
   {
    question: 'Giorgio de Chirico est connu comme peintre…',
    answers: [
        {text: 'cubiste ',correct:false},
        {text: 'pop ',correct:false},
        {text: 'minimaliste ',correct:false},
        {text: 'métaphysique ',correct:true}
   ], value: 4
   },
   {
    question: 'En quelle année Netflix a-t-il été créé ?',
    answers: [
        {text: ' 1997 ',correct:true},
        {text: '2009 ',correct:false},
        {text: '2005 ',correct:false},
        {text: '2001 ',correct:false}
   ], value: 4
   },
   
        {
   question: "Le Soleil n'est pas…",
   answers:[
       {text: 'Une étoile', correct: false},
       {text: "Composé de 99,8 % de la masse de l'ensemble du système solaire", correct: false},
       {text: ' Une planète', correct: true},
       {text: "omposé d'hydrogène (74 % en masse, 92 % en volume) et d'hélium (24-25 % en masse, 7 % en volume)", correct: false}
   ], value: 5
   },
   
  
   
   {
    question: "Comment s'appelle le canal qui sépare la Méditerranée de la Mer Rouge ?",
    answers: [
        {text: 'Canal Don-Volga  ',correct:false},
        {text: 'Canal de Suez ',correct:false},
        {text: 'Canal Göta  ',correct:false},
        {text: 'Canal de Panama ',correct:true}
   ], value: 5
   },
   
   
   {
    question: 'Pendant la Seconde Guerre mondiale, après avoir été conquise, la Pologne a été divisée entre les…',
    answers: [
    {text: "L'Allemagne et l'Italie",correct: false},
        {text: "L'Allemagne et l'Union soviétique",correct:true},
        {text: "L'Allemagne  et le Japon",correct: false},
        {text: "L'Allemagne et l'Autriche",correct: false}
   ], value: 5
   },
   
 
   {
    question:"La capitale de l'Australie est…",
    answers: [
        {text: 'Quito', correct: false},
        {text: 'Canberra', correct: true},
        {text: 'Sydney', correct: false},
        {text: 'Ottawa', correct: false}
   ], value: 5
   },

   {
    question: 'Le télescope spatial Hubble a été lancé en…',
    answers: [
        {text: '2000', correct: false},
        {text: '1986', correct: false},
        {text: '1990', correct: true},
        {text: '2007', correct: false}
   ], value: 5
   },
   
   {
    question: 'La Vallée des Rois se situe :',
    answers: [
        {text: 'En Floride', correct:false},
        {text: 'En Egypte', correct:true},
        {text: 'En Tunisie', correct:false},
        {text: 'En Iran ', correct:false}
   ], value: 5
   },
   
   
   {
    question: 'En quelle année Barack Obama a-t-il reçu le prix Nobel de la paix ?',
    answers: [
        {text: '2006', correct: false},
        {text: '2009', correct: true},
        {text: '2007', correct: false},
        {text: '2010', correct: false}
   ], value: 5
   },
   
   
   {
    question: "Quelle est l'université la plus prestigieuse de Paris ?",
    answers: [
        {text: 'La Sorbonne', correct: true},
        {text: 'PSG', correct: false},
        {text: 'Denis-Diderot', correct: false},
        {text: 'Pierre et Marie Curie', correct: false}
   ], value: 5
   },
   
   
   {
    question: 'Quelle est la taille du rayon de la terre ?',
    answers: [
        {text: '9896 km', correct: false},
        {text: '6368 km', correct: true},
        {text: '3283 km', correct: false},
        {text: '5689 km', correct: false}
   ], value: 5
   },  
   
      {
    question: "Qu'est-ce qui n'a pas été dédié à Albert Einstein ?",
    answers: [
        {text: ' Un prix',correct:false},
        {text: ' Un astéroïde extrasolaire', correct:false},
        {text: 'Une planète',correct:true},
        {text: ' Un cratère lunaire',correct:false}
   ], value: 5
   }, 
   
   {
    question: "Laquelle de ces œuvres n'est pas de Gabriele D'Annunzio ?",
    answers: [
        {text: 'Le plaisir', correct: false},
        {text: 'Nocturne', correct: false},
        {text: 'Un, aucun, cent mille', correct: true},
        {text: 'Les Demoiselles des Rochers', correct: false}
   ], value: 6
   },
   
   
   {
    question: "Lequel des animaux suivants n'a pas de vertèbres ?",
    answers: [
        {text: "Le homard", correct: true},
        {text: "L'hippopotame", correct: false},
        {text: "Le poisson clown", correct: false},
        {text: "Le lézard", correct: false}
   ], value: 6
   },
   
   {
    question: "La couche la plus basse de l'atmosphère où se situent les phénomènes météorologiques s'appelle…",
    answers: [
        {text: 'stratosphère', correct: false},
        {text: 'troposphère', correct: true},
        {text: 'thermosphère', correct: false},
        {text: 'mésosphère', correct: false}
   ], value: 6
   },
   
   
   {
    question: "En quelle saison se déroule le Songe d'une nuit d'été ?",
    answers: [
        {text: 'Automne', correct: false},
        {text: 'Été', correct: false},
        {text: 'Hiver', correct: false },
        {text: 'Printemps',correct: true}
   ], value: 6
   },
   
   
   {
    question: "Don't worry…him" ,
    answers: [
        {text: 'on', correct:false},
        {text: 'about', correct: true},
        {text: 'for', correct: false},
        {text: 'at', correct: false}
   ], value:6 
   },
   
   {
    question: "Qui de ces réalisateurs a réalisé 'Orange Mécanique' ?",
    answers: [
        {text: 'Wim Wenders', correct: false},
        {text: 'Peter Jackson', correct: false},
        {text: 'Stanley Kubrick',correct: true},
        {text: 'Sergio Leone', correct: false}
   ], value: 6
   },
   
   
   {
    question: "Si je suis à La Plata, je suis …",
    answers: [
        {text: 'Au Brésil', correct: false},
        {text: 'Au Venezuela', correct: false},
        {text: 'En Jamaïque', correct: false },
        {text: 'En Argentine', correct: true}
   ], value: 6
   },
   
   {
    question: 'Dans quel état se trouve la ville de Philadelphie ?',
    answers: [
        {text: 'Illinois', correct: false},
        {text: 'Pennsylvanie', correct: true},
        {text: 'Louisiane', correct: false},
        {text: 'Virginie', correct: false}
   ], value: 6
   },
   
   
   
   {
    question: "Qui est devenu le premier président des États-Unis d'Amérique ?",
    answers: [
        {text: 'Abraham Lincoln', correct: false},
        {text: 'Thomas Jefferson', correct: false},
        {text: ' George Washington', correct:true},
        {text: 'Theodore Roosevelt', correct: false}
   ], value: 6
   },
   
   {
    question: 'Combien y a-t-il de fuseaux horaires en Russie ?' ,
    answers: [
        {text: '4', correct: false},
        {text: '7', correct: false},
        {text: '9', correct: false},
        {text: '11', correct: true}
   ], value: 6
   },
   
    {
    question: 'La capitale de la Géorgie est…',
    answers: [
        {text: 'Tbilissi', correct: true},
        {text: 'Batumi', correct: false},
        {text: 'Gori', correct: false},
        {text: 'Poti', correct: false}
   ], value: 7
   },
   
   
   {
    question: "Où se situe l'os ethmoïde ?",
    answers: [
        {text: 'Dans le pied', correct: false},
        {text: 'Dans la main', correct:  false},
        {text: 'Dans le bras', correct: false},
        {text: 'Dans le crâne ', correct: true}
   ], value: 7
   },
   
   
   
   {
    question: 'Quelle est la capitale du Canada ?',
    answers: [
        {text: 'Montréal', orrect: false},
        {text: 'Ottawa', correct: true},
        {text: 'Québec', correct: false},
        {text: 'Toronto', correct: false}
   ], value: 7
   },
   
   
   {
    question: "Quel est le plus petit pays d'Europe ?",
    answers: [
        {text: 'Lichtenstein', correct: false},
        {text: 'La cité du Vatican', correct: true},
        {text: 'Principauté de Monaco', correct: false},
        {text: 'Andorr', correct: false}
   ], value: 7
   },
   
   
   {
    question: 'La capitale de la France est située…',
    answers: [
        {text: 'Au sud de Lyon', correct: false},
        {text: 'À quelques km de Nice', correct: false},
        {text: 'Au sud de Lille', correct: true},
        {text: "À l'est de Bordeaux", correct: false}
   ], value: 7
   },
   
   {
    question: "Nagui n'a pas animé...",
    answers: [
        {text: 'Taratata ',correct: false},
        {text: ' Intervilles',correct: false},
        {text: "N'oubliez pas les paroles",correct: false},
        {text: ' Le juste prix ',correct: true}
   ], value: 7
   },
   
   
   {
    question: 'Find the negative of “to like”',
    answers: [
        {text: 'To dislike ',correct: true},
        {text: ' To nolike',correct: false},
        {text: ' To no like',correct: false},
        {text: 'To doesn’t like',correct: false}
   ], value: 7
   },
   
   
   {
    question: "Combien mesure l'envergure de l'aigle royal ?",
    answers: [
        {text: '3,3 mètres',correct: false},
        {text: '2,9 mètres',correct: false},
        {text: '2 mètres',correct: true},
        {text: '3,9 mètres',correct: false}
   ], value: 7
   },
   
   
   
   {
    question: 'Où est la galerie des glaces ?',
    answers: [
        {text: 'Versailles ',correct:true},
        {text: 'Paris',correct: false},
        {text: 'Vernon ',correct: false},
        {text: 'Orléans ',correct: false}
   ], value: 7
   },
   
       {
    question: "Qu'est-ce que la galerie des plâtres ? Une collection de…",
    answers: [
        {text: 'Peintures' ,correct: false},
        {text: 'Sculptures ',correct: true},
        {text: 'Livres',correct: false},
        {text: 'Bandes dessinées',correct: false}
   ], value: 8
   },
   
   {
    question: 'Que signifie SOS ? ',
    answers: [
        {text: ' Smile of Satan',correct: false},
        {text: 'Save Our Souls ',correct: true},
        {text: 'Sauvons notre Souffle ',correct: false},
        {text: 'Society Opposed to Sanity',correct: false}
   ], value: 8
   },
   
   
   
   {
    question: 'Combien de coeurs a une pieuvre ?',
    answers: [
        {text: ' 2',correct: false},
        {text: ' 5',correct: false},
        {text: '3 ',correct: true},
        {text: '6 ',correct: false}
   ], value: 8
   },
   
   
   {
    question:'Quel chanteur était connu comme "Le roi de la POP" ?',
    answers: [
        {text: ' Michael Jackson',correct: true},
        {text: 'Justin Timberlake ',correct: false},
        {text: 'Bruno Mars ',correct: false},
        {text: 'Chris Brown ',correct: false}
   ], value: 8
   },
   
   
   {
    question: ' I want … to the store.',
    answers: [
        {text: 'that you went ',correct: false},
        {text: ' you to go',correct: true},
        {text: 'who you go ',correct: false},
        {text: 'you’d go ',correct: false}
   ], value: 8
   },
   
   {
    question: "Qu'est-ce que le sternocléidomastoïdien ?",
    answers: [
        {text: 'un os',correct: false},
        {text: ' un muscle',correct: true},
        {text: ' un ligament',correct: false},
        {text: 'un organe ',correct: false}
   ], value: 8
   },
   
   
   
   {
    question: 'We are interested in … your plant.',
    answers: [
        {text: ' hearing',correct: false},
        {text: ' meeting',correct: false},
        {text: 'watch ',correct: false},
        {text: 'seeing ',correct: true}
   ], value: 8
   },
   
   
   {
    question: "Quel poisson pond le plus d'œufs ?",
    answers: [
        {text: 'La carpe',correct: false},
        {text: 'La daurade ',correct: false},
        {text: 'La truite ',correct: false},
        {text: 'La morue',correct: true}
   ], value: 8
   },
   

   
   {
    question: "Combien de présidents de la République l'Italie avait-elle jusqu'en 1984 ?",
    answers: [
        {text: ' 5',correct: false},
        {text: '6 ',correct: false},
        {text: ' 7',correct: true},
        {text: ' 9',correct: false}
   ], value: 8
   },
   
   {
    question: 'Où se trouvent les organes reproducteurs du serpent ?',
    answers: [
        {text: 'Dans la queue',correct: true},
        {text: 'Dans la tête',correct: false},
        {text: 'Sous le ventre',correct: false},
        {text: 'Dans la langue',correct: false}
   ], value: 8
   },
   
    {
    question: "Qu'est-ce que le sternocléidomastoïdien ?",
    answers: [
        {text: 'un os',correct: false},
        {text: ' un muscle',correct: true},
        {text: ' un ligament',correct: false},
        {text: 'un organe ',correct: false}
   ], value: 8
   },
   
   {
    question: 'We are interested in … your plant.',
    answers: [
        {text: ' hearing',correct: false},
        {text: ' meeting',correct: false},
        {text: 'watch ',correct: false},
        {text: 'seeing ',correct: true}
   ], value: 8
   },
   
   
   {
    question: "Quel poisson pond le plus d'œufs ?",
    answers: [
        {text: 'La carpe',correct: false},
        {text: 'La daurade ',correct: false},
        {text: 'La truite ',correct: false},
        {text: 'La morue',correct: true}
   ], value: 8
   },
   
  
   
   
   {
    question: "Combien de présidents de la République l'Italie avait-elle jusqu'en 1984 ?",
    answers: [
        {text: ' 5',correct: false},
        {text: '6 ',correct: false},
        {text: ' 7',correct: true},
        {text: ' 9',correct: false}
   ], value: 8
   },
   
   {
    question: 'Où se trouvent les organes reproducteurs du serpent ?',
    answers: [
        {text: 'Dans la queue',correct: true},
        {text: 'Dans la tête',correct: false},
        {text: 'Sous le ventre',correct: false},
        {text: 'Dans la langue',correct: false}
   ], value: 8
   },
   
   
  {
    question: "Quel est le légume national de l'Écosse ?",
    answers: [
        {text: 'Le radis ',correct: false},
        {text: "L'aubergine" ,correct: false},
        {text: ' Le navet',correct: true},
        {text: 'La citrouille ',correct: false}
   ], value: 9
   },
   
   
   {
    question: 'How many ….. have you drunk today?',
    answers: [
        {text: 'coffe ',correct: false},
        {text: 'coffee',correct: false},
        {text: 'coffy',correct: false},
        {text: 'coffees',correct: true}
   ], value: 9
   },
   
   
   {
    question: ' What is the opposite of polite?',
    answers: [
        {text: 'neat',correct: false},
        {text: 'clever ',correct: false},
        {text: 'rude',correct: true},
        {text: 'sharp',correct: false}
   ], value: 9
   },
   
   
   {
    question: 'What is Father Christmas other name in English?',
    answers: [
        {text: 'Father Presents',correct: false},
        {text: 'Père Noël ',correct: false},
        {text: 'Santa Claus ',correct: true},
        {text: 'Christmas Uncle ',correct: false}
   ], value: 9
   },
   
   
   {
    question: 'Maria felt … when she first arrived because she had ...to talk to. ',
    answers: [
        {text: 'lonely/nobody ',correct: true},
        {text: 'alone/anybody ',correct: false},
        {text: 'lone/no one',correct: false},
        {text: 'lonely/anybody',correct: false}
   ], value: 9
   },
   
   
   {
    question: 'What is a kipper?',
    answers: [
        {text: ' A kind of beer  ',correct: false},
        {text: 'A smoked herring  ',correct: true},
        {text: ' A dish of sliced potatoes with mayonnaise  ',correct: false},
        {text: 'A milk pudding  ',correct: false}
   ], value: 9
   },
   
   
   {
    question: 'Un fichier joint à un e-mail porte le nom :',
    answers: [
        {text: ' Compte',correct: false},
        {text: 'Pièce jointe',correct: true},
        {text: 'Divertissement',correct: false},
        {text: 'Développement',correct: false}
   ], value: 9
   },
   
   {
    question: 'Le synonyme de "loué" est',
    answers: [
        {text: 'Acclamé',correct: true},
        {text: 'ingéré',correct: false},
        {text: 'Parachevé',correct: false},
        {text: 'Réalisé',correct: false}
   ], value: 9
   },
   
   {
    question: 'Le format AVI fait référence aux fichiers contenant :',
    answers: [
        {text: 'Un texte formaté ',correct: false},
        {text: 'Une musique',correct: false},
        {text: 'Des données au format ASCII',correct: false},
        {text: 'des films ',correct: true}
   ], value: 9
   },
   
   
   
   {
    question: "Lequel des éléments suivants n'est pas une échelle pour mesurer les manifestations d'un caractère statistique ?",
    answers: [
        {text: 'Échelle ordinale',correct: false},
        {text: 'Échelle statistique ',correct: false},
        {text: 'Échelle semi-logarithmique',correct: true},
        {text: 'Échelle proportionnelle',correct: false}
   ], value: 9
   },
   
    {
    question: 'What is a hen night?',
    answers: [
        {text: 'A party in a farmyard  ',correct:false},
        {text: 'A dinner made up entirely of chicken  ',correct:false},
        {text: 'An all-women’s party given by a future bride ',correct:true},
        {text: 'Another name for the night of a full moon  ',correct:false}
   ], value: 10
   },
   
   
   {
    question: "D'où vient l'avion qui s'est écrasé dans les Andes en 1972 ?",
    answers: [
        {text: 'Chili',correct:false},
        {text: 'Pérou',correct:false},
        {text: 'Uruguay',correct:true},
        {text: 'Argentine',correct:false}
   ], value: 10
   },
   
   
   {
    question: 'LLa Forêt Rouge est située en…',
    answers: [
        {text: 'Ukraine',correct:true},
        {text: 'Moldavie',correct:false},
        {text: 'Biélorussie',correct:false},
        {text: 'Roumanie',correct:false}
   ], value: 10
   },
   
   
   {
    question: 'Qui a signé la direction de "Metropolis" de 1927 ?',
    answers: [
        {text: 'Fritz Lang ',correct:true},
        {text: 'Sergio Leone ',correct:false},
        {text: 'Stanley Kubrick ',correct:false},
        {text: 'Orson Welles ',correct:false}
   ], value: 10
   },
   
   
   {
    question: 'La sémiotique est...',
    answers: [
        {text: 'La discipline qui étudie les signes, à travers laquelle la communication a lieu',correct: true},
        {text: 'La discipline qui étudie les rêves et leurs conséquences en psychanalyse',correct: false},
        {text: 'Une branche de la botanique qui étudie la reproduction des plantes',correct: false},
        {text: "Une branche de la psychanalyse, qui s'occupe des personnes ayant des déficits de soins",correct: false}
   ], value: 10
   },
   
   {
    question: "Le cycle de Krebs... ",
    answers: [
        {text: "Consomme de l'ATP et produit du CO2",correct:false},
        {text: 'Produit du GTP, du NADH et du CO2 ',correct:true},
        {text: 'Utilise du glucose' ,correct:false},
        {text: 'Produit de la glycolyse aérobie',correct:false}
   ], value: 10
   },
   
   {
    question: 'Lequel des termes proposés complète correctement la proportion verbale suivante ? Extérieur : extrême = X:Y',
    answers: [
        {text: 'X=final, Y= terminal ',correct:false},
        {text: 'X= éphémère , Y= éternel',correct:false},
        {text: 'X= supérieure , Y= suprême',correct:true},
        {text: 'X= haut , Y= suprême ',correct:false}
   ], value: 10
   },
   
   
   
   {
    question: 'Les inclusions cytoplasmiques peuvent être trouvées dans les hépatocytes :',
    answers: [
        {text: 'Cristaux de Reinke ',correct: false},
        {text: 'Corps paracristallins',correct: false},
        {text: 'Gouttelettes de graisse et dépôts de glycogène ',correct: true},
        {text: 'Toutes les réponses précédentes sont valides',correct: false}
   ], value: 10
   },
   
   
   
   {
    question: "Qu'entend-on par analgésie hypnotique ? La nécessité d'exercer un contrôle direct :",
    answers: [
        {text: " Sur la douleur sans la nécessité d'une intervention pharmacologique",correct: true},
        {text: "À propos des peurs sans avoir besoin d'interventions pharmacologiques",correct: false},
        {text: 'Sur les maladies sans recours à la chirurgie' ,correct: false},
        {text: "Sur la douleur sans avoir besoin d'interventions hypnotiques ",correct: false}
   ], value: 10
   },
   
]

questions.forEach((question, index) => {
    console.log(`Question ${index + 1}: ${question.question}`);
    question.answers.forEach((answer, idx) => {
        const letters = ['A', 'B', 'C', 'D'];
        console.log(`${letters[idx]}: ${answer.text}`);
    });
    console.log('----------------------------------------');

});


