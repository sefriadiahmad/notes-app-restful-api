import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileQuestion, Loader2 } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import NoteItem from '../components/NoteItem.jsx';
import { getActiveNotes, getArchivedNotes, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data.js';

const NotesListPage = ({ isArchivePage }) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  // Fungsi untuk memuat data dari API
  const fetchNotes = async () => {
    setIsLoading(true);
    const { data } = isArchivePage ? await getArchivedNotes() : await getActiveNotes();
    if (data) setNotes(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, [isArchivePage]);

  // Handler Hapus
  const onDeleteHandler = async (id) => {
    const { error } = await deleteNote(id);
    if (!error) {
      // Update state lokal: hapus catatan dari list tanpa reload seluruhnya
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }
  };

  // Handler Arsip/Batal Arsip
  const onArchiveHandler = async (id) => {
    const { error } = isArchivePage ? await unarchiveNote(id) : await archiveNote(id);
    if (!error) {
      // Karena catatan berpindah kategori, kita hapus dari list saat ini
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }
  };

  const onKeywordChangeHandler = (newKeyword) => {
    if (newKeyword) setSearchParams({ keyword: newKeyword });
    else setSearchParams({});
  };

  const filteredNotes = notes.filter((note) => 
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isArchivePage ? 'Catatan Terarsip' : 'Catatan Aktif'}
          </h1>
        </div>
        <div className="w-full md:w-auto">
          <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
          <p className="text-slate-500">Memuat catatan...</p>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
          <FileQuestion className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Kosong</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteItem 
              key={note.id} 
              {...note} 
              onDelete={onDeleteHandler} 
              onArchive={onArchiveHandler} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesListPage;