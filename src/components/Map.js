import mapboxgl from "mapbox-gl";
import { useRef, useState, useEffect } from "react";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export function Map() {
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
	});

	return (
		<div>
			<div ref={mapContainer} style={{ height: 400 }} />
			<p>lng: {lng}</p>
			<p>lat: {lat}</p>
			<p>zoom: {zoom}</p>
		</div>
	);
}
