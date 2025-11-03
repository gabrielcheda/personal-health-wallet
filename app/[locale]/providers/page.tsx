'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Users, Star, Phone, Mail, MapPin, Calendar, Heart } from 'lucide-react';
import { mockProviders } from '@/data/mockData';
import { formatDate } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

export default function ProvidersPage() {
  const t = useTranslations('providers');
  const locale = useLocale();
  const favoriteProviders = mockProviders.filter((p) => p.isFavorite);
  const otherProviders = mockProviders.filter((p) => !p.isFavorite);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie seus profissionais de saúde
          </p>
        </div>
        <Button size="sm">
          <Users className="h-4 w-4 mr-2" />
          {t('add')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total de Médicos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {mockProviders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Favoritos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {favoriteProviders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-warning-600 dark:text-warning-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Especialidades</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {new Set(mockProviders.map((p) => p.specialty)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {favoriteProviders.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Médicos Favoritos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteProviders.map((provider) => (
              <Card key={provider.id} hover>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {provider.name}
                        </h3>
                        <Star className="h-4 w-4 fill-warning-500 text-warning-500" />
                      </div>
                      <Badge variant="primary">{provider.specialty}</Badge>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {provider.crm}
                      </p>
                    </div>
                    {provider.rating && (
                      <div className="flex items-center gap-1 bg-warning-50 dark:bg-warning-900/20 px-2 py-1 rounded">
                        <Star className="h-4 w-4 fill-warning-500 text-warning-500" />
                        <span className="text-sm font-semibold text-warning-700 dark:text-warning-300">
                          {provider.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {provider.clinic}
                        </p>
                        <p className="text-xs">{provider.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span>{provider.phone}</span>
                    </div>

                    {provider.email && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <span className="text-xs">{provider.email}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs">
                        {t('lastVisit')}: {formatDate(provider.lastVisit)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      {t('contact')}
                    </Button>
                    <Button variant="secondary" size="sm" className="flex-1">
                      Ver Histórico
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {otherProviders.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Outros Médicos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherProviders.map((provider) => (
              <Card key={provider.id} hover>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {provider.name}
                      </h3>
                      <Badge variant="secondary">{provider.specialty}</Badge>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {provider.crm}
                      </p>
                    </div>
                    {provider.rating && (
                      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        <Star className="h-4 w-4 fill-gray-400 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {provider.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {provider.clinic}
                        </p>
                        <p className="text-xs">{provider.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span>{provider.phone}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs">
                        {t('lastVisit')}: {formatDate(provider.lastVisit)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      {t('contact')}
                    </Button>
                    <Button variant="secondary" size="sm" className="flex-1">
                      Ver Histórico
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
