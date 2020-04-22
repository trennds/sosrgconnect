import React from 'react';
import PropTypes, { func } from 'prop-types';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import axios from 'axios';

import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Avatar from "@material-ui/core/Avatar"
import CardHeader from "@material-ui/core/CardHeader"
import withStyles from "@material-ui/core/styles/withStyles"
import Typography from "@material-ui/core/Typography"
import CardActions from "@material-ui/core/CardActions"
import IconButton from "@material-ui/core/IconButton"
import Collapse from "@material-ui/core/Collapse"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import Favorite from "@material-ui/icons/Favorite"
import Share from "@material-ui/icons/Share"
import Comment from "@material-ui/icons/Comment"
import Send from "@material-ui/icons/Send"
import Link from 'next/link';

const styles = theme => ({
	card: {
		width: '100%',
		margin: `20px 0px`
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
		</List>
	);
}

function ImageModal(props) {
	return (
		<Dialog
			open={props.isOpen}
			onClose={props.handleState}
			aria-labelledby="form-dialog-title"
		>
			<DialogContent>
				<img src={props.image} style={{ maxHeight: '500px', width: '100%' }} />
			</DialogContent>
		</Dialog>
	);
}

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false,
			name: '',
			comment: '',
			isOpen: false
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

	render() {
		const { classes } = this.props;

		return (
			<Card className={classes.card}>
				<ImageModal
					isOpen={this.state.isOpen}
					image={this.props.data.image}
					handleState={e =>
						this.setState((state, props) => ({ isOpen: !state.isOpen }))
					}
				/>
				<Link href="/profile/[id]" as={`/profile/${this.props.data.uploader}`}>
					<CardHeader
						avatar={
							<Avatar className={classes.avatar}>
								{this.state.name.charAt(0).toUpperCase()}
							</Avatar>
						}
						title={this.state.name}
					></CardHeader>
				</Link>
				<CardMedia
					onClick={e => this.setState({ isOpen: true })}
					image={this.props.data.image}
					className={classes.media}
					title="Paella dish"
				/>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{this.props.data.description}
					</Typography>
				</CardContent>
				<CardActions>
					<IconButton>
						<Favorite />
					</IconButton>
					{this.props.data.likes.length}
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
							<Grid item xs={10}>
								<TextField
									variant="standard"
									label="Enter your comment"
									fullWidth
									value={this.state.comment}
									onChange={e => this.setState({ comment: e.target.value })}
								/>
							</Grid>
							<Grid xs={2}>
								<Button
									variant="contained"
									size="medium"
									color="primary"
									aria-label="add"
									className={classes.margin}
									disabled={this.state.comment == ''}
								>
									<Send style={{ margin: '0px 5px 0px 1px' }} />
									SEND
								</Button>
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
