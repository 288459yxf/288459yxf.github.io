import React, { useEffect, useState } from 'react';

const ClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    const hour = new Date().getHours();
    if (hour < 6) setGreeting('夜深了，注意休息');
    else if (hour < 11) setGreeting('早安，新的一天');
    else if (hour < 14) setGreeting('午安，吃饱了吗');
    else if (hour < 18) setGreeting('下午好，喝杯茶吧');
    else setGreeting('晚上好，享受生活');

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
  };

  return (
    <div className="flex flex-col items-center justify-center mb-8 animate-fade-in">
      <div className="text-6xl md:text-8xl font-bold text-warm-500 dark:text-warm-400 tracking-tighter font-sans drop-shadow-sm select-none">
        {formatTime(time)}
      </div>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-warm-600 dark:text-warm-200 font-medium text-lg">{formatDate(time)}</span>
        <span className="w-1 h-1 bg-warm-400 rounded-full"></span>
        <span className="text-warm-500 dark:text-warm-300 italic">{greeting}</span>
      </div>
    </div>
  );
};

export default ClockWidget;