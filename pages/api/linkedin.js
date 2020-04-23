const axios = require("axios");

export default (req, res) => {
  axios
    .get("https://api.linkedin.com/v2/me", {
      headers: {
        Connection: "Keep-Alive",
        Authorization: `Bearer ${req.query.access_token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      res.end();
    });
};
