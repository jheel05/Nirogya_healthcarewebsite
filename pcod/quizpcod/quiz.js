// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [{
    question: "Do you suffer irregular periods?",
    imgSrc: "img/period.jpg",
    choiceA: "Not at all",
    choiceB: "Few times",
    choiceC: "Heavy bleeding",
    correct: "A",
    correct1: "B"
}, {
    question: "Do you suffer from acne?",
    imgSrc: "img/acne.jpg",
    choiceA: "No",
    choiceB: "Few(not visible)",
    choiceC: "Yes",
    correct: "A",
    correct1: "B"

}, {
    question: "Gaining weight?",
    imgSrc: "img/weight.jpg",
    choiceA: "No",
    choiceB: "Unnoticable",
    choiceC: "Yes a lot",
    correct: "A",
    correct1: "B"

}, {
    question: "Facing excessive hair growth (hirsutism) – usually on the face, chest or back?",
    imgSrc: "img/hair.jpg",
    choiceA: "No",
    choiceB: "unnoticable",
    choiceC: "yess",
    correct: "A",
    correct1: "B"
}];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 1000; // 1000s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer) {

    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }
    if (answer == questions[runningQuestion].correct1) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }

}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
        (scorePerCent >= 60) ? "img/4.png" :
        (scorePerCent >= 40) ? "img/3.png" :
        (scorePerCent >= 20) ? "img/2.png" :
        (scorePerCent >= 0) ? "img/1.png" :
        "img/1.png";



    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p> You are " + scorePerCent + "% safe, " + myFunction(scorePerCent) + "</p>";



}

function myFunction(high) {
    if (high >= 80) {
        g = "You can have fun!!";
    } else if (high >= 60) {
        g = "You should take a few precautions";
    } else if (high >= 40) {
        g = "You should go for regular checkup and should take proper precautions";
    } else if (high >= 20) {
        g = "You must visit a gynecologist, you may have PCOS/PCOD";

    } else {
        g = "The analysis says that you are a PCOS/PCOD victim, fix a appointment with a gynecologist"
    }
    return g;
}