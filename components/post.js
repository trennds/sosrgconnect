import React from 'react';
import PropTypes, { func } from 'prop-types';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import {
	Card,
	CardContent,
	CardMedia,
	Avatar,
	CardHeader,
	withStyles,
	Typography,
	CardActions,
	IconButton,
	Collapse,
	TextField,
	Grid,
	Fab,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Divider
} from '@material-ui/core';
import { Favorite, Share, Comment, Send } from '@material-ui/icons';

const styles = theme => ({
	card: {
		maxWidth: 500
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	avatar: {
		backgroundColor: red[500]
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	input: {
		flex: 1
	},
	margin: {
		margin: theme.spacing(1)
	}
});

function Comments() {
	return (
		<List>
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Avatar alt="Travis Howard">R</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary="Brunch this weekend?"
					secondary={
						<React.Fragment>
							<Typography component="span" variant="body2" color="textPrimary">
								Ali Connors
							</Typography>
							{" — I'll be in your neighborhood doing errands this…"}
						</React.Fragment>
					}
				/>
			</ListItem>
			<Divider variant="inset" component="li" />
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Avatar alt="Travis Howard">R</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary="Summer BBQ"
					secondary={
						<React.Fragment>
							<Typography component="span" variant="body2" color="textPrimary">
								to Scott, Alex, Jennifer
							</Typography>
							{" — Wish I could come, but I'm out of town this…"}
						</React.Fragment>
					}
				/>
			</ListItem>
			<Divider variant="inset" component="li" />
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Avatar alt="Travis Howard">R</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary="Oui Oui"
					secondary={
						<React.Fragment>
							<Typography component="span" variant="body2" color="textPrimary">
								Sandra Adams
							</Typography>
							{' — Do you have Paris recommendations? Have you ever…'}
						</React.Fragment>
					}
				/>
			</ListItem>
		</List>
	);
}

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: true
		};

		this.handleExpandClick = this.handleExpandClick.bind(this);
	}

	handleExpandClick() {
		this.setState((state, props) => ({
			isExpanded: !state.isExpanded
		}));
	}

	render() {
		const { classes } = this.props;

		return (
			<Card className={classes.card}>
				<CardHeader
					avatar={<Avatar className={classes.avatar}>R</Avatar>}
					title="Shrimp and Chorizo Paella"
					subheader="September 14, 2016"
				></CardHeader>
				<CardMedia
					image="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
					className={classes.media}
					title="Paella dish"
				/>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						This impressive paella is a perfect party dish and a fun meal to
						cook together with your guests. Add 1 cup of frozen peas along with
						the mussels, if you like.
					</Typography>
				</CardContent>
				<CardActions>
					<IconButton>
						<Favorite />
					</IconButton>
					{12}
					<IconButton>
						<Share />
					</IconButton>
					<IconButton
						className={clsx(classes.expand, {})}
						onClick={this.handleExpandClick}
						aria-expanded={this.state.isExpanded}
						aria-label="show more"
					>
						<Comment />
					</IconButton>
				</CardActions>
				<Collapse in={this.state.isExpanded} timeout="auto" unmountOnExit>
					<CardContent>
						{Comments()}
						<Grid container spacing={2}>
							<Grid xs={10}>
								<TextField
									variant="standard"
									label="Enter your comment"
									fullWidth
								/>
							</Grid>
							<Grid xs={2}>
								<Fab
									size="medium"
									color="secondary"
									aria-label="add"
									className={classes.margin}
								>
									<Send />
								</Fab>
							</Grid>
						</Grid>
					</CardContent>
				</Collapse>
			</Card>
		);
	}
}

Post.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
