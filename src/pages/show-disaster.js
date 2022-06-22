import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from "../utils/api";
import useSWR from "swr";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const fetcher = url => api.get(url).then(res => res.data.data)

const ShowDisasterLocationPage = () => {
    const { id } = useParams();
    const { data } = useSWR(`/disasters/${id}`, fetcher);

    const countMeaning = (count) => {
        if(count === 1){
            return "once";
        } else if (count === 2){
            return "twice";
        } else {
            return `${count} times`;
        }
    } 

    return (
        <Layout>
            <Helmet>
                <title>Lihat Bencana</title>
            </Helmet>
            <SectionHeader title="Show Disaster Location">
                <Breadcrumb>
                    <BreadcrumbItem text="Home" />
                    <BreadcrumbItem text="Disaster Locations" href='/disasters' />
                    <BreadcrumbItem text={id} active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Disaster Location Data</h5>
                                <b>Address</b> <p>{data?.address}</p>
                                <b>City</b> <p>{data?.city}</p>
                                <b>Postal Code</b> <p>{data?.postal_code}</p>
                                <b>Latitude</b> <p>{data?.latitude}</p>
                                <b>Longitude</b> <p>{data?.longitude}</p>
                                <b>Disaster Types</b> <Link to={`/disasters/edit/${id}/count`}>[<i>edit disaster count</i>]</Link>
                                <ul>
                                    {data?.types.map((type, index) => {
                                        return (
                                            <li key={index}>{type.name} {countMeaning(type.pivot.count)}, last time happened on {type.pivot.updated_at} UTC</li>
                                        );
                                    })}
                                </ul>
                                <b>Description</b> <p>{data?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Disaster Location Map</h5>
                                {data ? (
                                    <MapContainer center={[data?.latitude, data?.longitude]} zoom={15} scrollWheelZoom={true}>
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[data.latitude, data.longitude]}>
                                            <Popup>
                                                <b>{data.address}</b>
                                                <p>{data.city}</p>
                                                <i>Postal Code : {data.postal_code}</i>
                                                <p>{data.description}</p>
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

export default ShowDisasterLocationPage;