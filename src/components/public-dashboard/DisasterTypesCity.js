import api from "../../utils/public-api";
import useSWR from "swr";
import Chart from 'react-apexcharts';
import Select from "react-select";
import data_jatim from "../../data/jatim";
import { useState } from "react";

const fetcher = url => api.get(url).then(res => res.data.data)

const DisasterTypesCity = () => {
    const [city, setCity] = useState(data_jatim[37]);
    const { data: disaster_types } = useSWR(`/disaster-types/city?name=${city}`, fetcher, { refreshInterval: 3000 });

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Disaster Type <span> / City</span></h5>
                <Select
                    defaultValue={{ value: data_jatim[37], label: data_jatim[37] }}
                    options={data_jatim.map((item) => {
                        return { value: item, label: item }
                    })}
                    onChange={(item) => setCity(item.value)}
                />
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
                            series={disaster_types.map((type) => type.total)}
                            type="donut"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DisasterTypesCity;