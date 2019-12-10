import React, { useState } from 'react';
import axios from 'axios';
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
	Button,
	CircularProgress,
	makeStyles
} from '@material-ui/core';
import { Edit, Message, LocationOn } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
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
	},
	capitalize: {
		textTransform: 'capitalize'
	}
}));

export default function Profile(props) {
	const classes = useStyles();

	if (props.data != null)
		return (
			<Card>
				<CardMedia image={props.data.coverPic} style={{ height: '200px' }} />
				<CardContent>
					<Grid container justify="center" className={classes.grid}>
						<Avatar src={props.data.profilePic} className={classes.bigAvatar} />
						<Grid container direction="column">
							<Typography
								align="center"
								variant="h3"
								gutterBottom
								className={classes.capitalize}
							>
								{props.data.name}
							</Typography>
							<Typography align="center" variant="subtitle1" gutterBottom>
								<LocationOn></LocationOn>
								{props.data.city}
							</Typography>
							<Typography align="center" variant="subtitle2" gutterBottom>
								Rs. 2000/- per day
							</Typography>
						</Grid>
						<Typography>{props.data.bio}</Typography>
					</Grid>
					<Typography align="right" variant="body2" gutterBottom>
						{props.data.studio}
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
		);
	else return <CircularProgress />;
}