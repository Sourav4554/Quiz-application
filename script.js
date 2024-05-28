const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyperlinks and Text Markup Language", correct: "false" },
      { text: "Hyper Text Markup Language", correct: "true" },
      { text: "Home Tool Markup Language", correct: "false" },
      { text: "Hyper Tool Markup Language", correct: "false" },
    ],
  },
  {
    question: "Choose the correct HTML tag for the largest heading?",
    answers: [
      { text: "<h1>", correct: "true" },
      { text: "<heading>", correct: "false" },
      { text: "<head>", correct: "false" },
      { text: "<h6>", correct: "false" },
    ],
  },
  {
    question: "What is the correct HTML tag for inserting a line break?",
    answers: [
      { text: "<p>", correct: "false" },
      { text: "<span>", correct: "false" },
      { text: "<br>", correct: "true" },
      { text: "<h6>", correct: "false" },
    ],
  },
  {
    question: "Which of these tags are all table tags?",
    answers: [
      { text: "<table><head><tfoot>", correct: "false" },
      { text: "<table><tr><td>", correct: "true" },
      { text: "<thead><body><tr>", correct: "false" },
      { text: "<table><tr><tt>", correct: "false" },
    ],
  },
  {
    question: "What is the correct HTML for making a checkbox?",
    answers: [
      { text: "<checkbox>", correct: "false" },
      { text: '<input type="checkbox">', correct: "true" },
      { text: "<check>", correct: "false" },
      { text: '<input type="check">', correct: "false" },
    ],
  },
  {
    question: "What does CSS stand for??",
    answers: [
      { text: "Creative Style Sheets", correct: "false" },
      { text: "Computer Style Sheets", correct: "false" },
      { text: "Cascading Style Sheets", correct: "true" },
      { text: "Colorful Style Sheets", correct: "false" },
    ],
  },
  {
    question: "What is the purpose of the script tag in HTML??",
    answers: [
      { text: " To define the pages structure", correct: "false" },
      { text: "To include external CSS styles", correct: "false" },
      { text: " To include external JavaScript code", correct: "true" },
      { text: "To create hyperlinks", correct: "false" },
    ],
  },
  {
    question: "Which property is used to change the left margin of an element?",
    answers: [
      { text: "padding-left", correct: "false" },
      { text: "margin-left", correct: "true" },
      { text: "<head>", correct: "false" },
      { text: "<h6>", correct: "false" },
    ],
  },
  {
    question: "Which CSS property is used to change the font size of text?",
    answers: [
      { text: "font-size", correct: "true" },
      { text: "weight", correct: "false" },
      { text: "font-wight", correct: "false" },
      { text: "size", correct: "false" },
    ],
  },
  {
    question:
      "Which HTTP method is typically used to retrieve data from a web server?",
    answers: [
      { text: "GET", correct: "true" },
      { text: "POST", correct: "false" },
      { text: "PUT", correct: "false" },
      { text: "DELETE", correct: "false" },
    ],
  },
];

const startQuiz = document.querySelector(".start-quiz");
const startButton = document.querySelector(".start-button");
const hideDiv = document.getElementById("div-3");
const backButton = document.querySelector(".back-button");
const mainDiv = document.querySelector(".main");
const continueButton = document.querySelector(".continue-button");
const secondContainer = document.querySelector(".second-main");

const questionsPortion = document.getElementById("questions");
const answerButtons = document.querySelector(".answer-buttons");
const QuestionNumberCalc = document.querySelector(".m-q");
const nextButton = document.getElementById("next-btn");
const span2 = document.getElementById("question");
const exitButton = document.querySelector(".next-btn");
const span1 = document.getElementById("mark");
const heading = document.querySelector(".heading");
const btnPortion = document.querySelector(".buttonportion");
let questionNumber;
let currentQuestionIndex;
let score = 0;

//Starting of quiz
function startquiz() {
  heading.innerHTML = "Web Quiz";
  exitButton.style.display = "none";
  questionNumber = 0;
  score = 0;
  span1.innerHTML = `Score:${score}/${questions.length}`;
  currentQuestionIndex = 0;
  nextButton.style.display = "none";
  showQuestions();
}
//display question and answer
function showQuestions() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionsPortion.innerHTML = `${questionNumber}.${currentQuestion.question}`;
  span2.innerText = `Question:${questionNumber}/${questions.length}`;
  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct === "true") {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", showAnswer);
  });
}
//deleting the buttons
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.firstChild.remove(answerButtons.firstChild);
  }
}
//check the answer is correct or not
function showAnswer(e) {
  let selectBtn = e.target;
  let isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
    span1.innerHTML = `Score:${score}/${questions.length}`;
    console.log(span1);
  } else {
    selectBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((e) => {
    if (e.dataset.correct === "true") {
      e.classList.add("correct");
    }
    e.classList.add("disable");
  });
  nextButton.style.display = "block";
}
//points to next auestion when clicking the next button
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    showMark();
    span2.style.display = "none";
    span1.style.display = "none";
  }
}
//displaying mark
function showMark() {
  resetState();
  heading.innerHTML = "Quiz Completed !...........";
  questionsPortion.classList.add("active");
  questionsPortion.innerHTML = `${score} out of ${questions.length}`;
  exitButton.style.display = "block";
  nextButton.innerHTML = "play Again";
  nextButton.style.display = "block";
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    span2.style.display = "block";
    span1.style.display = "block";
    questionsPortion.classList.remove("active");
    startquiz();
  }
});
exitButton.addEventListener("click", () => {
  secondContainer.classList.remove("active");
  setTimeout(() => {
    location.reload();
  }, 1000);
});
startquiz();
continueButton.addEventListener("click", () => {
  startQuiz.classList.add("active");
  hideDiv.classList.remove("active");
  secondContainer.classList.add("active");
});

startButton.addEventListener("click", () => {
  hideDiv.classList.add("active");
  mainDiv.classList.add("active");
});
backButton.addEventListener("click", () => {
  mainDiv.classList.remove("active");
  hideDiv.classList.remove("active");
});

window.addEventListener("load", () => {
  startQuiz.classList.add("start-quiz-1");
});
