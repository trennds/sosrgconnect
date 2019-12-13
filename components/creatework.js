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
	CircularProgress
} from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={values => {
				onChange({
					target: {
						value: values.value
					}
				});
			}}
			thousandSeparator
			isNumericString
			prefix="Rs. "
		/>
	);
}

NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
};

export default function CreateWork(props) {
	const [amount, setAmount] = useState('1000');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [experience, setExperience] = useState('');
	const [location, setLocation] = useState('');
	const [loading, setLoading] = useState(false);

	const handleClickOpen = () => {
		props.handleOpen(true);
	};

	const handleClose = () => {
		props.handleOpen(false);
	};

	const onSubmit = () => {
		setLoading(true);
		axios
			.post(`${process.env.API_BASE_URL}work/`, {
				uploader: localStorage.sub,
				title: title,
				description: description,
				experience: experience,
				amount: amount,
				location: location
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
		>
			<DialogTitle id="form-dialog-title">Create Work/Project Post</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Work/Project Title"
					type="text"
					fullWidth
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<TextField
					margin="dense"
					id="name"
					label="Description"
					type="text"
					fullWidth
					multiline
					rows={3}
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<Grid container spacing={2}>
					<Grid item>
						<TextField
							margin="dense"
							label="Amount to be paid"
							value={amount}
							onChange={e => setAmount(e.target.value)}
							id="formatted-numberformat-input"
							InputProps={{
								inputComponent: NumberFormatCustom
							}}
						/>
					</Grid>
					<Grid item>
						<TextField
							margin="dense"
							label="Work/Project Location"
							value={location}
							onChange={e => setLocation(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LocationOn />
									</InputAdornment>
								)
							}}
						/>
					</Grid>
				</Grid>
				<TextField
					margin="dense"
					id="name"
					label="Experience Required"
					type="text"
					fullWidth
					multiline
					rows={3}
					value={experience}
					onChange={e => setExperience(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={onSubmit} color="primary">
					{loading ? <CircularProgress size={24} /> : 'Create Post'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
