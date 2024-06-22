import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../../components/Button'; // Adjust the import path as necessary
import TimedOverlay from '../Layout/TimedOverlay';

const FormKandang = () => {
  const initialFormData = {
    nama_kandang: '',
    id_user: '',
    tanggal_mulai: '',
    luas_kandang: '',
    alamat_kandang: ''
  };

  const router = useRouter();
  const [kandangData, setKandangData] = useState(initialFormData);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayText, setOverlayText] = useState('');
  const [overlayType, setOverlayType] = useState('info');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKandangData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://toko.technosv.my.id/api/owner/kandang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Ensure the token is managed correctly
        },
        body: JSON.stringify(kandangData) // Make sure to match the expected data structure
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message || 'Failed to save data');
      setOverlayText('Berhasil menambahkan kandang baru!');
      setOverlayType('success');
      setShowOverlay(true);
      setTimeout(() => {
        router.push('/dashboard/kandang'); // Delayed redirect to allow the overlay to be visible
      }, 2000);  // Clear form data after successful save
    } catch (error) {
      setOverlayText('Error saving data: ' + error.message);
      setOverlayType('error');
      setShowOverlay(true);
    }
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleCancel = () => {
    setKandangData(initialFormData); // Reset form data to initial state
  };

  return (
    <div className="flex flex-col gap-9">
      {showOverlay && <TimedOverlay teks={overlayText} type={overlayType} onClose={handleCloseOverlay} />}
      <form action="#" onSubmit={(e) => e.preventDefault()}>
        <div className="p-6.5">
          {Object.entries(kandangData).map(([key, value]) => (
            <div key={key} className="flex flex-col mb-4">
              <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </label>
              <div className="relative">
                <input
                  type={key === 'tanggal_mulai' ? 'date' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end space-x-4">
            <Button label="Simpan" onClick={handleSave} type="success" />
            <Button label="Batal" onClick={handleCancel} type="error" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormKandang;
