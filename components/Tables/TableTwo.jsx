const packageData = [
  {
    kandang: "Kandang A",
    tanggalMulai: `Jan 1, 2023`,
    tanggalPanen: `Jan 13, 2023`,
    jumlahPanen: 100,
    bobotTotal: 150,
  },
  {
    kandang: "Kandang B",
    tanggalMulai: `Jan 2, 2023`,
    tanggalPanen: `Jan 14, 2023`,
    jumlahPanen: 120,
    bobotTotal: 180,
  },
  {
    kandang: "Kandang C",
    tanggalMulai: `Jan 3, 2023`,
    tanggalPanen: `Jan 15, 2023`,
    jumlahPanen: 130,
    bobotTotal: 200,
  },
  {
    kandang: "Kandang D",
    tanggalMulai: `Jan 4, 2023`,
    tanggalPanen: `Jan 16, 2023`,
    jumlahPanen: 140,
    bobotTotal: 210,
  },
];

const TableThree = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[50px] px-4 py-4 font-medium text-black xl:pl-11">
                No
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Nama Kandang
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Tanggal Mulai
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Tanggal Panen
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Jumlah Panen (ekor)
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Bobot Total (kg)
              </th>
              <th className="px-4 py-4 font-medium text-black">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 xl:pl-11">
                  <p className="text-black">{key + 1}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <p className="text-black">{packageItem.kandang}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <p className="text-black">{packageItem.tanggalMulai}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <p className="text-black">{packageItem.tanggalPanen}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <p className="text-black">{packageItem.jumlahPanen}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <p className="text-black">{packageItem.bobotTotal}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <div className="flex items-center space-x-3.5">
                    <button className="px-4 py-2 font-medium text-white bg-green-500 rounded hover:bg-green-600">
                      Buka
                    </button>
                    <button className="px-4 py-2 font-medium text-white bg-red-500 rounded hover:bg-red-600">
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