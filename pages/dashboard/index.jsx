import DashboardLayout from "../../components/Layout/DashboardLayout";
import DonutChart from "../../components/Charts/DonutChart";

export default function Beranda(children) {
    return (
        <DashboardLayout>
            <DonutChart/>
        </DashboardLayout>
    );
}