import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../components/layout';
import Post from '../components/post';
import {
	Container,
	Grid,
	withStyles,
	CircularProgress
} from '@material-ui/core';

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
	}

	// getData() {
	// 	var self = this;
	// 	axios.get(`${process.env.API_BASE_URL}posts/`).then(res => {
	// 		this.setState({
	// 			posts: res.data.Items
	// 		});
	// 	});
	// }

	// componentWillMount() {
	// 	this.getData();
	// }
	render() {
		const { classes } = this.props;

		return (
			<Layout>
				<Container className={classes.container}>
					<Grid container spacing={1} justify="center">
						{this.props.posts.length > 0 ? (
							<Grid item className={classes.grid}>
								{this.props.posts.map(v => (
									<Post data={v} key={v.id} />
								))}
							</Grid>
						) : (
							<CircularProgress />
						)}
					</Grid>
				</Container>
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
