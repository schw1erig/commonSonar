# 2. Overall Description
## 2.1 Vision

The corona pandemic caused reduced personal contact with our fellow human beings. That is why we have set ourselves the goal of reuniting people in times of isolation. 

Common enables the exchange of “common” topics through a chatportal. This will be set up in a web application. The user chooses their preferred topic of conversation using an input option that allows them to define their topic of interest. Users with the same interests are matched by a random system and can exchange via a chat.

### 2.2 Use Case Diagram

### 2.3 Technology Stack

The technology we use is:
Backend: -SpringFramework
Frontend: tbd
IDE: -IntelliJ
Project Management: -Jira -GitHub -Discord
Deployment: -Java
Testing: tbd

# 3. Specific Requirements
## 3.1 Functionality

This section will explain the different use cases, you could see in the Use Case Diagram, and their functionality

* 3.1.1 Choose username / Choose topic text
* 3.1.2 Chat
* 3.1.3 Quit chat/disconnect
* 3.1.4 Block another user

3.1.1 Choose username / Choose topic text

This will be the beginning for every interaction on our platform.
The user will be able to choose a username which will be visible to the chat partner, once a successful match has been made.
Additionally, a topic of interest has to be entered. This will be used as a basis to make a match with another person.

3.1.2 Chat

This will be the main activity and will be automatically visible to the user, once a successful match has been made.
Here the user can chat with the matched partner.

3.1.3 Quit chat / disconnect

To provide an option to leave the session, the user can click a button and the session will be terminated.
Once the session has been terminated, the users will both respectively be dropped back to the "Choose topic" window described in 3.1.1.

3.1.4 Block user

If one of the opposing partners is going against our user guidelines, the user has the option to report the user.
Should this happen, the IP address of the opposing partner and the IP address of the user will be logged, and ensured that a match between those partners can no longer happen.
The session will be terminated.
