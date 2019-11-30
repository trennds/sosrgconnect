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
	InputAdornment
} from '@material-ui/core';
import { Link, YouTube } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(1)
	},
	dropZone: {
		height: 10,
		width: '100%',
		margin: '10px 0px',
		padding: '20px 20px'
	}
}));

export default function CreatePost(props) {
	const classes = useStyles();
	const [files, setFiles] = useState([]);

	const handleFileChange = files => {
		setFiles(files);
	};

	const handleClickOpen = () => {
		props.handleOpen(true);
	};

	const handleClose = () => {
		props.handleOpen(false);
	};

	return (
		<Dialog
			open={props.isOpen}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">Create Post</DialogTitle>
			<DialogContent>
				{/* <DialogContentText>
					To subscribe to this website, please enter your email address here. We
					will send updates occasionally.
				</DialogContentText> */}
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Write Something about the Post.."
					type="text"
					multiline
					rows="3"
					fullWidth
				/>
				<DropzoneArea
					onChange={handleFileChange}
					filesLimit={1}
					acceptedFiles={['image/*']}
					dropzoneText="Drag a image or click to upload"
					showPreviewsInDropzone={false}
					showPreviews="true"
					dropzoneClass={classes.dropZone}
				/>
				<TextField
					fullWidth
					className={classes.margin}
					label="Website Link (Optional)"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Link />
							</InputAdornment>
						)
					}}
				/>
				<TextField
					fullWidth
					label="Youtube Link (Optional)"
					className={classes.margin}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<YouTube />
							</InputAdornment>
						)
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleClose} color="primary">
					Create Post
				</Button>
			</DialogActions>
		</Dialog>
	);
}
