import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';

Amplify.configure({
	Auth: {
		region: 'ap-south-1',
		userPoolId: 'ap-south-1_pWjBn0W3N',
		userPoolWebClientId: '3t5o8ktmo83kfksu0ghsjjapcv',
		authenticationFlowType: 'USER_PASSWORD_AUTH'
	}
});
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
	Card,
	Container,
	Badge
} from '@material-ui/core';
import {} from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { Autocomplete } from '@material-ui/lab';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';

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
	},
	spacing: {
		padding: '10px 2px 10px 2px'
	}
};

class SetupPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 2,
			steps: ['Email Verification', 'Add Details', 'Add Image'],
			isLoading: false,
			gender: 'male',
			code: '',
			dob: new Date('2014-08-18T21:11:54'),
			roles: [
				{
					name: 'Director',
					id: 'defff'
				}
			],
			studios: [
				{
					name: 'Director Sosr',
					id: 'defff'
				}
			]
		};
		this.verify = this.verify.bind(this);
	}

	componentDidMount() {}

	verify() {
		var self = this;
		this.setState({
			isLoading: true
		});

		Auth.confirmSignUp(localStorage.email, self.state.code)
			.then(res => {
				this.setState((state, props) => ({
					loading: false,
					currentStep: state.currentStep + 1
				}));
			})
			.catch(err => console.log(err));
	}

	addDetails() {
		var self = this;
		this.setState({
			isLoading: true
		});
		axios
			.put(`https://`, {})
			.then(res => {
				this.setState((state, props) => ({
					loading: false,
					currentStep: state.currentStep + 1
				}));
			})
			.catch(err => console.log(err));
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
									value={this.state.code}
									onChange={e => this.setState({ code: e.target.value })}
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
									<TextField
										type="text"
										variant="outlined"
										fullWidth
										label="Current City/Locality"
									/>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											disableToolbar
											variant="inline"
											format="MM/dd/yyyy"
											margin="normal"
											id="date-picker-inline"
											label="Date of Birth"
											value={this.state.dob}
											className={classes.spacing}
											onChange={d => this.setState({ dob: d })}
											KeyboardButtonProps={{
												'aria-label': 'change date'
											}}
										/>
									</MuiPickersUtilsProvider>
									<Container className={classes.spacing}>
										<Autocomplete
											id="studios"
											options={this.state.studios}
											getOptionLabel={option => option.name}
											style={{ width: '100%' }}
											onChange={(e, d) => console.log(d.id)}
											renderInput={params => (
												<TextField
													{...params}
													label="Select the Studio you want to join"
													variant="outlined"
													fullWidth
												/>
											)}
										/>
									</Container>
									<Container className={classes.spacing}>
										<Autocomplete
											id="roles"
											options={this.state.roles}
											getOptionLabel={option => option.name}
											style={{ width: '100%' }}
											onChange={(e, d) => console.log(d.id)}
											renderInput={params => (
												<TextField
													{...params}
													label="Select your Role"
													variant="outlined"
													fullWidth
												/>
											)}
										/>
									</Container>
								</div>
							) : null}
							{this.state.currentStep == 2 ? (
								<Container>
									<Badge badgeContent={4} color="primary">
										<img src="https://placekitten.com/700/200" />
									</Badge>
									<input type="file" hidden />
								</Container>
							) : null}
						</CardContent>
						<CardActions className={classes.bar}>
							{this.state.currentStep == 0 ? (
								<Button
									variant="contained"
									color="primary"
									onClick={e => this.verify()}
								>
									{this.state.isLoading ? (
										<CircularProgress
											size={24}
											className={classes.loader}
										></CircularProgress>
									) : (
										'Verify and Next'
									)}
								</Button>
							) : null}
							{this.state.currentStep == 1 ? (
								<Button
									variant="contained"
									color="primary"
									onClick={e => this.verify()}
								>
									{this.state.isLoading ? (
										<CircularProgress
											size={24}
											className={classes.loader}
										></CircularProgress>
									) : (
										'Add Details'
									)}
								</Button>
							) : null}
							{this.state.currentStep == 2 ? (
								<Button
									variant="contained"
									color="primary"
									onClick={e => this.verify()}
								>
									{this.state.isLoading ? (
										<CircularProgress
											size={24}
											className={classes.loader}
										></CircularProgress>
									) : (
										'Finish Setup'
									)}
								</Button>
							) : null}
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(SetupPage);
