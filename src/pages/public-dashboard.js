import Layout from "../components/layouts/Layout";
import { SectionBody } from "../components/bootstrap";
import { Helmet } from "react-helmet";
// import api from "../utils/public-api";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import useSWR from "swr";

// const fetcher = url => api.get(url).then(res => res.data.data)

const PublicDashboardPage = () => {
    return ( 
        <Layout>
            <Helmet>
                <title>Jatim {process.env.REACT_APP_WEB_NAME}</title>
            </Helmet>
            <SectionBody>

            </SectionBody>
        </Layout>
    );
}
 
export default PublicDashboardPage;