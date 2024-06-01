var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
//if we click on the start/reset

document.getElementById("startset").onclick = function(){
    //if we are playing
    if(playing == true)
        {
            location.reload();//reload page
        }
    else{
        //if we are not playing

        //change mode to playing
        playing = true;
        //set score to 0
        score=1;
        document.getElementById("scoreValue").innerHTML = score;

        //show countdown box

        show("timeremaining");
        timeremaining = 60;

        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

        //hide game over box
        hide("gameOver");
        //change button to reset

        document.getElementById("startset").innerHTML = "Reset Game";

        //start countdown 
        startCountdown();

        //generate a new Q and A
        gnerateQA();
        }
}

for(i=1; i<5 ;i++){
    document.getElementById("box"+i).onclick = function(){
        //check if we are playing
        if(playing == true){
            //yes
            if(this.innerHTML == correctAnswer){
                //correct answer
                //increase score by 1
                score++;
                document.getElementById("scoreValue").innerHTML =score;
                //hide wrong box and show correct box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
    
                //generate new Q&A
                gnerateQA();
            }else{
                //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000);
            }
        }
    }
}


function startCountdown()
{
    action = setInterval(function(){
        timeremaining -=1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").style.display = "block";
            document.getElementById("gameOver").innerHTML = "<p> Game over! </p><p> Your score is :"+ score +"</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startset").innerHTML = "Start Game";
        }
    },1000);
}

function stopCountdown(){
    clearInterval(action);
}

function hide(Id){
    document.getElementById(Id).style.display = "none";
}

function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generate question and multiple answers
function gnerateQA(){
    var x = 1 + Math.floor(Math.random() * 9);
    var y = 1 + Math.floor(Math.random() * 9);
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "X" + y;

    var correctPosition = 1 + Math.floor(Math.random() * 4);
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    // fill one box with the correct answer
    var answers = [correctAnswer];
    //fill other boxes with wrong answers

    for(i=1; i<5; i++){
        if(i != correctPosition){
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.floor(Math.random() * 9)) * (1 + Math.floor(Math.random() * 9));
            } while(answers.indexOf(wrongAnswer) > -1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}
