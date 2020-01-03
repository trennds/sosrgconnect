import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../components/layout';
import Router from 'next/router';
// import Map from '../components/map';
import dynamic from 'next/dynamic';
const DynamicMap = dynamic(() => import('../components/map'), {
    loading: () => <p>Loading...</p>,
    ssr: false
});

class FindNearbyPage extends React.Component {
	render() {
		return (
			<Layout>
				<DynamicMap />
			</Layout>
		);
	}
}

export default FindNearbyPage;
