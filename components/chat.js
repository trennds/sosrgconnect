import styled from 'styled-components';
import { Container, Grid, makeStyles, NoSsr, Box } from '@material-ui/core';
import {} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	root: {
		padding: '10px 10px',
		width: '100%'
	}
}));

const ReceiverContainer = styled.div`
	width: 100%;
	display: flex;
	height: auto;
`;

const Receiver = styled.div`
	margin: 5px;
	margin-left: 20px;
	color: white;
	background-color: green;
	padding: 20px;
	border-radius: 10px;
	display: flex;
	border-style: solid;
	border-width: 1px;
	border-color: green green green green;
	flex-wrap: wrap;

	&:before {
		position: absolute;
		content: '';
		transform: translate(-170%, -104%);
		border-style: solid;
		border-width: 10px;
		border-color: green green transparent transparent;
	}
`;

const SenderContainer = styled.div`
	position: absolute;
	width: 100%;
	display: flex;
	flex-direction: row-reverse;
	right: 3%;
`;

const Sender = styled.div`
	margin: 5px;
	color: white;
	border-radius: 10px;
	position: absolute;
	background-color: blue;
	padding: 20px;

	&:after {
		position: absolute;
		content: '';
		transform: translate(65%, -100%);
		border-style: solid;
		border-width: 10px;
		border-color: blue transparent transparent blue;
	}
`;

export default function Chat() {
	const classes = useStyles();

	return (
		<div style={{ width: '100%' }}>
			<NoSsr>
				<Container>
					<Box display="flex" flexDirection="row-reverse">
						<Receiver>Hello World !!!</Receiver>
					</Box>
					<Box display="flex" flexDirection="row-reverse">
						dfdgghhhh
						<Sender>Hii Romit Karmakar</Sender>
					</Box>
				</Container>
			</NoSsr>
		</div>
	);
}
