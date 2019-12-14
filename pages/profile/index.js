import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../../components/layout';
import Post from '../../components/post';
import Job from '../../components/job';
import Work from '../../components/work';
import Profile from '../../components/profile';
import {
	Container,
	Grid,
	withStyles,
	CircularProgress,
	LinearProgress
} from '@material-ui/core';
import { Edit, Message, LocationOn } from '@material-ui/icons';
import Router from 'next/router';

const styles = {
	container: {
		margin: '100px 10px 20px 10px',
		padding: '0 30px'
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

class ProfilePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			result: null,
			posts: [],
			loaded: false
		};
	}

	componentDidMount() {
		var self = this;
		axios
			.get(`${process.env.API_BASE_URL}profile/${localStorage.sub}`)
			.then(res => {
				if (res.data.Item)
					self.setState({
						result: res.data.Item,
						loaded: true
					});
				else Router.push('/setup');
			});
		axios
			.get(`${process.env.API_BASE_URL}post/${localStorage.sub}`)
			.then(res => {
				self.setState({
					posts: res.data.Items
				});
			});
	}

	render() {
		const { classes } = this.props;

		if (this.state.loaded)
			return (
				<Layout>
					<Container className={classes.container}>
						<Profile data={this.state.result} isEditable />
					</Container>
					<Container>
						<Grid container spacing={1} justify="center">
							<Grid item className={classes.center}>
								{this.state.posts.length > 0 ? (
									this.state.posts.map(v => {
										if (v.type == 'social') return <Post data={v} key={v.id} />;
										if (v.type == 'job')
											return (
												<Job
													data={v}
													key={v.id}
													isOwner={localStorage.sub == v.uploader}
												/>
											);
										if (v.type == 'work') return <Work data={v} key={v.id} />;
									})
								) : (
									<CircularProgress />
								)}
							</Grid>
						</Grid>
					</Container>
				</Layout>
			);
		else return <LinearProgress />;
	}
}

ProfilePage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePage);
