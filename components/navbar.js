import React, { useState } from 'react';
import {
	AppBar,
	Typography,
	Toolbar,
	makeStyles,
	IconButton,
	Button
} from '@material-ui/core';
import { AccountCircle, Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	title: {
		flexGrow: 1
	}
}));

export default function Navbar() {
	const classes = useStyles();

	return (
		<AppBar position="fixed">
			<Toolbar variant="dense">
				<Typography variant="h5" noWrap className={classes.title}>
					Sosrg Connect
				</Typography>
				<div style={{ flex: 'right' }}>
					<Button color="inherit" startIcon={<Add />}>
						Create Post
					</Button>
					<Button color="inherit" startIcon={<Add />}>
						Create Job
					</Button>
					<Button color="inherit" startIcon={<Add />}>
						Create Work
					</Button>
					<IconButton
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	);
}
