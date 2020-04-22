import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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
			bucket: 'images.accounts.sosrgstudios.com', //REQUIRED -  Amazon S3 bucket
			region: 'ap-south-1' //OPTIONAL -  Amazon service region
		}
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
	CardHeader,
	CircularProgress,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Card,
	Container,
	Badge,
	Box,
	LinearProgress,
	Typography,
	CardMedia
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles"
import {} from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { Autocomplete } from '@material-ui/lab';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import Router from 'next/router';

const styles = {
	media: {
		margin: '10px',
		height: '200px',
		borderRadius: '5px' // 16:9
	},
	profile: {
		margin: '10px',
		borderRadius: '50%',
		height: '100px',
		width: '100px'
	},
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
	},
	gap: {
		margin: '0px 10px'
	}
};

class SetupPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 2,
			uploadValue: 0,
			steps: ['Email Verification', 'Add Details', 'Add Image'],
			isLoading: false,
			gender: 'male',
			code: '',
			dob: new Date('2014-08-18T21:11:54'),
			roles: [],
			studios: [],
			coverPic: 'https://placekitten.com/500/1024',
			profilePic: 'https://placekitten.com/500/1024',
			bio: '',
			city: '',
			currentRole: '',
			currentStudio: '',
			err: ''
		};
		this.verify = this.verify.bind(this);
		this.onStudioChange = this.onStudioChange.bind(this);
		this.onCoverPicChange = this.onCoverPicChange.bind(this);
		this.onProfilePicChange = this.onProfilePicChange.bind(this);
	}

	componentDidMount() {
		if (!localStorage.email) Router.replace('/login');
		if (localStorage.email_verified == 'true')
			this.setState({ currentStep: 1 });
		else this.setState({ currentStep: 0 });
		var self = this;
		axios
			.get(`${process.env.API_BASE_URL}profile/${localStorage.sub}`)
			.then(res => {
				if (res.data.Item) Router.replace('/');
			});
		axios.get(`${process.env.API_BASE_URL}studio/`).then(res => {
			self.setState({
				studios: res.data.Items
			});
		});
	}

	onStudioChange(val) {
		var self = this;
		this.setState({ currentStudio: val.id });
		axios.get(`${process.env.API_BASE_URL}role/${val.id}`).then(res => {
			self.setState({
				roles: res.data.Items
			});
		});
	}

	onCoverPicChange(e) {
		var self = this;
		const file = e.target.files[0];
		var fileName = file.name;
		var fileArr = fileName.split('.');
		var photoKey = `C_${localStorage.sub}.${fileArr[fileArr.length - 1]}`;

		Storage.put(photoKey, file, {
			contentType: `image/${fileArr[fileArr.length - 1]}`,
			progressCallback(progress) {
				self.setState({
					uploadValue: (progress.loaded / progress.total) * 100
				});
				console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
			}
		})
			.then(result => {
				Storage.get(photoKey)
					.then(result =>
						self.setState({
							coverPic:
								'https://s3.ap-south-1.amazonaws.com/images.accounts.sosrgstudios.com/public/' +
								photoKey
						})
					)
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	}

	onProfilePicChange(e) {
		var self = this;
		const file = e.target.files[0];
		var fileName = file.name;
		var fileArr = fileName.split('.');
		var photoKey = `P_${localStorage.sub}.${fileArr[fileArr.length - 1]}`;

		Storage.put(photoKey, file, {
			contentType: `image/${fileArr[fileArr.length - 1]}`,
			progressCallback(progress) {
				self.setState({
					uploadValue: (progress.loaded / progress.total) * 100
				});
				console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
			}
		})
			.then(result => {
				Storage.get(photoKey)
					.then(result =>
						self.setState({
							profilePic:
								'https://s3.ap-south-1.amazonaws.com/images.accounts.sosrgstudios.com/public/' +
								photoKey
						})
					)
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	}

	resend() {
		Auth.resendSignUp(localStorage.email)
			.then(res => {
				alert('Verification Code sent to your email.');
			})
			.catch(err => alert('Code sending failed'));
	}

	verify() {
		var self = this;
		this.setState({
			isLoading: true
		});

		Auth.confirmSignUp(localStorage.email, self.state.code)
			.then(res => {
				this.setState((state, props) => ({
					isLoading: false
				}));
				localStorage.clear();
				Router.push('/login');
			})
			.catch(err => {
				self.setState({
					isLoading: false,
					err: err.message
				});
			});
	}

	addDetails() {
		var self = this;
		this.setState({
			isLoading: true
		});
		axios
			.post(`${process.env.API_BASE_URL}profile/`, {
				id: localStorage.sub,
				name: localStorage.name,
				email: localStorage.email,
				phone: localStorage.phone_number,
				bio: self.state.bio,
				gender: self.state.gender,
				dob: self.state.dob.toString(),
				profilePic: self.state.profilePic,
				coverPic: self.state.coverPic,
				profilePic: self.state.profilePic,
				studio: self.state.currentStudio,
				role: self.state.currentRole,
				city: self.state.city
			})
			.then(res => {
				this.setState((state, props) => ({
					isLoading: false
				}));
				Router.replace('/');
			})
			.catch(err => console.log(err));
	}

	render() {
		const { classes } = this.props;
		return (
			<Grid container spacing={2}>
				<Grid item lg={2}></Grid>
				<Grid item xs={12} lg={8}>
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
						{this.state.uploadValue != 0 ? (
							<LinearProgress
								variant="determinate"
								value={this.state.uploadValue}
							/>
						) : null}
						<CardHeader title={this.state.steps[this.state.currentStep]} />
						<CardContent>
							{this.state.currentStep == 0 ? (
								<Box>
									<Typography color="error" className={classes.spacing}>
										{this.state.err}
									</Typography>
									<TextField
										type="text"
										variant="outlined"
										fullWidth
										label="Verification Code"
										value={this.state.code}
										onChange={e => this.setState({ code: e.target.value })}
										helperText="The code sent to your registered email."
									/>
								</Box>
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
										value={this.state.bio}
										onChange={e => this.setState({ bio: e.target.value })}
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
										value={this.state.city}
										onChange={e => this.setState({ city: e.target.value })}
									/>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											disableToolbar
											variant="inline"
											format="dd/MM/yyyy"
											margin="normal"
											id="date-picker-inline"
											label="Date of Birth (dd/mm/yyyy)"
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
											onChange={(e, d) => this.onStudioChange(d)}
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
											onChange={(e, d) => this.setState({ currentRole: d.id })}
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
									<Box className={classes.spacing}>
										<input
											id="cover-upload"
											type="file"
											accept="image/*"
											hidden
											onChange={e => this.onCoverPicChange(e)}
										/>
										<Button
											variant="outlined"
											onClick={e =>
												document.getElementById('cover-upload').click()
											}
										>
											Upload Cover Photo
										</Button>
										{this.state.coverPic != '' ? (
											<CardMedia
												image={this.state.coverPic}
												className={classes.media}
												title="Paella dish"
											/>
										) : null}
									</Box>

									<Box className={classes.spacing}>
										<input
											id="profile-upload"
											type="file"
											accept="image/*"
											hidden
											onChange={e => this.onProfilePicChange(e)}
										/>
										<Button
											variant="outlined"
											onClick={e =>
												document.getElementById('profile-upload').click()
											}
										>
											Upload Profile Photo
										</Button>
										{this.state.profilePic != '' ? (
											<CardMedia
												image={this.state.profilePic}
												className={classes.profile}
												title="Paella dish"
											/>
										) : null}
									</Box>
								</Container>
							) : null}
						</CardContent>
						<CardActions className={classes.bar}>
							<Button
								variant="outlined"
								color="primary"
								className={classes.gap}
								onClick={e => Router.push('/login')}
							>
								Log Out
							</Button>
							{this.state.currentStep == 0 ? (
								<span>
									<Button
										color="primary"
										className={classes.gap}
										onClick={e => this.resend()}
									>
										Resend Code
									</Button>
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
								</span>
							) : null}
							{this.state.currentStep == 1 ? (
								<Button
									variant="contained"
									color="primary"
									onClick={e => this.setState({ currentStep: 2 })}
								>
									{this.state.isLoading ? (
										<CircularProgress
											size={24}
											className={classes.loader}
										></CircularProgress>
									) : (
										'Next'
									)}
								</Button>
							) : null}
							{this.state.currentStep == 2 ? (
								<Button
									variant="contained"
									color="primary"
									onClick={e => this.addDetails()}
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
							{this.state.currentStep == 2 ? (
								<Button
									variant="outlined"
									className={classes.gap}
									onClick={e => this.setState({ currentStep: 1 })}
								>
									Previous
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
