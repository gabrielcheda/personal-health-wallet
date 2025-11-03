'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Pill, FileText, Apple, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

export function MobileNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = useLocale();

  const mobileNavItems = [
    { name: t('home'), href: `/${locale}/dashboard`, icon: Home },
    { name: t('prescriptions'), href: `/${locale}/prescriptions`, icon: Pill },
    { name: t('exams'), href: `/${locale}/exams`, icon: FileText },
    { name: t('nutrition'), href: `/${locale}/nutrition`, icon: Apple },
    { name: t('providers'), href: `/${locale}/providers`, icon: Users },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="grid grid-cols-5 gap-1">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-1 transition-colors duration-200',
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400'
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
