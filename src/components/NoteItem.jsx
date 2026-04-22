import React from 'react';
import { Archive, ArchiveRestore, Trash2 } from 'lucide-react';
import { showFormattedDate } from '../utils/data.js';
import { useNavigate } from 'react-router-dom';

const NoteItem = ({ id, title, createdAt, body, archived, onDelete, onArchive }) => {
  const navigate = useNavigate();
  
  const onDeleteClick = (e) => {
    e.stopPropagation(); // Mencegah pindah ke halaman detail
    onDelete(id);
  };

  const onArchiveClick = (e) => {
    e.stopPropagation(); // Mencegah pindah ke halaman detail
    onArchive(id);
  };

  return (
    <div 
      className="group flex flex-col justify-between bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/notes/${id}`)}
    >
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium tracking-wide uppercase">
          {showFormattedDate(createdAt)}
        </p>
        <div 
          className="text-slate-600 dark:text-slate-300 text-sm line-clamp-4 prose prose-sm dark:prose-invert" 
          dangerouslySetInnerHTML={{ __html: body }} 
        />
      </div>
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button 
          onClick={onDeleteClick} 
          className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-colors" 
          title="Hapus"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button 
          onClick={onArchiveClick} 
          className="p-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-colors" 
          title={archived ? "Pindahkan dari Arsip" : "Arsipkan"}
        >
          {archived ? <ArchiveRestore className="w-5 h-5" /> : <Archive className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default NoteItem;