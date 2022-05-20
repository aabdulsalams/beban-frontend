import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Cookie from "js-cookie";
import { Formik } from 'formik';
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useCallback, useMemo } from "react";

const CreateLocationPage = () => {
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
            <SectionHeader title="Create Location">
                <Breadcrumb>
                    <BreadcrumbItem text="Home" />
                    <BreadcrumbItem text="Locations" href='/locations' />
                    <BreadcrumbItem text="Create Location" active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Create Location</h5>
                                <Formik
                                    initialValues={{
                                        place: '',
                                        city: '',
                                        address: ''
                                    }}
                                    onSubmit={(values) => {
                                        // alert(JSON.stringify(values, null, 2));
                                        const formData = new FormData();
                                        formData.append('place', values.place);
                                        formData.append('city', values.city);
                                        formData.append('address', values.address);
                                        formData.append('latitude', position.lat);
                                        formData.append('longitude', position.lng);
                                        api.post('/api/locations', formData, { headers: { 'Authorization': 'Bearer ' + Cookie.get('token') } }).then((response) => {
                                            console.log("Berhasil menambahkan data");
                                            navigate('/locations');
                                        }).catch((error) => {
                                            console.error(error);
                                        })
                                    }}
                                >
                                    {({ handleSubmit, handleChange, values, setFieldValue }) => (
                                        <form className="row g-3" onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                <label htmlFor="place" className="form-label">Place</label>
                                                <input type="text" className="form-control" name="place" onChange={handleChange} value={values.place} />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="address" className="form-label">Address</label>
                                                <input type="text" className="form-control" name="address" onChange={handleChange} value={values.address} />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="city" className="form-label">City</label>
                                                <input type="text" className="form-control" name="city" onChange={handleChange} value={values.city} />
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

export default CreateLocationPage;