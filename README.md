<h1 align="center">API Auth</h1>

<!-- <h4 align="center"> 
	🚧  Under construction...  🚧
</h4> -->

## About

API Auth is a simple Restful API boilerplate for user register and login using Express, Typescript, and Jest.

## Features

:heavy_check_mark: Express, Mongoose,\
:heavy_check_mark: Module aliases\
:heavy_check_mark: MVC design patterns project structures\
:heavy_check_mark: Sentry logging\
:heavy_check_mark: Jest\
:heavy_check_mark: Typescript, Prettier, Git Pre-Commit Hooks\
:heavy_check_mark: Passport\
:heavy_check_mark: Docker-ready for development, including working node_modules sync & support hot reloading\

## Requirements

Before starting :checkered_flag:, you need to install this on your server/laptop :

If using standalone : 
- [Node > 20.x.x](https://nodejs.org/en/)
- [Mongodb > 7.x.x](https://www.mongodb.com/)

If using docker :
- [Docker](https://docker.com)

I personally prefer docker for development since you only need to just install docker. It would be running on your Windows, Linux, or Mac right away. So simple. Instead of stumbling on installing Node, Mongodb, etc, etc on your Windows or WSL or Linux, etc, etc.

## Starting

If using standalone :
```bash
# 1. Clone this project
$ git clone <git-url> <name-of-folder>

# 2. Access
$ cd <name-of-folder>

# 3. Install dependencies
$ npm install

# 4. Copy .env.example and adjust accordingly
$ cp sampledotenv .env

# 5. Initiate husky pre-commit hooks
$ npm run setup-husky

# 6. Run the project locally
$ npm run dev

# 7. Or Run the project in staging/production
$ npm run start

# 8. You can test it on http://localhost:5000/health
```

If using docker :
```bash
# 1. Clone this project
$ git clone <git-url> <name-of-folder>

# 2. Access
$ cd <name-of-folder>

# 3. Install dependencies
$ npm install

# 4. Copy .env.example and docker files sample and adjust accordingly
$ cp sampledotenv .env
$ cp sample-dockerfile-local Dockerfile
$ cp sample-docker-compose-local.yaml docker-compose.yml

# 5. Run it
$ docker-compose up -d

# 6. You can test it on http://localhost:5000/health
```

## Testing & Deployment

For testing all :
```bash
npm run test-all
```

For testing specific files :
```bash
npm run test <locationFiles>
```

Also don't worry when you try to commit, it will automatically testing related test to the staged files.

Here is the list of environment in this project that you can used when setting up deployment :
- development => for local development
- test => for testing environment, can be used when you are on development/staging/production.
- staging => for staging environment
- production => for production environment

## Linting & Formatting

We use strict type checking & eslint. This is all you should worry about while you code.

Meanwhile, you don't need to worry about formatting such as (trailling commas, space, tab-width, etc), and it will not showing any error while you code. It will automatically be formatted using prettier when you do commit to the staged files.

Or if you want to format your code manually, run this :
```bash
npm run format
```

## Contribution

Primary branch being used are :

- main (for production stable release)
- staging (for staging release. optional)

Create a new branch from staging/main each time you want to contribute with standard branch naming such as :

- bugfix/
- doc/
- enhancement/
- refactor/
- chore/
- feat/
- and so on

For each commit on each branch, also use standard descriptive commit name such as :

- enhancement: Improve algorithm method getArticle
- refactor: Refactor code for createComment service
- feat: add new bad reaction service
- fix: null on getComment service
- doc: update readme
- chore: remove unused code
- and so on

Finally, submit a pull request to merge to branch staging. 

When creating a pull request, format it like this :
```
Title : [Bugfix] Fixing bug user cannot typing on Safari
Description : 
fix: 
1. fix 1
2. fix 2
chore:
1. update package x to version y
```

Basicly the title has same format with the new branch you've made but make it clearer. And Description is just summary main point of all commits you've made on that branch.

## Naming Convention

Folder Naming
- Use camelCase and use plural. (eg. controllers, utils)

File Naming
- Use camelCase, singular name, and add singular form of the folder naming before the .ts. (eg. chat.controller.ts, chat.util.ts)

Types/Interfaces
- Use Interface not Type, and use name with PascalCase. Don't add I in front of it. (eg. ChatMembers, Chat, PayloadCreateChat)

Constants
- Use ALL_CAPITAL for constants. (eg. EXCHANGE_PRIMARY_WORKER)

Tests
- Use all of above rules, but store your test inside the folder \__test__ in \__unit__ or \__integration__.

## License

This project is under MIT license. For more details, see the [LICENSE](LICENSE.md) file.

&#xa0;

<a href="#top">Back to top</a>
