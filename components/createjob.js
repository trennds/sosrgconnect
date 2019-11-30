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
	Grid
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

export default function CreateJob(props) {
	const [salary, setSalary] = useState('1000');

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
			<DialogTitle id="form-dialog-title">Create Job Post</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Job Title"
					type="text"
					fullWidth
				/>
				<TextField
					margin="dense"
					id="name"
					label="Job Description"
					type="text"
					fullWidth
					multiline
					rows={3}
				/>
				<Grid container spacing={2}>
					<Grid item>
						<TextField
							margin="dense"
							label="Pay Package (Salary)"
							value={salary}
							onChange={e => setSalary(e.target.value)}
							id="formatted-numberformat-input"
							InputProps={{
								inputComponent: NumberFormatCustom
							}}
						/>
					</Grid>
					<Grid item>
						<TextField
							margin="dense"
							label="Job Location"
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
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleClose} color="primary">
					Create Job
				</Button>
			</DialogActions>
		</Dialog>
	);
}
