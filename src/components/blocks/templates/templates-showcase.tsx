'use client';

import Image from 'next/image';
import { AnimatedGroup } from '@/components/tailark/motion/animated-group';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 0.6,
      },
    },
  },
};

interface TemplateItem {
  id: number;
  title: string;
  description: string;
  originalImage: string;
  croppedImage: string;
}

const templates: TemplateItem[] = [
  {
    id: 1,
    title: 'Portrait Photography',
    description: 'Perfect for profile pictures and social media avatars',
    originalImage: '/images/list/post-1.png',
    croppedImage: '/images/list/post-1-crop.png',
  },
  {
    id: 2,
    title: 'Product Showcase',
    description: 'Ideal for e-commerce and product catalogs',
    originalImage: '/images/list/post-2.png',
    croppedImage: '/images/list/post-2-crop.png',
  },
  {
    id: 3,
    title: 'Art & Design',
    description: 'Transform artwork into circular formats',
    originalImage: '/images/list/post-3.png',
    croppedImage: '/images/list/post-3-crop.png',
  },
  {
    id: 4,
    title: 'Nature & Landscape',
    description: 'Create stunning circular nature photos',
    originalImage: '/images/list/post-4.png',
    croppedImage: '/images/list/post-4-crop.png',
  },
  {
    id: 5,
    title: 'Food Photography',
    description: 'Perfect for restaurant menus and food blogs',
    originalImage: '/images/list/post-5.png',
    croppedImage: '/images/list/post-5-crop.png',
  },
  {
    id: 6,
    title: 'Fashion & Style',
    description: 'Showcase fashion items in circular frames',
    originalImage: '/images/list/post-6.png',
    croppedImage: '/images/list/post-6-crop.png',
  },
  {
    id: 7,
    title: 'Architecture',
    description: 'Transform architectural photos into circles',
    originalImage: '/images/list/post-7.png',
    croppedImage: '/images/list/post-7-crop.png',
  },
  {
    id: 8,
    title: 'Abstract Art',
    description: 'Create unique circular abstract compositions',
    originalImage: '/images/list/post-8.png',
    croppedImage: '/images/list/post-8-crop.png',
  },
];

export default function TemplatesShowcase() {
  return (
    <section className="border-y bg-gradient-to-b from-background via-background/40 to-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            Template Gallery
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            See What You Can Create
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Explore our collection of examples showing how different types of images look when cropped
            into perfect circles
          </p>
        </div>

        {/* Templates Grid */}
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            },
            ...transitionVariants,
          }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {templates.map((template) => (
            <div
              key={template.id}
              className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
            >
              {/* Images Comparison */}
              <div className="relative flex items-center justify-center gap-4 bg-muted/30 p-6">
                {/* Original Square Image */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative overflow-hidden rounded-lg border-2 border-border shadow-sm">
                    <Image
                      src={template.originalImage}
                      alt={`${template.title} - Original`}
                      width={120}
                      height={120}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">Original</span>
                </div>

                {/* Arrow */}
                <div className="flex items-center text-muted-foreground">
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>

                {/* Cropped Circle Image */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative overflow-hidden rounded-full border-2 border-border shadow-sm">
                    <Image
                      src={template.croppedImage}
                      alt={`${template.title} - Cropped`}
                      width={120}
                      height={120}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">Circle</span>
                </div>
              </div>

              {/* Template Info */}
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="font-semibold text-foreground">{template.title}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </div>
          ))}
        </AnimatedGroup>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Ready to create your own circular images?{' '}
            <a
              href="#how-it-works"
              className="font-medium text-primary hover:underline"
            >
              Try it now →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

