'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function HeroSection() {
  const t = useTranslations('HomePage.hero');
  const linkIntroduction = 'https://www.image2url.com/';
  
  // Smooth scroll to tool section
  const handleScrollToTool = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <main id="hero" className="overflow-visible">
        {/* background, light shadows on top of the hero section */}
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

        <section>
          <div className="relative pt-12">
              <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                {/* introduction */}
                <div>
                  <a
                    href={linkIntroduction}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:bg-primary/10 group mx-auto flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 p-1 pl-4 transition-colors"
                  >
                    <span className="text-primary text-sm font-medium">
                      {t('introduction')}
                    </span>

                    <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
                  </a>
                </div>

                {/* title */}
                <h1 className="mt-8 text-balance text-5xl font-sans font-semibold tracking-tight lg:mt-16 xl:text-[5rem]">
                  {t('title')}
                </h1>

                {/* description */}
                <p className="mx-auto mt-8 max-w-4xl text-balance text-lg text-muted-foreground">
                  {t('description')}
                </p>

                {/* action buttons */}
                <div className="mt-12 flex flex-row items-center justify-center gap-4">
                  <Button
                    key={1}
                    size="lg"
                    className="rounded-xl px-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={handleScrollToTool}
                  >
                    <span className="text-nowrap">{t('primary')}</span>
                    <ArrowDown className="ml-2 size-4" />
                  </Button>
                  <Button
                    key={2}
                    size="lg"
                    variant="outline"
                    className="h-10.5 rounded-xl px-6 border-2 hover:bg-accent/50 transition-all duration-300 cursor-pointer"
                    onClick={handleScrollToTool}
                  >
                    <span className="text-nowrap">{t('secondary')}</span>
                    <ArrowDown className="ml-2 size-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Example images: first two examples, larger size - horizontal layout */}
            <div className="relative mt-8 w-full pb-8 sm:mt-12 sm:pb-12 md:mt-20 md:pb-16">
              <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-4 sm:flex-row sm:gap-16 lg:gap-20">
                {/* Example 1 */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center justify-center gap-6">
                    <img
                      src="/images/list/post-1.png"
                      alt="Example 1 original"
                      className="h-[280px] w-[280px] object-contain transition-transform hover:scale-105 cursor-pointer"
                      style={{ display: 'block' }}
                    />
                    <ArrowRight className="size-8 text-muted-foreground" />
                    <div className="relative h-[280px] w-[280px] aspect-square flex-shrink-0 overflow-hidden rounded-full border-2 border-border shadow-lg bg-background transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary/50 cursor-pointer">
                      <img
                        src="/images/list/post-1-crop.png"
                        alt="Example 1 cropped"
                        className="h-full w-full object-cover transition-transform hover:scale-110"
                        style={{ display: 'block' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center justify-center gap-6">
                    <img
                      src="/images/list/post-2.png"
                      alt="Example 2 original"
                      className="h-[280px] w-[280px] object-contain transition-transform hover:scale-105 cursor-pointer"
                      style={{ display: 'block' }}
                    />
                    <ArrowRight className="size-8 text-muted-foreground" />
                    <div className="relative h-[280px] w-[280px] aspect-square flex-shrink-0 overflow-hidden rounded-full border-2 border-border shadow-lg bg-background transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary/50 cursor-pointer">
                      <img
                        src="/images/list/post-2-crop.png"
                        alt="Example 2 cropped"
                        className="h-full w-full object-cover transition-transform hover:scale-110"
                        style={{ display: 'block' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
