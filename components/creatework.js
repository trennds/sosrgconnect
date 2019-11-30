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

export default function CreateWork(props) {
	const [amount, setAmount] = useState('1000');

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
			<DialogTitle id="form-dialog-title">Create Work/Project Post</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Work/Project Title"
					type="text"
					fullWidth
				/>
				<TextField
					margin="dense"
					id="name"
					label="Description"
					type="text"
					fullWidth
					multiline
					rows={3}
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
					Create Work
				</Button>
			</DialogActions>
		</Dialog>
	);
}
