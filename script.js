// DOM elements selection
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScore = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz Questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// EVENT LISTENERS
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // var reset
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const totalQuestions = quizQuestions.length;
  totalQuestionSpan.textContent = totalQuestions;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answerDisabled) return;
  answerDisabled = true;
  const selectedButton = event.currentTarget;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add("correct");
    } else if(button === selectedButton) {
      button.classList.add("incorrect");
    }

  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    // check id there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult(){
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    finalScore.textContent = score;
    maxScoreSpan.textContent = quizQuestions.length;

    const percentage = (score/quizQuestions.length)*100;
    if(percentage === 100 ){
        resultMessage.textContent = "Perfect! You are a genius!";
    } else if(percentage >= 80){
        resultMessage.textContent = "Great Job! You know your stuff!";
    } else if(percentage >= 60){
        resultMessage.textContent = "Good efoort! Keep learning!";
    } else if(percentage >= 40){
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep learning! You will get better!";
    } 
}

function restartQuiz() {
  resultScreen.classList.remove('active');
 startQuiz();
}

// startButton.addEventListener('click', ()=>{console.log('start button clicked')})
