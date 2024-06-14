import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '../Button';

const TableRekapData = () => {
  const [packageData, setPackageData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch('http://toko.technosv.my.id/api/data-kandang', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setPackageData(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError(error.message || 'Failed to fetch data');
        setLoading(false);
        if (error.message === 'User is not authenticated') {
          router.push('/login'); // Redirect ke halaman login jika token tidak valid
        }
      }
    };

    fetchData();
  }, [router]);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="w-16 px-4 py-4 font-medium text-black xl:pl-11">No</th>
            <th className="w-56 px-4 py-4 font-medium text-black">Kandang</th>
            <th className="w-40 px-4 py-4 font-medium text-black">Tanggal</th>
            <th className="w-32 px-4 py-4 font-medium text-black">Jam</th>
            <th className="w-24 px-4 py-4 font-medium text-black">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                <p className="text-gray-500">Memuat...</p>
              </td>
            </tr>
          ) : (
            packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 xl:pl-11">
                  <p className="text-black">{key + 1}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <p className="text-black">{packageItem.kandang}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <p className="text-black">{formatDate(packageItem.date)}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <p className="text-black">{formatTime(packageItem.date)}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <div className="flex items-center space-x-3.5">
                    <Button label='Hapus' type={'error'}/>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
};

export default TableRekapData;
