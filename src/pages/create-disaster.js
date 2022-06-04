import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Formik } from 'formik';
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useState, useRef, useCallback, useMemo } from "react";
import Select from "react-select";

const fetcher = url => api.get(url).then(res => res.data.data)

const CreateDisasterLocationPage = () => {
    const { data } = useSWR('/api/disaster-types', fetcher);
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
                                    initialValues={{
                                        address: '',
                                        postal_code: '',
                                        description: '',
                                        disaster_types_id: []
                                    }}
                                    onSubmit={(values) => {
                                        // alert(JSON.stringify(values, null, 2));
                                        let bodyContent = JSON.stringify({
                                            "address": values.address,
                                            "description": values.description,
                                            "postal_code": values.postal_code,
                                            "latitude": position.lat.toString(),
                                            "longitude": position.lng.toString(),
                                            "disaster_types": values.disaster_types_id
                                        });
                                        api.post('/api/disasters', bodyContent).then((response) => {
                                            console.log("Berhasil menambahkan data");
                                            navigate('/disasters');
                                        }).catch((error) => {
                                            console.error(error);
                                        })
                                    }}
                                >
                                    {({ handleSubmit, handleChange, values, setFieldValue }) => (
                                        <form className="row g-3" onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                <label htmlFor="address" className="form-label">Address</label>
                                                <input type="text" className="form-control" name="address" onChange={handleChange} value={values.address} />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="postal_code" className="form-label">Postal Code</label>
                                                <input type="text" className="form-control" name="postal_code" onChange={handleChange} value={values.postal_code} />
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
                                                <textarea className="form-control" name="description" rows="5" onChange={handleChange} value={values.description} />
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