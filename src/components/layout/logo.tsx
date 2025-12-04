'use client';

import { websiteConfig } from '@/config/website';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Logo({ className }: { className?: string }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const logoLight = websiteConfig.metadata.images?.logoLight ?? '/logo.png';
  const logoDark = websiteConfig.metadata.images?.logoDark ?? logoLight;

  // During server-side rendering and initial client render, always use logoLight
  // This prevents hydration mismatch
  const logo = mounted && (resolvedTheme === 'dark' || theme === 'dark') ? logoDark : logoLight;

  // Only show theme-dependent UI after hydration to prevent mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={cn('flex items-center justify-center', className)}>
      {logo.endsWith('.svg') ? (
        <img
          src={logo}
          alt="Circle Crop Image Logo"
          title="Circle Crop Image"
          className="h-8 w-auto object-contain"
        />
      ) : (
        <Image
          src={logo}
          alt="Circle Crop Image Logo"
          title="Circle Crop Image"
          width={32}
          height={32}
          className="size-8 rounded-md object-contain"
          priority
        />
      )}
    </div>
  );
}
