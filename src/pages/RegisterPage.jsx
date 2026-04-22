import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/network-data';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert('Password tidak cocok');
    setIsLoading(true);
    const { error } = await register({ name, email, password });
    if (!error) {
      navigate('/login');
    } else {
      alert('Registrasi gagal');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg w-full max-w-md border border-slate-100 dark:border-slate-700">
        <h2 className="text-3xl font-black mb-6 text-slate-800 dark:text-white">Daftarkan Akun Anda</h2>
        <p className="mb-6 text-slate-500 dark:text-slate-400">Lengkapi formulir di bawah ini untuk membuat akun baru.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input type="text" placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-indigo-500" required />
          <input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-indigo-500" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-indigo-500" required />
          <input type="password" placeholder="Konfirmasi Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:border-indigo-500" required />
          <button type="submit" disabled={isLoading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all disabled:opacity-50">
            {isLoading ? 'Memuat...' : 'Daftar'}
          </button>
        </form>
        <p className="mt-6 text-center text-slate-500 dark:text-slate-400">Sudah punya akun? <Link to="/login" className="text-indigo-600 hover:underline">Masuk di sini</Link></p>
      </div>
    </div>
  );
};
export default RegisterPage;