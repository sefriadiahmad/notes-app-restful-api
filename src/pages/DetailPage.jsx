import React, { useEffect, useState, useContext } from 'react';
import { ArrowLeft, Trash2, Archive, ArchiveRestore, Loader2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { showFormattedDate } from '../utils/data.js';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data.js';
import NotFoundPage from './NotFoundPage.jsx';
import { LocaleContext } from '../contexts/LocaleContext.jsx';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    const fetchNote = async () => {
      const { data } = await getNote(id);
      setNote(data);
      setIsLoading(false);
    };
    fetchNote();
  }, [id]);

  const onDeleteHandler = async () => {
    await deleteNote(id);
    navigate('/');
  };

  const onArchiveHandler = async () => {
    if (note.archived) await unarchiveNote(id);
    else await archiveNote(id);
    navigate(note.archived ? '/' : '/archives');
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-indigo-600" /></div>;
  if (!note) return <NotFoundPage />;

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => navigate('/')} className="flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 font-medium mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> {locale === 'id' ? 'Kembali' : 'Back'}
      </button>
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-700">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">{note.title}</h1>
        <p className="text-sm font-semibold tracking-widest uppercase text-slate-400 mb-10 pb-6 border-b border-slate-100 dark:border-slate-700">
          {showFormattedDate(note.createdAt)}
        </p>
        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed min-h-[200px]" dangerouslySetInnerHTML={{ __html: note.body }} />
        <div className="flex justify-end gap-4 mt-12 pt-6 border-t border-slate-100 dark:border-slate-700">
          <button onClick={onDeleteHandler} className="flex items-center px-5 py-2.5 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl font-medium transition-colors">
            <Trash2 className="w-5 h-5 mr-2" /> {locale === 'id' ? 'Hapus' : 'Delete'}
          </button>
          <button onClick={onArchiveHandler} className="flex items-center px-5 py-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl font-medium transition-colors">
            {note.archived ? <><ArchiveRestore className="w-5 h-5 mr-2" /> {locale === 'id' ? 'Batal Arsip' : 'Unarchive'}</> : <><Archive className="w-5 h-5 mr-2" /> {locale === 'id' ? 'Arsipkan' : 'Archive'}</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;