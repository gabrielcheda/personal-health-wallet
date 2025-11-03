import type { Metadata } from 'next';
import '../globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales } from '@/i18n/config';

export const metadata: Metadata = {
  title: '360 Health Wallet - Sua Saúde em Um Só Lugar',
  description: 'Plataforma completa para gerenciar suas prescrições, exames, consultas e toda sua história médica.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '360 Health Wallet',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale: params.locale });

  return (
    <html lang={params.locale}>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages} locale={params.locale}>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />

            <div className="lg:pl-64">
              <Header />

              <main className="p-4 lg:p-6 pb-20 lg:pb-6">
                {children}
              </main>
            </div>

            <MobileNav />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
