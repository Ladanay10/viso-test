// DraggableMarker.tsx
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MarkerData } from '../types';



interface DraggableMarkerProps {
	marker: MarkerData;
	onDragEnd: (updatedMarker: MarkerData) => void;
}

const customIcon = new L.Icon({
	iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
});

const DraggableMarker: React.FC<DraggableMarkerProps> = ({ marker, onDragEnd }) => {
	const position: [number, number] = [marker.latitude, marker.longitude];

	const handleDragEnd = (event: L.LeafletEvent) => {
		const markerElement = event.target as L.Marker;
		const { lat, lng } = markerElement.getLatLng();
		const id = parseInt(markerElement.getElement()?.getAttribute('data-id') || '0', 10);

		console.log('Dragging ended for marker with id:', id);
		onDragEnd({
			id,
			latitude: lat,
			longitude: lng,
			timestamp: Date.now()
		});
	};

	return (
		<Marker
			position={position}
			icon={customIcon}
			draggable
			eventHandlers={{
				dragend: handleDragEnd,
			}}
			ref={(markerRef) => {
				if (markerRef) {
					const element = markerRef.getElement();
					if (element) {
						element.setAttribute('data-id', marker.id.toString());
					}
				}
			}}
		>
			<Popup autoClose>
				<div className='popup'>
					{marker.id}
				</div>
			</Popup>
		</Marker>
	);
};

export default DraggableMarker;
