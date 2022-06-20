import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from 'formik';
import api from "../utils/api";
import useSWR from "swr";
import * as Yup from 'yup';
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import { Helmet } from "react-helmet";

const fetcher = url => api.get(url).then(res => res.data.data)

const schema = Yup.object().shape({
    name: Yup.string().required()
});

const UpdateDisasterTypePage = () => {
    const { id } = useParams();
    const { data } = useSWR(`/disaster-types/${id}`, fetcher);
    const navigate = useNavigate();


    return (
        <Layout>
            <Helmet>
                <title>Ubah Tipe Bencana</title>
            </Helmet>
            <SectionHeader title="Update Disaster Type">
                <Breadcrumb>
                    <BreadcrumbItem text="Home" />
                    <BreadcrumbItem text="Disaster Types" href='/disaster-types' />
                    <BreadcrumbItem text={id} />
                    <BreadcrumbItem text="Update Disaster Type" active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Update Disaster Type</h5>
                                {data && (
                                    <Formik
                                        validationSchema={schema}
                                        validateOnChange={false}
                                        initialValues={{
                                            name: data.name
                                        }}
                                        onSubmit={(values) => {
                                            // alert(JSON.stringify(values, null, 2));
                                            const params = new URLSearchParams();
                                            params.append('name', values.name);
                                            api.put(`/disaster-types/${id}`, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then((response) => {
                                                alertify.alert('Success', response.data.message, () => {
                                                    navigate('/disaster-types');
                                                })
                                            }).catch((error) => {
                                                console.error(error);
                                            })
                                        }}
                                    >
                                        {({ handleSubmit, handleChange, values, errors }) => (
                                            <form className="row g-3" onSubmit={handleSubmit}>
                                                <div className="col-12">
                                                    <label htmlFor="address" className="form-label">Disaster Name</label>
                                                    <input type="text" className={`form-control ${!!errors.name ? 'is-invalid' : ''}`} name="name" onChange={handleChange} value={values.name} />
                                                    <div className="invalid-feedback">{errors.name}</div>
                                                </div>
                                                <div className="d-grid gap-2 mt-3">
                                                    <button className="btn btn-primary" type="submit">Submit</button>
                                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionBody>
        </Layout>
    );
}

export default UpdateDisasterTypePage;