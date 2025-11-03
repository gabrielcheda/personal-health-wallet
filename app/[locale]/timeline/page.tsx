'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, Filter, Download } from 'lucide-react';
import { mockTimelineEvents } from '@/data/mockData';
import { formatDate } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

export default function TimelinePage() {
  const t = useTranslations('timeline');
  const locale = useLocale();
  const sortedEvents = [...mockTimelineEvents].sort((a, b) =>
    b.date.getTime() - a.date.getTime()
  );

  const getEventIcon = (type: string) => {
    const icons: Record<string, string> = {
      consultation: '🩺',
      exam: '📋',
      prescription: '💊',
      vaccine: '💉',
      surgery: '🏥',
      emergency: '🚨',
      other: '📝',
    };
    return icons[type] || '📝';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Histórico completo de sua jornada de saúde
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            {t('filter')}
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        <div className="space-y-6">
          {sortedEvents.map((event, idx) => (
            <div key={event.id} className="relative pl-20">
              <div className="absolute left-5 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900">
                <div className="text-xs">{getEventIcon(event.type)}</div>
              </div>

              <Card hover>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {event.title}
                        </h3>
                        <Badge
                          variant={
                            event.importance === 'critical'
                              ? 'danger'
                              : event.importance === 'high'
                              ? 'warning'
                              : 'secondary'
                          }
                        >
                          {event.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {event.description}
                      </p>
                      {event.provider && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Médico: {event.provider}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatDate(event.date)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
