import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://toko.technosv.my.id/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.ok) {
                // Simpan token ke localStorage
                localStorage.setItem('accessToken', data.token);

                // Redirect ke halaman dashboard atau halaman yang diinginkan setelah login berhasil
                router.push('/dashboard/');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred');
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-3/4 flex justify-center items-center bg-green-600">
                <img className="h-full w-full max-w-full object-cover" src="" alt="BroMo.png" />
            </div>
            <div className="w-1/4 bg-gray-100 flex items-center justify-center px-10">
                <div className="w-full max-w-xl">
                    <div className="sm:mx-auto sm:w-full">
                        <div className="text-5xl font-bold">Log In</div>
                        <div className="text-4xl font-medium">Welcome back</div>
                    </div>
                    <div className="mt-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
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
                            {error && <p className="text-red-500">{error}</p>}
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-full bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-white py-4 px-4">
                                    Log In
                                </button>
                            </div>
                        </form>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Don't have an account yet?
                            <a href="#" className="font-semibold text-green-600 hover:text-green-500 underline"> Sign up here.</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
