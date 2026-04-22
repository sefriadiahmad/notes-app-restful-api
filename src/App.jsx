import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Plus, Archive, FileText, LayoutGrid, LogOut, Moon, Sun, Languages } from 'lucide-react';
import NotesListPage from './pages/NotesListPage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import AddPage from './pages/AddPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import { getUserLogged, putAccessToken } from './utils/network-data.js';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext.jsx';
import { LocaleProvider, LocaleContext } from './contexts/LocaleContext.jsx';

function AppContent() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    };
    checkAuth();
  }, []);

  const onLoginSuccess = async (accessToken) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
    navigate('/');
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
    navigate('/login');
  };

  if (initializing) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-900 dark:text-white">Memuat...</div>;

  if (authedUser === null) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-white flex flex-col md:flex-row transition-colors">
      <aside className="w-full md:w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-6 md:min-h-screen flex flex-col z-10 relative">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight dark:text-white">Nootes</h1>
        </div>
        
        <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-2xl">
          <p className="text-sm font-semibold">{authedUser.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{authedUser.email}</p>
        </div>

        <nav className="flex-grow space-y-2">
          <Link to="/" className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${currentPath === '/' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
            <LayoutGrid className="w-5 h-5" /> {locale === 'id' ? 'Aktif' : 'Active'}
          </Link>
          <Link to="/archives" className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${currentPath === '/archives' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
            <Archive className="w-5 h-5" /> {locale === 'id' ? 'Arsip' : 'Archives'}
          </Link>
        </nav>

        <div className="mt-8 space-y-3">
          <div className="flex gap-2">
            <button onClick={toggleTheme} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl font-medium transition-all">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button onClick={toggleLocale} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl font-medium transition-all">
              <Languages className="w-5 h-5" /> {locale.toUpperCase()}
            </button>
          </div>
          <button onClick={() => navigate('/notes/new')} className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1">
            <Plus className="w-5 h-5" /> {locale === 'id' ? 'Buat Catatan' : 'New Note'}
          </button>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl font-medium transition-all">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-grow p-6 md:p-12 h-screen overflow-y-auto custom-scrollbar">
        <Routes>
          <Route path="/" element={<NotesListPage isArchivePage={false} />} />
          <Route path="/archives" element={<NotesListPage isArchivePage={true} />} />
          <Route path="/notes/new" element={<AddPage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LocaleProvider>
    </ThemeProvider>
  );
}