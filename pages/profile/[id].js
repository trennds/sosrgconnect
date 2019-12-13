import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../../components/layout';
import Post from '../../components/post';
import Profile from '../../components/profile';
import Job from '../../components/job';
import Work from '../../components/work';
import {
	Container,
	Grid,
	withStyles,
	CircularProgress
} from '@material-ui/core';
import { Edit, Message, LocationOn } from '@material-ui/icons';

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

class ProfileIdPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { classes } = this.props;

		return (
			<Layout>
				<Container className={classes.container}>
					<Profile
						data={this.props.data}
						isEditable={localStorage.sub == this.props.data.id}
					/>
				</Container>
				<Container>
					<Grid container spacing={1} justify="center">
						<Grid item className={classes.center}>
							{this.props.posts.length > 0 ? (
								this.props.posts.map(v => {
									if (v.type == 'social') return <Post data={v} key={v.id} />;
									if (v.type == 'job') return <Job data={v} key={v.id} />;
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
	}
}

ProfileIdPage.getInitialProps = async function(context) {
	const { id } = context.query;
	var res = await axios.get(`${process.env.API_BASE_URL}profile/${id}`);
	var res1 = await axios.get(`${process.env.API_BASE_URL}post/${id}`);
	return { data: res.data.Item, posts: res1.data.Items };
};

ProfileIdPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileIdPage);
