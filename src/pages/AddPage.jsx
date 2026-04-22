import React, { useState, useContext } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import { LocaleContext } from '../contexts/LocaleContext.jsx';

const AddPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { locale } = useContext(LocaleContext);

  const onSubmitEventHandler = async (event) => {
    event.preventDefault();
    if (title.trim() && body.trim()) {
      setIsLoading(true);
      await addNote({ title, body });
      navigate('/');
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => navigate('/')} className="flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 font-medium mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> {locale === 'id' ? 'Kembali' : 'Back'}
      </button>
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">{locale === 'id' ? 'Buat Catatan Baru' : 'Create New Note'}</h1>
        <form onSubmit={onSubmitEventHandler} className="space-y-6">
          <div>
            <input type="text" placeholder={locale === 'id' ? "Judul catatan..." : "Note title..."} value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-3xl font-bold border-none outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 text-slate-900 dark:text-white bg-transparent" maxLength={50} required />
          </div>
          <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
            <div className="w-full min-h-[300px] outline-none text-lg text-slate-700 dark:text-slate-300 leading-relaxed" contentEditable onInput={(e) => setBody(e.target.innerHTML)} suppressContentEditableWarning />
          </div>
          <div className="flex justify-end pt-6">
            <button type="submit" disabled={!title.trim() || !body.trim() || isLoading} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl font-bold shadow-md transition-all">
              {isLoading ? (locale === 'id' ? 'Menyimpan...' : 'Saving...') : (locale === 'id' ? 'Simpan Catatan' : 'Save Note')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPage;