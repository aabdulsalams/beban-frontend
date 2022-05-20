import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from "../utils/api";
import useSWR from "swr";
import Cookie from "js-cookie";
import { useParams } from "react-router-dom";

const fetcher = url => api.get(url, { headers: { 'Authorization': 'Bearer ' + Cookie.get('token') } }).then(res => res.data.data)

const ShowLocationPage = () => {
    const { id } = useParams();
    const { data } = useSWR(`/api/locations/${id}`, fetcher);

    return (
        <Layout>
            <SectionHeader title="Show Location">
                <Breadcrumb>
                    <BreadcrumbItem text="Home" />
                    <BreadcrumbItem text="Locations" href='/locations' />
                    <BreadcrumbItem text={id} active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Show Location</h5>
                                <b>Place</b> <p>{data?.place}</p>
                                <b>Address</b> <p>{data?.address}</p>
                                <b>City</b> <p>{data?.city}</p>
                                <b>Latitude</b> <p>{data?.latitude}</p>
                                <b>Longitude</b> <p>{data?.longitude}</p>
                                {data ? (
                                    <MapContainer center={[data?.latitude, data?.longitude]} zoom={15} scrollWheelZoom={true}>
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[data.latitude, data.longitude]}>
                                            <Popup>
                                                <b>{data.place}</b> <br />
                                                <p>{data.address}</p> <br />
                                                <i>{data.city}</i>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                ) : (
                                    null
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionBody>
        </Layout>
    );
}

export default ShowLocationPage;