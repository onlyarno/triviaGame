var card = $("#quiz-area");

// Question set
var questions = [
    {
        question: "I have 10 cookies.  I move four cookies to the table on the left.  How many cookies do I now have?",
        answers: ["6", "4", "0", "10"],
        correctAnswer: "10"
    },
    {
        question: "What year is it?",
        answers: ["1720", "1820", "1920", "2020"],
        correctAnswer: "2020"
    },
    {
        question: "Which is one company that secretly controls the world?",
        answers: ["Circuit City", "7-Eleven", "Disney", "Pappadeaux"],
        correctAnswer: "Disney"
    },
    {
        question: "Who is a good artist?",
        answers: ["James Blunt", "Beethoven", "Justin Beiber", "One Direction"],
        correctAnswer: "Beethoven"
    },
    {
        question: "What is 1 + 1?",
        answers: ["1", "2", "3", "22"],
        correctAnswer: "2"
    },
    {
        question:
            "Who can solo Thanos?",
        answers: ["The Blob", "Iron-Fist", "Squirrel-Girl", "Jubilee"],
        correctAnswer: "Squirrel-Girl"
    },
    {
        question: "What is the worst browser?",
        answers: ["Internet Explorer", "Google Chrome", "Safari", "Firefox"],
        correctAnswer: "Internet Explorer"
    },

];

var timer;

var game = {
    correct: 0,
    incorrect: 0,
    counter: 120,

    countdown: function () {
        game.counter--;
        $("#counter-number").html(game.counter);
        if (game.counter === 0) {
            console.log("time's up.");
            game.done();
        }
    },

    start: function () {
        timer = setInterval(game.countdown, 1000);

        $("#sub-wrapper").prepend(
            "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
        );

        $("#start").remove();

        for (var i = 0; i < questions.length; i++) {
            card.append("<h2>" + questions[i].question + "</h2>");
            for (var j = 0; j < questions[i].answers.length; j++) {
                card.append("<input type='radio' name='question-" + i +
                    "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
            }
        }

        card.append("<button id='done'>Done</button>");
    },

    done: function () {
        var inputs = card.children("input:checked");
        for (var i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).val() === questions[i].correctAnswer) {
                game.correct++;
            } else {
                game.incorrect++;
            }
        }
        this.result();
    },

    result: function () {
        clearInterval(timer);

        $("#sub-wrapper h2").remove();

        card.html("<h2>All Done!</h2>");
        card.append("<h3>Correct Answers: " + this.correct + "</h3>");
        card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    }
};

// CLICK EVENTS

$(document).on("click", "#start", function () {
    game.start();
});

$(document).on("click", "#done", function () {
    game.done();
});
