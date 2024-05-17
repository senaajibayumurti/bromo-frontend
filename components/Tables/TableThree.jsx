const packageData = [
  {
    kandang: "Kandang A",
    tanggal: `Jan 13,2023`,
  },
  {
    kandang: "Kandang B",
    tanggal: `Jan 14,2023`,
  },
  {
    kandang: "Kandang C",
    tanggal: `Jan 15,2023`,
  },
  {
    kandang: "Kandang D",
    tanggal: `Jan 16,2023`,
  },
];

const TableThree = () => {
  return (
    <div className="rounded-sm border border-stroke bg-bromo-gray-50 px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[50px] px-4 py-4 font-medium text-black xl:pl-11">
                No
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black">
                Kandang
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Tanggal
              </th>
              <th className="px-4 py-4 font-medium text-black">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11">
                  <p className="text-black">{key + 1}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black">{packageItem.kandang}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black">{packageItem.tanggal}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="px-4 py-2 font-medium text-bromo-gray-50 bg-green-500 rounded hover:bg-green-600">
                      Buka
                    </button>
                    <button className="px-4 py-2 font-medium text-bromo-gray-50 bg-red-500 rounded hover:bg-red-600">
                      Hapus
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

export default TableThree;
