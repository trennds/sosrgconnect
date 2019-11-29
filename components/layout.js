import React, { useState } from 'react';
import Navbar from './navbar';
import Head from 'next/head';
import { Link, Typography } from '@material-ui/core';

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

export default class Layout extends React.Component {
	render() {
		return (
			<div>
				<Head>
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
					/>
				</Head>
				<Navbar />
				{this.props.children}
				{Copyright()}
			</div>
		);
	}
}
