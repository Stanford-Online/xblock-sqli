/* Javascript for SqlInjectionXBlock. */
function SqlInjectionXBlockStudioEdit(runtime, element) {


    var handlerUrl = runtime.handlerUrl(element, 'change_problem');

    $('button', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"problem_id": $("#problem_id_select", element).val()}),
            success: location.reload()
        });
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}