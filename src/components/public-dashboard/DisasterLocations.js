import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../../utils/public-api';
import useSWR from "swr";

const fetcher = url => api.get(url).then(res => res.data.data)

const DisasterLocations = () => {
    const position = [-7.536064, 112.238402];
    const { data: disasters } = useSWR('/disasters', fetcher, { refreshInterval: 3000 });

    return (
        <div className="col-12">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Disaster Locations</h5>
                    <MapContainer center={position} zoom={9} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {disasters?.map((location) => {
                            return (
                                <Marker position={[location.latitude, location.longitude]} key={location.id}>
                                    <Popup>
                                        <b>{location.address}</b>
                                        <p>{location.city}</p>
                                        <i>Postal Code : {location.postal_code}</i>
                                        <p>{location.description}</p>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default DisasterLocations;