import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../components/layout';
import Post from '../components/post';
import Router from 'next/router';
import {
	Container,
	Grid,
	withStyles,
	CircularProgress
} from '@material-ui/core';
import Job from '../components/job';

const styles = {
	container: {
		margin: '90px 0px'
	},
	grid: {
		justifyContent: 'center'
	}
};
class IndexPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (!localStorage.sub) Router.replace('/login');
	}
	render() {
		const { classes } = this.props;

		return (
			<Layout>
				<Grid container spacing={0} className={classes.container}>
					<Grid item lg={3}></Grid>
					<Grid item lg={6}>
						{this.props.posts.length > 0 ? (
							this.props.posts.map(v => {
								if (v.type == 'social') return <Post data={v} key={v.id} />;
								if (v.type == 'job') return <Job data={v} key={v.id} />;
							})
						) : (
							<CircularProgress />
						)}
					</Grid>
					<Grid item lg={3}></Grid>
				</Grid>
			</Layout>
		);
	}
}

IndexPage.getInitialProps = async function() {
	var res = await axios.get(`${process.env.API_BASE_URL}posts/`);

	return {
		posts: res.data.Items
	};
};

IndexPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexPage);
