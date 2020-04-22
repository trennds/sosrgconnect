import React, { useState } from 'react'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import red from "@material-ui/core/colors/red"
import blue from "@material-ui/core/colors/blue"
import green from "@material-ui/core/colors/green"
import Button from '@material-ui/core/Button';

export default function Introduction(props) {
	return (
		<div style={{ position: 'relative', width: '100%', height: 500 }}>
			<AutoRotatingCarousel
				label="Get started"
				open={false}
				onClose={() => props.handleOpen(false)}
				onStart={() => props.handleOpen(false)}
				style={{ position: 'absolute' }}
			>
				<Slide
					media={
						<img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/connection_b38q.svg" />
					}
					mediaBackgroundStyle={{ backgroundColor: red[400] }}
					style={{ backgroundColor: red[600] }}
					title="Connect with artists"
					subtitle="Share Works, Apply for jobs and works and get yourself into the community built only for artists."
				/>
				<Slide
					media={
						<img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/referral_4ki4.svg" />
					}
					mediaBackgroundStyle={{ backgroundColor: blue[400] }}
					style={{ backgroundColor: blue[600] }}
					title="Check our mobile App"
					subtitle="Visit the Play Store and download our SosrG App, to get connected on the move."
				/>
				<Slide
					media={
						<img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/messaging_uok8.svg" />
					}
					mediaBackgroundStyle={{ backgroundColor: green[400] }}
					style={{ backgroundColor: green[600] }}
					title="Chat with friends"
					subtitle="Message artists, make frieds get suggestions from experts and excel into your field."
				/>
			</AutoRotatingCarousel>
		</div>
	);
}