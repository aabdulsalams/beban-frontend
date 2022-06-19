import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import useSWR from "swr";
import { useSWRConfig } from "swr";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";

const fetcher = url => api.get(url).then(res => res.data.data)

const DisasterTypesPage = () => {
    const { mutate } = useSWRConfig();
    const { data } = useSWR('/disaster-types', fetcher);
    const navigate = useNavigate();

    const deleteType = (id) => {
        alertify.confirm('Are you sure', 'Once delete this data, you will not recover it anymore', function () {
            api.delete(`/disaster-types/${id}`).then((response) => {
                navigate('/disaster-types', { replace: false });
                mutate('/disaster-types');
            }).catch((error) => {
                console.log(error)
            })
        }, () => { alertify.error('Cancel') });
    }

    return (
        <Layout>
            <SectionHeader title="Disaster Types">
                <Breadcrumb>
                    <BreadcrumbItem text="Home" />
                    <BreadcrumbItem text="Disaster Types" active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Disaster Types</h5>
                                <div className="d-grid gap-2 mt-3"> <button className="btn btn-primary" type="button" onClick={() => navigate('/disaster-types/create')}><i className="ri ri-fire-fill"></i> Add Disaster Type</button></div> <br />
                                <table className="table table-bordered table-responsive">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Disaster Name</th>
                                            <th scope="col">Total Disaster</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((type, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{type.id}</th>
                                                    <td>{type.name}</td>
                                                    <td>{type.disasters_count}</td>
                                                    <td>
                                                        <div className="btn-group" role="group" aria-label="Basic example">
                                                            <button type="button" className="btn btn-warning" onClick={() => navigate(`/disaster-types/edit/${type.id}`)}><i className="bi bi-pencil-square"></i></button>
                                                            <button type="button" className="btn btn-danger" onClick={() => deleteType(type.id)}><i className="bi bi-trash-fill"></i></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
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

export default DisasterTypesPage;