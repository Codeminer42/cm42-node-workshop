## Quake Log Parser

Solution of the [quake log parser challenge][quake], including the new features:

- real time monitor the logs
- html page with game results
- cli/console results

## Install and run

```bash
npm install # install dependencies
npm start   # start the web server
            # or
npm run cli # parse in the command line
```

## Development

Star `nodemon` to monitor file changes.

```bash

cp .env.sample .env # create a .env file and update with the games.log path
                    # e.g. LOG_FILE=./lib/fixtures/games.log
                    # copy the games.log to that location, if using a fixture
npm run dev         # start the web server and restart after changes
```

[quake]: https://gist.github.com/akitaonrails/97310463c52467d2ecc6
