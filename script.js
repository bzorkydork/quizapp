
// define variables to store quiz score/question number. 
let score = 0;
let questionNumber = 0;

// function to generate questions for quiz.
function generateQuestion(){
  if (questionNumber < STORE.length){
    return createQuestion(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(10);
  }
}
//raise value of score and updates text value.
function updateScore() {
  score++;
  $('.score').text(score);
}

//raise value of question number and update text.
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

// reset value of question num by 1 and updates the text.
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

// start the quiz.
function startQuiz() {
  $('.altBox').hide();
  $('.quizBox').on('click', '.beginQuizButton', function (event) {
    $('.quizBox').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//submits/checks answer against correct answer in STORE.
function submitAnswer() {
  $('main').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

function createQuestion(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].options.forEach(function (answerValue, answerIndex) {
    $(`<label class="quizSize" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

function correctAnswer() {
  $('.response').html(
    `<h3>You got it right!</h3>
    <img src="images/success.jpg" alt="DJ celebrating at a show" class="images">
      <p class="quizSize">Party on, raver!</p>
      <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

function wrongAnswer() {
  $('.response').html(
    `<h3>Not the right one.</h3>
    <img src="images/failure.jpg" alt="sad DJ in a room" class="images">
    <p class="quizSize">It's actually:</p>
    <p class="quizSize">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

function nextQuestion() {
  $('main').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

function finalScore() {
  $('.final').show();

  const pass = [
    'You passed!',
    'images/win.jpg',
    'big edm festival',
    'A true EDM master!'
  ];

  const fail = [
    'Oof, not quite there chief',
    'images/loss.jpg',
    'empty EDM show',
    'Try again?'
  ];

  if (score >= 7) {
    array = pass; 
  } else {
    array = fail;
  }
  return $('.final').html(
    `<h3>${array[0]}</h3>
      <img src="${array[1]}" alt="${array[2]}" class="images">
        <h3>Your score is ${score} / 10</h3>
        <p class="quizSize">${array[3]}</p>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

function restartQuiz() {
  $('.final').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.quizBox').show();
  });
}

function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
