import React, { useState } from 'react';
import axios from 'axios';
import {
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	makeStyles,
	Grid,
	CircularProgress,
	Typography,
	DialogContentText,
	LinearProgress
} from '@material-ui/core';
import { Feedback } from '@material-ui/icons';
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
			.post(`https://dummy.com`, {
				message: description,
				rating: value
			})
			.then(res => {
				setLoading(false);
				res;
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
				/>
				<Typography>Rating</Typography>
				<Rating
					name="hover-side"
					value={value}
					onChang={(event, newValue) => {
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
