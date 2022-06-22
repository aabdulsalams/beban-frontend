import api from "../../utils/public-api";
import useSWR from "swr";
import Chart from 'react-apexcharts';

const fetcher = url => api.get(url).then(res => res.data.data)

const DisasterTypes = () => {
    const { data: disaster_types } = useSWR('/disaster-types', fetcher, { refreshInterval: 3000 });

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Disaster Type <span> / Locations</span></h5>
                {disaster_types && (
                    <div className="donut">
                        <Chart
                            options={{
                                labels: disaster_types.map((type) => type.name),
                                plotOptions: {
                                    pie: {
                                        donut: {
                                            labels: {
                                                show: true,
                                            }
                                        }
                                    }
                                }
                            }}
                            series={disaster_types.map((type) => type.disasters_count)}
                            type="donut"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DisasterTypes;