import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Info,
  ScrollText,
  Moon,
  Sun
} from 'lucide-react';
import { getLunarDateInfo, getMonthDays } from './lib/lunarUtils.ts';
import { CHINESE_ZODIAC, PROVERBS, FESTIVALS } from './constants.ts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showZodiacModal, setShowZodiacModal] = useState(false);
  const [userBirthYear, setUserBirthYear] = useState(new Date().getFullYear());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const days = useMemo(() => getMonthDays(year, month), [year, month]);
  const monthNameEn = currentDate.toLocaleString('it-IT', { month: 'long' });
  const selectedLunarInfo = useMemo(() => 
    selectedDate ? getLunarDateInfo(selectedDate) : null, 
    [selectedDate]
  );

  const proverb = useMemo(() => PROVERBS[Math.floor(currentDate.getTime() / (1000 * 60 * 60 * 24)) % PROVERBS.length], [currentDate]);

  const userZodiac = useMemo(() => {
    return CHINESE_ZODIAC.find(z => z.years.includes(userBirthYear)) || 
           CHINESE_ZODIAC[(userBirthYear - 1924) % 12];
  }, [userBirthYear]);

  const nextMonth = () => setCurrentDate(new Date(year, month, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 2, 1));

  return (
    <div className="min-h-screen bg-trad-red p-0 sm:p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-[1200px] bold-border bg-trad-paper flex flex-col shadow-2xl relative overflow-hidden font-serif text-trad-ink">
        
        {/* HEADER SECTION - AUTHENTIC ORIENTAL STYLE */}
        <header className="bg-trad-red text-trad-gold p-6 flex flex-col sm:flex-row justify-between items-center sm:items-center border-b-4 border-trad-dark-red">
          <div className="flex items-center gap-6 mb-4 sm:mb-0">
            <div className="text-6xl sm:text-8xl font-black font-calligraphy leading-none flex flex-col items-center">
              <span>{userZodiac.hanzi}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl sm:text-5xl font-black tracking-widest">{selectedLunarInfo?.yearGanZhi}</span>
              <span className="text-sm font-sans font-bold opacity-80 mt-1 uppercase tracking-[0.3em]">Anno {selectedLunarInfo?.yearShengXiao} · {year}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center sm:items-end">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl sm:text-8xl font-black leading-none font-calligraphy">
                {selectedLunarInfo?.monthInChinese || '月'}
              </span>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] opacity-70 mt-2">Mese Lunare · {monthNameEn}</span>
          </div>
        </header>

        {/* MAIN BODY - VERTICAL RHYTHM */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
          
          {/* LEFT SIDEBAR - ZODIAC & ASTROLOGY */}
          <div className="col-span-1 lg:col-span-2 border-b lg:border-b-0 lg:border-r-2 border-trad-red p-6 flex flex-col bg-trad-paper/80 items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-trad-red border-b border-trad-red pb-1 mb-6 rotate-0 lg:rotate-90 lg:my-8 lg:w-32 text-center whitespace-nowrap">十二生肖</h3>
            
            <div className="bg-white/40 p-4 border-2 border-trad-red/20 rounded shadow-sm flex flex-col items-center text-center w-full">
              <p className="text-6xl mb-2 drop-shadow-sm">
                {['🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐐', '🐒', '🐓', '🐕', '🐖'][CHINESE_ZODIAC.indexOf(userZodiac)]}
              </p>
              <h4 className="font-black text-3xl font-calligraphy mb-1 text-trad-red">{userZodiac.hanzi}</h4>
              <p className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60">{userZodiac.name}</p>
              
              <div className="text-xs leading-relaxed italic mb-6 opacity-80 border-t border-trad-red/10 pt-4">
                <p className="font-bold mb-1">Elemento {userZodiac.elementHanzi}</p>
                {userZodiac.trait}
              </div>
              
              <button 
                onClick={() => setShowZodiacModal(true)}
                className="w-full py-3 bg-trad-red text-trad-gold text-[10px] font-black uppercase tracking-widest hover:bg-trad-dark-red transition-all shadow-[4px_4px_0px_rgba(139,26,26,1)]"
              >
                Scopri
              </button>
            </div>

            <div className="mt-auto hidden lg:flex flex-col items-center gap-6 py-8">
              <div className="flex flex-col items-center gap-1 opacity-20">
                <span className="font-calligraphy text-2xl">天</span>
                <span className="font-calligraphy text-2xl">地</span>
                <span className="font-calligraphy text-2xl">人</span>
              </div>
            </div>
          </div>

          {/* CENTER - THE ACTUAL CALENDAR PAGE */}
          <div className="col-span-1 lg:col-span-7 flex flex-col items-center p-4 sm:p-10 relative bg-white/20">
            {/* Background Seal */}
            <div className="absolute top-10 right-10 w-24 h-24 border-4 border-trad-red/20 flex items-center justify-center rotate-12 pointer-events-none">
              <span className="text-4xl text-trad-red/20 font-calligraphy">萬年</span>
            </div>
            
            <div className="z-10 w-full max-w-2xl">
              <div className="grid grid-cols-7 mb-8 gap-0">
                {['日', '一', '二', '三', '四', '五', '六'].map((d, i) => (
                  <div key={d} className="flex flex-col items-center">
                    <span className={cn(
                      "text-xl font-black font-calligraphy mb-1",
                      i === 0 || i === 6 ? "text-trad-red" : "text-trad-ink opacity-80"
                    )}>
                      {d}
                    </span>
                    <span className="text-[8px] font-black opacity-30 uppercase tracking-tighter">
                      {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'][i]}
                    </span>
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${year}-${month}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-7 gap-px bg-trad-red/10 p-px"
                >
                  {days.map((date, i) => {
                    if (!date) return <div key={`empty-${i}`} className="aspect-square bg-trad-paper/30"></div>;
                    
                    const isToday = new Date().toDateString() === date.toDateString();
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    const lunar = getLunarDateInfo(date);
                    const isLunarSpecial = lunar.festivals.length > 0 || lunar.solarTerm;

                    return (
                      <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          "group relative aspect-square transition-all flex flex-col items-center justify-center overflow-hidden bg-trad-paper",
                          isSelected 
                            ? "bg-trad-red text-trad-gold z-10" 
                            : "hover:bg-trad-red/5",
                          isToday && !isSelected && "ring-inset ring-2 ring-trad-red"
                        )}
                      >
                        <span className="text-2xl sm:text-3xl font-black leading-none mb-1">
                          {date.getDate()}
                        </span>
                        <span className={cn(
                          "text-[9px] font-black tracking-tight",
                          isSelected ? "text-trad-gold/80" : (isLunarSpecial ? "text-trad-red" : "text-trad-ink/40")
                        )}>
                          {lunar.dayInChinese}
                        </span>
                        {isLunarSpecial && !isSelected && (
                          <div className="absolute top-1 right-1 w-1 h-1 bg-trad-red rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls in a Traditional Box */}
              <div className="mt-12 flex justify-between items-center bg-trad-paper border-2 border-trad-red p-4 shadow-[8px_8px_0px_rgba(185,28,28,1)]">
                <button onClick={prevMonth} className="p-3 hover:text-trad-red transition-colors">
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <div className="text-center">
                  <p className="font-calligraphy text-2xl text-trad-red">{year}年</p>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Controllo Tempo</p>
                </div>
                <button onClick={nextMonth} className="p-3 hover:text-trad-red transition-colors">
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR - FESTIVALS & RITUALS */}
          <div className="col-span-1 lg:col-span-3 border-t lg:border-t-0 lg:border-l-2 border-trad-red p-6 flex flex-col bg-trad-alt-paper shadow-inner">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-trad-red border-b border-trad-red pb-1 mb-8">吉日良辰</h3>
            
            <div className="flex-1 space-y-10">
              <section>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-calligraphy text-trad-red">节</span>
                  <p className="text-xs font-black uppercase tracking-widest opacity-50">Festività</p>
                </div>
                <ul className="space-y-6">
                  {selectedLunarInfo?.festivals.length ? (
                    selectedLunarInfo.festivals.map(f => (
                      <li key={f} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-trad-red before:rotate-45">
                        <span className="text-lg font-black text-trad-ink leading-tight block">{f}</span>
                        <span className="text-[10px] font-serif italic text-trad-red/70 mt-1 block">Rito Lunare</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm opacity-40 italic font-serif">Nessun rito oggi.</li>
                  )}
                </ul>
              </section>

              <section>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-calligraphy text-trad-red">宜</span>
                  <p className="text-xs font-black uppercase tracking-widest opacity-50">Consigli</p>
                </div>
                <div className="bg-white/50 p-4 border border-trad-red/10 text-sm font-medium leading-relaxed italic">
                  {selectedLunarInfo?.dayNum % 2 === 0 ? 
                    "Pianificare e riflettere." : 
                    "Agire e viaggiare."}
                </div>
              </section>

              <section>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-calligraphy text-trad-red">象</span>
                  <p className="text-xs font-black uppercase tracking-widest opacity-50">Cielo</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-trad-red flex items-center justify-center transform rotate-45 shadow-lg">
                    <Moon className="w-6 h-6 text-trad-gold -rotate-45" />
                  </div>
                  <div>
                    <p className="font-black text-xs uppercase tracking-tighter">Fase</p>
                    <p className="text-2xl font-calligraphy">{selectedLunarInfo?.dayNum}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* FOOTER - THE PROVERB IN CHINESE STYLE */}
        <footer className="p-10 bg-trad-ink text-trad-paper border-t-[10px] border-trad-gold flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] flex items-center justify-center pointer-events-none">
            <span className="text-[150px] font-black">智</span>
          </div>
          
          <div className="text-6xl font-calligraphy text-trad-gold drop-shadow-lg shrink-0">谚语</div>
          
          <div className="flex flex-col flex-1 text-center md:text-left z-10">
            <p className="text-2xl sm:text-3xl leading-relaxed font-serif italic text-white/90 font-medium">
              “{proverb}”
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-4 opacity-50">
              <div className="h-px w-8 bg-trad-gold"></div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-trad-gold">Saggezze Millenarie</span>
              <div className="h-px w-8 bg-trad-gold"></div>
            </div>
          </div>
          
          <div className="shrink-0 text-center md:text-right flex flex-col items-center md:items-end">
            <div className="w-16 h-16 border-2 border-trad-gold/40 flex items-center justify-center mb-2">
              <span className="text-2xl font-calligraphy text-trad-gold">中</span>
            </div>
            <span className="text-[10px] opacity-40 uppercase tracking-[0.2em]">Pechino</span>
          </div>
        </footer>
      </div>

      {/* Zodiac Modal - Rededigned to match bold theme */}
      <AnimatePresence>
        {showZodiacModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowZodiacModal(false)}
              className="absolute inset-0 bg-trad-ink/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-trad-paper w-full max-w-lg border-[12px] border-trad-red shadow-2xl relative z-10"
            >
              <div className="bg-trad-red p-8 text-trad-gold text-center border-b-[8px] border-trad-dark-red">
                <h3 className="text-4xl font-black mb-2 uppercase">Destino Lunare</h3>
                <p className="font-serif italic opacity-80">Trova il tuo segno zodiacale</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex flex-col items-center">
                  <input 
                    type="number" 
                    value={userBirthYear}
                    onChange={(e) => setUserBirthYear(parseInt(e.target.value) || 2024)}
                    className="text-6xl font-sans font-black text-center w-48 border-b-4 border-trad-red focus:outline-none bg-transparent py-2 text-trad-red"
                    min="1920"
                    max="2030"
                  />
                  <p className="text-[10px] mt-2 text-trad-red uppercase tracking-[0.3em] font-black">Anno di Nascita</p>
                </div>

                <div className="bg-trad-alt-paper p-6 border-2 border-trad-red flex items-center gap-8">
                  <div className="text-7xl">
                    {['🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐐', '🐒', '🐓', '🐕', '🐖'][CHINESE_ZODIAC.indexOf(userZodiac)]}
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-trad-red uppercase">{userZodiac.name}</p>
                    <p className="text-base font-serif italic text-trad-ink/90 leading-tight">
                      Elemento <span className="font-bold text-trad-red">{userZodiac.element}</span><br />
                      <span className="opacity-70 mt-1 block">{userZodiac.trait}</span>
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setShowZodiacModal(false)}
                  className="w-full py-5 bg-trad-red text-trad-gold font-black uppercase tracking-widest border-b-4 border-trad-dark-red hover:bg-trad-dark-red active:translate-y-1 active:border-b-0 transition-all text-xl"
                >
                  Conferma
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
