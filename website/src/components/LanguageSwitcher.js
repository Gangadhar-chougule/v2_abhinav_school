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
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-secondary">
          <Globe className="h-4 w-4" />
        </span>
      ) : null}
      <Select value={language} onValueChange={(value) => setLanguage(value)}>
        <SelectTrigger className={`${compact ? 'w-[108px]' : 'w-[126px]'} h-10 rounded-full border-white/70 bg-white/80 text-sm shadow-[0_10px_24px_rgba(15,23,42,0.06)] backdrop-blur-md`}>
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-white/70 bg-white/96 backdrop-blur-xl">
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="mr">à¤®à¤°à¤¾à¤ à¥€</SelectItem>
          <SelectItem value="hi">à¤¹à¤¿à¤‚à¤¦à¥€</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
