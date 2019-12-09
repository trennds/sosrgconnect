import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Router from 'next/router';
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
	makeStyles,
	withStyles,
	Typography,
	TextField,
	Grid,
	CssBaseline,
	Avatar,
	FormControlLabel,
	Button,
	Link,
	Box,
	Paper,
	Checkbox,
	Container,
	InputAdornment,
	IconButton,
	Input,
	OutlinedInput,
	InputLabel,
	FormControl,
	CircularProgress
} from '@material-ui/core';
import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';

const styles = {
	root: {
		height: '100vh'
	},
	image: {
		backgroundImage:
			'url(https://images.unsplash.com/photo-1501366062246-723b4d3e4eb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1073&q=80)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: 'grey',
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	paper: {
		margin: '8px 4px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: '10px',
		backgroundColor: 'blue'
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: '20px',
		padding: '20px'
	},
	submit: {
		margin: '10px'
	}
};

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			password: '',
			loading: false,
			showPassword: false
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit() {
		this.setState({
			loading: true
		});
		var self = this;
		Auth.signUp({
			username: self.state.email,
			password: self.state.password,
			attributes: {
				name: `${self.state.firstName} ${self.state.lastName}`,
				phone_number: `+91${self.state.phone}`,
				email: self.state.email
			}
		})
			.then(res => {
				this.setState({
					loading: false
				});
				Router.push('/setup');
			})
			.catch(err => console.log(err));
	}

	render() {
		const { classes } = this.props;

		return (
			<Grid container component="main" className={classes.root}>
				<CssBaseline />
				<Grid item xs={false} sm={4} md={7} className={classes.image} />
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlined />
						</Avatar>
						<Typography component="h1" variant="h5">
							Register on Sosrg Connect
						</Typography>
						<Container className={classes.form}>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<TextField
										variant="outlined"
										margin="normal"
										required
										fullWidth
										id="firstname"
										type="text"
										label="First Name"
										autoFocus
										value={this.state.firstName}
										onChange={e => this.setState({ firstName: e.target.value })}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										variant="outlined"
										margin="normal"
										required
										fullWidth
										id="lastname"
										type="text"
										label="Last Name"
										value={this.state.lastName}
										onChange={e => this.setState({ lastName: e.target.value })}
									/>
								</Grid>
							</Grid>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								type="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								value={this.state.email}
								onChange={e => this.setState({ email: e.target.value })}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="phone"
								type="phone"
								label="Phone Number"
								name="email"
								autoComplete="phone"
								autoFocus
								value={this.state.phone}
								onChange={e => this.setState({ phone: e.target.value })}
							/>
							<FormControl fullWidth variant="outlined">
								<InputLabel htmlFor="password">Password</InputLabel>
								<OutlinedInput
									type={this.state.showPassword ? 'text' : 'password'}
									id="password"
									autoComplete="current-password"
									value={this.state.password}
									onChange={e => this.setState({ password: e.target.value })}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={e =>
													this.setState((state, props) => ({
														showPassword: !state.showPassword
													}))
												}
											>
												{this.state.showPassword ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={70}
								/>
							</FormControl>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={e => this.onSubmit()}
							>
								{this.state.loading ? (
									<CircularProgress size={24} />
								) : (
									'Register'
								)}
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href="#" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
							<Box mt={5}>{/* <Copyright /> */}</Box>
						</Container>
					</div>
				</Grid>
			</Grid>
		);
	}
}

RegisterPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegisterPage);
