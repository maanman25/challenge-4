document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "London", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      question: "Which programming language is known for building web pages?",
      options: ["Java", "Python", "HTML", "C++"],
      correctAnswer: "HTML",
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Counter Strike: Source",
        "Computer Style Sheets",
        "Creative Style System",
        "Cascading Style Sheets",
      ],
      correctAnswer: "Cascading Style Sheets",
    },
    {
      question: "In JavaScript, what is a function?",
      options: [
        "A data type",
        "A loop",
        "A set of instructions",
        "An event listener",
      ],
      correctAnswer: "A set of instructions",
    },
    {
      question: "Which year was JavaScript first introduced?",
      options: ["1995", "2000", "1985", "2010"],
      correctAnswer: "1995",
    },
  ];

  let currentQuestionIndex = 0;
  let timeLeft = 60;
  let highScores = [];

  function startQuiz() {
    hideElement("home-container");
    const quizContainer = document.getElementById("quiz-container");
    showElement("quiz-container");

    if (quizContainer) {
      quizContainer.style.backgroundColor = getComputedStyle(
        document.getElementById("home-container")
      ).backgroundColor;
      quizContainer.style.width = getComputedStyle(
        document.getElementById("home-container")
      ).width;
      quizContainer.style.marginTop = getComputedStyle(
        document.getElementById("home-container")
      ).marginTop;
    }

    displayQuestion();
    startTimer();

    const nextButton = document.getElementById("next-button");
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length - 1) {
          currentQuestionIndex++;
          displayQuestion();
        } else {
          endQuiz();
        }
      });
    }
  }

  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");

    if (currentQuestion && questionContainer && optionsContainer) {
      questionContainer.innerHTML = `<p>${currentQuestion.question}</p>`;
      optionsContainer.innerHTML = "";

      currentQuestion.options.forEach((option) => {
        const button = createOptionButton(option);
        button.addEventListener("click", () =>
          checkAnswer(option, currentQuestion.correctAnswer)
        );
        optionsContainer.appendChild(button);
      });
    }
  }

  function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
      console.log("Correct!");
    } else {
      console.log("Incorrect!");
      timeLeft -= 10;
    }

    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      displayQuestion();
    } else {
      endQuiz();
    }
  }

  function startTimer() {
    const timer = setInterval(() => {
      const timeSpan = document.getElementById("time");

      if (timeSpan) {
        timeSpan.innerText = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timer);
          endQuiz();
        } else {
          timeLeft--;
        }
      }
    }, 1000);
  }

  function endQuiz() {
    hideElement("quiz-container");

    const highscoreContainer = document.getElementById("highscore-container");
    showElement("highscore-container");

    const initialsInput = document.getElementById("initials-input");
    const saveButton = document.getElementById("save-button");

    if (!initialsInput && !saveButton) {
      const initialsInput = createInput(
        "Enter your initials",
        "initials-input"
      );

      const saveButton = createButton("Save", "save-button");

      highscoreContainer.appendChild(initialsInput);
      highscoreContainer.appendChild(saveButton);

      saveButton.addEventListener("click", saveHighScore);
    }
  }

  function createInput(placeholder, id) {
    const input = document.createElement("input");
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("id", id);
    return input;
  }

  function createButton(text, id) {
    const button = document.createElement("button");
    button.innerText = text;
    button.setAttribute("id", id);
    return button;
  }

  function calculateUserScore() {
    return questions.filter(
      (question) => question.selectedOption === question.correctAnswer
    ).length;
  }

  function saveHighScore() {
    const initialsInput = document.getElementById("initials-input");
    const userInitials = initialsInput.value;
    const userScore = calculateUserScore();

    highScores.push({ initials: userInitials, score: userScore });

    updateHighScores();
  }

  function updateHighScores() {
    const highScoresContainer = document.getElementById("highscores-list");

    highScoresContainer.innerHTML = "";

    highScores.forEach((entry, index) => {
      const scoreEntry = document.createElement("div");
      scoreEntry.innerText = `${index + 1}. ${entry.initials}: ${entry.score}`;
      highScoresContainer.appendChild(scoreEntry);
    });
  }

  const highscoreButton = document.getElementById("highscore-button");
  if (highscoreButton) {
    highscoreButton.addEventListener("click", () => {
      hideElement("home-container");
      showElement("highscore-container");
      updateHighScores();
    });
  }

  function calculateUserScore() {
    return questions.filter((question) => question.correct).length;
  }

  function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.display = "none";
    }
  }

  function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.display = "block";
    }
  }

  function createOptionButton(option) {
    const button = document.createElement("button");
    button.innerText = option;
    return button;
  }

  const startButton = document.getElementById("start-button");
  if (startButton) {
    startButton.addEventListener("click", startQuiz);
  }
});
