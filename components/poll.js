import React from "react";
import PropTypes from "prop-types";
import red from "@material-ui/core/colors/red";
import axios from "axios";

import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Avatar from "@material-ui/core/Avatar"
import CardHeader from "@material-ui/core/CardHeader"
import withStyles from "@material-ui/core/styles/withStyles"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import LinearProgress from "@material-ui/core/LinearProgress"
import Link from "next/link";

const styles = theme => ({
  card: {
    width: "100%",
    margin: `20px 0px`
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    backgroundColor: red[500]
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  input: {
    flex: 1
  },
  margin: {
    margin: theme.spacing(1)
  }
});

class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      comment: "",
      isAnswered: false,
      totalCount: 0
    };

    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
    var self = this;
    if (this.props.data.participants.includes(localStorage.sub))
      this.setState({
        isAnswered: true
      });
    var temp = 0;
    for (let i = 0; i < this.props.data.choices.length; i++) {
      temp += this.props.data.choices[i].count;
    }
    this.setState({
      totalCount: temp
    });

    axios
      .get(`${process.env.API_BASE_URL}profile/${this.props.data.uploader}`)
      .then(res => {
        self.setState({
          name: res.data.Item.name
        });
      });
  }

  vote(index) {
    var self = this;
    axios
      .put(`${process.env.API_BASE_URL}poll/vote`, {
        uploader: this.props.data.uploader,
        id: this.props.data.id,
        voter: localStorage.sub,
        index: index
      })
      .then(res => {
        self.setState({
          isAnswered: true
        });
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <Link href="/profile/[id]" as={`/profile/${this.props.data.uploader}`}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {this.state.name.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={this.state.name}
          ></CardHeader>
        </Link>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {this.props.data.description}
          </Typography>
          <List>
            {this.props.data.choices.map((v, index) => (
              <ListItem onClick={() => this.vote(index)}>
                <ListItemAvatar>
                  <Avatar>{index + 1}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={v.choice}
                  secondary={
                    this.state.isAnswered ? (
                      <LinearProgress
                        variant="determinate"
                        value={(v.count / this.state.totalCount) * 100}
                      />
                    ) : null
                  }
                />
                {this.state.isAnswered ? <Typography>
                  {Math.round((v.count / this.state.totalCount) * 100)}%
                </Typography> : null}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }
}

Poll.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Poll);
