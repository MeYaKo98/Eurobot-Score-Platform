# Eurobot AV Dashboard

This is platform created by me to allow for Eurobot competition and it allows the following:

- Display team name and the count down on the live stream for the match in play.
- Make it easier to evaluate matches and display the scores on the live screen when the match ended.

## Task list and score estiamtion

Every edition of Eurobot comes with a new set of rules and tasks. To create the task list and set the score for each task and others a Json file must be modified.

The file “info.js” under “Server/src/config” contain the tasks list. Every element of the taskList follow this pattern.

```js
{
        name: 'Task Name', // The name that will be displayed on screen.
        type: 'N' or 'B', //N if the task can be done multiple of times and B if it is a binary condition.
        score: 5, //can be set to any number (in case of type='N' it's the score of a single instance)
}
```

This file also contain the score estimation formula to be adjusted and the primary teams colors for this edition.

## Setup

I used docker to simplify the setup process. So first docker must be installed on your machine. Visit this [link](https://docs.docker.com/desktop/) for information about docker install on windows on Linux.

Once you have docker install first download or clone this repo the open you command prompt in the repo directory.

First start by running this command:

```
docker-compose up
```

This command will download the required images then build the images for both the backend server and the frontend client and run them.

Once finished the AV dashboard Platform will be accessible on you 3000 port.

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

Now that the platform is up and running you can set this page "your-machine-ip-adress/display" as Web display in OBS.

To note that this code is still missing the following feature:

- The design of the different displays for live stream (the different required component exists but they only display the raw data)
- The restart button is not functional in the dashboard (did not want to force a certain behavior)

# Eurobot AV Dashboard

This is platform created by me to allow for Eurobot competition and it allows the following:

- Display team name and the count down on the live stream for the match in play.
- Make it easier to evaluate matches and display the scores on the live screen when the match ended.

## Task list and score estiamtion

Every edition of Eurobot comes with a new set of rules and tasks. To create the task list and set the score for each task and others a Json file must be modified.

The file “info.js” under “Server/src/config” contain the tasks list. Every element of the taskList follow this pattern.

```js
{
        name: 'Task Name', // The name that will be displayed on screen.
        type: 'N' or 'B', //N if the task can be done multiple of times and B if it is a binary condition.
        score: 5, //can be set to any number (in case of type='N' it's the score of a single instance)
}
```

This file also contain the score estimation formula to be adjusted and the primary teams colors for this edition.

## Setup

I used docker to simplify the setup process. So first docker must be installed on your machine. Visit this [link](https://docs.docker.com/desktop/) for information about docker install on windows on Linux.

Once you have docker install first download or clone this repo the open you command prompt in the repo directory.

First start by running this command:

```
docker-compose up
```

This command will download the required images then build the images for both the backend server and the frontend client and run them.

Once finished the AV dashboard Platform will be accessible on you 3000 port.

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

Now that the platform is up and running you can set this page "your-machine-ip-adress/display" as Web display in OBS.

To note that this code is still missing the following feature:

- The design of the different displays for live stream (the different required component exists but they only display the raw data)
- The restart button is not functional in the dashboard (did not want to force a certain behavior)
