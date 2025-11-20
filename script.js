/**
 * 刘宇的小清新导航 - 核心逻辑脚本
 * 包含：数据定义、主题切换、时间更新、天气获取、搜索功能等
 */

// =========================================
// 1. 数据配置 (在这里修改你的链接和语录)
// =========================================

const QUOTES = [
    { text: "生活原本沉闷，但跑起来就有风。", author: "刘宇" },
    { text: "满怀希望，就会所向披靡。", author: "宫崎骏" },
    { text: "且视他人之疑目如盏盏鬼火，大胆地去走你的夜路。", author: "史铁生" },
    { text: "热爱可抵岁月漫长。", author: "佚名" },
    { text: "保持热爱，奔赴山海。", author: "未知" },
];

const NAV_DATA = [
    {
        id: 'personal', title: '我的收藏', icon: '⭐',
        links: [
            { name: '搜索导航', desc: 'Bing Search', url: 'https://www.bing.com', icon: '🏠', color: 'bg-blue-100 text-blue-600' },
            { name: '代码仓库', desc: 'GitHub Profile', url: 'https://github.com', icon: '🐙', color: 'bg-gray-100 text-gray-800' },
            { name: 'Bilibili', desc: '干杯 🍻', url: 'https://www.bilibili.com/', icon: '📺', color: 'bg-pink-100 text-pink-500' },
            { name: 'QQ邮箱', desc: '邮件直达', url: 'https://wx.mail.qq.com/', icon: '✉️', color: 'bg-yellow-100 text-yellow-600' },
            { name: '图床', desc: 'Image Hosting', url: 'https://telegraph-image-eil.pages.dev/', icon: '🖼️', color: 'bg-purple-100 text-purple-600' },
            { name: 'ChatGPT', desc: 'AI 助手', url: 'https://chatgpt.com/', icon: '🤖', color: 'bg-emerald-100 text-emerald-600' },
            { name: '三国杀', desc: '烧脑益智', url: 'https://my.4399.com/yxsgs/', icon: '🃏', color: 'bg-red-100 text-red-600' },
            { name: '学习通', desc: 'Online Study', url: 'https://i.chaoxing.com/', icon: '📚', color: 'bg-indigo-100 text-indigo-600' },
        ]
    },
    {
        id: 'dev', title: '开发工具', icon: '🛠️',
        links: [
            { name: 'V2EX', desc: '创意社区', url: 'https://www.v2ex.com/', icon: '💬', color: 'bg-slate-100 text-slate-600' },
            { name: '掘金', desc: '技术社区', url: 'https://juejin.cn/', icon: '💎', color: 'bg-blue-100 text-blue-600' },
            { name: 'StackOverflow', desc: '问题解答', url: 'https://stackoverflow.com/', icon: '🧱', color: 'bg-orange-100 text-orange-600' },
            { name: 'Canva', desc: '在线设计', url: 'https://www.canva.com/', icon: '🎨', color: 'bg-cyan-100 text-cyan-600' },
        ]
    },
    {
        id: 'daily', title: '摸鱼必备', icon: '☕',
        links: [
            { name: 'YouTube', desc: '视频世界', url: 'https://www.youtube.com/', icon: '▶️', color: 'bg-red-100 text-red-600' },
            { name: '知乎', desc: '发现世界', url: 'https://www.zhihu.com/', icon: '🧠', color: 'bg-blue-100 text-blue-600' },
            { name: '微博', desc: '发现新鲜事', url: 'https://weibo.com/', icon: '👁️', color: 'bg-orange-100 text-orange-600' },
            { name: '豆瓣', desc: '电影书籍', url: 'https://www.douban.com/', icon: '🥑', color: 'bg-green-100 text-green-600' },
        ]
    }
];

// =========================================
// 2. 主题切换 Logic
// =========================================
const initTheme = () => {
    const saved = localStorage.getItem('lu_theme');
    // 如果本地存储是 dark，或者没有本地存储但系统偏好是 dark
    const isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
    updateThemeIcon(isDark);
};

const updateThemeIcon = (isDark) => {
    const icon = document.getElementById('theme-icon');
    if(icon) icon.textContent = isDark ? '☀️' : '🌙';
};

document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('lu_theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
});

// =========================================
// 3. 时钟 Logic
// =========================================
const updateClock = () => {
    const now = new Date();
    const hour = now.getHours();
    
    // 更新时间
    const timeEl = document.getElementById('clock-time');
    if(timeEl) timeEl.textContent = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    
    // 更新日期
    const dateEl = document.getElementById('clock-date');
    if(dateEl) dateEl.textContent = now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
    
    // 更新问候语
    let greet = '你好';
    if (hour < 6) greet = '夜深了，注意休息';
    else if (hour < 11) greet = '早安，新的一天';
    else if (hour < 14) greet = '午安，吃饱了吗';
    else if (hour < 18) greet = '下午好，喝杯茶吧';
    else greet = '晚上好，享受生活';
    
    const greetEl = document.getElementById('clock-greeting');
    if(greetEl) greetEl.textContent = greet;
};

// =========================================
// 4. 搜索 Logic
// =========================================
const setupSearch = () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchEngine = document.getElementById('search-engine');
    const searchIcon = document.getElementById('search-icon');

    if (!searchForm || !searchInput || !searchEngine) return;

    // 切换搜索引擎时更新图标和提示
    searchEngine.addEventListener('change', (e) => {
        const val = e.target.value;
        let placeholder = '', icon = '';
        
        if(val === 'google') { placeholder = '在 Google 中搜索...'; icon = '🌈'; }
        else if(val === 'baidu') { placeholder = '在 百度 中搜索...'; icon = '🐾'; }
        else { placeholder = '在 Bing 中搜索...'; icon = '🌊'; }
        
        searchInput.placeholder = placeholder;
        if(searchIcon) searchIcon.textContent = icon;
    });

    // 提交搜索
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if(!query) return;
        
        const engine = searchEngine.value;
        let url = '';
        if(engine === 'google') url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        else if(engine === 'baidu') url = `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`;
        else url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
        
        window.open(url, '_blank');
    });
};

// =========================================
// 5. 语录 Logic
// =========================================
let currentQuoteIndex = 0;
const setupQuotes = () => {
    const quoteCard = document.getElementById('quote-card');
    const quoteContent = document.getElementById('quote-content');
    
    if (!quoteCard || !quoteContent) return;

    const renderQuote = () => {
        // 简单的淡出淡入动画
        quoteContent.style.opacity = '0';
        quoteContent.style.transform = 'translateY(5px)';
        
        setTimeout(() => {
            let newIndex = Math.floor(Math.random() * QUOTES.length);
            // 避免连续重复
            while(newIndex === currentQuoteIndex && QUOTES.length > 1) {
                newIndex = Math.floor(Math.random() * QUOTES.length);
            }
            currentQuoteIndex = newIndex;
            
            document.getElementById('quote-text').textContent = `"${QUOTES[newIndex].text}"`;
            document.getElementById('quote-author').textContent = QUOTES[newIndex].author;
            
            quoteContent.style.opacity = '1';
            quoteContent.style.transform = 'translateY(0)';
        }, 300);
    };

    quoteCard.addEventListener('click', renderQuote);
    renderQuote(); // 初始化加载一条
};

// =========================================
// 6. 天气 Logic (Geolocation + Open-Meteo API)
// =========================================
const setupWeather = () => {
    const weatherCard = document.getElementById('weather-card');
    const loadingEl = document.getElementById('weather-loading');
    const contentEl = document.getElementById('weather-content');
    const errorEl = document.getElementById('weather-error');

    const showWeatherError = () => {
        if(loadingEl) loadingEl.classList.add('hidden');
        if(errorEl) errorEl.classList.remove('hidden');
        if(contentEl) contentEl.classList.add('hidden');
    };

    const initWeather = () => {
        if(!navigator.geolocation) {
            showWeatherError();
            return;
        }
        
        // 重新显示 loading
        if(errorEl) errorEl.classList.add('hidden');
        if(loadingEl) loadingEl.classList.remove('hidden');

        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const { latitude, longitude } = pos.coords;
                // 使用 Open-Meteo 免费 API
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                if(!res.ok) throw new Error('API Error');
                const data = await res.json();
                renderWeather(data.current_weather);
            } catch(e) {
                console.error("Weather Error:", e);
                showWeatherError();
            }
        }, (err) => {
            console.warn("Geolocation Error:", err);
            showWeatherError();
        });
    };

    const renderWeather = (data) => {
        const code = data.weathercode;
        let label = '未知', icon = '🌡️', colorClass = 'text-warm-500';
        
        // 简单的 WMO code 映射
        if (code === 0) { label = '晴朗'; icon = '☀️'; colorClass = 'text-orange-500'; }
        else if (code <= 3) { label = '多云'; icon = '⛅'; colorClass = 'text-blue-400'; }
        else if (code <= 48) { label = '有雾'; icon = '🌫️'; colorClass = 'text-gray-400'; }
        else if (code <= 67) { label = '有雨'; icon = '🌧️'; colorClass = 'text-blue-500'; }
        else if (code <= 77) { label = '下雪'; icon = '❄️'; colorClass = 'text-cyan-400'; }
        else if (code <= 82) { label = '阵雨'; icon = '🌦️'; colorClass = 'text-blue-600'; }
        else if (code <= 99) { label = '雷雨'; icon = '⛈️'; colorClass = 'text-purple-500'; }

        document.getElementById('weather-temp').textContent = data.temperature;
        document.getElementById('weather-desc').innerHTML = `<span class="${colorClass}">${label}</span> <span class="text-xs opacity-60 ml-1">• 风速 ${data.windspeed}</span>`;
        document.getElementById('weather-icon').textContent = icon;
        
        if(loadingEl) loadingEl.classList.add('hidden');
        if(contentEl) {
            contentEl.classList.remove('hidden');
            contentEl.classList.add('flex'); // 确保是 flex 布局
        }
    };

    // 点击卡片重试
    if(weatherCard) {
        weatherCard.addEventListener('click', () => {
            // 只有在报错状态下才重试
            if(!errorEl.classList.contains('hidden')) {
                 initWeather();
            }
        });
    }

    initWeather();
};

// =========================================
// 7. 动态渲染链接列表
// =========================================
const renderLinks = () => {
    const linksContainer = document.getElementById('links-container');
    if(!linksContainer) return;

    NAV_DATA.forEach(category => {
        const section = document.createElement('section');
        section.className = 'animate-fade-in'; // 添加淡入动画类
        
        let linksHtml = '';
        category.links.forEach(link => {
            linksHtml += `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
                   class="group flex flex-col gap-3 p-4 glass-panel hover-card-effect rounded-3xl border-opacity-50 dark:border-opacity-20 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                    <div class="flex items-start justify-between">
                        <div class="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-sm ${link.color}">
                            ${link.icon}
                        </div>
                        <span class="opacity-0 group-hover:opacity-100 transition-opacity text-warm-400">↗</span>
                    </div>
                    <div>
                        <h3 class="font-bold text-warm-900 dark:text-zinc-100 text-sm">${link.name}</h3>
                        <p class="text-xs text-warm-500 dark:text-zinc-500 mt-1 truncate">${link.desc}</p>
                    </div>
                </a>
            `;
        });

        section.innerHTML = `
            <h2 class="text-lg font-bold text-warm-700 dark:text-warm-300 mb-4 flex items-center gap-2 ml-1">
                <span class="bg-warm-200 dark:bg-zinc-700 w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-inner">
                    ${category.icon}
                </span>
                ${category.title}
            </h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                ${linksHtml}
            </div>
        `;
        linksContainer.appendChild(section);
    });
};

// =========================================
// 8. 背景交互 (鼠标移动时背景光球移动)
// =========================================
const setupBackgroundEffect = () => {
    const blob1 = document.getElementById('blob1');
    const blob2 = document.getElementById('blob2');
    const blob3 = document.getElementById('blob3');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);
        
        requestAnimationFrame(() => {
            if(blob1) blob1.style.transform = `translate(${x * -40}px, ${y * -40}px)`;
            if(blob2) blob2.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
            if(blob3) blob3.style.transform = `translate(-50%, -50%) translate(${x * -20}px, ${y * -20}px)`;
        });
    });
};

// =========================================
// 初始化所有功能
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupSearch();
    setupQuotes();
    setupWeather();
    renderLinks();
    setupBackgroundEffect();
    
    // 启动时钟并每秒更新
    setInterval(updateClock, 1000);
    updateClock();
    
    // 设置页脚年份
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();
});
