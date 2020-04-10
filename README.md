# miropad-oauth-service

A dead-simple Node.js app using [Express 4](http://expressjs.com/) that gets an oauth token for authenticated requests on the [Github API](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow)

This application is hosted on Heroku.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/teomrd/miropad-oauth-service.git # or clone your own fork
$ cd miropad-oauth-service
$ npm install
$ npm run dev
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```