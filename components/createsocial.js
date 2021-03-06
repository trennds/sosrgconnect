import 'core-js/stable';
import 'regenerator-runtime';
import React, { useState } from 'react';
import axios from 'axios';
import Amplify, { Storage } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import v4 from 'uuid/v4';

Amplify.configure({
	Auth: {
		identityPoolId: 'ap-south-1:17f0d95f-24a2-410e-9f52-583a3ebdcf3a',
		region: 'ap-south-1',
		userPoolId: 'ap-south-1_pWjBn0W3N',
		userPoolWebClientId: '3t5o8ktmo83kfksu0ghsjjapcv',
		authenticationFlowType: 'USER_PASSWORD_AUTH'
	},
	Storage: {
		AWSS3: {
			bucket: 'posts.connect.sosrgstudios.com', //REQUIRED -  Amazon S3 bucket
			region: 'ap-south-1' //OPTIONAL -  Amazon service region
		}
	}
});
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import makeStyles from "@material-ui/core/styles/makeStyles"
import InputAdornment from "@material-ui/core/InputAdornment"
import CircularProgress from "@material-ui/core/CircularProgress"
import LinearProgress from "@material-ui/core/LinearProgress"
import Link from '@material-ui/icons/Link';
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

export default function CreateSocial(props) {
	const classes = useStyles();
	const [id, setId] = useState(v4());
	const [description, setDescription] = useState(null);
	const [ytUrl, setYtUrl] = useState(null);
	const [webUrl, setWebUrl] = useState(null);
	const [ytRes, setYtRes] = useState(null);
	const [webRes, setWebRes] = useState(null);
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [uploadValue, setUploadValue] = useState(0);

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
		var self = this;
		const file = files[0];
		var fileName = file.name;
		var fileArr = fileName.split('.');
		var photoKey = `S_${id}.${fileArr[fileArr.length - 1]}`;

		Auth.configure({
			identityPoolId: 'ap-south-1:17f0d95f-24a2-410e-9f52-583a3ebdcf3a',
			region: 'ap-south-1'
		});

		Storage.configure({
			AWSS3: {
				bucket: 'posts.connect.sosrgstudios.com', //Your bucket name;
				region: 'ap-south-1' //Specify the region your bucket was created in;
			}
		});

		Storage.put(photoKey, file, {
			contentType: `image/${fileArr[fileArr.length - 1]}`,
			progressCallback(progress) {
				setUploadValue((progress.loaded / progress.total) * 100);
			}
		})
			.then(result => {
				setFile(
					'https://s3.ap-south-1.amazonaws.com/posts.connect.sosrgstudios.com/public/' +
						photoKey
				);
			})
			.catch(err => console.log(err));
	};

	const upload = () => {
		setLoading(true);
		axios
			.post(`${process.env.API_BASE_URL}social/`, {
				uploader: localStorage.sub,
				id: id,
				description: description,
				image: file,
				website: webUrl,
				youtube: ytUrl
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
			<DialogTitle id="form-dialog-title">Create Social Post</DialogTitle>
			<DialogContent>
				{uploadValue != 0 ? (
					<LinearProgress variant="determinate" value={uploadValue} />
				) : null}
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
					value={description}
					onChange={e => setDescription(e.target.value)}
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
					value={webUrl}
					onChange={e => setWebUrl(e.target.value)}
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
				<Button onClick={e => upload()} color="primary">
					{loading ? <CircularProgress size={24} /> : 'Create Social'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
