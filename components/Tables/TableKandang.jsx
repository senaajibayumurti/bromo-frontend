import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../Button";
import TimedOverlay from '../Layout/TimedOverlay';

const TableKandang = ({ refreshData }) => {
  const [kandangData, setKandangData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayText, setOverlayText] = useState('');
  const [overlayType, setOverlayType] = useState('');

  useEffect(() => {
    fetchData();
  }, [refreshData]); // Dependency on refreshData to re-trigger fetching

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await fetch('http://127.0.0.1:8080/api/owner/kandang', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setKandangData(result.data || result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error.message);
      setLoading(false);
    }
  };
  const getStatusClass = (status) => {
    switch (status) {
      case "aktif":
        return "text-bromo-success-500 font-extrabold";
      case "rehat":
        return "text-bromo-info-500 font-extrabold";
      default:
        return "text-black";
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setShowOverlay(true);
      setOverlayText('Authentication required.');
      setOverlayType('error');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8080/api/owner/kandang/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete kandang data');
      }

      setShowOverlay(true);
      setOverlayText('Kandang successfully deleted!');
      setOverlayType('success');
      setTimeout(() => {
        setShowOverlay(false);
        fetchData(); // Refresh data after deletion and overlay
      }, 2000); // Delay before refreshing data
    } catch (error) {
      console.error("Error:", error);
      setOverlayText(error.toString());
      setShowOverlay(true);
      setOverlayType('error');
    }
  };

  if (error) {
    return <p>Error: {error}</p>; // Display error message if fetching fails
  }

  return (
    <div className="max-w-full overflow-x-auto">
      {showOverlay && <TimedOverlay teks={overlayText} type={overlayType} onClose={() => setShowOverlay(false)} />}
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-4 font-medium text-black">ID</th>
            <th className="px-4 py-4 font-medium text-black">Nama Kandang</th>
            <th className="px-4 py-4 font-medium text-black">Luas Kandang</th>
            <th className="px-4 py-4 font-medium text-black">Tanggal Mulai</th>
            <th className="px-4 py-4 font-medium text-black">Alamat</th>
            <th className="px-4 py-4 font-medium text-black">Status</th>
            <th className="px-4 py-4 font-medium text-black">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
                <p className="text-gray-500">Memuat...</p>
              </td>
            </tr>
          ) : kandangData.map((item, index) => (
            <tr key={index}>
              <td className="border-b border-[#eee] px-4 py-5">{item.id}</td>
              <td className="border-b border-[#eee] px-4 py-5">{item.nama_kandang}</td>
              <td className="border-b border-[#eee] px-4 py-5">{item.luas_kandang}</td>
              <td className="border-b border-[#eee] px-4 py-5">{item.tanggal_mulai}</td>
              <td className="border-b border-[#eee] px-4 py-5">{item.alamat_kandang}</td>
              <td className={`border-b border-[#eee] px-4 py-5 ${getStatusClass(item.rehat)}`}>{item.rehat}</td>
              <td className="border-b border-[#eee] px-4 py-5">
                <div className="flex items-center space-x-3.5">
                  <Link href={`/dashboard/kandang/edit-kandang?id=${item.id}`} passHref>
                    <Button id={`btnSuntingKandang-${item.id}`} label="Sunting" type={'info'}/>
                  </Link>
                  <Button id={`btnHapusKandang-${item.id}`} label="Hapus" type={'error'} onClick={() => handleDelete(item.id)}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableKandang;
