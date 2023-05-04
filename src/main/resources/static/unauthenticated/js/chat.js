const button = document.getElementById("sendButton");
let stompClient = null;
const emojiRegex = /(:\)|;\)|:\(|:'\(|:D|:P|:O|:c)/g;


button.addEventListener("click", sendMessage, true);

function connect(event) {
    const socket = new SockJS('/ws');
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
    const messageInput = document.getElementById("chatinput").value.trim();
    const messageContent = emojiConverter(messageInput);
    if(messageContent && stompClient) {
        let chatMessage = {
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
    const message = JSON.parse(payload.body);

    const messageElement = document.createElement('div');

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
        const usernameElement = document.createElement('span');
        const usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }
    const textElement = document.createElement('p');
    const messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);
    document.getElementById('chatbox').appendChild(messageElement);
}

function onError(error) {}

function emojiConverter(text) {
    const emojiMap = {
        ":)": "😊",
        ";)": "😉",
        ":(": "😔",
        ":'(": "😢",
        ":D": "😀",
        ":P": "😛",
        ":O": "😲",
        ":c": "☹️"
    };
    console.log(text.replace(emojiRegex, (match) => emojiMap[match]));
    return text.replace(emojiRegex, (match) => emojiMap[match]);
}

window.onload = connect;
