// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const PLACES = [
	[4.89707, 52.677956],
	[4.59707, 52.777956],
	[4.29707, 51.977956],
	[4.19707, 52.277956],
	[4.09707, 52.177956],
	[3.99707, 52.877956],
	[4.69707, 52.477956],
];

const useStyles = makeStyles((theme) => ({
	map: {
		height: 600,
	},
	sidebar: {
		backgroundColor: "rgba(35, 55, 75, 0.9)",
		color: "#fff",
		padding: "6px 12px",
		fontFamily: "monospace",
		zIndex: 1,
		position: "absolute",
		top: 0,
		left: 0,
		margin: 12,
		borderRadius: 4,
	},
}));

export function Map() {
	const classes = useStyles();
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(5);
	const [lat, setLat] = useState(52.3);
	const [zoom, setZoom] = useState(7.5);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [lng, lat],
			zoom: zoom,
		});
		map.current.on("move", () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
		for (const place of PLACES) {
			new mapboxgl.Marker().setLngLat(place).addTo(map.current);
		}
	});

	return (
		<div>
			<div className={classes.sidebar}>
				Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>
			<div ref={mapContainer} className={classes.map} />
		</div>
	);
}
