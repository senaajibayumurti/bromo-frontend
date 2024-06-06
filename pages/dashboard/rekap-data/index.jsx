import DashboardLayout from "../../../components/Layout/DashboardLayout";
import RoundedContainer from "../../../components/Layout/RoundedContainer";
import TableRekapData from "../../../components/Tables/TableRekapData";

export default function RekapData(children) {
    return (
        <DashboardLayout>
            <RoundedContainer>
                <TableRekapData/>
            </RoundedContainer>
        </DashboardLayout>
    );
}