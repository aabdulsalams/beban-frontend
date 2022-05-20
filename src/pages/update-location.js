import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Cookie from "js-cookie";
import { Formik } from 'formik';
import useSWR from "swr";
import api from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useCallback, useMemo } from "react";

const fetcher = url => api.get(url, { headers: { 'Authorization': 'Bearer ' + Cookie.get('token') } }).then(res => res.data.data)

const UpdateLocationPage = () => {
    const { id } = useParams();
    const { data } = useSWR(`/api/locations/${id}`, fetcher, { refreshInterval: 1000 });
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
            <SectionHeader title="Update Location">
                <Breadcrumb>
                    <BreadcrumbItem text="Home" />
                    <BreadcrumbItem text="Locations" href='/locations' />
                    <BreadcrumbItem text={id} />
                    <BreadcrumbItem text="Update Location" active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Update Location</h5>
                                {data && (
                                    <Formik
                                        initialValues={{
                                            place: data.place,
                                            city: data.city,
                                            address: data.address,
                                            // latitude: data.latitude,
                                            // longitude: data.longitude
                                        }}
                                        onSubmit={(values) => {
                                            const params = new URLSearchParams();
                                            params.append('place', values.place);
                                            params.append('city', values.city);
                                            params.append('address', values.address);
                                            params.append('latitude', position.lat);
                                            params.append('longitude', position.lng);
                                            api.put(`/api/locations/${id}`, params, {
                                                headers: { 'Authorization': 'Bearer ' + Cookie.get('token'), 'Content-Type': 'application/x-www-form-urlencoded' }
                                            }).then((response) => {
                                                console.log(response);
                                                console.log("Berhasil update data");
                                                navigate('/locations', { replace: false });
                                            }).catch((error) => {
                                                console.error(error);
                                            })
                                        }}
                                    >
                                        {({ handleSubmit, handleChange, values, errors }) => (
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionBody>
        </Layout>
    );
}

export default UpdateLocationPage;