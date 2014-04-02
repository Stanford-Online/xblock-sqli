/* Javascript for SqlInjectionXBlock. */
function SqlInjectionXBlock(runtime, element) {
    var listOfAnswers = JSON.parse("{{prev_answers_json|escapejs}}");
    var score = "{{problem_score}}";
    var weight = "{{problem_weight}}";
    var attempts = {{attempts}};

    function repaintPreviousAnswers() {
        $(".previous_answer_list", element).html('')
        for (i=0; i<listOfAnswers.length; i++) {
            $("<li>" + listOfAnswers[i] + "</li>").prependTo(".previous_answer_list", element);
        }
    }

    function repaintAttempts(){
        $(".attempt_no", element).text(attempts);
    }

    function declareVictory() {
        $('div.victory', element).html(
            "<p class='tada'>You've logged in as 'bob'!  Congratulations on capturing the flag!</p>"
        );
    }

    function updateLogin(result) {
        $('div.victory', element).html(); // clear the victory message
        $('div.login_failure', element).hide();
        listOfAnswers.push(result.prev_answer);
        repaintPreviousAnswers();
        attempts = result.attempts;
        repaintAttempts();
        if (result.success) {
            $('div.login_screen', element).hide();
            $('span#logged-in-username', element).text(result.username);
            $('span#logged-in-email', element).text(result.email);
            /* special case Bob, who is the winner! */
            if (result.username == 'bob') {
                declareVictory();
            }
            $('div.welcome', element).show();
            score = result.student_score;
            updateScore();
        } else {
            $('div.login_failure', element).show();
            score = result.student_score;
            updateScore();
        }
    }

    var handlerUrl = runtime.handlerUrl(element, 'login');

    $('button', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({
                "username": $('input#sqli_username').val(),
                "password": $('input#sqli_password').val()
            }),
            success: updateLogin
        });
    });

    function updateScore() {
        if (score !== null && score != "None") {
            $(".problem_score", element).text(score);
            $(".problem_weight", element).text(weight);
            $(".user_score", element).show();
        }
    }

    $(function ($) {
        updateScore();
        repaintPreviousAnswers();
        repaintAttempts();
    });
}