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
	makeStyles,
	withStyles,
	ListItemText,
	Divider,
	IconButton,
	Link
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
							
						</Grid>
					</Grid>
				</Container>
			</Layout>
		);
	}
}

InboxPage.getInitialProps = async function(context) {
	const { id } = context.query;
	var res = await axios.get(`${process.env.API_BASE_URL}studio/`);

	return {
		studios: res.data.Items
	};
};

InboxPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InboxPage);
