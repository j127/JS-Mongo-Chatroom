$(document).ready(function() {
    var userName,
        dateStamp = new Date().getTime();
    if (localStorage.getItem('userName') === null) {
        // Replace this with a function to get the name:
        localStorage.setItem('userName', dateStamp);
    } else {
        userName = localStorage.getItem('userName');
    }
    var messages = {},
        counter = 0;
    $('button').on('click', function(e) {
        e.preventDefault();
        var currentMessage = $('input').val();
        var messageString = '<span class="username">' + userName + ':</span> ' + currentMessage;
        $('#messageArea').append(messageString + '<br>');
        $('input').val('');
        counter++;

        // TODO: add username to messages and send via AJAX
        localStorage.setItem('message' + counter, currentMessage);
    });
    function requestUserName() {
        // get the username in the input box, then switch it out
    }
});
