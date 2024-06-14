import React, { useState } from 'react';
import DashboardLayout from "../../components/Layout/DashboardLayout";
import DropdownKandang from "../../components/Dropdown/DropdownKandang";
import FormKlasifikasi from "../../components/Forms/FormKlasifikasi";
import RoundedContainer from "../../components/Layout/RoundedContainer";
import DonutChartSuhu from '../../components/Charts/DonutChartSuhu';
import DonutChartKelembaban from '../../components/Charts/DonutChartKelembaban';
import DonutChartAmonia from '../../components/Charts/DonutChartAmonia';
import FormForecasting from '../../components/Forms/FormForecasting';

const Beranda = () => {
    const [selectedKandang, setSelectedKandang] = useState(null);

    return (
        <DashboardLayout>
            <DropdownKandang setSelectedKandang={setSelectedKandang} />
            <div className="flex space-x-4">
                <RoundedContainer label={'Ringkasan'} width={'w-3/4'}>
                    <div className="flex justify-evenly">
                        <DonutChartSuhu idKandang={selectedKandang ? selectedKandang.id : null} />
                        <DonutChartKelembaban idKandang={selectedKandang ? selectedKandang.id : null} />
                        <DonutChartAmonia idKandang={selectedKandang ? selectedKandang.id : null} />
                    </div>
                </RoundedContainer>
                <RoundedContainer label={'Forecasting'} width={'w-1/4'}>
                    <FormForecasting />
                </RoundedContainer>
            </div>
            <RoundedContainer label={'Klasifikasi'}>
                {selectedKandang ? (
                    <FormKlasifikasi idKandang={selectedKandang.id} />
                ) : null}
            </RoundedContainer>
        </DashboardLayout>
    );
};

export default Beranda;
