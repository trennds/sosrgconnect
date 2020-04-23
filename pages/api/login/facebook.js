const axios = require("axios");
const qs = require("querystring");

export default (req, res) => {
  axios
    .get(
      `https://graph.facebook.com/v6.0/oauth/access_token?client_id=540461230233831&redirect_uri=http://localhost:3000/api/login/facebook&client_secret=a3ffa60ed247f471223492bd2e9b9e5f&code=${req.query.code}`,
    )
    .then((response) => {
      console.log(response.data);
      res.statusCode = 302;
      res.setHeader("Location", `/login?access_token=${response.data.access_token}`);
      res.end();
    });
};
