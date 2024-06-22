import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

const getSummaryDetails = (suhu, kelembaban, amonia) => {
    if (!suhu && !kelembaban && !amonia) {
        return {
            judul: 'Data Kosong',
            ringkasan: 'Data suhu, kelembaban, dan amonia kosong.'
        };
    }

    let judul = 'Aman';
    let ringkasanParts = [];

    if (suhu >= 21 && suhu < 25) {
        ringkasanParts.push('Suhu dalam keadaan waspada, masih ideal namun hampir keluar batas aman. ');
    } else if (suhu < 21 || suhu > 35) {
        ringkasanParts.push('Suhu dalam batas berbahaya. ');
    } else if (suhu > 32 && suhu <= 35) {
        ringkasanParts.push('Suhu dalam keadaan waspada, masih ideal namun hampir keluar batas aman. ');
    }

    if (kelembaban >= 55 && kelembaban < 60) {
        ringkasanParts.push('Kelembaban dalam keadaan waspada, masih ideal namun hampir keluar batas aman. ');
    } else if (kelembaban < 55 || kelembaban > 75) {
        ringkasanParts.push('Kelembaban dalam batas berbahaya. ');
    } else if (kelembaban > 70 && kelembaban <= 75) {
        ringkasanParts.push('Kelembaban dalam keadaan waspada, masih ideal namun hampir keluar batas aman. ');
    }

    if (amonia > 25 && amonia <= 35) {
        ringkasanParts.push('Amonia dalam keadaan waspada, masih ideal namun hampir keluar batas aman. ');
    } else if (amonia > 35) {
        ringkasanParts.push('Amonia dalam batas berbahaya. ');
    }

    if (ringkasanParts.length === 0) {
        ringkasanParts.push('Semua kondisi berada dalam batas aman.');
    }

    if (ringkasanParts.some(part => part.includes('berbahaya'))) {
        judul = 'Berbahaya';
    } else if (ringkasanParts.some(part => part.includes('waspada'))) {
        judul = 'Waspada';
    }

    if (
        (suhu < 21 || suhu > 35) &&
        (kelembaban < 55 || kelembaban > 75) &&
        amonia > 35
    ) {
        judul = 'Perlu Tindakan Segera';
        ringkasanParts = ['Semua parameter kandang berada pada tingkat berbahaya. Tindakan segera diperlukan untuk mengembalikan kondisi ke tingkat aman.'];
    }

    return { judul, ringkasan: ringkasanParts.join(' ') };
};

const Summary = ({ idKandang }) => {
    const [data, setData] = useState({
        suhu: '',
        kelembaban: '',
        amonia: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!idKandang) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(false);

                const token = localStorage.getItem('accessToken');
                if (!token) {
                    throw new Error('User is not authenticated');
                }

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                };

                const [suhuResponse, amoniaResponse] = await Promise.all([
                    fetch(`https://toko.technosv.my.id/api/sensor-suhu-kelembaban/${idKandang}`, { headers }),
                    fetch(`https://toko.technosv.my.id/api/sensor-amoniak/${idKandang}`, { headers })
                ]);

                if (!suhuResponse.ok || !amoniaResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const suhuData = await suhuResponse.json();
                const amoniaData = await amoniaResponse.json();

                setData({
                    suhu: suhuData.data?.suhu ?? '',
                    kelembaban: suhuData.data?.kelembaban ?? '',
                    amonia: amoniaData.data.length > 0 ? amoniaData.data[0].amoniak : '',
                });

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false);
                setError(true);
            }
        };

        fetchData();
    }, [idKandang]);

    let judul = '-';
    let ringkasan = '-';

    if (!loading && !error) {
        const summary = getSummaryDetails(data.suhu, data.kelembaban, data.amonia);
        judul = summary.judul;
        ringkasan = summary.ringkasan;
    }

    let borderColor = 'border-bromo-neutral-500';
    let bgColor = 'bg-bromo-neutral-100';
    let textColor = 'text-bromo-neutral-700';

    if (!loading && !error) {
        if (judul === 'Aman') {
            borderColor = 'border-bromo-green-500';
            bgColor = 'bg-bromo-green-100';
            textColor = 'text-bromo-green-700';
        } else if (judul === 'Waspada') {
            borderColor = 'border-bromo-info-500';
            bgColor = 'bg-bromo-info-100';
            textColor = 'text-bromo-info-700';
        } else if (judul === 'Berbahaya') {
            borderColor = 'border-bromo-error-500';
            bgColor = 'bg-bromo-error-100';
            textColor = 'text-bromo-error-700';
        } else if (judul === 'Perlu Tindakan Segera') {
            borderColor = 'border-bromo-red-600';
            bgColor = 'bg-bromo-red-200';
            textColor = 'text-bromo-red-800';
        } else if (judul === 'Data Kosong') {
            borderColor = 'border-bromo-neutral-500';
            bgColor = 'bg-bromo-neutral-100';
            textColor = 'text-bromo-neutral-700';
        }
    }

    return (
        <div className={`w-64 h-full px-4 py-3 rounded-md border-2 ${borderColor} ${bgColor} ${textColor}`}>
            <div className='flex flex-row space-x-4 items-start font-semibold'>
                <FontAwesomeIcon icon={faWarning} size='3x'/>
                <p className="m-auto text-xl">{judul}</p>
            </div>
            <hr className={`my-2 ${textColor}`} />
            <p className='text-justify font-medium'>
                {ringkasan}
            </p>
        </div>
    );
};

export default Summary;
