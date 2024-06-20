import React, { useState } from 'react';
import DashboardLayout from "../../components/Layout/DashboardLayout";
import DropdownKandang from "../../components/Dropdown/DropdownKandang";
import FormKlasifikasi from "../../components/Forms/FormKlasifikasi";
import RoundedContainer from "../../components/Layout/RoundedContainer";
import DonutChartSuhu from '../../components/Charts/DonutChartSuhu';
import DonutChartKelembaban from '../../components/Charts/DonutChartKelembaban';
import DonutChartAmonia from '../../components/Charts/DonutChartAmonia';
import FormForecasting from '../../components/Forms/FormForecasting';
import Breadcrumbs from '../../components/Navigation/BreadCrumb';

const Beranda = () => {
    const [selectedKandang, setSelectedKandang] = useState(null);

    return (
        <DashboardLayout>
            <DropdownKandang setSelectedKandang={setSelectedKandang} />
            <div className="flex space-x-4">
                <RoundedContainer label={'Ringkasan'} width={'w-full'}>
                    <div className="flex justify-evenly">
                        <DonutChartSuhu idKandang={selectedKandang ? selectedKandang.id : null} />
                        <DonutChartKelembaban idKandang={selectedKandang ? selectedKandang.id : null} />
                        <DonutChartAmonia idKandang={selectedKandang ? selectedKandang.id : null} />
                        WARNING
                    </div>
                </RoundedContainer>
            </div>
            <div className="flex space-x-4">
                <RoundedContainer label={'Klasifikasi'} width={'w-3/4'}>
                    {selectedKandang ? (
                        <FormKlasifikasi idKandang={selectedKandang.id} />
                    ) : null}
                </RoundedContainer>
                <RoundedContainer label={'Forecasting'} width={'w-1/4'}>
                    <FormForecasting />
                </RoundedContainer>
            </div>
        </DashboardLayout>
    );
};

export default Beranda;