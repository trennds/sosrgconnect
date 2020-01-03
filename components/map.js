import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import { Avatar } from '@material-ui/core';

class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			latitude: -0.481747846041145,
			longitude: 51.3233379650232
        };
        this.position = this.position.bind(this)
	}

	position = async () => {
		navigator.geolocation.getCurrentPosition(position => this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }), err => console.log(err));
		console.log(this.state.latitude);
    };
    
    componentDidMount() {
        this.position();
    }

	render() {
		const Map = ReactMapboxGl({
			accessToken:
				'pk.eyJ1Ijoicm9taXRrYXJtYWthciIsImEiOiJjandnZDB3OGwxczV4NDBtZ2l0YTJ5aGVsIn0.w0b86s6XC_CFVG726Zwjrw'
		});
		return (
			<Map
				style="mapbox://styles/mapbox/streets-v9"
				containerStyle={{
					height: '100vh',
					width: '100vw'
				}}
				center={[this.state.longitude, this.state.latitude]}
			>
				{/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
					<Feature coordinates={[this.state.longitude, this.state.latitude]} />
				</Layer> */}
				<Marker
					coordinates={[this.state.longitude, this.state.latitude]}
					anchor="bottom"
				>
					{/* <Avatar src="https://placekitten.com/50/50" /> */}
                    <img src="https://i.pinimg.com/originals/71/c8/06/71c806428f9d8c76f8dd491ee177382c.png" height="50" />
				</Marker>
			</Map>
		);
	}
}

export default Map;
