import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
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
	OutlinedInput,
	InputLabel,
	FormControl,
	CircularProgress
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles"
import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
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

const styles = {
	root: {
		height: '100vh'
	},
	image: {
		backgroundImage:
			'url(https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1115&q=80)',
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

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			showPassword: false,
			loading: false,
			err: ''
		};
		this.login = this.login.bind(this);
	}

	componentDidMount() {
		localStorage.clear();
	}

	async login() {
		this.setState({
			loading: true
		});
		var self = this;
		try {
			const user = await Auth.signIn(self.state.email, self.state.password);
			Auth.userAttributes(user).then(res => {
				res.forEach((item, index) => {
					localStorage.setItem(item.Name, item.Value);
				});
				this.setState({
					loading: false
				});
				axios
					.get(`${process.env.API_BASE_URL}profile/${localStorage.sub}`)
					.then(res => {
						if (res.data.Item) Router.replace('/');
						else Router.push('/setup');
					});
			});
		} catch (err) {
			this.setState({
				err: err.message,
				loading: false
			});
			if (err.code === 'UserNotConfirmedException') {
				localStorage.email = this.state.email;
				Router.replace('/setup');
			}
		}
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
							Login to SosrG Connect
						</Typography>
						<Container className={classes.form}>
							<Typography color="error">{this.state.err}</Typography>
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
								onClick={e => this.login()}
							>
								{this.state.loading ? <CircularProgress size={24} /> : 'Login'}
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link variant="body2" href="/register">
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

LoginPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);
