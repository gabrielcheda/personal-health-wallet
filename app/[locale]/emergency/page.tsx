'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AlertCircle, Phone, Download, Share2, Heart } from 'lucide-react';
import { mockEmergencyInfo } from '@/data/mockData';
import { formatDate } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

export default function EmergencyPage() {
  const t = useTranslations('emergency');
  const locale = useLocale();
  const info = mockEmergencyInfo;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Informações críticas para situações de emergência
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            {t('share')}
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t('print')}
          </Button>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-danger-500 to-danger-700 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">{t('bloodType')}</p>
              <h2 className="text-5xl font-bold mt-2">
                {info.bloodType}
                {info.rhFactor}
              </h2>
              <div className="flex items-center gap-2 mt-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  {info.organDonor ? 'Doador de Órgãos' : 'Não Doador'}
                </Badge>
              </div>
            </div>
            <div className="hidden md:block">
              <Heart className="h-32 w-32 text-white/20" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-l-4 border-danger-500">
          <CardHeader>
            <CardTitle className="flex items-center text-danger-700 dark:text-danger-400">
              <AlertCircle className="h-5 w-5 mr-2" />
              {t('allergies')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {info.allergies.length > 0 ? (
              <div className="space-y-3">
                {info.allergies.map((allergy, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-danger-50 dark:bg-danger-900/20 rounded-lg border border-danger-200 dark:border-danger-800"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {allergy.allergen}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {allergy.reaction}
                        </p>
                      </div>
                      <Badge
                        variant={
                          allergy.severity === 'life-threatening' || allergy.severity === 'severe'
                            ? 'danger'
                            : 'warning'
                        }
                      >
                        {allergy.severity === 'life-threatening'
                          ? 'Grave'
                          : allergy.severity === 'severe'
                          ? 'Severa'
                          : allergy.severity === 'moderate'
                          ? 'Moderada'
                          : 'Leve'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nenhuma alergia registrada
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('chronicConditions')}</CardTitle>
          </CardHeader>
          <CardContent>
            {info.chronicConditions.length > 0 ? (
              <div className="space-y-2">
                {info.chronicConditions.map((condition, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg"
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {condition}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nenhuma condição crônica registrada
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('currentMedications')}</CardTitle>
        </CardHeader>
        <CardContent>
          {info.currentMedications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {info.currentMedications.map((med, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {med}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nenhum medicamento em uso
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="h-5 w-5 mr-2 text-primary-600" />
            {t('emergencyContacts')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {info.emergencyContacts.map((contact, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  contact.isPrimary
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-300 dark:border-primary-700'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {contact.name}
                      </p>
                      {contact.isPrimary && (
                        <Badge variant="primary" className="text-xs">
                          {t('primary')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {contact.relationship}
                    </p>
                    <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mt-1">
                      {contact.phone}
                    </p>
                    {contact.email && (
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {contact.email}
                      </p>
                    )}
                  </div>
                  <Button variant="secondary" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    {t('call')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('insurance')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('provider')}</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {info.insurance.provider}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('policyNumber')}</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {info.insurance.policyNumber}
              </p>
            </div>
            {info.insurance.groupNumber && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Número do Grupo</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {info.insurance.groupNumber}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('validUntil')}</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(info.insurance.validUntil)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {info.advanceDirectives && (
        <Card className="border-l-4 border-primary-500">
          <CardHeader>
            <CardTitle>{t('advanceDirectives')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {info.advanceDirectives}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
