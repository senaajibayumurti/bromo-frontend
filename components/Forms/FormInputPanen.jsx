import React, { useState, useEffect } from 'react';
import Button from '../../components/Button'; // Adjust the import path as necessary
import TimedOverlay from '../Layout/TimedOverlay';

const FormInputPanen = () => {
  const [data, setData] = useState({
    idKandang: '',
    tanggalMulai: '',
    tanggalPanen: '',
    jumlahPanen: '',
    bobotTotal: ''
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

        const response = await fetch(`http://toko.technosv.my.id/api/kandangByUser/${userId}`, {
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

  // Fetch start date when kandang is selected
  useEffect(() => {
    if (!data.idKandang) return;

    const fetchKandangDetail = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`http://toko.technosv.my.id/api/kandang/${data.idKandang}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch kandang details');
        }

        const kandangData = await response.json();
        setData(prevData => ({
          ...prevData,
          tanggalMulai: kandangData.data.tanggal_mulai
        }));
      } catch (error) {
        console.error('Error fetching kandang details:', error);
        setShowOverlay(true);
        setOverlayText(error.toString());
        setOverlayType('error');
      }
    };

    fetchKandangDetail();
  }, [data.idKandang]);

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

      const response = await fetch('http://toko.technosv.my.id/api/panen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_kandang: data.idKandang,
          tanggal_mulai: data.tanggalMulai,
          tanggal_panen: data.tanggalPanen,
          jumlah_panen: data.jumlahPanen,
          bobot_total: data.bobotTotal,
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
      tanggalMulai: '',
      tanggalPanen: '',
      jumlahPanen: '',
      bobotTotal: ''
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
      {showOverlay && <TimedOverlay teks={overlayText} type={overlayType} onClose={() => setShowOverlay(false)} />}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="p-6.5">
          {/* ID Kandang Dropdown */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-neutral-900">
              ID Kandang
            </label>
            <select
              name="idKandang"
              value={data.idKandang}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 px-5 py-3 pr-10 text-bromo-neutral-900 outline-none transition"
            >
              {kandangOptions.map((kandang) => (
                <option key={kandang.id} value={kandang.id}>
                  {kandang.nama_kandang}
                </option>
              ))}
            </select>
          </div>
          {/* Tanggal Panen */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-neutral-900">
              Tanggal Panen
            </label>
            <input
              type="date"
              name="tanggalPanen"
              value={data.tanggalPanen}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 px-5 py-3 pr-10 text-bromo-neutral-900 outline-none transition"
            />
          </div>
          {/* Jumlah Panen */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-neutral-900">
              Jumlah Panen
            </label>
            <div className="relative">
              <input
                type="number"
                name="jumlahPanen"
                value={data.jumlahPanen}
                onChange={handleChange}
                placeholder="Jumlah Panen"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 px-5 py-3 pr-10 text-bromo-neutral-900 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-neutral-900">ekor</span>
            </div>
          </div>
          {/* Bobot Total */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-neutral-900">
              Bobot Total
            </label>
            <div className="relative">
              <input
                type="number"
                name="bobotTotal"
                value={data.bobotTotal}
                onChange={handleChange}
                placeholder="Bobot Total"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 px-5 py-3 pr-10 text-bromo-neutral-900 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-neutral-900">kg</span>
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

export default FormInputPanen;
