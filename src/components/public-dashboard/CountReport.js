import api from "../../utils/public-api";
import useSWR from "swr";

const fetcher = url => api.get(url).then(res => res.data.data);

const TotalDisasterLocation = () => {
    const { data } = useSWR('/disasters/count', fetcher, { refreshInterval: 3000 });
    
    return (
        <>
            <div className="col-xxl-6 col-xl-12">
                <div className="card info-card">
                    <div className="card-body">
                        <h5 className="card-title">Total Disaster Location</h5>
                        <div className="d-flex align-items-center">
                            <div className="card-icon d-flex align-items-center justify-content-center">
                                <i className="ri ri-flood-line"></i>
                            </div>
                            <div className="ps-3">
                                <h6>{data?.disasters_count}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xxl-6 col-xl-12">
                <div className="card info-card">
                    <div className="card-body">
                        <h5 className="card-title">Many Disaster Reports</h5>
                        <div className="d-flex align-items-center">
                            <div className="card-icon d-flex align-items-center justify-content-center">
                                <i className="ri ri-fire-line"></i>
                            </div>
                            <div className="ps-3">
                                <h6>{data?.many_disasters_count}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TotalDisasterLocation;