const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: process.env.MIROPAD_URL
}));

app
  .get('/', (req, res) => res.json({
    hello: "world"
  }))
  .get("/auth", (req, res) => {
    const { code , state } = req.query;
    
    fetch(
    `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&state=${state}&redirect_uri=${process.env.MIROPAD_CALLBACK_URL}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
    .then(response => {
      console.log("response", response);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      // Read the response as json.
      return response.json();
    })
    .then(jsonResponse => {
      console.log('jsonResponse', jsonResponse);
      const { access_token } = jsonResponse;
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
