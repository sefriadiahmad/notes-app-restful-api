import React, { useContext } from 'react';
import { Search } from 'lucide-react';
import { LocaleContext } from '../contexts/LocaleContext.jsx';

const SearchBar = ({ keyword, keywordChange }) => {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="relative w-full max-w-md mb-8">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-slate-400" />
      </div>
      <input
        type="text"
        className="block w-full p-4 pl-10 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder={locale === 'id' ? 'Cari catatan...' : 'Search notes...'}
        value={keyword}
        onChange={(e) => keywordChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;