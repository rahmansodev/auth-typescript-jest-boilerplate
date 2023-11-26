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
:heavy_check_mark: Docker-ready for development, including working node_modules sync workaround & support hot reloading\

## Requirements

Before starting :checkered_flag:, you need to install this on your server/laptop :

If using standalone : 
- [Node & NPM > 20.x.x](https://nodejs.org/en/)
- [Mongodb > 7.x.x](https://www.mongodb.com/)

If using docker :
- [Node & NPM > 20.x.x](https://nodejs.org/en/)
- [Docker](https://docker.com)

I personally prefer docker for development since you only need to just install docker & node. It would be running on your Windows, Linux, or Mac right away. So simple. Instead of stumbling on installing Mongodb, RabbitMQ, redis, etc, etc on your Windows or WSL or Linux, etc, etc.

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

# 5. Run the project locally
$ npm run dev

# 6. Or Run the project in staging/production
$ npm run start

# 7. You can test it on http://localhost:5000/health
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

## Interacting with Code, NPM & Git

If using standalone :
This is straight forward, everyhting you do it on your laptop. 


If using docker :
- You can just edit code directly from your laptop. Hot reloading will works. No need to rebuild container image when code changes.
- Everything related to git, you do it on your laptop.
- When commit & push, will trigger lint-staged which is will run prettier, lint, and test. This will works on your laptop as well.
- You need to npm install on your laptop at the very beginning setup project. You don't need npm install on the container, since it already declared on the image level.
- If you want to install a new package or uninstall package, you need to run on your laptop first, then on the container itself if you want to take effect immediately while the container is still running. After that, don't forget to rebuild the image of your container on the next start. If there is never any change on the package.json, then never need to rebuild image even though all of your code changing so much.

Why is this so complicated on docker?

Since we can't avoid that there are many modules that are specific build for specific environtment. For example bcrypt. It just can't work if you npm install on your docker Linux container, and want it to be able to function on your Macbook. In the other hand, you can't also just not installing node_modules on your laptop, since you need it for eslint while coding.

Also you can't git commit & push with lint-staged and jest test if you don't have NPM on your laptop.

Why user Docker then?

I feel it's still simpler to just install Docker + NodeJS only. I've experiencing need to switch environment (Linux, Windows, Windows WSL, Macbook) quite often, and it's been a headache for me to install mongodb, rabbitMQ, redis, gRPC etc etc. But for installing Docker and NodeJS i can still remark it as an easy one. 

Even though what would be perfect is just need to install Docker. But again, I can't find yet a method for this, especially relating to jest, git, bcrypt etc.


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
npm run format <file-locations>
or
npm run format .
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
