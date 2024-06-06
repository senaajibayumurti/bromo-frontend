import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../Button";

const TableKandang = () => {
  const [kandangData, setKandangData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        // Ambil token dari localStorage
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch('http://toko.technosv.my.id/api/data-kandang', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Kirim token autentikasi
          },
        });

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text(); // Get the text response for debugging
          throw new Error(`Received non-JSON response: ${text}`);
        }

        const result = await response.json();

        // Ensure we are extracting the 'data' key from the result
        const { data } = result;
        setKandangData(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
        setLoading(false); // Set loading to false if there's an error
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[50px] px-4 py-4 font-medium text-black xl:pl-11">
                No
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Kandang
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Tanggal
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Pakan
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Minum
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Populasi
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                Jumlah Kematian
              </th>
              <th className="px-4 py-4 font-medium text-black">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="8" className="text-center py-4">
                <p className="text-gray-500">Loading...</p>
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
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[50px] px-4 py-4 font-medium text-black xl:pl-11">
              No
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-black">
              Kandang
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-black">
              Tanggal
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-black">
              Pakan
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-black">
              Minum
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-black">
              Populasi
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-black">
              Jumlah Kematian
            </th>
            <th className="px-4 py-4 font-medium text-black">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {kandangData.map((kandangItem, key) => (
            <tr key={key}>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11">
                <p className="text-black">{key + 1}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black">{kandangItem.kandang}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black">{new Date(kandangItem.date).toLocaleDateString()}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black">{kandangItem.pakan}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black">{kandangItem.minum}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black">{kandangItem.populasi}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black">{kandangItem.jumlah_kematian}</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <Link href={'/dashboard'}>
                    <Button label="Edit" type={'success'}/>
                  </Link>
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
