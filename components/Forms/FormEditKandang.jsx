import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '../Button'; // Adjust path as necessary
import TimedOverlay from '../Layout/TimedOverlay'; // Adjust path as necessary

const FormEditKandang = () => {
  const router = useRouter();
  const { id } = router.query;
  const [kandangData, setKandangData] = useState({
    nama_kandang: '',
    id_user: '',
    luas_kandang: '',
    rehat: ''
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayText, setOverlayText] = useState('');
  const [overlayType, setOverlayType] = useState('');

  useEffect(() => {
    if (!id) return; // Exit early if ID is not available yet

    const fetchKandangData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setShowOverlay(true);
        setOverlayText('Authentication required.');
        setOverlayType('error');
        return;
      }

      try {
        const response = await fetch(`https://toko.technosv.my.id/api/kandang/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch kandang data');
        }
        setKandangData(data.data || {});
      } catch (error) {
        console.error('Fetch Error:', error);
        setShowOverlay(true);
        setOverlayText(error.toString());
        setOverlayType('error');
      }
    };

    fetchKandangData();
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setShowOverlay(true);
      setOverlayText('Authentication required.');
      setOverlayType('error');
      return;
    }
  
    try {
      const response = await fetch(`https://toko.technosv.my.id/api/owner/kandang/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(kandangData)
      });
      if (!response.ok) throw new Error('Failed to update kandang data');
      setShowOverlay(true);
      setOverlayText('Data Kandang berhasil diperbarui!');
      setOverlayType('success');
      setTimeout(() => {
        router.push('/dashboard/kandang');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setShowOverlay(true);
      setOverlayText(error.toString());
      setOverlayType('error');
    }
  };
  

  const handleCancel = () => {
    router.back(); // Go back to the previous page or to a specific path
  };

  return (
    <div className="flex flex-col gap-9">
      {showOverlay && <TimedOverlay teks={overlayText} type={overlayType} onClose={() => setShowOverlay(false)} />}
      <form onSubmit={(e) => e.preventDefault()}>
        {Object.entries(kandangData).filter(([key]) => ['nama_kandang', 'id_user', 'luas_kandang', 'rehat'].includes(key)).map(([key, value]) => (
          <div key={key} className="flex flex-col mb-4">
            <label className="block text-sm font-medium text-bromo-gray-900">
              {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </label>
            {key === 'rehat' ? (
              <select
                name={key}
                value={value}
                onChange={(e) => setKandangData({...kandangData, [e.target.name]: e.target.value})}
                className="w-full rounded border focus:ring-bromo-green-500 focus:ring-1 bg-transparent px-5 py-3 outline-none transition">
                <option value="aktif">Aktif</option>
                <option value="rehat">Rehat</option>
              </select>
            ) : (
              <input
                type="text"
                name={key}
                value={value}
                onChange={(e) => setKandangData({...kandangData, [e.target.name]: e.target.value})}
                className="w-full rounded border focus:ring-bromo-green-500 focus:ring-1 bg-transparent px-5 py-3 outline-none transition"
              />
            )}
          </div>
        ))}
        <div className="flex justify-end space-x-4">
          <Button label="Simpan" onClick={handleSave} type="success" />
          <Button label="Batal" onClick={handleCancel} type="error" />
        </div>
      </form>
    </div>
  );
};

export default FormEditKandang;
