'use client';

import { Share2, MessageCircle, Mail, Copy, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { shareContent, shareViaWhatsApp, shareViaEmail, copyToClipboard } from '@/lib/share';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, text, url, className }: ShareButtonProps) {
  const t = useTranslations('share');
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleShare = async () => {
    const shared = await shareContent({ title, text, url });
    if (shared) {
      setIsOpen(false);
    } else {
      // If native share failed, show menu
      setIsOpen(true);
    }
  };

  const handleWhatsApp = () => {
    shareViaWhatsApp(text, url);
    setIsOpen(false);
  };

  const handleEmail = () => {
    shareViaEmail(title, text, url);
    setIsOpen(false);
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(url || text);
    if (success) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 2000);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleShare}
        className={cn(
          'inline-flex items-center space-x-2 px-4 py-2 rounded-lg',
          'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300',
          'border border-gray-300 dark:border-gray-600',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'transition-colors duration-200',
          className
        )}
      >
        <Share2 className="h-4 w-4" />
        <span>{t('title')}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="py-1">
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MessageCircle className="h-4 w-4 text-green-600" />
              <span>{t('whatsapp')}</span>
            </button>

            <button
              onClick={handleEmail}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Mail className="h-4 w-4 text-blue-600" />
              <span>{t('email')}</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span>{t('copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-gray-600" />
                  <span>{t('copy')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
