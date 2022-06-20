import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import api from "../utils/api";
import * as Yup from 'yup';
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import { Helmet } from "react-helmet-async";

const schema = Yup.object().shape({
    name: Yup.string().required()
});

const CreateDisasterTypePage = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <Helmet>
                <title>Buat tipe bencana</title>
            </Helmet>
            <SectionHeader title="Create Disaster Type">
                <Breadcrumb>
                    <BreadcrumbItem text="Home" />
                    <BreadcrumbItem text="Disaster Types" href='/disaster-types' />
                    <BreadcrumbItem text="Create Disaster Type" active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Create Disaster Type</h5>
                                <Formik
                                    validationSchema={schema}
                                    validateOnChange={false}
                                    initialValues={{
                                        name: ''
                                    }}
                                    onSubmit={(values) => {
                                        // alert(JSON.stringify(values, null, 2));
                                        const formData = new FormData();
                                        formData.append('name', values.name);
                                        api.post('/disaster-types', formData).then((response) => {
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
                            </div>
                        </div>
                    </div>
                </div>
            </SectionBody>
        </Layout>
    );
}

export default CreateDisasterTypePage;