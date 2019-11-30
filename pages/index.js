import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../components/layout';
import Post from '../components/post';
import { Container, Grid, withStyles } from '@material-ui/core';

const styles = {
	container: {
		margin: '100px 10px',
		padding: '0 30px'
	},
	grid: {
		justifyContent: 'center'
	}
};
class IndexPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { classes } = this.props;

		return (
			<Layout>
				<Container className={classes.container}>
					<Grid container spacing={1} justify="center">
						<Grid item className={classes.grid}>
							<Post />
						</Grid>
					</Grid>
				</Container>
			</Layout>
		);
	}
}

IndexPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexPage);
