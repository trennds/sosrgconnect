import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
	Stepper,
	Step,
	StepLabel,
	CardContent,
	TextField,
	Grid,
	CardActions,
	Button,
	withStyles,
	CardHeader,
	CircularProgress,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Card
} from '@material-ui/core';
import {} from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { Autocomplete } from '@material-ui/lab';

const styles = {
	button: {
		backgroundColor: 'blue',
		color: 'white'
	},
	loader: {
		color: green[500]
	},
	bar: {
		display: 'flex',
		flexDirection: 'row-reverse'
	},
	gender: {
		margin: '10px'
	}
};

class SetupPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 1,
			steps: ['Email Verification', 'Add Details', 'Review'],
			isLoading: false,
			gender: 'male'
		};
	}

	render() {
		const { classes } = this.props;
		return (
			<Grid container spacing={2}>
				<Grid item xs={2}></Grid>
				<Grid item xs={8}>
					<Stepper activeStep={this.state.currentStep}>
						{this.state.steps.map((v, index) => {
							return (
								<Step completed={index < this.state.currentStep ? true : false}>
									<StepLabel>{v}</StepLabel>
								</Step>
							);
						})}
					</Stepper>
					<Card>
						<CardHeader title={this.state.steps[this.state.currentStep]} />
						<CardContent>
							{this.state.currentStep == 0 ? (
								<TextField
									type="text"
									variant="outlined"
									fullWidth
									label="Verification Code"
									helperText="The code sent to your registered email."
								/>
							) : null}
							{this.state.currentStep == 1 ? (
								<div>
									<TextField
										type="text"
										variant="outlined"
										fullWidth
										label="Short Bio"
										multiline
										rows={3}
										rowsMax={3}
									/>
									<FormControl component="fieldset" className={classes.gender}>
										<FormLabel component="legend">Gender</FormLabel>
										<RadioGroup
											aria-label="gender"
											value={this.state.gender}
											onChange={e => this.setState({ gender: e.target.value })}
										>
											<FormControlLabel
												value="male"
												control={<Radio />}
												label="Male"
											/>
											<FormControlLabel
												value="female"
												control={<Radio />}
												label="Female"
											/>
											<FormControlLabel
												value="other"
												control={<Radio />}
												label="Other"
											/>
										</RadioGroup>
									</FormControl>
								</div>
							) : null}
						</CardContent>
						<CardActions className={classes.bar}>
							<Button variant="contained" color="primary">
								{this.state.isLoading ? (
									<CircularProgress
										size={24}
										className={classes.loader}
									></CircularProgress>
								) : (
									'Verify and Next'
								)}
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(SetupPage);
