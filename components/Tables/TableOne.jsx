const kandangData = [
  {
    kandang: "Kandang A",
    tanggalMulai: `Jan 13, 2023`,
    alamat: "Jl. Pertanian No.1",
    luas: "100 m²",
    pekerja: "Pekerja A",
    status: "Aktif",
  },
  {
    kandang: "Kandang B",
    tanggalMulai: `Jan 14, 2023`,
    alamat: "Jl. Pertanian No.2",
    luas: "120 m²",
    pekerja: "Pekerja B",
    status: "Rehat",
  },
  {
    kandang: "Kandang C",
    tanggalMulai: `Jan 15, 2023`,
    alamat: "Jl. Pertanian No.3",
    luas: "130 m²",
    pekerja: "Pekerja C",
    status: "Aktif",
  },
  {
    kandang: "Kandang D",
    tanggalMulai: `Jan 16, 2023`,
    alamat: "Jl. Pertanian No.4",
    luas: "140 m²",
    pekerja: "Pekerja D",
    status: "Rehat",
  },
];

const TableOne = () => {
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
                Kandang
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Tanggal Mulai
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black">
                Alamat Kandang
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Luas Kandang
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Pekerja
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {kandangData.map((kandangItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11">
                  <p className="text-black">{key + 1}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black">{kandangItem.kandang}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black">{kandangItem.tanggalMulai}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black">{kandangItem.alamat}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black">{kandangItem.luas}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black">{kandangItem.pekerja}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <span className={`px-4 py-2 rounded text-white ${
                    kandangItem.status === "Aktif" ? "font-extrabold text-bromo-success-500" : "font-extrabold text-bromo-error-500"
                  }`}>
                    {kandangItem.status}
                  </span>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="px-4 py-2 font-medium text-bromo-gray-50 bg-bromo-info-500 rounded hover:bg-bromo-info-600">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOne;
