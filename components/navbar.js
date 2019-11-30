import React, { useState } from 'react';
import clsx from 'clsx';
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
	Badge
} from '@material-ui/core';
import {
	AccountCircle,
	Add,
	Menu,
	ChevronLeft,
	ChevronRight,
	Notifications
} from '@material-ui/icons';
import CreatePost from './createpost';
import CreateWork from './creatework';
import CreateJob from './createjob';

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
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar
	},
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
	const [open, setOpen] = useState(true);
	const [createPost, setCreatePost] = useState(false);
	const [createWork, setCreateWork] = useState(false);
	const [createJob, setCreateJob] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}
			>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={handleDrawerOpen}
						className={clsx(classes.menuButton, {
							[classes.hide]: open
						})}
					>
						<Menu />
					</IconButton>
					<Typography variant="h5" noWrap className={classes.title}>
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
						>
							<AccountCircle />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open
					})
				}}
				open={open}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button onClick={e => setCreatePost(true)}>
						<ListItemIcon>
							<Add />
						</ListItemIcon>
						<ListItemText primary="Create Post" />
					</ListItem>
					<ListItem button onClick={e => setCreateJob(true)}>
						<ListItemIcon>
							<Add />
						</ListItemIcon>
						<ListItemText primary="Create Job" />
					</ListItem>
					<ListItem button onClick={e => setCreateWork(true)}>
						<ListItemIcon>
							<Add />
						</ListItemIcon>
						<ListItemText primary="Create Work/Project" />
					</ListItem>
				</List>
			</Drawer>
			<CreatePost isOpen={createPost} handleOpen={setCreatePost} />
			<CreateWork isOpen={createWork} handleOpen={setCreateWork} />
			<CreateJob isOpen={createJob} handleOpen={setCreateJob} />
		</div>
	);
}
