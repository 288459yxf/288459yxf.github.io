import React, { useEffect, useState } from 'react';

interface WeatherData {
  temperature: number;
  weathercode: number;
  windspeed: number;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('不支持定位');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Using Open-Meteo API (free, no key required)
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
          
          if (!res.ok) throw new Error('Network response was not ok');
          
          const data = await res.json();
          setWeather(data.current_weather);
        } catch (err) {
          console.error(err);
          setError('天气获取失败');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError('请允许位置权限');
        setLoading(false);
      }
    );
  }, []);

  const getWeatherInfo = (code: number) => {
    // WMO Weather interpretation codes
    if (code === 0) return { label: '晴朗', icon: '☀️', color: 'text-orange-500', bg: 'from-orange-50' };
    if (code >= 1 && code <= 3) return { label: '多云', icon: '⛅', color: 'text-blue-400', bg: 'from-blue-50' };
    if (code >= 45 && code <= 48) return { label: '有雾', icon: '🌫️', color: 'text-gray-400', bg: 'from-gray-50' };
    if (code >= 51 && code <= 67) return { label: '有雨', icon: '🌧️', color: 'text-blue-500', bg: 'from-blue-100' };
    if (code >= 71 && code <= 77) return { label: '下雪', icon: '❄️', color: 'text-cyan-400', bg: 'from-cyan-50' };
    if (code >= 80 && code <= 82) return { label: '阵雨', icon: '🌦️', color: 'text-blue-600', bg: 'from-indigo-50' };
    if (code >= 95 && code <= 99) return { label: '雷雨', icon: '⛈️', color: 'text-purple-500', bg: 'from-purple-50' };
    return { label: '未知', icon: '🌡️', color: 'text-warm-500', bg: 'from-warm-50' };
  };

  if (error) {
    return (
      <div className="bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl p-6 rounded-3xl border border-warm-200 dark:border-zinc-700 shadow-sm flex items-center justify-center min-h-[120px]">
        <div className="text-center">
          <span className="text-2xl mb-2 block">📍</span>
          <p className="text-warm-500 dark:text-zinc-500 text-xs font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl p-6 rounded-3xl border border-warm-200 dark:border-zinc-700 shadow-sm flex items-center justify-center min-h-[120px] animate-pulse">
        <div className="w-6 h-6 border-2 border-warm-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const info = weather ? getWeatherInfo(weather.weathercode) : { label: '--', icon: '', color: '', bg: '' };

  return (
    <div className={`bg-gradient-to-br ${info.bg} to-white dark:to-zinc-900 dark:from-zinc-800 backdrop-blur-xl p-6 rounded-3xl border border-warm-200 dark:border-zinc-700 shadow-sm relative overflow-hidden group transition-all duration-300 hover:shadow-md`}>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <div className="text-sm text-warm-500 dark:text-zinc-400 font-medium mb-1">当前天气</div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-warm-800 dark:text-warm-100">
              {weather?.temperature}
            </span>
            <span className="text-lg text-warm-600 dark:text-zinc-400">°C</span>
          </div>
          <div className={`text-sm font-medium mt-2 ${info.color} dark:text-warm-200 flex items-center gap-1`}>
            {info.label}
            <span className="text-xs opacity-60 font-normal text-warm-400 dark:text-zinc-500">
               • 风速 {weather?.windspeed} km/h
            </span>
          </div>
        </div>
        
        <div className="text-4xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300">
          {info.icon}
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-current opacity-5 rounded-full blur-2xl pointer-events-none"></div>
    </div>
  );
};

export default WeatherWidget;
