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
import { Favorite, Share, Comment, Send, LocationOn } from '@material-ui/icons';

const styles = theme => ({
	card: {
		width: '100%',
		margin: theme.spacing(2)
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

class Work extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false,
			name: ''
		};

		this.handleExpandClick = this.handleExpandClick.bind(this);
	}

	componentDidMount() {
		var self = this;
		axios
			.get(`${process.env.API_BASE_URL}profile/${this.props.data.uploader}`)
			.then(res => {
				self.setState({
					name: res.data.Item.name
				});
			});
	}

	handleExpandClick() {
		this.setState((state, props) => ({
			isExpanded: !state.isExpanded
		}));
	}

	numberWithCommas(x) {
		x = x.toString();
		var lastThree = x.substring(x.length - 3);
		var otherNumbers = x.substring(0, x.length - 3);
		if (otherNumbers != '') lastThree = ',' + lastThree;
		return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
	}

	render() {
		const { classes } = this.props;

		return (
			<Card className={classes.card}>
				<CardHeader
					avatar={
						<Avatar className={classes.avatar}>
							{this.state.name.charAt(0).toUpperCase()}
						</Avatar>
					}
					title={this.state.name}
					subheader="Work required"
				></CardHeader>
				<CardContent>
					<Typography variant="h3" color="textSecondary">
						{this.props.data.title}
					</Typography>
					<hr />
					<Typography variant="h6" color="textSecondary">
						<LocationOn />
						{this.props.data.location}
					</Typography>
					<Typography variant="body1" color="textSecondary" component="p">
						{this.props.data.description}
					</Typography>
					<Typography variant="body1" color="textSecondary" component="p">
						Experience Required -{this.props.data.experience}
					</Typography>
					<Typography variant="h6" color="textSecondary">
						Rs. {this.numberWithCommas(this.props.data.amount)}/-
					</Typography>
				</CardContent>
				<CardActions>
					<IconButton>
						<Favorite />
					</IconButton>
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

Work.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Work);
