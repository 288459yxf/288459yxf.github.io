import React, { useState, useEffect } from 'react';
import { QUOTES } from '../constants';
import { Quote } from '../types';

const QuoteCard: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote>(QUOTES[0]);
  const [animate, setAnimate] = useState(false);

  const getRandomQuote = () => {
    setAnimate(true);
    setTimeout(() => {
      let randomIndex = Math.floor(Math.random() * QUOTES.length);
      // Ensure we don't get the same quote twice in a row immediately
      while (QUOTES[randomIndex].text === currentQuote.text && QUOTES.length > 1) {
        randomIndex = Math.floor(Math.random() * QUOTES.length);
      }
      setCurrentQuote(QUOTES[randomIndex]);
      setAnimate(false);
    }, 300);
  };

  useEffect(() => {
    getRandomQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div 
      onClick={getRandomQuote}
      className="cursor-pointer group relative overflow-hidden bg-gradient-to-br from-warm-100 to-white dark:from-zinc-800 dark:to-zinc-900 p-6 rounded-3xl border border-warm-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 select-none"
    >
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-warm-400">
          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 16.6569 20.6739 18 19.017 18H16.017C15.4647 18 15.017 18.4477 15.017 19V21L14.017 21ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 16.6569 11.6735 18 10.0166 18H7.0166C6.46432 18 6.0166 18.4477 6.0166 19V21L5.0166 21Z" />
        </svg>
      </div>
      
      <div className={`transition-opacity duration-300 ${animate ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
        <p className="text-lg md:text-xl font-medium text-warm-900 dark:text-warm-50 font-serif leading-relaxed">
          "{currentQuote.text}"
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-px w-8 bg-warm-400"></span>
          <p className="text-sm text-warm-500 dark:text-warm-400">{currentQuote.author}</p>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-warm-400 dark:text-zinc-500 flex items-center gap-1">
        <span className="animate-pulse">●</span> 点击卡片切换语录
      </div>
    </div>
  );
};

export default QuoteCard;