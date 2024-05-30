var storedQuestions = JSON.parse(localStorage.getItem("storedQuestions"));
var question;
var answer;
var ranQuestion;
var ranNum;
var ranAnswer;
var language = 'en-US';  // Default language

if (storedQuestions == null) {
    var questions = [];
} else {
    var questions = storedQuestions;
}

$("form").on("submit", function (event) {
    event.preventDefault();
    $("#warning").remove();
    question = $(this).find('[name=addquestion]').val();
    answer = $(this).find('[name=addanswer]').val();
    questions.push([question, answer]);
    localStorage.setItem("storedQuestions", JSON.stringify(questions));
});

$("#deleteQuestions").on("click", function () {
    localStorage.removeItem("storedQuestions");
    questions = [];
    $(".card-front").html("");
    $(".card-back").html("");
});

$("#viewAnswer").on("click", function () {
    $(".card-container").addClass("flip");
    if (!questions[0] || questions[0][0] === undefined) {

    } else {
        $(".card-back").html("<p>" + ranAnswer + "</p>");
        speakAnswer(ranAnswer);
    }
});

$("#newCard").on("click", function () {
    $(".card-container").removeClass("flip");
    ranNum = Math.floor(Math.random() * questions.length);
    if (!questions[0] || questions[0][0] === undefined) {
        if ($("#warning").length === 0) {
            $(".card-container").append("<small class='text-danger' id ='warning'>*Please add a card below</small>");
        } else {
            $("#warning").addClass("red-shadow");
            setTimeout(function () {
                $("#warning").removeClass("red-shadow");
            }, 1000);
        }
    } else {
        console.log(questions);
        ranQuestion = questions[ranNum][0];
        ranAnswer = questions[ranNum][1];
        $(".card-front").html("<p>" + ranQuestion + "</p>");
    }
});

function speakAnswer(text) {
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;  // Set the language
    synth.speak(utterance);
}

function setLanguage(lang) {
    language = lang;
}

$("#language").on("change", function () {
    setLanguage($(this).val());
});

// Example: Change language to Spanish
// setLanguage('es-ES');

MathJax.Hub.Queue(["Rerender", MathJax.Hub, this]);