import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../components/layout';
import Profile from '../components/profile';
import {
	Container,
	Grid,
	Card,
	CardContent,
	CardActions,
	TextField,
	Button
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles"
import { Edit, Message, LocationOn } from '@material-ui/icons';
import Router from 'next/router';

const styles = {
	container: {
		margin: '100px 10px 20px 10px',
		padding: '0 30px'
	},
	bar: {
		display: 'flex',
		flexDirection: 'row-reverse'
	},
	grid: {
		margin: '60px 2px 10px 2px'
	},
	bigAvatar: {
		width: 150,
		height: 150,
		position: 'absolute',
		transform: 'translate(-0%, -120%)',
		margin: '20px 20px'
	},
	spacing: {
		margin: '0px 5px 0px 2px'
	},
	center: {
		justifyContent: 'center'
	}
};

class EditPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			result: null,
			bio: '',
			loading: ''
		};
	}

	componentDidMount() {
		var self = this;
		// axios
		// 	.get(`${process.env.API_BASE_URL}profile/${localStorage.sub}`)
		// 	.then(res => {
		// 		if (res.data.Item)
		// 			self.setState({
		// 				result: res.data.Item
		// 			});
		// 		else Router.push('/setup');
		// 	});
	}

	render() {
		const { classes } = this.props;

		return (
			<Layout>
				<Container className={classes.container}>
					<Card>
						<CardContent>
							<TextField
								variant="outlined"
								label="Enter your bio"
								multiline
								fullWidth
								rows={3}
								value={this.state.bio}
								onChange={e => this.setState({ bio: e.target.value })}
							></TextField>
						</CardContent>
						<CardActions className={classes.bar}>
							<Button variant="contained" color="primary">
								Update Profile
							</Button>
						</CardActions>
					</Card>
				</Container>
			</Layout>
		);
	}
}

EditPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditPage);
