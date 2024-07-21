import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import DraggableMarker from './DraggableMarker';
import { collection, db, doc, setDoc } from '../firebase';
import { MarkerData } from '../types';


const MapEventsHandler: React.FC<{ onClick: (event: L.LeafletMouseEvent) => void }> = ({ onClick }) => {
	const map = useMap();

	React.useEffect(() => {
		map.on('click', onClick);
		return () => {
			map.off('click', onClick);
		};
	}, [map, onClick]);

	return null;
};

const MapComponent: React.FC = () => {
	const [markers, setMarkers] = useState<MarkerData[]>([]);
	const [nextId, setNextId] = useState(1);

	const addMarker = async (event: L.LeafletMouseEvent) => {
		const { lat, lng } = event.latlng;
		const newMarker: MarkerData = {
			id: nextId,
			latitude: lat,
			longitude: lng,
			timestamp: Date.now()
		};
		await setDoc(doc(collection(db, 'quests'), `quest_${nextId}`), {
			Location: { lat: newMarker.latitude, lng: newMarker.longitude },
			Timestamp: newMarker.timestamp,
			Next: null
		});
		setMarkers([...markers, newMarker]);
		setNextId(nextId + 1);

	};

	const handleDragEnd = async (updatedMarker: MarkerData) => {
		setMarkers(markers.map(marker =>
			marker.id === updatedMarker.id
				? updatedMarker
				: marker
		));
		await setDoc(doc(db, 'quests', `quest_${updatedMarker.id}`), {
			Location: { lat: updatedMarker.latitude, lng: updatedMarker.longitude },
			Timestamp: updatedMarker.timestamp
		});
	};

	return (
		<MapContainer
			center={[49.45232, -330.4376]}
			zoom={5}
			style={{ height: '100vh', width: '100vw' }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<MapEventsHandler onClick={addMarker} />
			{markers.map(marker => (
				<DraggableMarker
					key={marker.id}
					marker={marker}
					onDragEnd={handleDragEnd}
				/>
			))}
		</MapContainer>
	);
};

export default MapComponent;
