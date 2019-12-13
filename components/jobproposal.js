import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
	Container,
	Typography,
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	InputAdornment,
	Grid,
	CircularProgress,
	Box
} from '@material-ui/core';
import {} from '@material-ui/icons';
import v4 from 'uuid/v4';
import Amplify, { Storage } from 'aws-amplify';
import Auth from '@aws-amplify/auth';

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
			bucket: 'proposals.connect.sosrgstudios.com', //REQUIRED -  Amazon S3 bucket
			region: 'ap-south-1' //OPTIONAL -  Amazon service region
		}
	}
});

export default function JobProposal(props) {
	const [id, setId] = useState(v4());
	const [reason, setReason] = useState('');
	const [experience, setExperience] = useState('');
	const [resume, setResume] = useState('');
	const [loading, setLoading] = useState('');

	const handleClickOpen = () => {
		props.handleOpen(true);
	};

	const handleClose = () => {
		props.handleOpen(false);
	};

	const upload = () => {
		setLoading(true);
		axios
			.post(`${process.env.API_BASE_URL}proposal/`, {
				id: props.id,
				proposalId: id,
				sender: localStorage.sub,
				reason: reason,
				experience: experience,
				resume: resume
			})
			.then(res => {
				setLoading(false);
				props.handleOpen(false);
			});
	};

	const onResumeChange = e => {
		var self = this;
		const file = e.target.files[0];
		var fileName = file.name;
		var fileArr = fileName.split('.');
		var photoKey = `R_${id}.${fileArr[fileArr.length - 1]}`;

		Storage.put(photoKey, file, {
			progressCallback(progress) {
				self.setState({
					uploadValue: (progress.loaded / progress.total) * 100
				});
				console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
			}
		})
			.then(result => {
				setResume(
					'https://s3.ap-south-1.amazonaws.com/proposals.connect.sosrgstudios.com/public/' +
						photoKey
				).catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	};

	return (
		<Dialog
			open={props.isOpen}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">Job Proposal</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Why do you want this job..."
					type="text"
					fullWidth
					multiline
					rows={3}
					value={reason}
					onChange={e => setReason(e.target.value)}
				/>
				<TextField
					margin="dense"
					id="description"
					label="Job Description"
					type="text"
					fullWidth
					multiline
					rows={3}
					value={experience}
					onChange={e => setExperience(e.target.value)}
				/>
				<Box>
					<input
						id="cover-upload"
						type="file"
						accept="application/pdf"
						hidden
						onChange={e => onResumeChange(e)}
					/>
					<Button
						variant="outlined"
						onClick={e => document.getElementById('cover-upload').click()}
					>
						Upload Resume
					</Button>
					<Typography variant="body1">Only .pdf file accepted</Typography>
					{resume != '' ? (
						<a
							href={`https://docs.google.com/gview?url=${resume}&embedded=true`}
							target="_blank"
						>
							Resume Link
						</a>
					) : null}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={upload} color="primary">
					{loading ? <CircularProgress size={24} /> : 'Apply for Job'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
