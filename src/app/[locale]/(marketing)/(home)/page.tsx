import dynamic from 'next/dynamic';
import { CircleCropTool } from '@/components/circle-crop/circle-crop-tool';

// 动态导入 Hero 组件，延迟加载
const HeroSection = dynamic(() => import('@/components/blocks/hero/hero'), { ssr: true });
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// 动态导入组件，延迟加载以减少初始包大小
const StatsSection = dynamic(() => import('@/components/blocks/stats/stats'), { ssr: true });
const FeaturesSection = dynamic(() => import('@/components/blocks/features/features'), { ssr: true });
const Features2Section = dynamic(() => import('@/components/blocks/features/features2'), { ssr: true });
const Features3Section = dynamic(() => import('@/components/blocks/features/features3'), { ssr: true });
const FaqSection = dynamic(() => import('@/components/blocks/faqs/faqs'), { ssr: true });
const TestimonialsSection = dynamic(() => import('@/components/blocks/testimonials/testimonials'), { ssr: true });
const NewsletterCard = dynamic(() => import('@/components/newsletter/newsletter-card').then(mod => ({ default: mod.NewsletterCard })), { ssr: true });

/**
 * https://next-intl.dev/docs/environments/actions-metadata-route-handlers#metadata-api
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    pathname: '/',
  });
}

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations('HomePage');

  return (
    <>
      <div className="flex flex-col">
        <HeroSection />

        {/* Circle crop tool spotlight section */}
        <section
          id="how-it-works"
          className="border-y bg-gradient-to-b from-background via-background/40 to-background/80"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
            <div className="space-y-3 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
                Circle Crop Image Tool
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Create perfect circular images in seconds
              </h2>
              <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
                Upload a picture, fine‑tune the zoom level, and download a crisp circular PNG avatar
                in just a few seconds — no signup, no watermark.
              </p>
            </div>

            <div className="rounded-2xl border bg-card/80 p-4 shadow-lg shadow-primary/10 backdrop-blur sm:p-6">
              <CircleCropTool showHeading={false} />
            </div>
          </div>
        </section>

        <StatsSection />

        <FeaturesSection />

        <Features2Section />

        <Features3Section />

        <FaqSection />

        <TestimonialsSection />

        <NewsletterCard />
      </div>
    </>
  );
}
