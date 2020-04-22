import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../../components/layout';
import Chat from '../../components/chat';
import {
	Container,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Divider,
	IconButton,
    Link
} from '@material-ui/core';
import { makeStyles, withStyles } from "@material-ui/core/styles"
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

class InboxIdPage extends React.Component {
	constructor(props) {
		super(props);
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
											selected={v.id == this.props.studio}
										>
											<ListItemAvatar>
												<Avatar alt="Remy Sharp">
													{v.name.charAt(0).toUpperCase()}
												</Avatar>
											</ListItemAvatar>
											<ListItemText primary={v.name} />
											<Link href={'/inbox/' + v.id}>
												<IconButton size="small">
													<ArrowForward />
												</IconButton>
											</Link>
										</ListItem>
									);
								})}
								<Divider variant="inset" component="li" />
							</List>
						</Grid>
						<Grid item xs={6}>
							<Chat
								studio={this.props.studio}
								messages={this.props.messages}
							/>
						</Grid>
					</Grid>
				</Container>
			</Layout>
		);
	}
}

InboxIdPage.getInitialProps = async function(context) {
	const { id } = context.query;
	var res = await axios.get(`${process.env.API_BASE_URL}studio/`);
	var res2 = await axios.get(`${process.env.API_BASE_URL}message/${id}`);

	return {
        studio: id,
        studios: res.data.Items,
        messages: res2.data.Items
	};
};

InboxIdPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InboxIdPage);
