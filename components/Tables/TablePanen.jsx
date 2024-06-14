import React, { useState, useEffect } from 'react';
import Button from '../Button';

const TablePanen = () => {
  const [panenData, setPanenData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch('http://toko.technosv.my.id/api/panen', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setPanenData(result.data || result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
        setLoading(false);
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
        {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
                <p className="text-gray-500">Memuat...</p>
              </td>
            </tr>
          ) : panenData.map((packageItem, key) => (
            <tr key={key}>
              <td className="border-b border-[#eee] px-4 py-5 xl:pl-11">
                <p className="text-black">{key + 1}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5">
                <p className="text-black">{packageItem.kandang}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5">
                <p className="text-black">{packageItem.tanggal_mulai}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5">
                <p className="text-black">{packageItem.tanggal_panen}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5">
                <p className="text-black">{packageItem.jumlah_panen}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5">
                <p className="text-black">{packageItem.bobot_total}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5">
                  <div className="flex items-center space-x-3.5">
                    <Button label='Unduh' type={'success'}/>
                    <Button label='Hapus' type={'error'}/>
                  </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePanen;
