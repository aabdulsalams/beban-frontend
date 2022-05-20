import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import api from "../utils/api";
import useSWR from "swr";
import { useSWRConfig } from "swr";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const fetcher = url => api.get(url, { headers: { 'Authorization': 'Bearer ' + Cookie.get('token') } }).then(res => res.data.data)

const LocationsPage = () => {
    const { mutate } = useSWRConfig();
    const { data } = useSWR('/api/locations', fetcher);
    const navigate = useNavigate();

    const deleteLocation = (id) => {
        api.delete(`/api/locations/${id}`, { headers: { 'Authorization': 'Bearer ' + Cookie.get('token') } }).then((response) => {
            navigate('/locations', { replace: false });
            mutate('/api/locations');
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Layout>
            <SectionHeader title="Locations">
                <Breadcrumb>
                    <BreadcrumbItem text="Home" />
                    <BreadcrumbItem text="Locations" active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Locations</h5>
                                <div className="d-grid gap-2 mt-3"> <button className="btn btn-primary" type="button" onClick={() => navigate('/locations/create')}><i className="ri ri-map-pin-2-fill"></i> Add Location</button></div> <br />
                                <table className="table table-bordered table-responsive">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Place</th>
                                            <th scope="col">City</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((location) => {
                                            return (
                                                <tr key={location.id}>
                                                    <th scope="row">{location.id}</th>
                                                    <td>{location.place}</td>
                                                    <td>{location.city}</td>
                                                    <td>{location.address}</td>
                                                    <td>
                                                        <div className="btn-group" role="group" aria-label="Basic example"> 
                                                            <button type="button" className="btn btn-info" onClick={() => navigate(`/locations/${location.id}`)}><i className="bi bi-info-circle"></i></button> 
                                                            <button type="button" className="btn btn-warning" onClick={() => navigate(`/locations/edit/${location.id}`)}><i className="bi bi-pencil-square"></i></button> 
                                                            <button type="button" className="btn btn-danger" onClick={() => deleteLocation(location.id)}><i className="bi bi-trash-fill"></i></button>
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

export default LocationsPage;