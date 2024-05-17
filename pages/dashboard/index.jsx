import DashboardLayout from "../../components/Layout/DashboardLayout";
import DonutChart from "../../components/Charts/DonutChart";
import DropdownKandang from "../../components/Dropdown/DropdownKandang";
import FormKlasifikasi from "../../components/Forms/FormKlasifikasi";

export default function Beranda(children) {
    return (
        <DashboardLayout>
            <DropdownKandang/>
            <DonutChart/>
            <FormKlasifikasi/>
        </DashboardLayout>
    );
}