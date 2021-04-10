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
        question: "From an objective point of view, which of the following factors seems most prominent (or dominant) on your body when you look in the mirror?",
        imgSrc: "img/ut.jpg",
        choiceA: "Heavy and rounder",
        choiceB: "Thin and straight",

        correct: "A"

    }, {
        question: "If you encircle one wrist with your other hand’s middle finger and thumb, what happens?",
        imgSrc: "img/ut.jpg",
        choiceA: "They touch or overlap",
        choiceB: "There is gap between them",

        correct: "A"

    }, {
        question: "When it comes to your weight, which of the following patterns best describes your history?",
        imgSrc: "img/ut.jpg",
        choiceA: "Easy to gain (tough to lose)",
        choiceB: "Tough to gain",

        correct: "A"

    },
    {
        question: "When you have a serious carb-fest (think: a heaping plate of pasta or multiple slices of pizza), how do you feel afterward?",
        imgSrc: "img/ut.jpg",
        choiceA: "Tierd and bloated",
        choiceB: "No such effects",

        correct: "A"
    }, {
        question: "how many times do you take a meal in a day?",
        imgSrc: "img/ut.jpg",
        choiceA: "3-5",
        choiceB: "2-3",

        correct: "A"
    }, {
        question: "what your daily diet consist of?",
        imgSrc: "img/ut.jpg",
        choiceA: "High carbs",
        choiceB: "Protiens and nutients",

        correct: "A"

    }, {
        question: "how many glasses of water do you have daily?",
        imgSrc: "img/ut.jpg",
        choiceA: "6-8",
        choiceB: "10-12",

        correct: "A"


    }
];

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



    scoreDiv.innerHTML = "<h2>" + chart(scorePerCent) + "</h2>";
    scoreDiv.innerHTML += "<p>" + myFunction(scorePerCent) + "</p>";



}

function myFunction(high) {
    if (high >= 80) {
        g = "You have Endomorphs body type";
    } else if (high >= 50) {
        g = "You have Mesomorphs body type";

    } else if (high >= 20) {
        g = "You have Meso-endomorph body type";

    } else {
        g = "You have Ectomorph body type"
    }
    return g;
}

function chart(_a) {
    if (_a >= 80) {
        var str = "View Suitable Diet Chart!";
        var result = str.link("img/endo.pdf");

    } else if (_a >= 50) {
        var str = "View Suitable Diet Chart!";
        var result = str.link("img/mesa.pdf");

    } else if (_a >= 20) {
        var str = "View Suitable Diet Chart!";
        var result = str.link("img/mesoend.pdf");


    } else {
        var str = "View Suitable Diet Chart!";
        var result = str.link("img/ecto.pdf");

    }
    return result;



}