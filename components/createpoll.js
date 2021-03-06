import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import CircularProgress from "@material-ui/core/CircularProgress"
import Chip from "@material-ui/core/Chip"

export default function CreatePoll(props) {
  const [description, setDescription] = useState("");
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    props.handleOpen(true);
  };

  const handleClose = () => {
    props.handleOpen(false);
  };

  const handleDelete = index => {
    let arr = choices.splice(index, 1);
    setChoices(choices.splice(index, 1));
  };

  const upload = () => {
    setLoading(true);
    axios
      .post(`${process.env.API_BASE_URL}poll/`, {
        uploader: localStorage.sub,
        description: description,
        choices: choices
      })
      .then(res => {
        setLoading(false);
        props.handleOpen(false);
      });
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Poll</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter Poll question"
          type="text"
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        {choices.map((v, index) => (
          <Chip label={v} onDelete={() => handleDelete(index)} />
        ))}
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter Choice"
          type="text"
          fullWidth
          onKeyPress={e => {
              if(e.key == 'Enter') setChoices([...choices, e.target.value])
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={upload} color="primary">
          {loading ? <CircularProgress size={24} /> : "Create Poll"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
