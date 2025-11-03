'use client';

import { Download, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { downloadAsPDF, downloadAsImage } from '@/lib/download';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface DownloadButtonProps {
  elementId: string;
  filename: string;
  className?: string;
}

export function DownloadButton({ elementId, filename, className }: DownloadButtonProps) {
  const t = useTranslations('download');
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
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

  const handleDownloadPDF = async () => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id "${elementId}" not found`);
      return;
    }

    setIsDownloading(true);
    try {
      await downloadAsPDF({
        element,
        filename,
        format: 'a4',
        orientation: 'portrait',
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Download failed:', error);
      alert(t('error'));
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadImage = async () => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id "${elementId}" not found`);
      return;
    }

    setIsDownloading(true);
    try {
      await downloadAsImage({
        element,
        filename,
        format: 'png',
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Download failed:', error);
      alert(t('error'));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isDownloading}
        className={cn(
          'inline-flex items-center space-x-2 px-4 py-2 rounded-lg',
          'bg-primary-600 text-white',
          'hover:bg-primary-700',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-colors duration-200',
          className
        )}
      >
        {isDownloading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{t('downloading')}</span>
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            <span>{t('title')}</span>
          </>
        )}
      </button>

      {isOpen && !isDownloading && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="py-1">
            <button
              onClick={handleDownloadPDF}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FileText className="h-4 w-4 text-red-600" />
              <span>{t('pdf')}</span>
            </button>

            <button
              onClick={handleDownloadImage}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ImageIcon className="h-4 w-4 text-blue-600" />
              <span>{t('image')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
