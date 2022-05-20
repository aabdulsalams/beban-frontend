import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import api from "../utils/api";
import useSWR from "swr";
import { useSWRConfig } from "swr";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const fetcher = url => api.get(url, { headers: { 'Authorization': 'Bearer ' + Cookie.get('token') } }).then(res => res.data.data)

const RatingsPage = () => {
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
            <SectionHeader title="Ratings">
                <Breadcrumb>
                    <BreadcrumbItem text="Home" />
                    <BreadcrumbItem text="Ratings" active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Ratings</h5>
                                <table className="table table-bordered table-responsive">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Place</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Count</th>
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

export default RatingsPage;