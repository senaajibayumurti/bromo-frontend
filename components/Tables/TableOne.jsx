import Image from "next/image";

const farmData = [
  {
    no: 1,
    kandang: "Kandang A",
    tanggal: "2024-05-01",
  },
  {
    no: 2,
    kandang: "Kandang B",
    tanggal: "2024-05-02",
  },
  {
    no: 3,
    kandang: "Kandang C",
    tanggal: "2024-05-03",
  },
];

const TableOne = () => {
  const handleOpen = (id) => {
    console.log("Buka kandang dengan id:", id);
    // Tambahkan logika untuk membuka kandang di sini
  };

  const handleDelete = (id) => {
    console.log("Hapus kandang dengan id:", id);
    // Tambahkan logika untuk menghapus kandang di sini
  };

  return (
    <div className="rounded-sm border border-black bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black">
        Daftar Kandang
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-6 bg-green-600 dark:bg-meta-4">
          <div className="p-2.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">No</h5>
          </div>
          <div className="p-2.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Kandang</h5>
          </div>
          <div className="p-2.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Tanggal</h5>
          </div>
          <div className="p-2.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Buka</h5>
          </div>
          <div className="p-2.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Aksi</h5>
          </div>
        </div>

        {farmData.map((farm, key) => (
          <div
            className={`grid grid-cols-6 ${
              key === farmData.length - 1 ? "" : "border-b border-black dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center justify-center p-2.5">
              <p className="text-black w-max">{farm.no}</p>
            </div>
            <div className="flex items-center justify-center p-2.5">
              <p className="text-black">{farm.kandang}</p>
            </div>
            <div className="flex items-center justify-center p-2.5">
              <p className="text-black">{farm.tanggal}</p>
            </div>
            <div className="flex items-center justify-center p-2.5">
              <button onClick={() => handleOpen(farm.no)} className="text-black dark:text-black bg-green-500 rounded px-8 py-2">Buka</button>
            </div>
            <div className="flex items-center justify-center p-2.5">
              <button onClick={() => handleDelete(farm.no)} className="text-black dark:text-black bg-red-500 rounded px-8 py-2">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
