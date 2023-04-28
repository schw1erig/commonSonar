const button = document.getElementById("log")

function sendCredentials() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    const data = {
        username: username,
        password: password,
        email: email
    };

    fetch("/api/user/save", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(result => {
            console.log(result);
            if (result.status === 201) {
                window.location.href = "/login";
            }
            else if (result.status === 400) {
                alert("The user account already exists");
            }
        })
}

button.addEventListener("click", sendCredentials);
document.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendCredentials();
    }
});