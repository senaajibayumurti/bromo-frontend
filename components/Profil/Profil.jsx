import { useState, useEffect } from 'react';

const PageProfil = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Ambil token dari localStorage
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    throw new Error('User is not authenticated');
                }

                // Ambil ID pengguna dari localStorage setelah login
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID is not available');
                }

                // Cetak token dan userId ke konsol
                console.log('Token:', token);
                console.log('UserID:', userId);

                const response = await fetch(`https://toko.technosv.my.id/api/user/${userId}`, {
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

                const data = await response.json();
                console.log('Received user data:', data); // Log data yang diterima dari API
                setUserData(data.data); // Sesuaikan dengan struktur data yang diterima
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching user data: ", error);
                setError(error.message);
                setLoading(false); // Set loading to false if there's an error
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <p className="text-red-500">Error: {error}</p>; // Display error message if fetching fails
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4">Profil Pengguna</h1>
            <div className="flex flex-col">
                <div className="mb-4">
                    <label className="font-medium">Nama Lengkap:</label>
                    <p>{userData.nama_lengkap || '-'}</p> {/* Sesuaikan nama properti */}
                </div>
                <div className="mb-4">
                    <label className="font-medium">Username:</label>
                    <p>{userData.username || '-'}</p>
                </div>
                <div className="mb-4">
                    <label className="font-medium">Email:</label>
                    <p>{userData.email || '-'}</p>
                </div>
                <div className="mb-4">
                    <label className="font-medium">No Telepon:</label>
                    <p>{userData.no_telepon || '-'}</p>
                </div>
            </div>
        </div>
    );
};

export default PageProfil;
