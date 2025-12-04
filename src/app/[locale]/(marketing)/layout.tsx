import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

// 动态导入布局组件，减少初始包大小
const Navbar = dynamic(() => import('@/components/layout/navbar').then(mod => ({ default: mod.Navbar })), { ssr: true });
const Footer = dynamic(() => import('@/components/layout/footer').then(mod => ({ default: mod.Footer })), { ssr: true });

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar scroll={true} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
