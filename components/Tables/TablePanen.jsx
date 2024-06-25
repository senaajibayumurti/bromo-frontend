import React, { useState, useEffect } from 'react';
import Button from '../Button';
import TimedOverlay from '../Layout/TimedOverlay';

const TablePanen = () => {
  const [panenData, setPanenData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState('');
  const [overlayType, setOverlayType] = useState('success');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch('http://127.0.0.1:8080/api/panen', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Mengurutkan data berdasarkan tanggal panen
        const sortedData = (result.data || result).sort((a, b) => {
          return new Date(b.tanggal_panen) - new Date(a.tanggal_panen);
        });

        setPanenData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadCSV = (item) => {
    setOverlayMessage('Mengunduh data...');
    setOverlayType('success');
    setShowOverlay(true);

    const fileName = `data_panen_${item.kandang.replaceAll(' ', '_')}_${item.tanggal_panen.replaceAll('-', '_')}.csv`;
    const csvRows = [];
    const headers = Object.keys(item);
    csvRows.push(headers.join(','));

    const values = headers.map(header => {
      const escaped = ('' + item[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    
    setTimeout(() => {
      setShowOverlay(false);
    }, 2000);
  };

  const handleDelete = () => {
    setOverlayMessage('Fitur belum tersedia.');
    setOverlayType('info');
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
    }, 2000);
  };

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-4 font-medium text-black">No</th>
            <th className="px-4 py-4 font-medium text-black">Nama Kandang</th>
            <th className="px-4 py-4 font-medium text-black">Tanggal Mulai</th>
            <th className="px-4 py-4 font-medium text-black">Tanggal Panen</th>
            <th className="px-4 py-4 font-medium text-black">Jumlah Panen (ekor)</th>
            <th className="px-4 py-4 font-medium text-black">Bobot Total (kg)</th>
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
          ) : panenData.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-5">{index + 1}</td>
              <td className="px-4 py-5">{item.kandang}</td>
              <td className="px-4 py-5">{item.tanggal_mulai}</td>
              <td className="px-4 py-5">{item.tanggal_panen}</td>
              <td className="px-4 py-5">{item.jumlah_panen}</td>
              <td className="px-4 py-5">{item.bobot_total}</td>
              <td className="px-4 py-5">
                <div className="flex items-center space-x-3.5">
                  <Button label="Unduh" type={'success'} onClick={() => downloadCSV(item)} />
                  <Button label="Hapus" type={'error'} onClick={handleDelete} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showOverlay && (
        <TimedOverlay
          teks={overlayMessage}
          type={overlayType}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div>
  );
};

export default TablePanen;
