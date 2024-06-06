import React, { useState, useEffect } from 'react';

const TablePekerja = () => {
  const [pekerjaData, setPekerjaData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/pekerja-data'); // Ganti dengan endpoint API yang sesuai
        const data = await response.json();
        setPekerjaData(data);
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
  );
};

export default TablePekerja;
