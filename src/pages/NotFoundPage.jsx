import React from 'react';
import { useNavigate } from 'react-router-dom';
  
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in duration-500">
      <div className="text-[150px] font-black text-slate-100 leading-none select-none">404</div>
      <h2 className="text-3xl font-bold text-slate-800 mt-4 mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-slate-500 mb-8 max-w-md text-center">Oops! Halaman yang Anda cari mungkin telah dihapus, diubah namanya, atau tidak pernah ada.</p>
      <button onClick={() => navigate('/')} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all">
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default NotFoundPage;
