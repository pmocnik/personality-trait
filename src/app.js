import './style.scss';
import { v4 as uuidv4 } from 'uuid';

//Selectors
const startButton = document.querySelector(".start-button");
const landingPage = document.querySelector(".landing-page");
const questionPage = document.querySelector(".question-page");

const question = document.querySelector(".question");
const answerList = document.querySelector(".answer-list");

let previusButton = document.querySelector(".button-navigate.previus");;
let nextButton = document.querySelector(".button-navigate.next");;

const resultPage = document.querySelector(".result-page");

const footer = document.getElementsByTagName('footer')[0];

//Event listeners
startButton.addEventListener('click', startExam);
answerList.addEventListener('click', clickAnswer);
previusButton.addEventListener('click', clickPrevius);
nextButton.addEventListener('click', clickNext);
console.log();
//Variables

let selectedId = null;
let loadedQuestions = [];
let currentQuestion = null;
let currentTakeUUID = null;

//Setter
footer.innerText = new Date().getFullYear();

//Functions
async function startExam(event) {
    currentTakeUUID = await uuidv4();
    await loadData();
    currentQuestion = 1;
    buildQuestion();
    landingPage.classList.add("hide");
    questionPage.classList.remove("hide");
}

function buildQuestion() {
    disableNextButton(true);
    selectedId = null;
    var loadedQuestion = loadedQuestions.find(question => question.id == currentQuestion);
    if (loadedQuestion == null || loadedQuestion == undefined) return;

    question.innerText = currentQuestion + "/" + loadedQuestions.length + "  " + loadedQuestion.question;
    answerList.innerHTML = "";

    if (currentQuestion == 1) previusButton.classList.add("hide");
    else previusButton.classList.remove("hide");

    if (currentQuestion == loadedQuestions.length) nextButton.innerText = "Finish";
    else nextButton.innerText = "Next question";

    loadedQuestion.answers.forEach(answer => {
        const liElement = document.createElement('li');
        liElement.innerText = answer.answer;
        liElement.classList.add("answer");
        liElement.id = answer.id;
        if (answer.selected) {
            liElement.classList.add("active");
            selectedId = answer.id;
            disableNextButton(false);
        }
        answerList.appendChild(liElement);
    })
}

async function loadData() {
    var response = await fetch("http://localhost:3000/questions");
    if (response.status != 200) return;

    loadedQuestions = await response.json();

    var response2 = await fetch("http://localhost:3000/startExam", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ takeId: currentTakeUUID })
    });
    if (response2.status != 200) return;
}

function disableNextButton(state) {
    if (state) {
        nextButton.classList.add("disabled");
    }
    if (!state) {
        nextButton.classList.remove("disabled");
    }
}


function clickAnswer(e) {
    var children = Array.from(answerList.children);

    if (e.target.classList[0] === 'answer') {
        children.forEach(element => {
            element.classList.remove("active");
        });

        e.target.classList.add("active");

        selectedId = e.target.id;

        loadedQuestions.find(question => question.id == currentQuestion).answers.map(answer => answer.selected = false);

        var loadedAnswer = loadedQuestions.find(question => question.id == currentQuestion).answers.find(answer => answer.id == selectedId);
        console.log(loadedAnswer);
        loadedAnswer.selected = true;
        disableNextButton(false);
    }
}

async function saveAnswer() {
    var response = await fetch("http://localhost:3000/save", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ takeId: currentTakeUUID, questionId: currentQuestion, answerId: selectedId })
    });
    if (response.status != 200) return false;

    return true;
}

async function clickPrevius(e) {
    if (currentQuestion == 1) return;
    if (!(await saveAnswer())) return;
    currentQuestion--;
    buildQuestion();
}

async function clickNext(e) {
    if (selectedId == null) return;
    if (!(await saveAnswer())) return;
    if (currentQuestion == loadedQuestions.length) {
        await finish();
        questionPage.classList.add("hide");
        resultPage.classList.remove("hide");
        return;
    }
    currentQuestion++;
    buildQuestion();
}

async function finish() {
    var response = await fetch("http://localhost:3000/getCalculation?takeId=" + currentTakeUUID);
    if (response.status != 200) return;

    resultPage.innerHTML = "<div>You are: " + await response.json() + "</div>";
    return;
}