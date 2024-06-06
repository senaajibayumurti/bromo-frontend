import React, { useState, useEffect } from 'react';

const TableRekapData = () => {
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/rekap-data'); // Ganti dengan endpoint API yang sesuai
        const data = await response.json();
        setPackageData(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  return (
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
              <td className="border-b border-[#eee] px-4 py-5 xl:pl-11">
                <p className="text-black">{key + 1}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5">
                <p className="text-black">{packageItem.kandang}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5">
                <p className="text-black">{packageItem.tanggal}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5">
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
  );
};

export default TableRekapData;
