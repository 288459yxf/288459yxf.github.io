import React, { useState } from 'react';
import { SearchEngine } from '../types';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [engine, setEngine] = useState<SearchEngine>('bing');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    let url = '';
    switch (engine) {
      case 'google':
        url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        break;
      case 'baidu':
        url = `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`;
        break;
      case 'bing':
      default:
        url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
        break;
    }
    window.open(url, '_blank');
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
           <span className="text-2xl filter drop-shadow-sm">
             {engine === 'google' ? '🌈' : engine === 'baidu' ? '🐾' : '🌊'}
           </span>
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={`在 ${engine === 'google' ? 'Google' : engine === 'baidu' ? '百度' : 'Bing'} 中搜索...`}
          className="w-full py-4 pl-14 pr-32 text-gray-700 bg-white/80 dark:bg-zinc-800/80 dark:text-white backdrop-blur-md border-2 border-warm-200 dark:border-zinc-700 rounded-full shadow-lg focus:outline-none focus:border-warm-400 dark:focus:border-warm-500 focus:shadow-xl transition-all placeholder-warm-400 dark:placeholder-zinc-500"
        />
        
        <div className="absolute inset-y-0 right-2 flex items-center gap-1">
          <select
            value={engine}
            onChange={(e) => setEngine(e.target.value as SearchEngine)}
            className="h-10 px-2 bg-transparent text-sm text-warm-600 dark:text-warm-300 font-medium focus:outline-none cursor-pointer hover:bg-warm-100 dark:hover:bg-zinc-700 rounded-lg transition-colors appearance-none text-center"
            style={{ textAlignLast: 'center' }}
          >
            <option value="bing">Bing</option>
            <option value="google">Google</option>
            <option value="baidu">Baidu</option>
          </select>
          
          <button
            type="submit"
            className="h-10 w-10 bg-warm-500 hover:bg-warm-600 text-white rounded-full flex items-center justify-center shadow-md transition-transform active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;