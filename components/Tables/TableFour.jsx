import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";

export default function TableFour(){
    return (
        <Table>
            <TableHeader>
                <TableColumn>No</TableColumn>
                <TableColumn>Kandang</TableColumn>
                <TableColumn>Tanggal Mulai</TableColumn>
                <TableColumn>Alamat Kandang</TableColumn>
                <TableColumn>Luas Kandang</TableColumn>
                <TableColumn>Pekerja</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Aksi</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        </Table>
    );
}
