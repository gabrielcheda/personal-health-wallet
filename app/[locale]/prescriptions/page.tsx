'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Pill,
  Filter,
  Download,
  Share2,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { mockPrescriptions } from '@/data/mockData';
import { formatDate, getStatusColor } from '@/lib/utils';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function PrescriptionsPage() {
  const t = useTranslations('prescriptions');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const activePrescriptions = mockPrescriptions.filter((p) => p.status === 'active');
  const completedPrescriptions = mockPrescriptions.filter(
    (p) => p.status === 'completed'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie todas as suas prescrições e medicamentos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            {t('filter')}
          </Button>
          <Button size="sm">
            <Pill className="h-4 w-4 mr-2" />
            {t('new')}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('stats.activeCount')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {activePrescriptions.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success-600 dark:text-success-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('completed')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {completedPrescriptions.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('stats.medications')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {mockPrescriptions.reduce(
                    (acc, p) => acc + p.medications.length,
                    0
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Pill className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('stats.renewals')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {
                    mockPrescriptions.filter(
                      (p) => p.nextAppointment && p.nextAppointment > new Date()
                    ).length
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Prescriptions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {t('active')}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {activePrescriptions.map((prescription) => (
            <Card key={prescription.id} hover>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {prescription.doctorInfo.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {prescription.doctorInfo.specialty} •{' '}
                          {prescription.doctorInfo.clinic}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          CRM: {prescription.doctorInfo.crm}
                        </p>
                      </div>
                      <Badge
                        variant="success"
                        className={getStatusColor(prescription.status)}
                      >
                        {prescription.status === 'active' ? t('active') : t('completed')}
                      </Badge>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        {t('diagnosis')}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {prescription.diagnosis}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        CID: {prescription.cidCode}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('medications')} ({prescription.medications.length})
                      </p>
                      {prescription.medications.map((med, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-3 p-3 bg-primary-50 dark:bg-primary-900/10 rounded-lg border border-primary-200 dark:border-primary-800"
                        >
                          <Pill className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {med.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {med.dosage} • {med.frequency}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {med.instructions}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                Duração: {med.duration}
                              </Badge>
                              {med.canRefill && (
                                <Badge variant="success" className="text-xs">
                                  {med.refillsRemaining} {t('renewalAvailable')}
                                </Badge>
                              )}
                            </div>
                            {med.interactions.length > 0 && (
                              <div className="flex items-center gap-1 mt-2 text-xs text-warning-600 dark:text-warning-400">
                                <AlertTriangle className="h-3 w-3" />
                                <span>{med.interactions.length} {t('interactions')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {prescription.observations && (
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          Observações
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {prescription.observations}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="lg:w-64 space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Data da Prescrição
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatDate(prescription.date)}
                      </p>
                    </div>

                    {prescription.nextAppointment && (
                      <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Próxima Consulta
                        </p>
                        <p className="text-sm font-medium text-primary-700 dark:text-primary-300 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(prescription.nextAppointment)}
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Button className="w-full" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        {t('download')}
                      </Button>
                      <Button variant="secondary" className="w-full" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        {t('share')}
                      </Button>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        Contato
                      </p>
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        {prescription.doctorInfo.phone}
                      </p>
                      {prescription.doctorInfo.email && (
                        <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                          {prescription.doctorInfo.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Prescriptions */}
      {completedPrescriptions.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('completed')} {t('title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedPrescriptions.map((prescription) => (
              <Card key={prescription.id} hover>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {prescription.doctorInfo.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {prescription.doctorInfo.specialty}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(prescription.status)}
                    >
                      {t('completed')}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {prescription.diagnosis}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {formatDate(prescription.date)} •{' '}
                    {prescription.medications.length} {t('medications').toLowerCase()}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="secondary" size="sm" className="flex-1">
                      {tCommon('viewMore')}
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
