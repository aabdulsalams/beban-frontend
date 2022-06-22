import Layout from "../components/layouts/guest/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import { CountReport, DisasterLocations, DisasterTypes, DisasterTypesCity } from "../components/public-dashboard";
import { Helmet } from "react-helmet-async";

const PublicDashboardPage = () => {
    return (
        <Layout>
            <Helmet>
                <title>Jatim {process.env.REACT_APP_WEB_NAME}</title>
            </Helmet>
            <SectionHeader title="Dashboard">
                <Breadcrumb>
                    <BreadcrumbItem text="Menu" />
                    <BreadcrumbItem text="Dashboard" active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="row">
                            <CountReport />
                            <DisasterLocations />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <DisasterTypes />
                        <DisasterTypesCity />
                    </div>
                </div>
            </SectionBody>
        </Layout>
    );
}

export default PublicDashboardPage;