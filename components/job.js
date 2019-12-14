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
	Divider,
	Button,
	LinearProgress
} from '@material-ui/core';
import {
	Favorite,
	Share,
	Comment,
	Send,
	LocationOn,
	Work
} from '@material-ui/icons';
import JobProposal from './jobproposal';

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
	spacing: {
		margin: '0px 5px 0px 2px'
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

function Comments(data) {
	if (data.length > 0)
		return (
			<List>
				{data.map(v => (
					<div>
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								<Avatar alt="Travis Howard">
									{v.senderName.charAt(0).toUpperCase()}
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={v.senderName}
								secondary={
									<React.Fragment>
										<Typography variant="body2" color="textPrimary">
											Reason- {v.reason}
										</Typography>
										<Typography variant="body2" color="textPrimary">
											Experiences- {v.experience}
										</Typography>
										<Typography variant="body2" color="textPrimary">
											Contact Email- {v.senderEmail}
										</Typography>
										<Typography variant="body1">
											<a
												href={`https://docs.google.com/gview?url=${v.resume}&embedded=true`}
												target="_blank"
											>
												Open Resume
											</a>
										</Typography>
									</React.Fragment>
								}
							/>
						</ListItem>
						<Divider variant="inset" component="li" />
					</div>
				))}
			</List>
		);
	else return <LinearProgress />;
}

class Job extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false,
			name: '',
			open: false,
			proposals: []
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
		if (this.props.isOwner) {
			axios
				.get(`${process.env.API_BASE_URL}proposal/${self.props.data.id}`)
				.then(res => {
					for (let index = 0; index < res.data.Items.length; index++) {
						axios
							.get(
								`${process.env.API_BASE_URL}profile/${res.data.Items[index].sender}`
							)
							.then(val => {
								let temp = res.data.Items[index];
								temp.senderName = val.data.Item.name;
								temp.senderEmail = val.data.Item.email;
								self.setState((state, props) => ({
									proposals: [...state.proposals, temp]
								}));
							});
					}
				});
		}
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
					subheader="Job Required"
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
						Rs. {this.numberWithCommas(this.props.data.salary)}/-
					</Typography>
				</CardContent>
				<CardActions>
					{!this.props.isOwner ? (
						<Button
							color="inherit"
							onClick={e => this.setState({ open: true })}
						>
							<Work className={classes.spacing} /> Apply for Job
						</Button>
					) : null}
					<IconButton>
						<Share />
					</IconButton>
					<Button
						className={clsx(classes.expand, {})}
						onClick={this.handleExpandClick}
						aria-expanded={this.state.isExpanded}
						aria-label="show more"
					>
						<Comment className={classes.spacing} /> View Proposals
					</Button>
				</CardActions>
				<Collapse in={this.state.isExpanded} timeout="auto" unmountOnExit>
					<CardContent>
						{Comments(this.state.proposals)}
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
				<JobProposal
					isOpen={this.state.open}
					id={this.props.data.id}
					handleOpen={val => this.setState({ open: val })}
				/>
			</Card>
		);
	}
}

Job.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Job);
