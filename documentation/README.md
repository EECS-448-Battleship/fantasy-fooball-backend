# Fantasy Football
## EECS 448 - Project 4

## Structure Info

### Front-end
This project has been wired up to use Vue.js to help organize components of the game.

These components are defined in files that end in the `.component.js` extension, and are located in the `src/components/` directory.

The entry point for the project is the `index.html`. This file contains the basic logic for loading Vue, and adding the game board to the page.

Obviously, we'll flesh out the look-and-feel as we go along. This is just a basic starter for now.

### Backend
This project uses the [Flitter](https://flitter.garrettmills.dev/) web framework for its API. The API is split into routes, controllers, and models.

The models interface with the database and represent different object-oriented structures in the game (players, teams, users, matchups, &c.)

The routes define which controller methods get called on which endpoints.

The controllers contain the logic for receiving requests and sending responses and will query the models for data.

There are also some `.patch.js` classes that contain logic for one-time data patches.

## How to Run
First, install the dependencies:

- Node.js 14.x or higher
- The Yarn package manager
- MongoDB

```shell script
git clone https://github.com/EECS-448-Battleship/fantasy-fooball-backend app
cd app
yarn install
```

Set up the environment config by copying the template `.env` file and editing it to match the environment:

```shell script
cp example.env .env
vim .env
```

Now, run the one time data patches like so:

```shell script
node flitter shell
(flitter) ➤ await require('./setup')(_di)
```

This will pull in the latest NFL players and their stats and seed the database to get the game ready to play.

Now, start the server:

```shell script
node index.js
```

### Re-generating the documentation
To regenerate the docs, you need Node.js and the Yarn package manager installed. Then, just:

```shell script
cd documentation
./generate.sh
```

## Running Tests
The tests are located in the `test` directory and are split into `frontend` and `backend` tests.

All tests are written expressively using the Mocha testing library.

After installing the Node dependencies, you can run the frontend and backend tests like so:

```shell script
yarn run test_frontend
yarn run test_backend
```

## Works Cited

### Front-end
The files in the `frontend/lib` directory are external libraries used in this project.

- Vue.js
    - A front-end framework. Used under the terms of the MIT license.
    - https://github.com/vuejs/vue
- VuES6.js
    - A kind-of crappy loader for defining Vue components using ES6 classes.
    - Also used under the terms of the MIT license.
    - https://code.garrettmills.dev/garrettmills/vues6

### Back-end
The backend API uses the following technologies and external libraries:

- Flitter
    - Flitter is an open-source, Express.js-based web app framework
    - Used under the terms of the MIT license
    - https://flitter.garrettmills.dev
- SportsData.io
    - This is a free API which we use to pull in player stats and information from the NFL in the one-time data patches.
    - A free-trial account was used to populate the data for this app.
    - https://sportsdata.io
- SkySilk
    - The demonstration server is hosted on SkySilk, a cloud VPS provider
    - https://skysilk.com
- Other libraries
    - There are many other open-source libraries relied upon as sub-dependencies of the framework we used
    - These libraries and their licensure information can be found in the `package.json` file

## Contributors
- Lucas Brakenridge
- Javier Barea Lara
- Garrett Mills
- Evan Powell
- Alec Horlick-Mills
