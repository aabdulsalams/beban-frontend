import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import api from "../utils/api";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useSWR from "swr";
import Cookie from "js-cookie";

const fetcher = url => api.get(url, { headers: {'Authorization': 'Bearer ' + Cookie.get('token')}}).then(res => res.data.data)

const DashboardPage = () => {
    const { data } = useSWR('/api/locations', fetcher)
    const position = [-7.536064, 112.238402];

    return (
        <Layout>
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
                                <h5 className="card-title">Your Location Maps</h5>
                                <MapContainer center={position} zoom={9} scrollWheelZoom={true}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {data?.map((location) => {
                                        return (
                                            <Marker position={[location.latitude, location.longitude]} key={location.id}>
                                                <Popup>
                                                    <b>{location.place}</b> <br />
                                                    <p>{location.address}</p> <br />
                                                    <i>{location.city}</i>
                                                </Popup>
                                            </Marker>
                                        );
                                    })}
                                    {/* <Marker position={position}>
                                        <Popup>
                                            A pretty CSS3 popup. <br /> Easily customizable.
                                        </Popup>
                                    </Marker> */}
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