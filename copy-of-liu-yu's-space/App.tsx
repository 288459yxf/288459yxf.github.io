import React, { useState, useEffect } from 'react';
import { NAV_DATA } from './constants';
import SearchBar from './components/SearchBar';
import ClockWidget from './components/ClockWidget';
import QuoteCard from './components/QuoteCard';
import WeatherWidget from './components/WeatherWidget';
import BackgroundEffect from './components/BackgroundEffect';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Check local storage or system preference for theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('lu_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lu_theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lu_theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-8 flex flex-col items-center relative overflow-hidden">
      {/* Interactive Background */}
      <BackgroundEffect />

      {/* Main Container */}
      <main className="w-full max-w-5xl flex flex-col gap-8 z-10">
        
        {/* Header Section */}
        <header className="flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-warm-400 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <img 
                src="https://ts3.tc.mm.bing.net/th/id/OIP-C.R86aJ5pc3Fu1oGj9boecuAAAAA?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3" 
                alt="Avatar" 
                className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-white dark:border-zinc-800 object-cover shadow-md transition-transform duration-300 group-hover:rotate-6"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-warm-900 dark:text-warm-100">我叫刘宇 ✿</h1>
              <p className="text-sm md:text-base text-warm-500 dark:text-warm-400">做点小美好 · 保持好奇心</p>
            </div>
          </div>

          <button 
            onClick={toggleTheme}
            className="group p-3 rounded-2xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-warm-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all active:scale-95"
            aria-label="Toggle Theme"
          >
            <span className="text-xl group-hover:rotate-12 transition-transform block">
              {darkMode ? '☀️' : '🌙'}
            </span>
          </button>
        </header>

        {/* Hero Section: Clock & Search */}
        <section className="flex flex-col items-center gap-8 py-8 md:py-12 animate-fade-in">
          <ClockWidget />
          <SearchBar />
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Widgets) */}
          <div className="lg:col-span-1 flex flex-col gap-6 order-2 lg:order-1">
            <QuoteCard />
            <WeatherWidget />
            
            {/* About Widget */}
            <div className="bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl p-6 rounded-3xl border border-warm-200 dark:border-zinc-700 shadow-sm">
               <h3 className="text-lg font-bold mb-3 text-warm-800 dark:text-warm-200 flex items-center gap-2">
                 <span>👋</span> 关于我
               </h3>
               <p className="text-sm text-warm-600 dark:text-zinc-400 leading-relaxed">
                 欢迎来到我的个人空间。这里收藏了我常用的网站和工具，同时也记录着生活中的点滴灵感。希望这个简洁温暖的界面能给你带来好心情。
               </p>
               <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 bg-nature-100 dark:bg-nature-500/20 text-nature-600 dark:text-nature-100 text-xs rounded-full font-medium">
                    Frontend
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-100 text-xs rounded-full font-medium">
                    Design
                  </span>
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-100 text-xs rounded-full font-medium">
                    Life
                  </span>
               </div>
            </div>
          </div>

          {/* Right Column (Links) */}
          <div className="lg:col-span-2 flex flex-col gap-8 order-1 lg:order-2">
            {NAV_DATA.map((category) => (
              <section key={category.id} className="animate-fade-in">
                <h2 className="text-lg font-bold text-warm-700 dark:text-warm-300 mb-4 flex items-center gap-2 ml-1">
                  <span className="bg-warm-200 dark:bg-zinc-700 w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-inner">
                    {category.icon}
                  </span>
                  {category.title}
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {category.links.map((link) => (
                    <a 
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-3 p-4 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-md rounded-3xl border border-warm-100 dark:border-zinc-700 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:scale-[1.02] transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-sm ${link.color || 'bg-gray-100'}`}>
                          {link.icon}
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-warm-400">
                          ↗
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-warm-900 dark:text-zinc-100 text-sm">{link.name}</h3>
                        <p className="text-xs text-warm-500 dark:text-zinc-500 mt-1 truncate">{link.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <footer className="py-8 text-center">
           <div className="w-12 h-1 bg-warm-200 dark:bg-zinc-700 mx-auto rounded-full mb-4"></div>
           <p className="text-warm-500 dark:text-zinc-500 text-sm">
             © {new Date().getFullYear()} 刘宇 · Design with ❤️ and React
           </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
