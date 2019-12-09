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
import { func } from 'prop-types';

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

export default function CreateSocial(props) {
	const classes = useStyles();
	const [description, setDescription] = useState('');
	const [ytUrl, setYtUrl] = useState('');
	const [webUrl, setWebUrl] = useState('');
	const [ytRes, setYtRes] = useState(null);
	const [webRes, setWebRes] = useState(null);
	const [files, setFiles] = useState([]);

	const handleClickOpen = () => {
		props.handleOpen(true);
	};

	const handleClose = () => {
		props.handleOpen(false);
	};

	const handleYoutube = value => {
		setYtUrl(value);

		axios
			.post('https://my-router-app.trennds.workers.dev/foo', {
				url: ytUrl
			})
			.then(res => {
				setYtRes(res.data);
			});
	};

	const handleFileChange = files => {
		setFiles(files);

		if (files.length > 0) {
			var formData = new FormData();
			formData.append('key', 'main2.png');
			formData.append('file', files[0]);
			axios.post('http://trenndstest.s3.amazonaws.com/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
		}
	};

	return (
		<Dialog
			open={props.isOpen}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">Create Social Post</DialogTitle>
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
					showPreviews
					dropzoneClass={classes.dropZone}
				/>
				{/* <input type="file" onChange={e => handleFileChange(e.target.files)} /> */}
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
					value={ytUrl}
					onChange={e => handleYoutube(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<YouTube />
							</InputAdornment>
						)
					}}
				/>
				{ytRes != null ? (
					<img src={ytRes.thumbnail_url} height={ytRes.height} />
				) : null}
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
