import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../utils/network-data';

const LoginPage = ({ loginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data.accessToken);
    } else {
      alert('Login gagal. Periksa email dan password Anda.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg w-full max-w-md border border-slate-100 dark:border-slate-700">
        <h2 className="text-3xl font-black mb-6 text-slate-800 dark:text-white">Selamat Datang, Kembali</h2>
        <p className="mb-6 text-slate-500 dark:text-slate-400">Masukkan email dan password untuk masuk ke akun Anda.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-indigo-500" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-indigo-500" required />
          <button type="submit" disabled={isLoading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all disabled:opacity-50">
            {isLoading ? 'Memuat...' : 'Masuk'}
          </button>
        </form>
        <p className="mt-6 text-center text-slate-500 dark:text-slate-400">Belum punya akun? <Link to="/register" className="text-indigo-600 hover:underline">Daftar di sini</Link></p>
      </div>
    </div>
  );
};
export default LoginPage;