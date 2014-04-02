/* Javascript for SqlInjectionXBlock. */
function SqlInjectionXBlock(runtime, element) {

    function updateLogin(result) {
        if (result.success) {
            $('div.login_screen', element).hide();
            $('span#logged-in-username', element).text(result.username);
            $('span#logged-in-email', element).text(result.email);
            $('div.welcome', element).show();
            /* special case Bob, who is the winner! */
            if (result.username == 'bob') {
                $("<p class='tada'>You've logged in as 'bob'!  Congratulations on capturing the flag!</p>")
                    .appendTo('div.welcome', element);
            }
        } else {
            $('div.login_failure', element).show();
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

    $(function ($) {
        if ($(element).data('done')=="True") {
            updateLogin({"success":true, "username":"bob", "email":"bob@bob.com"});
        }
    });
}