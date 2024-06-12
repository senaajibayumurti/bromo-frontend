import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../Button";

const TableKandang = () => {
  const [kandangData, setKandangData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch('http://toko.technosv.my.id/api/owner/kandang', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setKandangData(result.data || result); // Adjust according to the response structure
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "aktif":
        return "text-bromo-success-500 font-extrabold";
      case "rehat":
        return "text-bromo-info-500 font-extrabold";
      default:
        return "text-black"; // Default text color if status is neither 'aktif' nor 'rehat'
    }
  };

  if (error) {
    return <p>Error: {error}</p>; // Display error message if fetching fails
  }

  return (
    <div className="max-w-full overflow-x-auto">
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
                <p className="text-gray-500">Loading...</p>
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
                <Link href={`/edit/${item.id}`} passHref>
                  <Button label="Edit" type={'info'}/>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableKandang;
