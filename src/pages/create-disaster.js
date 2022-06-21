import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Formik } from 'formik';
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useState, useRef, useCallback, useMemo } from "react";
import Select from "react-select";
import * as Yup from 'yup';
import data_jatim from "../data/jatim";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import { Helmet } from "react-helmet-async";

const fetcher = url => api.get(url).then(res => res.data.data)

const schema = Yup.object().shape({
    address: Yup.string().required(),
    postal_code: Yup.number().required(),
    description: Yup.string().required(),
    city: Yup.string().required()
});

const CreateDisasterLocationPage = () => {
    const { data } = useSWR('/disaster-types', fetcher);
    const navigate = useNavigate();
    const center = {
        lat: -7.536064,
        lng: 112.238402,
    };
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    return (
        <Layout>
            <Helmet>
                <title>Buat data bencana</title>
            </Helmet>
            <SectionHeader title="Create Disaster Location">
                <Breadcrumb>
                    <BreadcrumbItem text="Home" />
                    <BreadcrumbItem text="Disaster Locations" href='/disasters' />
                    <BreadcrumbItem text="Create Disaster Location" active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Create Disaster Location</h5>
                                <Formik
                                    validationSchema={schema}
                                    validateOnChange={false}
                                    initialValues={{
                                        address: '',
                                        postal_code: '',
                                        description: '',
                                        city: '',
                                        disaster_types_id: []
                                    }}
                                    onSubmit={(values) => {
                                        // alert(JSON.stringify(values, null, 2));
                                        let bodyContent = JSON.stringify({
                                            "address": values.address,
                                            "city": values.city,
                                            "description": values.description,
                                            "postal_code": values.postal_code,
                                            "latitude": position.lat.toString(),
                                            "longitude": position.lng.toString(),
                                            "disaster_types": values.disaster_types_id
                                        });
                                        api.post('/disasters', bodyContent).then((response) => {
                                            alertify.alert('Success', response.data.message, () => {
                                                navigate('/disasters');
                                            })
                                        }).catch((error) => {
                                            console.error(error);
                                        })
                                    }}
                                >
                                    {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
                                        <form className="row g-3" onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                <label htmlFor="address" className="form-label">Address</label>
                                                <input type="text" className={`form-control ${!!errors.address ? 'is-invalid' : ''}`} name="address" onChange={handleChange} value={values.address} />
                                                <div className="invalid-feedback">{errors.address}</div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="postal_code" className="form-label">Postal Code</label>
                                                <input type="text" className={`form-control ${!!errors.postal_code ? 'is-invalid' : ''}`} name="postal_code" onChange={handleChange} value={values.postal_code} />
                                                <div className="invalid-feedback">{errors.postal_code}</div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="city" className="form-label">City</label>
                                                <Select
                                                    options={data_jatim.map((item) => {
                                                        return { value: item, label: item }
                                                    })}
                                                    onChange={(item) => setFieldValue('city', item.value)}
                                                />
                                                {errors.city && (<span className="text-danger">{errors.city}</span>)}
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="disaster_type" className="form-label">Disaster Type</label>
                                                <Select
                                                    isClearable
                                                    isMulti
                                                    options={data?.map((type) => {
                                                        return { value: type.id, label: type.name }
                                                    })}
                                                    onChange={(item) => setFieldValue('disaster_types_id', item.map((select) => select.value))}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="description" className="form-label">Description</label>
                                                <textarea className={`form-control ${!!errors.description ? 'is-invalid' : ''}`} name="description" rows="5" onChange={handleChange} value={values.description} />
                                                <div className="invalid-feedback">{errors.description}</div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <label htmlFor="latitude" className="form-label">Latitude</label>
                                                <input type="text" className="form-control" name="latitude" value={position.lat} disabled />
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <label htmlFor="longitude" className="form-label">Longitude</label>
                                                <input type="text" className="form-control" name="longitude" value={position.lng} disabled />
                                            </div>
                                            <div className="col-12">
                                                <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
                                                    <TileLayer
                                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    />
                                                    <Marker
                                                        draggable={draggable}
                                                        eventHandlers={eventHandlers}
                                                        position={position}
                                                        ref={markerRef}>
                                                        <Popup minWidth={90}>
                                                            <span onClick={toggleDraggable}>
                                                                {draggable
                                                                    ? 'Marker is draggable'
                                                                    : 'Click here to make marker draggable'}
                                                            </span>
                                                        </Popup>
                                                    </Marker>
                                                </MapContainer>
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

export default CreateDisasterLocationPage;