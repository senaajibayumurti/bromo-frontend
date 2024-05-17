const pekerjaData = [
  {
    nama: "Pekerja A",
    aktifitasTerakhir: `2023-05-01 14:30`,
    status: "Sedang Bekerja",
  },
  {
    nama: "Pekerja B",
    aktifitasTerakhir: `2023-04-28 09:15`,
    status: "Tidak Bekerja",
  },
  {
    nama: "Pekerja C",
    aktifitasTerakhir: `2023-05-03 17:45`,
    status: "Sedang Bekerja",
  },
  {
    nama: "Pekerja D",
    aktifitasTerakhir: `2023-04-30 12:00`,
    status: "Tidak Bekerja",
  },
];

const TablePekerja = () => {
  return (
    <div className="rounded-sm border border-stroke bg-bromo-gray-50 px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[50px] px-4 py-4 font-medium text-black xl:pl-11">
                No
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Nama
              </th>
              <th className="min-w-[200px] px-4 py-4 font-medium text-black">
                Aktifitas Terakhir
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {pekerjaData.map((pekerjaItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 xl:pl-11">
                  <p className="text-black">{key + 1}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <p className="text-black">{pekerjaItem.nama}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <p className="text-black">{pekerjaItem.aktifitasTerakhir}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <span className={`${
                    pekerjaItem.status === "Sedang Bekerja" ? "font-extrabold text-bromo-success-500" : "font-extrabold text-bromo-error-500"
                  }`}>
                    {pekerjaItem.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePekerja;
