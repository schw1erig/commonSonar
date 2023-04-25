function send() {
    var msg = document.getElementById('chatinput').value;
    document.getElementById('chatinput').value = '';
    document.getElementById('chatbox').innerHTML += "<div class='msg right'>" + msg + '</div>';
}

var button = document.getElementById("sendButton");

button.addEventListener("click", function(event) {
    event.preventDefault();
    send();
});