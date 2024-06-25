import React, { useState, useEffect } from 'react';
import Button from '../../components/Button'; // Adjust the import path as necessary
import TimedOverlay from '../Layout/TimedOverlay';

const FormInputData = () => {
  const [data, setData] = useState({
    idKandang: '',
    pakan: '',
    minum: '',
    bobot: '',
    populasi: '',
    jumlahAyamMati: ''
  });

  const [kandangOptions, setKandangOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayText, setOverlayText] = useState('');
  const [overlayType, setOverlayType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch(`http://127.0.0.1:8080/api/kandangByUser/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setKandangOptions(result.data || []);
        setLoading(false);
        if (result.data.length > 0) {
          setData(data => ({ ...data, idKandang: result.data[0].id }));
        }
      } catch (error) {
        console.error('Error fetching kandang data: ', error);
        setShowOverlay(true);
        setOverlayText('Gagal memuat data kandang.');
        setOverlayType('error');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch('http://127.0.0.1:8080/api/anak-kandang/data-kandang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_kandang: data.idKandang,
          pakan: data.pakan,
          minum: data.minum,
          bobot: data.bobot,
          populasi: data.populasi,
          jumlah_kematian: data.jumlahAyamMati,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save data: ${errorData.message || response.status}`);
      }

      setShowOverlay(true);
      setOverlayText('Data berhasil disimpan!');
      setOverlayType('success');
      setTimeout(() => {
        handleCancel();
        setShowOverlay(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving data:', error);
      setShowOverlay(true);
      setOverlayText(error.toString());
      setOverlayType('error');
    }
  };

  const handleCancel = () => {
    setData({
      idKandang: '',
      pakan: '',
      minum: '',
      bobot: '',
      populasi: '',
      jumlahAyamMati: ''
    });
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading) {
    return <p className="text-gray-500">Memuat...</p>;
  }

  return (
    <div className="flex flex-col gap-9">
      {showOverlay && <TimedOverlay teks={overlayText} type={overlayType} onClose={() => setShowOverlay(false)}/>}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="p-6.5">
          {/* ID Kandang Dropdown */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              ID Kandang
            </label>
            <select
              name="idKandang"
              value={data.idKandang}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
            >
              {kandangOptions.map((kandang) => (
                <option key={kandang.id} value={kandang.id}>
                  {kandang.nama_kandang}
                </option>
              ))}
            </select>
          </div>
          {/* Pakan */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              Pakan
            </label>
            <div className="relative">
              <input
                type="text"
                name="pakan"
                value={data.pakan}
                onChange={handleChange}
                placeholder="Pakan"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">kg</span>
            </div>
          </div>
          {/* Minum */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              Minum
            </label>
            <div className="relative">
              <input
                type="text"
                name="minum"
                value={data.minum}
                onChange={handleChange}
                placeholder="Minum"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">liter</span>
            </div>
          </div>
          {/* Bobot */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              Bobot
            </label>
            <div className="relative">
              <input
                type="text"
                name="bobot"
                value={data.bobot}
                onChange={handleChange}
                placeholder="Bobot"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-16 text-bromo-gray-900 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">g/ekor</span>
            </div>
          </div>
          {/* Populasi */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              Populasi
            </label>
            <div className="relative">
              <input
                type="text"
                name="populasi"
                value={data.populasi}
                onChange={handleChange}
                placeholder="Populasi"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">ekor</span>
            </div>
          </div>
          {/* Jumlah Ayam Mati */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              Jumlah Ayam Mati
            </label>
            <div className="relative">
              <input
                type="text"
                name="jumlahAyamMati"
                value={data.jumlahAyamMati}
                onChange={handleChange}
                placeholder="Jumlah Ayam Mati"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">ekor</span>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <Button label="Simpan" onClick={handleSave} type="success" />
            <Button label="Batal" onClick={handleCancel} type="error" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormInputData;
