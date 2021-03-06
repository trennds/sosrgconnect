import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Layout from "../components/layout";
import Post from "../components/post";
import Router from "next/router";
import Grid from "@material-ui/core/Grid"
import withStyles from "@material-ui/core/styles/withStyles"
import CircularProgress from "@material-ui/core/CircularProgress"
import LinearProgress from "@material-ui/core/LinearProgress"
import Job from "../components/job";
import Work from "../components/work";
import Poll from "../components/poll";
import LogRocket from "logrocket";
// import Favorite from '../components/favorite';
//import * as firebase from "firebase";

const styles = {
  container: {
    margin: "90px auto"
  },
  grid: {
    justifyContent: "center"
  },
  spinner: {
    position: "absolute",
    left: "50%",
    right: "50%",
    transform: "translate(-50%, -50%)"
  }
};
class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    if (!localStorage.sub) Router.replace("/login");
    axios
      .get(`${process.env.API_BASE_URL}profile/${localStorage.sub}`)
      .then(res => {
        if (!res.data.Item) Router.push("/setup");
      });
    this.setState({
      loaded: true
    });
    LogRocket.init("mk6dd2/sosrgconnect");
    LogRocket.identify(localStorage.sub, {
      name: localStorage.name,
      email: localStorage.email,
      // Add your own custom user variables here, ie:
      subscriptionType: "pro"
    });
    // var firebaseConfig = {
    //   apiKey: "AIzaSyBSOn2_A9QzCsLH82hhoRHqd9Xx1On6Pdg",
    //   authDomain: "sosrg-connect.firebaseapp.com",
    //   databaseURL: "https://sosrg-connect.firebaseio.com",
    //   projectId: "sosrg-connect",
    //   storageBucket: "sosrg-connect.appspot.com",
    //   messagingSenderId: "1025759975191",
    //   appId: "1:1025759975191:web:31e41e514bd21c9f8ec952",
    //   measurementId: "G-63G6EXRR81"
    // };
    // firebase.initializeApp(firebaseConfig);
    // firebase.analytics();
  }
  render() {
    const { classes } = this.props;

    if (this.state.loaded)
      return (
        <Layout>
          <Grid container spacing={0} className={classes.container}>
            <Grid item lg={3}></Grid>
            <Grid item xs={12} lg={6}>
              {this.props.posts.length > 0 ? (
                this.props.posts.map(v => {
                  if (v.type == "social") return <Post data={v} key={v.id} />;
                  if (v.type == "job")
                    return (
                      <Job
                        data={v}
                        key={v.id}
                        isOwner={localStorage.sub == v.uploader}
                      />
                    );
                  if (v.type == "work") return <Work data={v} key={v.id} />;
                  if (v.type == "poll") return <Poll data={v} key={v.id} />;
                })
              ) : (
                <CircularProgress />
              )}
            </Grid>
            <Grid item lg={3}></Grid>
          </Grid>
        </Layout>
      );
    else return <LinearProgress />;
  }
}

IndexPage.getInitialProps = async function() {
  var res = await axios.get(`${process.env.API_BASE_URL}posts/`);

  return {
    posts: res.data.Items
  };
};

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexPage);
