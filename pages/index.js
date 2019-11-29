import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../components/layout';
import Post from '../components/post';
import { Container, Grid, withStyles } from '@material-ui/core';

const styles = {
	grid: {
		margin: '100px 10px',
		padding: '0 30px'
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
				<Container className={classes.grid}>
					<Grid container spacing={3}>
						<Grid>
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
