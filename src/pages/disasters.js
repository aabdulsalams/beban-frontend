import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import api from "../utils/api";
import useSWR from "swr";
import { useSWRConfig } from "swr";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import { Helmet } from "react-helmet";

const fetcher = url => api.get(url).then(res => res.data.data)

const DisasterLocationsPage = () => {
    const { mutate } = useSWRConfig();
    const { data } = useSWR('/disasters', fetcher);
    const navigate = useNavigate();

    const deleteLocation = (id) => {
        alertify.confirm('Are you sure', 'Once delete this data, you will not recover it anymore', function () {
            api.delete(`/disasters/${id}`).then((response) => {
                navigate('/disasters', { replace: false });
                mutate('/disasters');
            }).catch((error) => {
                console.log(error)
            })
        }, () => { alertify.error('Cancel') });
    }

    return (
        <Layout>
            <Helmet>
                <title>Daftar Bencana</title>
            </Helmet>
            <SectionHeader title="Disaster Locations">
                <Breadcrumb>
                    <BreadcrumbItem text="Home" />
                    <BreadcrumbItem text="Disaster Locations" active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Disaster Locations</h5>
                                <div className="d-grid gap-2 mt-3"> <button className="btn btn-primary" type="button" onClick={() => navigate('/disasters/create')}><i className="ri ri-map-pin-2-fill"></i> Add Disaster Location</button></div> <br />
                                <table className="table table-bordered table-responsive">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Postal Code</th>
                                            <th scope="col">Latitude</th>
                                            <th scope="col">Longitude</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((disaster, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{disaster.id}</th>
                                                    <td>{disaster.address}</td>
                                                    <td>{disaster.postal_code}</td>
                                                    <td>{disaster.latitude}</td>
                                                    <td>{disaster.longitude}</td>
                                                    <td>
                                                        <div className="btn-group" role="group" aria-label="Basic example">
                                                            <button type="button" className="btn btn-info" onClick={() => navigate(`/disasters/${disaster.id}`)}><i className="bi bi-info-circle"></i></button>
                                                            <button type="button" className="btn btn-warning" onClick={() => navigate(`/disasters/edit/${disaster.id}`)}><i className="bi bi-pencil-square"></i></button>
                                                            <button type="button" className="btn btn-danger" onClick={() => deleteLocation(disaster.id)}><i className="bi bi-trash-fill"></i></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionBody>
        </Layout>
    );
}

export default DisasterLocationsPage;