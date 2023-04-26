var button = document.getElementById("sendButton");
var stompClient = null;

button.addEventListener("click", sendMessage, true);

function connect(event) {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
    event.preventDefault();
}

function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )
}

function sendMessage(event) {
    var messageContent = document.getElementById("chatinput").value.trim();
    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        document.getElementById('chatinput').value = '';
        document.getElementById('chatbox').innerHTML += "<div class='msg right'>" + messageContent + '</div>';
    }
    event.preventDefault();
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('div');

    if(message.type === 'JOIN') {
        messageElement.classList.add('user-event', 'msg');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('user-event', 'msg');
        message.content = message.sender + ' left!';
    } else if (message.sender === username) {
        return;
    }
    else {

        messageElement.classList.add('left', 'msg');
        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }
    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);
    document.getElementById('chatbox').appendChild(messageElement);
}

function onError(error) {}

window.onload = connect;
