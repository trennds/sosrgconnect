import styled from "styled-components";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import {
  ThemeProvider,
  Message,
  MessageList,
  MessageText,
} from "@livechat/ui-kit";
import React from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 10px",
    width: "100%",
  },
  message: {
    padding: "10px",
  },
}));

const ReceiverContainer = styled.div`
  width: 100%;
  display: flex;
  height: auto;
`;

const Receiver = styled.div`
  margin: 5px;
  margin-left: 20px;
  color: white;
  background-color: green;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  border-style: solid;
  border-width: 1px;
  border-color: green green green green;
  flex-wrap: wrap;

  &:before {
    position: absolute;
    content: "";
    transform: translate(-170%, -104%);
    border-style: solid;
    border-width: 10px;
    border-color: green green transparent transparent;
  }
`;

const SenderContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  right: 3%;
`;

const Sender = styled.div`
  margin: 5px;
  color: white;
  border-radius: 10px;
  position: absolute;
  background-color: blue;
  padding: 20px;

  &:after {
    position: absolute;
    content: "";
    transform: translate(65%, -100%);
    border-style: solid;
    border-width: 10px;
    border-color: blue transparent transparent blue;
  }
`;

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages,
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    var self = this;
    if (e.key == "Enter") {
      var text = e.target.value;
      axios
        .post(`${process.env.API_BASE_URL}message/`, {
          sender: localStorage.sub,
          body: text,
          studio: self.props.studio,
          senderName: localStorage.name,
        })
        .then((res) => {
          self.setState((state, props) => ({
            messages: [
              ...state.messages,
              {
                sender: localStorage.sub,
                body: text,
                studio: self.props.studio,
                senderName: localStorage.name,
              },
            ],
          }));
        });
    }
  }

  render() {
    return (
      <Container style={{ width: "100%", height: "100vh" }}>
        <ThemeProvider>
          <MessageList active>
            {this.state.messages.map((v, index) => {
              return (
                <Message
                  authorName={v.senderName}
                  isOwn={v.sender == localStorage.sub}
                  key={index}
                >
                  <MessageText>{v.body}</MessageText>
                </Message>
              );
            })}
          </MessageList>
        </ThemeProvider>
        <TextField
          variant="outlined"
          label="Enter message"
          style={{
            position: "fixed",
            bottom: "1%",
            width: "45%",
          }}
          onKeyDown={(e) => this.handleKeyPress(e)}
        />
      </Container>
    );
  }
}
