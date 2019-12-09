import React, { useState } from 'react';
import clsx from 'clsx';
import Router from 'next/router';
import {
	AppBar,
	Typography,
	Toolbar,
	makeStyles,
	IconButton,
	Button,
	Drawer,
	useTheme,
	Divider,
	ListItem,
	List,
	ListItemIcon,
	ListItemText,
	Badge,
	CssBaseline
} from '@material-ui/core';
import {
	AccountCircle,
	Add,
	Menu,
	Work,
	Notifications,
	Message,
	BusinessCenter,
	Feedback
} from '@material-ui/icons';
import CreatePost from './createsocial';
import CreateWork from './creatework';
import CreateJob from './createjob';
import FeedbackForm from './feedbackform';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	title: {
		flexGrow: 1
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: 36
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1
		}
	},
	drawerPaper: {
		width: drawerWidth
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	icon: {
		color: '#fff'
	},
	badge: {
		color: '#fff'
	}
}));

export default function Navbar() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [createPost, setCreatePost] = useState(false);
	const [createWork, setCreateWork] = useState(false);
	const [createJob, setCreateJob] = useState(false);
	const [feedback, setFeedback] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(!open);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={e => handleDrawerOpen()}
					>
						<Menu />
					</IconButton>
					<Typography
						variant="h5"
						noWrap
						className={classes.title}
						onClick={() => Router.replace('/')}
					>
						Sosrg Connect
					</Typography>
					<div style={{ flex: 'right' }}>
						<IconButton aria-label="4 pending messages">
							<Badge badgeContent={4} className={classes.badge}>
								<Notifications color="primary" className={classes.icon} />
							</Badge>
						</IconButton>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							color="inherit"
							onClick={() => Router.push('/profile')}
						>
							<AccountCircle />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				classes={{
					paper: classes.drawerPaper
				}}
				open={open}
				onClose={e => handleDrawerClose()}
			>
				<div className={classes.toolbar} />
				<List>
					<ListItem button onClick={e => setCreatePost(true)}>
						<ListItemIcon>
							<Add />
						</ListItemIcon>
						<ListItemText primary="Create Post" />
					</ListItem>
					<ListItem button onClick={e => setCreateJob(true)}>
						<ListItemIcon>
							<BusinessCenter />
						</ListItemIcon>
						<ListItemText primary="Create Job" />
					</ListItem>
					<ListItem button onClick={e => setCreateWork(true)}>
						<ListItemIcon>
							<Work />
						</ListItemIcon>
						<ListItemText primary="Create Work/Project" />
					</ListItem>
					<ListItem button onClick={() => Router.push('/inbox')}>
						<ListItemIcon>
							<Message />
						</ListItemIcon>
						<ListItemText primary="Messages" />
					</ListItem>
					<ListItem button onClick={e => setFeedback(true)}>
						<ListItemIcon>
							<Feedback />
						</ListItemIcon>
						<ListItemText primary="Send Feedback" />
					</ListItem>
				</List>
			</Drawer>
			<CreatePost isOpen={createPost} handleOpen={setCreatePost} />
			<CreateWork isOpen={createWork} handleOpen={setCreateWork} />
			<CreateJob isOpen={createJob} handleOpen={setCreateJob} />
			<FeedbackForm isOpen={feedback} handleOpen={setFeedback} />
		</div>
	);
}
