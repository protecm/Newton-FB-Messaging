# Newton-FB-Messaging
Automated web system for sending chat messages over FB - (educational purposes)

# Description:
The project is a complete system that have the ability to automate chat messages.
The system have a web client with a simple UI.
To use the system a user must have valid FB account, after login with the FB credentials the user will have the ability to automate 
chat messages with 2 main options:
1. Pull the FB friends and filter the list if necessary by gender or id.
2. Load an external file that contains FB ids.

The messages are sent asynchronously - the server developed with a task manager (multiple tasks supported).
The tasks progress is monitored and controlled from the web client.

# Technical Info:
The system developed with 2 backends:
1. Node.JS - HTTP Server.
2. Java - Automation server (uses Selenium).

DB - NeDB - https://github.com/louischatriot/nedb

Frontend - Angular.JS + Bootstrap.

# Configure work environment:
The system can be installed with the 'INSTALL.js' script (run it from the CLI with Node.JS) - will create a service on windows environment.
If you don't want to use the install script you can run the 'HTTP_SERVER.js' file from the CLI - keep the CLI open while working.

