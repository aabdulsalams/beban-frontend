import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../utils/api";
import useSWR from "swr";
import { Formik, FieldArray } from "formik";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";

const fetcher = url => api.get(url).then(res => res.data.data)

const UpdateDisasterCountPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useSWR(`/disasters/${id}`, fetcher);

    return (
        <Layout>
            <Helmet>
                <title>Ubah Jumlah Bencana</title>
            </Helmet>
            <SectionHeader title="Update Disaster Count">
                <Breadcrumb>
                    <BreadcrumbItem text="Home" />
                    <BreadcrumbItem text="Disaster Locations" href='/disasters' />
                    <BreadcrumbItem text={id} />
                    <BreadcrumbItem text="Update Disaster Count" active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Disaster Location Data</h5>
                                <b>Address</b> <p>{data?.address}</p>
                                <b>City</b> <p>{data?.city}</p>
                                <b>Postal Code</b> <p>{data?.postal_code}</p>
                                <b>Disaster Types</b>
                                {data && (
                                    <Formik
                                        initialValues={{
                                            disaster_types: data.types.map((type) => {
                                                return { id: type.id, name: type.name, count: type.pivot.count }
                                            })
                                        }}
                                        onSubmit={(values) => {
                                            // alert(JSON.stringify(values, null, 2));
                                            let bodyContent = JSON.stringify(values);
                                            api.post(`/disasters/${id}/report`, bodyContent).then((response) => {
                                                alertify.alert('Success', response.data.message, () => {
                                                    navigate(`/disasters/${id}`);
                                                })
                                            })
                                        }}
                                    >
                                        {({ handleSubmit, handleChange, values }) => (
                                            <form className="row" onSubmit={handleSubmit}>
                                                <FieldArray name="disaster_types">
                                                    {() => (
                                                        <>
                                                            {values.disaster_types.map((type, index) => (
                                                                <div className="row gy-2" key={index}>
                                                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">{type.name}</label>
                                                                    <div className="col-sm-4">
                                                                        <input type="number" name={`disaster_types.${index}.count`} className="form-control" min="1" onChange={handleChange} value={type.count} />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </>
                                                    )}
                                                </FieldArray>
                                                <div className="row gy-2">
                                                    <div className="col-lg-12">
                                                        <button className="btn btn-primary" type="submit">Submit</button>
                                                    </div>
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

export default UpdateDisasterCountPage;