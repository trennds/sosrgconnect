import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SpeedDial from "@material-ui/lab/SpeedDial"
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon"
import SpeedDialAction from "@material-ui/lab/SpeedDialAction"
import Person from '@material-ui/icons/Person'

const useStyles = makeStyles(theme => ({
	speedDial: {
		position: 'fixed',
		'&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
			bottom: theme.spacing(2),
			right: theme.spacing(2)
		},
		'&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
			top: theme.spacing(2),
			left: theme.spacing(2)
		}
	}
}));

export default function Favorite() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [hidden, setHidden] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<SpeedDial
			ariaLabel="SpeedDial example"
			className={classes.speedDial}
			hidden={hidden}
			icon={<SpeedDialIcon />}
			onClose={handleClose}
			onOpen={handleOpen}
			open={open}
			direction="up"
		>
			<SpeedDialAction
				key="Social"
				icon={<Person/>}
				tooltipTitle="Create Social Post"
				onClick={handleClose}
			/>
		</SpeedDial>
	);
}
