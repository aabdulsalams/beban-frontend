import Layout from "../components/layouts/guest/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import { Helmet } from "react-helmet-async";
import api from "../utils/public-api";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useSWR from "swr";
import Chart from 'react-apexcharts';

const fetcher = url => api.get(url).then(res => res.data.data)

const PublicDashboardPage = () => {
    const position = [-7.536064, 112.238402];
    const { data: data_count } = useSWR('/disasters/count', fetcher);
    const { data: disasters } = useSWR('/disasters', fetcher);
    const { data: disaster_types } = useSWR('/disaster-types', fetcher);

    return (
        <Layout>
            <Helmet>
                <title>Jatim {process.env.REACT_APP_WEB_NAME}</title>
            </Helmet>
            <SectionHeader title="Dashboard">
                <Breadcrumb>
                    <BreadcrumbItem text="Menu" />
                    <BreadcrumbItem text="Dashboard" active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-xxl-6 col-xl-12">
                                <div className="card info-card">
                                    <div className="card-body">
                                        <h5 className="card-title">Total Disaster Location</h5>
                                        <div className="d-flex align-items-center">
                                            <div className="card-icon d-flex align-items-center justify-content-center">
                                                <i className="ri ri-flood-line"></i>
                                            </div>
                                            <div className="ps-3">
                                                <h6>{data_count?.disasters_count}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-6 col-xl-12">
                                <div className="card info-card">
                                    <div className="card-body">
                                        <h5 className="card-title">Many Disaster Reports</h5>
                                        <div className="d-flex align-items-center">
                                            <div className="card-icon d-flex align-items-center justify-content-center">
                                                <i className="ri ri-fire-line"></i>
                                            </div>
                                            <div className="ps-3">
                                                <h6>{data_count?.many_disasters_count}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Disaster Type</h5>
                                {disaster_types && (
                                    <div className="donut">
                                        <Chart
                                            options={{
                                                labels: disaster_types.map((type) => type.name),
                                                plotOptions: {
                                                    pie: {
                                                        donut: {
                                                            labels: {
                                                                show: true,
                                                            }
                                                        }
                                                    }
                                                }
                                            }}
                                            series={disaster_types.map((type) => type.disasters_count)}
                                            type="donut"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionBody>
        </Layout>
    );
}

export default PublicDashboardPage;