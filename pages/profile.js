import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../components/layout';
import Post from '../components/post';
import {
	Container,
	Grid,
	withStyles,
	Card,
	CardContent,
	Avatar,
	Typography,
	CardMedia,
	CardActions,
	Button
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

class ProfilePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { classes } = this.props;

		return (
			<Layout>
				<Container className={classes.container}>
					<Card>
						<CardMedia
							image="https://placekitten.com/500/500"
							style={{ height: '200px' }}
						/>
						<CardContent>
							<Grid container justify="center" className={classes.grid}>
								<Avatar
									src="https://placekitten.com/200/200"
									className={classes.bigAvatar}
								/>
								<Grid direction="column">
									<Typography align="center" variant="h3" gutterBottom>
										Romit Karmakar
									</Typography>
									<Typography align="center" variant="subtitle1" gutterBottom>
										<LocationOn></LocationOn>
										Asansol
									</Typography>
									<Typography align="center" variant="subtitle2" gutterBottom>
										Rs. 2000/- per day
									</Typography>
								</Grid>
								<Typography>
									Get ready to explore some of the best and most beautiful free
									photography website templates. These will help you build a
									portfolio website in a snap. While you already spend a ton of
									time taking pictures and editing them, the last thing you need
									is to spend additional who-knows-how-many hours on putting
									together the ideal site.
								</Typography>
							</Grid>
							<Typography align="right" variant="body2" gutterBottom>
								Sosrg Music Studio
							</Typography>
						</CardContent>
						<CardActions>
							<Button color="primary">
								<Message className={classes.spacing}></Message>
								Message
							</Button>
							<Button color="primary">
								<Edit className={classes.spacing}></Edit>
								Edit Profile
							</Button>
						</CardActions>
					</Card>
				</Container>
				<Container>
					<Grid container spacing={1} justify="center">
						<Grid item className={classes.center}>
							<Post />
						</Grid>
					</Grid>
				</Container>
			</Layout>
		);
	}
}

ProfilePage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePage);
