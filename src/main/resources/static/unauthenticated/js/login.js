function sendCredentials() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var data = new FormData();
    data.append("username", username);
    data.append("password", password);

    fetch("/login", {
      method: "POST",
      body: data
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    });
  }