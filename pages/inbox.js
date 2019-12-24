import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../components/layout';
import Chat from '../components/chat';
import {
	ThemeProvider,
	Message,
	MessageGroup,
	MessageText
} from '@livechat/ui-kit';
import {
	Container,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	Typography,
	makeStyles,
	withStyles,
	ListItemText,
	Divider,
	TextField,
	IconButton,
	NoSsr
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

const styles = makeStyles(theme => ({
	root: {
		margin: '200px 10px',
		padding: '0 30px'
	},
	inline: {
		display: 'inline'
	},
	input: {
		position: 'absolute',
		bottom: '0%',
		width: '100%'
	}
}));

class InboxPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSelected: 0,
			messages: []
		};

		this.updateMessage = this.updateMessage.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	fetchData() {
		var self = this;
		axios
			.get(`${process.env.API_BASE_URL}message/${this.props.studios[this.state.isSelected].id}`)
			.then(res => {
				self.setState({
					messages: res.data.Items
				});
			});
	}

	updateMessage(value) {
		var self = this;
		axios
			.post(`${process.env.API_BASE_URL}message/`, {
				sender: localStorage.sub,
				body: value,
				studio: this.props.studios[this.state.isSelected].id,
				senderName: localStorage.name
			})
			.then(res => {
				self.setState((state, props) => ({
					messages: [
						...state.messages,
						{
							sender: localStorage.sub,
							body: value,
							studio: this.props.studios[this.state.isSelected].id,
							senderName: localStorage.name
						}
					]
				}));
			});
	}

	componentDidMount() {
		// this.fetchData();
	}

	handleChange(index) {
		this.setState({
			isSelected: index
		});
		this.fetchData();
	}

	render() {
		const { classes } = this.props;

		return (
				<Layout>
					<Container style={{ marginTop: '60px', height: '100vh' }}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<List className={classes.root}>
									{this.props.studios.map((v, index) => {
										return (
											<ListItem
												key={v.id}
												alignItems="flex-start"
												selected={index == this.state.isSelected}
											>
												<ListItemAvatar>
													<Avatar alt="Remy Sharp">
														{v.name.charAt(0).toUpperCase()}
													</Avatar>
												</ListItemAvatar>
												<ListItemText primary={v.name} />
												<IconButton
													size="small"
													onClick={e => this.handleChange(index)}
												>
													<ArrowForward />
												</IconButton>
											</ListItem>
										);
									})}
									<Divider variant="inset" component="li" />
								</List>
							</Grid>
							<Grid item xs={6}>
								<Chat
									studio={this.props.studios[this.state.isSelected].id}
									messages={this.state.messages}
									handleMessage={this.updateMessage}
								/>
							</Grid>
						</Grid>
					</Container>
				</Layout>
		);
	}
}

InboxPage.getInitialProps = async function() {
	var res = await axios.get(`${process.env.API_BASE_URL}studio/`);

	return {
		studios: res.data.Items
	};
};

InboxPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InboxPage);
