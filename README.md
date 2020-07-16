[![Build Status](https://travis-ci.org/msoe-sg/msoe-sg-editor-ui.svg?branch=master)](https://travis-ci.org/msoe-sg/msoe-sg-editor-ui)
## Setup
1. Follow the instructions from the wiki article [here](https://github.com/msoe-sg/msoe-sg-website/wiki/Environment-Setup) to setup your development environment.
2. Follow the README instructions for the API project [here](https://github.com/msoe-sg/msoe-sg-editor-api) and launch the API on port 3000
3. Open up a terminal to the folder where you want to clone the repo and run the command `git@github.com:msoe-sg/msoe-sg-editor-ui.git`
4. After run the clone change into the project directory by running the command `cd msoe-sg-editor-ui`
5. Next install the dependencies for the project by running the command `yarn install`
6. Get the Google client id from the webmaster and run the command `export REACT_APP_GOOGLE_CLIENT_ID=<client id here>`
7. Launch the editor by running the command `yarn start`. If you're running the API it will ask you if you want to run the site using a different port. Enter `y` if you get that prompt. After that the editor will launch in your default browser.
8. Contribute 
Our git flow process is typical--we have a master branch that gets released to the public, a dev branch for merging ongoing development, and feature branches for individual tasks. If you have questions on how to contribute, please contact admin@msoe-sse.com or msoe.sg.hosting@gmail.com and we will get back to you at our earliest convenience.

## Continuous Integration
There are checks that will be performed whenever Pull Requests are opened.  To save time on the build server, please run the tests locally to check for errors that will occur in the CI builds.

1. To run [eslint](https://eslint.org/), run the command `yarn lint`
