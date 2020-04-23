const axios = require("axios");
const qs = require("querystring");

export default (req, res) => {
  axios
    .post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      qs.stringify({
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: "http://localhost:3000/api/login/linkedin",
        client_id: "861fidyfvy9xor",
        client_secret: "oSUNiMLj6zGS6UaQ",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      res.statusCode = 302;
      res.setHeader("Location", `/login?access_token=${response.data.access_token}`);
      res.end();
    });
};
