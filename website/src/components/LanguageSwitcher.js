'use client';

import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LanguageSwitcher({ compact = false }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      {!compact ? (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600">
          <Globe className="h-4 w-4" />
        </span>
      ) : null}
      <Select value={language} onValueChange={(value) => setLanguage(value)}>
        <SelectTrigger className={`${compact ? 'w-[100px]' : 'w-[120px]'} h-9 rounded-lg border-slate-200 bg-white text-xs shadow-sm hover:bg-slate-50 transition-colors`}>
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-slate-200 bg-white shadow-xl">
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="mr">मराठी</SelectItem>
          <SelectItem value="hi">हिन्दी</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
