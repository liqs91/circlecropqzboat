'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * Mode switcher component, used in the navbar
 */
export function ModeSwitcher() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Common.mode');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="size-8 p-0 border border-border rounded-full"
        disabled
      >
        <SunIcon className="size-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-0 border border-border rounded-full cursor-pointer hover:bg-accent flex items-center justify-center"
          aria-label={t('label')}
        >
          {isDark ? (
            <MoonIcon className="size-4 text-foreground" />
          ) : (
            <SunIcon className="size-4 text-foreground" />
          )}
          <span className="sr-only">{t('label')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="cursor-pointer"
        >
          <SunIcon className="mr-2 size-4" />
          <span>{t('light')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="cursor-pointer"
        >
          <MoonIcon className="mr-2 size-4" />
          <span>{t('dark')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
