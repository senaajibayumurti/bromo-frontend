import React, { useState } from 'react';
import DashboardLayout from "../../components/Layout/DashboardLayout";
import DropdownKandang from "../../components/Dropdown/DropdownKandang";
import FormKlasifikasi from "../../components/Forms/FormKlasifikasi";
import RoundedContainer from "../../components/Layout/RoundedContainer";
import DonutChartSuhu from '../../components/Charts/DonutChartSuhu';
import DonutChartKelembaban from '../../components/Charts/DonutChartKelembaban';
import DonutChartAmonia from '../../components/Charts/DonutChartAmonia';
import FormForecasting from '../../components/Forms/FormForecasting';
import withRoleAuth from '../../components/hoc/withRoleAuth';
import UnassignedWorker from '../../components/Layout/UnassignedWorker';
import Summary from '../../components/Layout/Summary';

const Beranda = () => {
    const [selectedKandang, setSelectedKandang] = useState(null);
    const [kandangNotFound, setKandangNotFound] = useState(false);

    return (
        <DashboardLayout>
            {kandangNotFound ? (
                <RoundedContainer>
                    <UnassignedWorker/>
                </RoundedContainer>
            ) : (
                <>
                    <DropdownKandang setSelectedKandang={setSelectedKandang} setKandangNotFound={setKandangNotFound} />
                    <div className="flex space-x-4">
                        <RoundedContainer label={'Ringkasan'} width={'w-full'}>
                            <div className="flex">
                                <div className="flex-none">
                                    <Summary idKandang={selectedKandang ? selectedKandang.id : null} />
                                </div>
                                <DonutChartSuhu idKandang={selectedKandang ? selectedKandang.id : null} />
                                <DonutChartKelembaban idKandang={selectedKandang ? selectedKandang.id : null} />
                                <DonutChartAmonia idKandang={selectedKandang ? selectedKandang.id : null} />
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
                </>
            )}
        </DashboardLayout>
    );
};

export default withRoleAuth(Beranda, ['owner', 'anak kandang']);
