import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import LockOutlined from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Facebook from "@material-ui/icons/Facebook";
import Router from "next/router";
import Amplify from "aws-amplify";
import Auth from "@aws-amplify/auth";

Amplify.configure({
  Auth: {
    region: "ap-south-1",
    userPoolId: "ap-south-1_pWjBn0W3N",
    userPoolWebClientId: "3t5o8ktmo83kfksu0ghsjjapcv",
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

const styles = (theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1115&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "grey",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: "0px 4px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
  },
  avatar: {
    margin: "10px",
    backgroundColor: "blue",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "20px",
    padding: "20px",
  },
  submit: {
    margin: "10px",
  },
  signInIcon: {
    marginRight: theme.spacing(1),
  },
  googleButton: {
    borderColor: "red",
    padding: theme.spacing(1),
    color: "red",
    marginBottom: theme.spacing(1),
  },
  linkedInButton: {
    marginTop: theme.spacing(1),
  },
  linkedInIcon: {
    marginRight: theme.spacing(1),
  },
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      loading: false,
      err: "",
    };
    this.login = this.login.bind(this);
    this.linkedInLogin = this.linkedInLogin.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
  }

  static getInitialProps({ query }) {
    return { query };
  }

  componentDidMount() {
    if (window.location.hash != "") {
      let str = window.location.hash.substr(1, window.location.hash.length);
      let arr = str.split("&");
      console.log(arr[0]);
    }

    if (this.props.query.access_token) {
      localStorage.access_token = this.props.query.access_token;
    } else {
      //localStorage.clear();
    }
  }

  googleLogin() {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?client_id=1025759975191-br5i9chqn7t4jkkljcmc27fqsse6ij06.apps.googleusercontent.com&redirect_uri=http://localhost:3000/login&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/user.organization.read https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/userinfo.profile";
  }

  facebookLogin() {
    window.location.href =
      "https://www.facebook.com/v6.0/dialog/oauth?client_id=540461230233831&redirect_uri=http://localhost:3000/api/login/facebook";
  }

  linkedInLogin() {
    window.location.href =
      "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=861fidyfvy9xor&redirect_uri=http://localhost:3000/api/login/linkedin&scope=r_liteprofile";
  }

  async login() {
    this.setState({
      loading: true,
    });
    var self = this;
    try {
      const user = await Auth.signIn(self.state.email, self.state.password);
      Auth.userAttributes(user).then((res) => {
        res.forEach((item, index) => {
          localStorage.setItem(item.Name, item.Value);
        });
        this.setState({
          loading: false,
        });
        axios
          .get(`${process.env.API_BASE_URL}profile/${localStorage.sub}`)
          .then((res) => {
            if (res.data.Item) Router.replace("/");
            else Router.push("/setup");
          });
      });
    } catch (err) {
      this.setState({
        err: err.message,
        loading: false,
      });
      if (err.code === "UserNotConfirmedException") {
        localStorage.email = this.state.email;
        Router.replace("/setup");
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login to SosrG Connect
            </Typography>
            <Container className={classes.form}>
              <Typography color="error">{this.state.err}</Typography>
              <Button
                variant="outlined"
                className={classes.googleButton}
                size="large"
                fullWidth
                onClick={(e) => this.googleLogin()}
              >
                <img
                  src="https://img.icons8.com/color/24/000000/google-logo.png"
                  className={classes.signInIcon}
                />
                Sign in with Google
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                fullWidth
                onClick={(e) => this.facebookLogin()}
              >
                <Facebook size={24} className={classes.signInIcon} />
                Sign in with Facebook
              </Button>
              <Button
                variant="outlined"
                size="large"
                color="secondary"
                className={classes.linkedInButton}
                fullWidth
                onClick={(e) => this.linkedInLogin()}
              >
                <img
                  src="https://img.icons8.com/color/24/000000/linkedin.png"
                  className={classes.linkedInIcon}
                />
                Sign in with LinkedIn
              </Button>
              <Grid container justify="center">
                <Typography variant="subtitle2"><hr />OR<hr /></Typography>
              </Grid>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  type={this.state.showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={(e) =>
                          this.setState((state, props) => ({
                            showPassword: !state.showPassword,
                          }))
                        }
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => this.login()}
              >
                {this.state.loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" href="/register">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>{/* <Copyright /> */}</Box>
            </Container>
          </div>
        </Grid>
      </Grid>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
