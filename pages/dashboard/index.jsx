import DashboardLayout from "../../components/Layout/DashboardLayout";
import DonutChart from "../../components/Charts/DonutChart";
import TableOne from "../../components/Tables/TableOne";

export default function RekapData(children) {
    return (
        <DashboardLayout>
            <DonutChart/>
        </DashboardLayout>
    );
}