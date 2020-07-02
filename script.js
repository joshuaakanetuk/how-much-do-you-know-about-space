let currentQuestion = -1;
let currentScore = 0;
let answeredQuestion = false;
let finished = false;

const QUESTIONS = [
    {
        q: `How much does a NASA spacesuit cost?`,
        a: `$12,000,000`,
        options: ['$12,000,000', '$50,000,000', '$12,000', '$50,000']
    },
    {
        q: 'How many moons does Jupiter have?',
        a: '79',
        options: ['62', '79', '33', '12']
    },
    {
        q: 'What year did man land on the moon?',
        a: '1969',
        options: ['1959', '1969', '1980', '1865']
    },
    {
        q: 'Which company had the first commercial (non-NASA) manned space flight?',
        a: 'SpaceX',
        options: ['Blue Origin', 'SpaceX', 'Virgin Galactic', 'Boeing']
    },
    {
        q: 'What are russian astronauts called?',
        a: 'cosmonauts',
        options: ['space creatures', 'pilots', 'cosmonauts', 'aeronauts']
    }

]

// Helper functions
function toggleScore() {
    $('#stats').toggleClass('hidden');
}

function updateButtonText(text) {
    $('#go').val(text);
}


function createOptionsElement(item) {
    return `<label for="${item}">${item}</label>
    <input type="radio" name="option" id="${item}" value="${item}" /><br />`
}

// Game logic
$('#go').on('click', function (e) {
    e.preventDefault();
    buttonHandler();
});

function renderStartScreen() {
    currentQuestion = -1;
    currentScore = 0;
    answeredQuestion = false;
    finished = false;
    $('#question-text').html("How much do you know about Space?");
    $('#question-options').html("");
    updateButtonText('Start Quiz');
    $('#feedBack').text('');
}

function buttonHandler() {
    // if this is the start quiz screen
    // move to first questions
    if (currentQuestion === -1) {
        currentQuestion++;
        updateButtonText('Submit Answer');
        toggleScore();
        renderCurrentQuestion();
    }
    else if (finished) {
        renderStartScreen();
    }
    else {
        optionChecker();
    }
}

function optionChecker() {
    if (!($('input[name=option]:checked', 'form').val())) {
        $('#feedBack').text('Pick a option to answer the quiz.');
    }
    else {
        if (answeredQuestion) {
            if ((currentQuestion + 1) === QUESTIONS.length) {
                renderEndScreen();
            }
            else {
                currentQuestion++;
                renderCurrentQuestion();
            }


        }
        else {
            if ($('input[name=option]:checked', 'form').val() === QUESTIONS[currentQuestion].a) {
                currentScore++;
                feedBack(true);
            }
            else {
                feedBack(false);
            }
        }
    }


}

// did the user answer correctly and update score
function feedBack(isCorrect) {
    updateButtonText('Next');
    if (isCorrect) {
        $('#question-text').html(QUESTIONS[currentQuestion].q + "<br><span class='good js'>You are correct!</span>");
    }
    else {
        $('#question-text').html(QUESTIONS[currentQuestion].q + "<br><span class='bad js'>You are incorrect!<br> The answer is " + QUESTIONS[currentQuestion].a + ".</span>");
    }
    answeredQuestion = true;
}

function renderCurrentQuestion() {
    if (currentQuestion >= 0) {
        answeredQuestion = false;
        updateButtonText('Submit Answer');
        $('#question-text').text(QUESTIONS[currentQuestion].q);
        $('#feedBack').text('');
        renderCurrentOptions();
        renderStats();
    }
}

function renderStats() {
    $('#stats').html(`<li>Question ${currentQuestion + 1} of ${QUESTIONS.length}</li>
    <li>Score: ${currentScore} correct, ${currentQuestion - currentScore} incorrect</li>`)
}

function renderCurrentOptions() {
    const opts = QUESTIONS[currentQuestion].options.map((item) => createOptionsElement(item));
    $('#question-options').html(opts);
}

function renderEndScreen() {
    toggleScore();
    $('#question-text').html(`You got ${currentScore} correct and ${(currentQuestion + 1) - currentScore} incorrect!`);
    $('#question-options').html("");
    updateButtonText('Restart Quiz');
    finished = true;
}


$(renderStartScreen);