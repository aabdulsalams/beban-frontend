import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import api from "../utils/api";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useSWR from "swr";
import { Helmet } from "react-helmet-async";

const fetcher = url => api.get(url).then(res => res.data.data)

const DashboardPage = () => {
    const { data } = useSWR('/disasters', fetcher)
    const position = [-7.536064, 112.238402];

    return (
        <Layout>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <SectionHeader title="Maps">
                <Breadcrumb>
                    <BreadcrumbItem text="Home" />
                    <BreadcrumbItem text="Maps" active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Your Disaster Location Reports</h5>
                                <MapContainer center={position} zoom={9} scrollWheelZoom={true}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {data?.map((disaster) => {
                                        return (
                                            <Marker position={[disaster.latitude, disaster.longitude]} key={disaster.id}>
                                                <Popup>
                                                    <b>{disaster.address}</b>
                                                    <p>{disaster.city}</p>
                                                    <i>Postal Code : {disaster.postal_code}</i>
                                                    <p>{disaster.description}</p>
                                                </Popup>
                                            </Marker>
                                        );
                                    })}
                                </MapContainer>
                            </div>
                        </div>
                    </div>
                </div>

            </SectionBody>
        </Layout>
    );
}

export default DashboardPage;