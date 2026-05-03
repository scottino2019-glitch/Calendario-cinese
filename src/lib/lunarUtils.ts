import { Solar, Lunar, HolidayUtil } from 'lunar-javascript';

export interface LunarInfo {
  yearNum: number;
  monthNum: number;
  dayNum: number;
  yearGanZhi: string;
  yearShengXiao: string;
  monthInChinese: string;
  dayInChinese: string;
  festivals: string[];
  solarTerm: string | null;
}

export function getLunarDateInfo(date: Date): LunarInfo {
  const lunar = Lunar.fromDate(date);
  
  return {
    yearNum: lunar.getYear(),
    monthNum: lunar.getMonth(),
    dayNum: lunar.getDay(),
    yearGanZhi: lunar.getYearInGanZhi(),
    yearShengXiao: lunar.getYearShengXiao(),
    monthInChinese: lunar.getMonthInChinese(),
    dayInChinese: lunar.getDayInChinese(),
    festivals: lunar.getFestivals(),
    solarTerm: lunar.getJieQi() || null,
  };
}

export function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  
  const days = [];
  // Fill leading empty days
  const startDayOfWeek = firstDay.getDay(); // 0 is Sunday
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }
  
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month - 1, d));
  }
  
  return days;
}
