import Layout from "../components/layouts/Layout";
import { Breadcrumb, BreadcrumbItem, SectionHeader, SectionBody } from "../components/bootstrap";
import api from "../utils/public-api";
import useSWR from "swr";
import { useSWRConfig } from "swr";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const fetcher = url => api.get(url).then(res => res.data.data)

const RatingsPage = () => {
    // eslint-disable-next-line
    const { mutate } = useSWRConfig();
    const { data } = useSWR('/disasters', fetcher);
    // eslint-disable-next-line
    const navigate = useNavigate();

    function checkStatus(count) {
        let status = 'N/A';

        if (count >= 1 && count <=3) {
            status = 'Rendah';
        } else if (count >= 4 && count <=6) {
            status = 'Sedang';
        } else if (count > 6) {
            status = 'Tinggi';
        }
        return status;
      }

    return (

        <Layout>
                    {console.log(data)}
            <Helmet>
                <title>Peringkat</title>
            </Helmet>
            <SectionHeader title="Ratings">
                <Breadcrumb>
                    <BreadcrumbItem text="Home" />
                    <BreadcrumbItem text="Ratings" active />
                </Breadcrumb>
            </SectionHeader>
            <SectionBody>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Ratings</h5>
                                <table className="table table-bordered table-responsive">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Place</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((location) => {
                                            return (
                                                <tr key={location.id}>
                                                    <th scope="row">{location.id}</th>
                                                    <td>{location.address}</td>
                                                    <td>{checkStatus(location.total_disasters)}</td>
                                                    <td>{location.total_disasters}</td>
                                                </tr>
                                            );
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

export default RatingsPage;