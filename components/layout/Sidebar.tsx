'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Heart,
  Pill,
  FileText,
  Apple,
  Dumbbell,
  Clock,
  AlertCircle,
  Users,
  FolderOpen,
  TrendingUp,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

export function Sidebar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = useLocale();

  const navigationItems = [
    { name: t('dashboard'), href: `/${locale}/dashboard`, icon: Home },
    { name: t('prescriptions'), href: `/${locale}/prescriptions`, icon: Pill },
    { name: t('exams'), href: `/${locale}/exams`, icon: FileText },
    { name: t('nutrition'), href: `/${locale}/nutrition`, icon: Apple },
    { name: t('fitness'), href: `/${locale}/fitness`, icon: Dumbbell },
    { name: t('timeline'), href: `/${locale}/timeline`, icon: Clock },
    { name: t('emergency'), href: `/${locale}/emergency`, icon: AlertCircle },
    { name: t('providers'), href: `/${locale}/providers`, icon: Users },
    { name: t('documents'), href: `/${locale}/documents`, icon: FolderOpen },
    { name: t('insights'), href: `/${locale}/insights`, icon: TrendingUp },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <Link href={`/${locale}/dashboard`} className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            360 Health Wallet
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200',
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
            JS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              João Silva
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              joao@email.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
