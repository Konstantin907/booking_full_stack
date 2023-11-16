"use client"
//instaliramo takodje nekoliko pckg leaflet and typesfor ts
//react-leaflet 
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet"

import "leaflet/dist/leaflet.css" //css za leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


//ispod samo koristimo sve ove impute iz leaflet-a
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl; 
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});


//mora i stzles na globalss.css
//intefejs zsa mapu:
interface MapProps {
    center?: number[]
}

const Map: React.FC<MapProps> = ({
    center
}) => {
  return (
    <div>
        <MapContainer
             center={center as L.LatLngExpression || [51, -0.09]} 
             //ako imamo neki ltd zoom je veci
             zoom={center ? 4 : 2} 
             scrollWheelZoom={false} 
             className="h-[35vh] rounded-lg"
        >
             <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            {center && (
            <Marker 
                position={ center as L.LatLngExpression}
                />
            )}
        </MapContainer>
    </div>
  )
}

export default Map
