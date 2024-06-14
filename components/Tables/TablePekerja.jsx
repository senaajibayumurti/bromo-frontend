import React, { useState, useEffect } from 'react';

const TablePekerja = () => {
  const [pekerjaData, setPekerjaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch('http://toko.technosv.my.id/api/owner/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setPekerjaData(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left">
              <th className="min-w-[50px] px-4 py-4 font-medium text-black xl:pl-11">
                No
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Nama Lengkap
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Username
              </th>
              <th className="min-w-[200px] px-4 py-4 font-medium text-black">
                Email
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Status
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                No Telepon
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6" className="text-center py-4">
                <p className="text-gray-500">Memuat...</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>; // Display error message if fetching fails
  }

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            <th className="min-w-[50px] px-4 py-4 font-medium text-black xl:pl-11">
              No
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-black">
              Nama Lengkap
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-black">
              Username
            </th>
            <th className="min-w-[200px] px-4 py-4 font-medium text-black">
              Email
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-black">
              Status
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-black">
              No Telepon
            </th>
          </tr>
        </thead>
        <tbody>
          {pekerjaData.map((pekerjaItem, index) => (
            <tr key={pekerjaItem.id}>
              <td className="border-b border-[#eee] px-4 py-5 xl:pl-11">
                <p className="text-black">{index + 1}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5">
                <p className="text-black">{pekerjaItem.nama_lengkap}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5">
                <p className="text-black">{pekerjaItem.username}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5">
                <p className="text-black">{pekerjaItem.email}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5">
                <span className={`${
                  pekerjaItem.status === "anak kandang" ? "font-medium text-black" : "font-bold text-red-500"
                }`}>
                  {pekerjaItem.status}
                </span>
              </td>
              <td className="border-b border-[#eee] px-4 py-5">
                <p className="text-black">{pekerjaItem.no_telepon}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePekerja;
