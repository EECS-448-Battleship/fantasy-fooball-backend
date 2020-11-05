# Developer Setup
To get this up and running, you need the following tools installed on your machine:

- Node.js **v14 or later**
    - https://nodejs.org/en/download/
- The Yarn package manager
    - https://classic.yarnpkg.com/en/docs/install/

Once you've done that, open a shell to this repo and run the following:

```shell script
yarn install
```

This will install all the 3rd-party libraries needed for the app to start.

Next, copy the `example.env` file to `.env` and edit the `.env` file we just created.

Around line 20, modify the `DATABASE_PASSWORD=` to include the development database password, which you can find from the link shared on Discord.

For example:

```shell script
DATABASE_PASSWORD=abc12345
```

Once you've done that, you should be able to start the application and it will connect to the shared database. To run the application, run:

```shell script
node index.js
```

Note that, if you make any backend changes, you'll need to restart the server in order for them to take effect.

Once you've started the server, you should see a line:

```
 [SUCCESS] [Server] Flitter running on port 8000! Press ^C to exit cleanly.
```

Then, open your web browser to http://localhost:8000 to see the site.
