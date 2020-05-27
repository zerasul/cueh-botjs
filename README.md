# cuehBot Discord Bot

[![Docker Image Version (tag latest semver)](https://img.shields.io/docker/v/zerasul/cuehbot/0.0.3?color=green&logo=docker)](https://hub.docker.com/r/zerasul/cuehbot)

Cueh Bot is a Discord bot for download and play music from youtube videos. This bot provides the next commands:

* ```!cuehjoin```: Join the bot to your current voice channel.
* ```!cuehplay <youtube-url>```: Play the Youtube audio from the provided Youtube URL; the bot needs to be connected to a voice channel using the ```!cuehjoin``` command.
* ```!cuehstop```: Stops the current song.

How to run this bot in docker:

To run a container with this bot, you need a Discord API Token; and using the enviroment variable ```DISCORD_TOKEN``` you can set it to the container; example:

```bash
docker run --env DISCORD_TOKEN=<your-token> zerasul/cuehbot:latest
```