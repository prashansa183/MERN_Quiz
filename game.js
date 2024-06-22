const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    "question": "What does MERN stand for in the MERN stack?",
    "choice1": "MongoDB, Express, React, Node.js",
    "choice2": "MySQL, Express, React, Node.js",
    "choice3": "MongoDB, Ember, React, Node.js",
    "choice4": "MongoDB, Express, Redux, Node.js",
    "answer": 1
  },
  {
    "question": "Which component of the MERN stack is used for backend development?",
    "choice1": "MongoDB",
    "choice2": "Express",
    "choice3": "React",
    "choice4": "Node.js",
    "answer": 2
  },
  {
    "question": "In the MERN stack, which library is used for building user interfaces?",
    "choice1": "MongoDB",
    "choice2": "Express",
    "choice3": "React",
    "choice4": "Node.js",
    "answer": 3
  },
  {
    "question": "Which MERN stack component is a NoSQL database?",
    "choice1": "MongoDB",
    "choice2": "Express",
    "choice3": "React",
    "choice4": "Node.js",
    "answer": 1
  },
  {
    "question": "What is the purpose of Node.js in the MERN stack?",
    "choice1": "To manage the database",
    "choice2": "To handle HTTP requests",
    "choice3": "To build the user interface",
    "choice4": "To execute JavaScript on the server",
    "answer": 4
  },
  {
    "question": "Which package manager is commonly used with Node.js?",
    "choice1": "Yarn",
    "choice2": "npm",
    "choice3": "Composer",
    "choice4": "pip",
    "answer": 2
  },
  {
    "question": "Which of the following is a state management library often used with React?",
    "choice1": "Redux",
    "choice2": "Express",
    "choice3": "Axios",
    "choice4": "Mongoose",
    "answer": 1
  },
  {
    "question": "In the MERN stack, which middleware is used for handling asynchronous operations?",
    "choice1": "Express",
    "choice2": "Mongoose",
    "choice3": "Thunk",
    "choice4": "Redux",
    "answer": 3
  },
  {
    "question": "Which of the following is not a valid HTTP method?",
    "choice1": "GET",
    "choice2": "POST",
    "choice3": "FETCH",
    "choice4": "DELETE",
    "answer": 3
  },
  {
    "question": "Which of the following is used to connect Node.js to MongoDB?",
    "choice1": "Mongoose",
    "choice2": "Redux",
    "choice3": "Express",
    "choice4": "React",
    "answer": 1
  }
]
;

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();