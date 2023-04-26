We partially refactored code in the JavaScript file of the chat page:

Old Code:
```javascript
function sendMessage(event) {
    var messageContent = document.getElementById("chatinput").value.trim();
    if (messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        document.getElementById('chatinput').value = '';
        document.getElementById('chatbox').innerHTML += "<div class='msg right'>" + messageContent + '</div>';
        console.log(chatMessage);
    }
    event.preventDefault();
}
```

New Code:
```javascript
var messageInput = document.getElementById("chatinput")
var messageContent = document.getElementById("chatinput").value.trim();

function sendMessage(event) {
    if (messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
        document.getElementById('chatbox').innerHTML += "<div class='msg right'>" + messageContent + '</div>';
        console.log(chatMessage);
    }
    event.preventDefault();
}
```


While this doesn't look like much of a change, by declaring the variables globally,
we can easily reuse them in other functions in the script, that have yet to be written as of 26.04.23.
Therefore, we save some code duplication.
In the backend, there was nothing that needed to be immediately refactored, as we strictly confine to the MVC design pattern,
which is also recommended by the Spring Framework.