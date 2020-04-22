import React, { useState } from 'react';
import axios from 'axios';
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import DialogContentText from "@material-ui/core/DialogContentText"
import LinearProgress from "@material-ui/core/LinearProgress"
import Feedback from '@material-ui/icons/Feedback';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(1)
	}
}));

export default function FeedbackForm(props) {
	const classes = useStyles();
	const [description, setDescription] = useState('');
	const [value, setValue] = React.useState(2);
	const [loading, setLoading] = useState(false);

	const handleClickOpen = () => {
		props.handleOpen(true);
	};

	const handleClose = () => {
		props.handleOpen(false);
	};

	const onSend = () => {
		setLoading(true);
		axios
			.post(`${process.env.API_BASE_URL}feedback/`, {
				sender: localStorage.sub,
				message: description,
				rating: value
			})
			.then(res => {
				setLoading(false);
				handleClose();
			})
			.catch(err => {
				setLoading(false);
			});
	};

	return (
		<Dialog
			open={props.isOpen}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
			className={classes.area}
		>
			{loading ? <LinearProgress /> : null}
			<DialogTitle id="form-dialog-title">
				<Grid container direction="row" alignContent="center">
					<Feedback className={classes.margin}></Feedback>
					<Typography className={classes.margin}>Send Feedback</Typography>
				</Grid>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					If you have any suggestion or feedback related to our site, kindly
					write to us.
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Feedback Message.."
					type="text"
					multiline
					rows="3"
					fullWidth
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<Typography>Rating</Typography>
				<Rating
					name="hover-side"
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={onSend} color="primary">
					Send Feedback
				</Button>
			</DialogActions>
		</Dialog>
	);
}
