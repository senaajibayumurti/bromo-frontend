import Image from "next/image";

const harvestData = [
  {
    no: 1,
    kandang: "Kandang A",
    tanggalMulai: "2024-05-01",
    tanggalPanen: "2024-05-10",
    jumlahPanen: 500,
    bobotTotal: 250,
  },
  {
    no: 2,
    kandang: "Kandang B",
    tanggalMulai: "2024-05-02",
    tanggalPanen: "2024-05-12",
    jumlahPanen: 600,
    bobotTotal: 280,
  },
  {
    no: 3,
    kandang: "Kandang C",
    tanggalMulai: "2024-05-03",
    tanggalPanen: "2024-05-15",
    jumlahPanen: 550,
    bobotTotal: 270,
  },
];

const TableTwo = () => {
  const handleDownload = (id) => {
    console.log("Unduh data panen dengan id:", id);
    // Tambahkan logika untuk mengunduh data panen di sini
  };

  return (
    <div className="rounded-sm border border-black bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black">
        Daftar Panen
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-7 bg-green-600 dark:bg-meta-4">
          <div className="p-2.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">No</h5>
          </div>
          <div className="p-2.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Kandang</h5>
          </div>
          <div className="p-2.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Tanggal Mulai</h5>
          </div>
          <div className="p-2.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Tanggal Panen</h5>
          </div>
          <div className="p-2.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Jumlah Panen</h5>
          </div>
          <div className="p-2.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Bobot Total (kg)</h5>
          </div>
          <div className="p-2.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Aksi</h5>
          </div>
        </div>

        {harvestData.map((harvest, key) => (
          <div
            className={`grid grid-cols-7 ${
              key === harvestData.length - 1 ? "" : "border-b border-black dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center justify-center p-2.5">
              <p className="text-black w-max">{harvest.no}</p>
            </div>
            <div className="flex items-center justify-center p-2.5">
              <p className="text-black">{harvest.kandang}</p>
            </div>
            <div className="flex items-center justify-center p-2.5">
              <p className="text-black">{harvest.tanggalMulai}</p>
            </div>
            <div className="flex items-center justify-center p-2.5">
              <p className="text-black">{harvest.tanggalPanen}</p>
            </div>
            <div className="flex items-center justify-center p-2.5">
              <p className="text-black">{harvest.jumlahPanen}</p>
            </div>
            <div className="flex items-center justify-center p-2.5">
              <p className="text-black">{harvest.bobotTotal}</p>
            </div>
            <div className="flex items-center justify-center p-2.5">
              <button onClick={() => handleDownload(harvest.no)} className="text-black dark:text-black bg-blue-500 rounded px-8 py-2">Unduh</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableTwo;