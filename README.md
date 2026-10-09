# VNDBot

VNDBot is a discord bot for the Visual Novel Database. 

## Features

- Search for a visual novel ( `/vn` )
- Search for a character (`/character`)
- View recently released visual novels (`/recentreleases`)

The bot currently does not link to a user's profile, however implementation is planned soon. For those who worry about security, you will also be able to unlink a profile after it is linked. 

Also, API requests may fail occasionally due to timeouts or service issues. Failed API calls can happen, but you can likely pass a command again at a later time and it will work. 

## Important Links

- Visual Novel Database: [vndb](https://vndb.org)
- VNDB's API: [Kana](https://api.vndb.org/kana)

## Setup

At the time of writing this (10/8/2026), the bot has not been officially released. However, if you would like to run it in the current state for yourself, you can get it running locally. 

I use WSL2 for my workflow, so this assumes you use either Linux or WSL2

- Install [Node.js](https://nodejs.org/en/download)
- run `npm install` inside the directory
- All the packages used in this should already be downloaded, but just in case, run `npm list` inside your directory and make sure the following are downloaded
	- `discord.js`
	- `dotenv`
- make a `.env` file, and provide `DISCORD_ID`, `PUBLIC_KEY`, `GUILD_ID`, and `APP_ID`
- run `node deploy-commands.js`
- run `node index.js`

The bot should be working! Test it in your server by using the slash commands. If not, oops...

## Roadmap

Some planned commands include:

- Recommend a visual novel based on user's profile (`/recommend`)
- Link and unlink a user's vndb profile (`/link` | `/unlink`)
- Read, add, and delete from a user's vndb profile (`/list add : delete : read`)
