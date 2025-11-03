'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Activity,
  Pill,
  Calendar,
  TrendingUp,
  AlertCircle,
  Plus,
  FileText,
  Heart,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import {
  mockPrescriptions,
  mockMedicationReminders,
  mockHealthScore,
  mockTimelineEvents,
  mockAchievements,
  mockHealthInsights,
} from '@/data/mockData';
import { formatDate } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

export default function Dashboard() {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const activeMedications = mockMedicationReminders.slice(0, 3);
  const recentEvents = mockTimelineEvents.slice(0, 5);
  const todaysMedications = mockMedicationReminders;
  const upcomingAppointments = mockPrescriptions
    .filter((p) => p.nextAppointment && p.nextAppointment > new Date())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('greeting')} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('subtitle')}
        </p>
      </div>

      {/* Health Score Card */}
      <Card className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">{t('healthScore')}</p>
              <h2 className="text-5xl font-bold mt-2">{mockHealthScore.overall}</h2>
              <p className="text-white/90 mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Melhorando nos últimos 30 dias
              </p>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {mockHealthScore.categories.medication}%
                  </div>
                  <div className="text-xs text-white/80">{t('categories.medication')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {mockHealthScore.categories.exercise}%
                  </div>
                  <div className="text-xs text-white/80">{t('categories.exercise')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {mockHealthScore.categories.nutrition}%
                  </div>
                  <div className="text-xs text-white/80">{t('categories.nutrition')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {mockHealthScore.categories.sleep}%
                  </div>
                  <div className="text-xs text-white/80">{t('categories.sleep')}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href={`/${locale}/prescriptions`}>
          <Card hover className="text-center cursor-pointer">
            <CardContent className="p-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <Plus className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <p className="text-sm font-medium">{t('newPrescription')}</p>
            </CardContent>
          </Card>
        </Link>

        <Link href={`/${locale}/exams`}>
          <Card hover className="text-center cursor-pointer">
            <CardContent className="p-4">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="h-6 w-6 text-success-600 dark:text-success-400" />
              </div>
              <p className="text-sm font-medium">{t('uploadExam')}</p>
            </CardContent>
          </Card>
        </Link>

        <Link href={`/${locale}/emergency`}>
          <Card hover className="text-center cursor-pointer">
            <CardContent className="p-4">
              <div className="w-12 h-12 bg-danger-100 dark:bg-danger-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertCircle className="h-6 w-6 text-danger-600 dark:text-danger-400" />
              </div>
              <p className="text-sm font-medium">{t('emergencyInfo')}</p>
            </CardContent>
          </Card>
        </Link>

        <Link href={`/${locale}/providers`}>
          <Card hover className="text-center cursor-pointer">
            <CardContent className="p-4">
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <p className="text-sm font-medium">{t('schedule')}</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Medications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Pill className="h-5 w-5 mr-2 text-primary-600" />
                {t('todaysMedications')}
              </CardTitle>
              <Link href={`/${locale}/prescriptions`}>
                <Button variant="ghost" size="sm">
                  {t('viewAll')}
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysMedications.map((med) => (
                <div
                  key={med.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {med.medicationName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {med.dosage} - {med.times.join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="success">{med.adherenceRate}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-warning-600" />
              {t('healthAlerts')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockHealthInsights.map((insight) => (
                <div
                  key={insight.id}
                  className={`p-3 rounded-lg border-l-4 ${
                    insight.priority === 'high'
                      ? 'border-danger-500 bg-danger-50 dark:bg-danger-900/20'
                      : insight.priority === 'medium'
                      ? 'border-warning-500 bg-warning-50 dark:bg-warning-900/20'
                      : 'border-success-500 bg-success-50 dark:bg-success-900/20'
                  }`}
                >
                  <p className="font-medium text-sm text-gray-900 dark:text-white">
                    {insight.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary-600" />
                {t('recentActivities')}
              </CardTitle>
              <Link href={`/${locale}/timeline`}>
                <Button variant="ghost" size="sm">
                  {t('viewAll')}
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event, index) => (
                <div key={event.id} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      index === 0 ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {formatDate(event.date)}
                    </p>
                  </div>
                  <Badge variant="secondary">{event.category}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-warning-500" />
              {t('achievements')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAchievements
                .filter((a) => a.earnedDate)
                .map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {achievement.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary-600" />
              {t('upcomingAppointments')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingAppointments.map((prescription) => (
                <div
                  key={prescription.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <p className="font-medium text-gray-900 dark:text-white">
                    {prescription.doctorInfo.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {prescription.doctorInfo.specialty}
                  </p>
                  <p className="text-sm text-primary-600 dark:text-primary-400 mt-2">
                    {prescription.nextAppointment &&
                      formatDate(prescription.nextAppointment)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
