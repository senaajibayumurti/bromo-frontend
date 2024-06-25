import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TimedOverlay from '../../components/Layout/TimedOverlay';

export default function SignIn() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8080/api/register-anak-kandang', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nama_lengkap: name,
                    email: email,
                    username: username,
                    no_telepon: number,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.status === "Success") {
                setShowSuccessOverlay(true);

                setTimeout(() => {
                    router.push('/login');
                }, 2000); // Duration of overlay
            } else {
                setError(data.message || 'Sign-up failed');
            }
        } catch (error) {
            console.error('Sign-up error:', error);
            setError(error.message || 'An error occurred');
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-3/4 flex justify-center items-center bg-green-600">
                <img className="h-auto w-96 max-w-full object-center" src="/ayam.png" alt="BroMo.png" />
            </div>
            <div className="w-1/4 bg-gray-100 flex items-center justify-center px-5">
                <div className="w-full max-w-sm">
                    <div className="sm:mx-auto sm:w-full">
                        <div className="text-5xl font-bold">Sign In</div>
                        <div className="text-4xl font-medium">Selamat datang!</div>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Nama</label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="flex w-full justify-center rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-black py-4 px-4"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="flex w-full justify-center rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-black py-4 px-4"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="flex w-full justify-center rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-black py-4 px-4"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">No. Telepon</label>
                                    <div className="mt-2">
                                        <input
                                            id="number"
                                            name="number"
                                            type="tel"
                                            autoComplete="off"
                                            required
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                            className="flex w-full justify-center rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-black py-4 px-4"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="flex w-full justify-center rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-black py-4 px-4"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Konfirmasi Password</label>
                                <div className="mt-2">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="flex w-full justify-center rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-black py-4 px-4"
                                    />
                                </div>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-full bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-bromo-neutral-50 py-4 px-4">
                                    Daftar
                                </button>
                            </div>
                        </form>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Sudah punya akun?
                            <Link href="/login" className="font-semibold text-green-600 hover:text-green-500 underline"> Masuk di sini.</Link>
                        </p>
                    </div>
                </div>
            </div>
            {showSuccessOverlay && (
                <TimedOverlay
                    teks="Pendaftaran berhasil!"
                    type="success"
                    onClose={() => setShowSuccessOverlay(false)}
                />
            )}
        </div>
    );
}
