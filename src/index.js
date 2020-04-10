const express = require('express');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 5000;

express()
  .get('/', (req, res) => res.json({
    hello: "world"
  }))
  .get("/auth", (req, res) => {
    const { code , state } = req.query;
    
    fetch(
    `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&state=${state}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
    .then(resp => resp.json())
    .then(response => {
      console.log('response', response);
      const { access_token } = response;
      return res.json({
        token: access_token
      });
    }).catch(e => {
      console.log('e', e);
      return res.json({
        error: e.message
      });
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
