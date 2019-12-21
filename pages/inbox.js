import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../components/layout';
import Chat from '../components/chat';

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
	Divider
} from '@material-ui/core';
import {} from '@material-ui/icons';

const styles = makeStyles(theme => ({
	root: {
		margin: '200px 10px',
		padding: '0 30px'
	},
	inline: {
		display: 'inline'
	}
}));

class InboxPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { classes } = this.props;

		return (
			<Layout>
				<Container style={{ marginTop: '60px' }}>
					<Grid container spacing={2}>
						<Grid item>
							<List className={classes.root}>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Remy Sharp">R</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary="SosrG Cine Studio"
										secondary={
											<React.Fragment>
												<Typography
													component="span"
													variant="body2"
													className={classes.inline}
													color="textPrimary"
												>
													29/10/2019
												</Typography>
												{" — I'll be in your neighborhood doing errands this…"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Remy Sharp">R</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary="SosrG Acting and Casting Studio"
										secondary={
											<React.Fragment>
												<Typography
													component="span"
													variant="body2"
													className={classes.inline}
													color="textPrimary"
												>
													29/10/2019
												</Typography>
												{" — I'll be in your neighborhood doing errands this…"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Remy Sharp">R</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary="SosrG Music Studio"
										secondary={
											<React.Fragment>
												<Typography
													component="span"
													variant="body2"
													className={classes.inline}
													color="textPrimary"
												>
													29/10/2019
												</Typography>
												{" — I'll be in your neighborhood doing errands this…"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Remy Sharp">R</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary="SosrG Dance Studio"
										secondary={
											<React.Fragment>
												<Typography
													component="span"
													variant="body2"
													className={classes.inline}
													color="textPrimary"
												>
													29/10/2019
												</Typography>
												{" — I'll be in your neighborhood doing errands this…"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Remy Sharp">R</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary="SosrG Art Studio"
										secondary={
											<React.Fragment>
												<Typography
													component="span"
													variant="body2"
													className={classes.inline}
													color="textPrimary"
												>
													29/10/2019
												</Typography>
												{" — I'll be in your neighborhood doing errands this…"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Remy Sharp">R</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary="SosrG Literary Studio"
										secondary={
											<React.Fragment>
												<Typography
													component="span"
													variant="body2"
													className={classes.inline}
													color="textPrimary"
												>
													29/10/2019
												</Typography>
												{" — I'll be in your neighborhood doing errands this…"}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
							</List>
						</Grid>
						<Grid item>
							<Typography variant="h5">
								We will launching this feature soon.
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</Layout>
		);
	}
}

InboxPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InboxPage);
