# `orcid-oauth2`

[![Gitter](https://badges.gitter.im/mangal-wg/orcid-oauth2.svg)](https://gitter.im/mangal-wg/orcid-oauth2?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Persistent storage for ORCID authentification server.

# Getting started

1. Install the node dependencies with `npm intall`
2. Set your database in `config/db.json`
3. Write your credentials (ORCID's client) in `config/oauth.js`:

```javascript
module.exports = config = {
  authorizationURL: 'https://orcid.org/oauth/authorize',
  clientID: YOUR_CLIENT_ID,
  clientSecret: YOUR_SECRET_ID,
  tokenURL: 'https://pub.orcid.org/oauth/token',
  callbackURL: YOUR_CALLBACK,
  scope: '/authenticate',
  passReqToCallback: true
};
```
4. `npm start`

Don't forget to change the status of your environment with the variable `$NODE_ENV`

Then, one route to rule them all: `localhost:3000/auth`

