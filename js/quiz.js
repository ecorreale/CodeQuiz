$(document).ready(StartScript);

console.log("Quiz");
var _timeLimit = 40;
var _tRemaining;
var _penalty = 20;
var _questions = LoadQuestions();
var _qIDX = 0;
var _qCorrect = 0




function StartScript() {
    $(".qCount").text(_questions.length);
    $("#timeLimit").text(_timeLimit);
    $("#penalty").text(_penalty);
}



function StartQuiz() {

    $("#instructionsPanel").hide();
    $("#quizSection").show();

    _qIDX = 0;

    console.log("Calling ShowQuestion()");

    ShowQuestion(_qIDX);
    $("#btnPrev").hide();
    StartTimer(_timeLimit);

    $("#qNumber").text((_qIDX + 1));
}





function StartTimer(tLimit) {

    _tRemaining = tLimit;

    var tField = $("#timer");
    tField.text(_tRemaining);

    var tInterval = setInterval(function() {

        if (_tRemaining <= 0) {
            clearInterval(tInterval);
            _tRemaining = 0;
            QuizComplete();
        }

        tField.text(_tRemaining--);

    }, 1000);
}

function NextQuestion() {
    if (_tRemaining > 0) {
        if (_qIDX < _questions.length - 1) {
            _qIDX++;
            console.log("Requesting Question #" + _qIDX);
            ShowQuestion(_qIDX);
        } else {
            QuizComplete();
        }
    }
}


function ShowQuestion(qIDX) {
    console.log("showing question: ");

    var question = _questions[qIDX];
    var qChoiceDiv = $("#qChoices");
    var choiceNum = 0;

    qChoiceDiv.empty(); // Clear previous Question Choices if any
    $("#qText").text(question.Text);
    $("#qNumber").text(qIDX + 1)

    for (var IDX = 0; IDX < 4; IDX++) {

        choiceNum = IDX + 1;

        var btnDiv = $("<div>");
        btnDiv.prop("class", "btnContainer");

        var btnNode = $("<a>");
        btnNode.attr("onclick", "checkAnswer(" + choiceNum + "," + question.Answer + ")");
        btnNode.prop("class", "ChoiceBtn");
        btnNode.prop("href", "#");

        btnNode.text(choiceNum + ". " + question.Choice[IDX]);
        btnDiv.append(btnNode);

        qChoiceDiv.append(btnDiv);
    }
}


function checkAnswer(selection, answer) {
    console.log("Selection:" + selection + "  Answer:" + answer);
    if (selection == answer) {
        _qCorrect++;
    } else {
        _tRemaining -= _penalty;
    }
    NextQuestion(_qIDX);
}


function QuizComplete() {

    $("#score").text(_tRemaining);

    $("#quizSection").hide();
    $("#quizCompleteSection").show();
    $("#correct").text(_qCorrect)
}


function saveScore() {
    var initials = $("#initTextBox").val();
    console.log("Initials saved: " + initials);
    localStorage.setItem(initials, _tRemaining);
    showConfirmation(initials);
}

function showConfirmation(myInitials) {

    $("#savedInitials").text(myInitials);
    $("#savedScore").text(localStorage.getItem(myInitials));
    $("#quizCompleteSection").hide();
    $("#confSection").show();
}


// Define Question object
function Question() {
    this._QuestionText = "";
    this._Answer;
    this.Choice = new Array();
}

// Define property accessors for property object

Object.defineProperty(Question, 'Text', {
    get() {
        return _QuestionText;
    },
    set(value) {
        this._QuestionText = value;
    }
});


Object.defineProperty(Question, 'Answer', {
    get() {
        return this._Answer;
    },
    set(value) {
        this._Answer = value;
    }
});



function LoadQuestions() {

    var questions = new Array();

    var Q1 = new Question();
    Q1.Text = "One way to declare an array in Javascript is";
    Q1.Answer = '3';
    Q1.Choice.push('Pray for a Snow Day');
    Q1.Choice.push('var myArray = one');
    Q1.Choice.push('var myArray = new Array()');
    Q1.Choice.push("I'd Google It");
    questions.push(Q1);


    var Q2 = new Question();
    Q2.Text = "Which of these are keywords in Javascript";
    Q2.Answer = '3';
    Q2.Choice.push("privates");
    Q2.Choice.push("Implementor");
    Q2.Choice.push("this");
    Q2.Choice.push("variable");
    questions.push(Q2);

    var Q3 = new Question();
    Q3.Text = "What does this line of code do`nMath.floor(Math.random() * 10); ";
    Q3.Answer = '1';
    Q3.Choice.push("returns a random integer from 0 to 9 ");
    Q3.Choice.push("returns a random integer from 0 to 10 ");
    Q3.Choice.push("Generates an error.");
    Q3.Choice.push("Nothing");
    questions.push(Q3);


    return questions;
}