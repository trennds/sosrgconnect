import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from './navbar';
import Head from 'next/head';
import { Link, Typography, makeStyles, withStyles } from '@material-ui/core';
import { initGA, logPageView } from './googleAnalytics.js';

const drawerWidth = 240;

const styles = makeStyles(theme => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		margin: `100px 0px 0px ${drawerWidth}px`
	},
	toolbar: theme.mixins.toolbar
}));

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="http://sosrgstudios.com">
				Sosrg Connect
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

class Layout extends React.Component {
	componentDidMount() {
		if (!window.GA_INITIALIZED) {
			initGA();
			window.GA_INITIALIZED = true;
		}
		logPageView();
	}
	render() {
		const { classes } = this.props;

		return (
			<div>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
					/>
					<script src="https://sdk.amazonaws.com/js/aws-sdk-2.584.0.min.js"></script>
				</Head>
				<Navbar />
				<div>{this.props.children}</div>
				{Copyright()}
			</div>
		);
	}
}

Layout.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Layout);
