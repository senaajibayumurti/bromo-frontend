import DashboardLayout from "../../../components/Layout/DashboardLayout";
import Home from "../../../components/Pages/Home";
import TableOne from "../../../components/Tables/TableOne";

export default function RekapData(children) {
    return (
        <DashboardLayout>
            <TableOne/>
        </DashboardLayout>
    );
}