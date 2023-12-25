# Eurobot AV Dashboard

This is platform created by me to allow for Eurobot competition and it allows the following:

- Display team name and the count down on the live stream for the match in play.
- Make it easier to evaluate matches and display the scores on the live screen when the match ended.

## Task list and score estimation

Every edition of Eurobot comes with a new set of rules and tasks. To create the task list and set the score for each task and others a Json file must be modified.

The file “info.js” under “Server/src/config” contain the tasks list. Every element of the taskList follow this pattern.

```js
{
        name: 'Task Name', // The name that will be displayed on screen.
        type: 'N' or 'B', //N if the task can be done multiple of times and B if it is a binary condition.
        score: 5, //can be set to any number (in case of type='N' it's the score of a single instance)
}
```

This file also contains the score estimation formula to be adjusted and the primary teams' colors for this edition.

## Setup

I used docker to simplify the setup process. So first docker must be installed on your machine. Visit this [link](https://docs.docker.com/desktop/) for information about docker install on windows on Linux.

Once you have docker install first download or clone this repo the open you command prompt in the repo directory.

First, some environment variables must be set:

1. Open the docker-compose.yml
2. Under server set the CLIENT_URL environment variable to your your IP address (or hostname if a hostname resolution solution exists).

   Example: CLIENT_URL=http://192.168.0.10 or CLIENT_URL=http://eurobot.tn

   Make sure to replace the IP address or hostname with the appropriate value because the server will only accept request from the configured IP or hostname

3.

Now start the application run this command:

```
docker-compose up
```

This command will download the required images then build the images for both the backend server and the frontend client and run them.

Once finished the AV dashboard Platform will be accessible on your 80 port.

If you want to stop the containers without deleting the database (teams/rounds/matches/etc…) run this command:

```
docker-compose stop
```

If stopped and you want to restart the containers run this command:

```
docker-compose start
```

If you do not mind losing the database and you want to delete the containers in the processes run this command:

```
docker-compose down
```

Now that the platform is up and running you can set this page "your-machine-ip-address/display" as Web display in OBS.

## Notes

- The default user's username is "admin" and it's password is "admin"
- When running the application and need to rest the computer use stop command (the down command will erase the database)

## To be updated

To note that this code is still missing the following feature:

- The design of the different displays for live stream (the different required component exists but they only display the raw data)
- The restart button is not functional in the dashboard (did not want to force a certain behavior)
