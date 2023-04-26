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

An additional refactor that we made is the following:

Old Code:

UserController.java
```java
@PostMapping("/user/save")
public ResponseEntity<ApplicationUser>saveUser(@RequestBody ApplicationUser user)
{
    URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString()); //get url
    try{
        if(userService.getUser(user.getUsername()).getUsername().equals(user.getUsername()))
        {
            return ResponseEntity.badRequest().body(user);
        }
    } catch(NullPointerException e) {
        user.setRole(ApplicationUser.Role.USER);
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    return ResponseEntity.badRequest().build();
}
```

New Code:
```java
@PostMapping("/user/save")
public ResponseEntity<ApplicationUser>saveUser(@RequestBody ApplicationUser user)
{
    URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString()); //get url
    String registerUsername = user.getUsername();

    if (userService.getUser(registerUsername) == null) {
        user.setRole(ApplicationUser.Role.USER);
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    } else {
        System.out.println("User already exists");
        return ResponseEntity.badRequest().build();
    }
}
```

This code snippet in particular deals with registering new users via the api and persisting them in the database.
For our application we decided to only allow a username to exist once.
To ensure a username only exists once, we have to check for existing usernames everytime someone tries to register a new user.
We adjusted the UserService.java as well, which will get a user by their username. Should the user not exist,
it returns ``null``.
Due to this change, the code is much easier to understand and simpler to use.
Below you find the change of the mentioned UserService.java

Old Code:
```java
public ApplicationUser getUser(String username)
{
    log.info("Fetching user {}", username);
    return repo.findByUsername(username);
}
```

New Code:
```java
public ApplicationUser getUser(String username)
{
    log.info("Fetching user {}", username);
    try {
        return repo.findByUsername(username);
    }
    catch (Exception e) {
        System.out.println(e);
        return null;
    }
}
```