import React, { useState, useEffect } from 'react';
import DashboardLayout from "../../components/Layout/DashboardLayout";
import DropdownKandang from "../../components/Dropdown/DropdownKandang";
import FormKlasifikasi from "../../components/Forms/FormKlasifikasi";
import RoundedContainer from "../../components/Layout/RoundedContainer";
import DonutChart from "../../components/Charts/DonutChart";

const Beranda = () => {
    const [forecastingData, setForecastingData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.example.com/forecasting-data');
                const data = await response.json();
                setForecastingData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <DashboardLayout>
            <DropdownKandang s/>
            <RoundedContainer label={'Forecasting'}>
                <DonutChart data={forecastingData} />
            </RoundedContainer>
            <RoundedContainer label={'Klasifikasi'}>
                <FormKlasifikasi/>
            </RoundedContainer>
        </DashboardLayout>
    );
};

export default Beranda;
