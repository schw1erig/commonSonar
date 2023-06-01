const button = document.getElementById("sendButton");
const chatBox = document.getElementById("chatbox");
let stompClient = null;
const emojiRegex = /(:\)|;\)|:\(|:'\(|:D|:P|:O|:c)/g;
let scrolled = false;



button.addEventListener("click", sendMessage, true);

function connect(event) {
    const socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
    event.preventDefault();
}

function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/'+topic, onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )
}

function sendMessage(event) {
    const messageInput = document.getElementById("chatinput").value.trim();
    const messageContent = emojiConverter(messageInput);
    const messageElement = document.createElement('div');
    if(messageContent && stompClient) {
        let chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        document.getElementById('chatinput').value = '';
        messageElement.classList.add('right', 'msg');
        const textElement = document.createElement('p');
        const messageText = document.createTextNode(messageContent);
        textElement.appendChild(messageText);
        messageElement.appendChild(textElement);
        scrolled = false;
        document.getElementById('chatbox').appendChild(messageElement);
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
        scrollToNew();
        return;
    }
    else {
        messageElement.classList.add('left', 'msg');
        const usernameElement = document.createElement('p');
        const usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }
    const textElement = document.createElement('p');
    const messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);
    messageElement.appendChild(textElement);
    setScroll();
    document.getElementById('chatbox').appendChild(messageElement);
    scrollToNew();
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
    return text.replace(emojiRegex, (match) => emojiMap[match]);
}

chatBox.addEventListener("scroll", setScroll)

function setScroll() {
    console.log(scrolled)
    console.log(chatBox.clientHeight + chatBox.scrollTop);
    console.log(chatBox.scrollHeight);
    if ((chatBox.clientHeight + chatBox.scrollTop) === chatBox.scrollHeight) {
        scrolled = false;
    }
    else {
        scrolled = true;
    }
}

function scrollToNew() {
    if(!scrolled) {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

window.onload = connect;
