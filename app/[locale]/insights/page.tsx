'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Bell,
  Target,
  Activity,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { mockHealthInsights, mockHealthScore } from '@/data/mockData';

export default function InsightsPage() {
  const t = useTranslations('insights');
  const locale = useLocale();
  const highPriorityInsights = mockHealthInsights.filter((i) => i.priority === 'high');
  const mediumPriorityInsights = mockHealthInsights.filter((i) => i.priority === 'medium');
  const lowPriorityInsights = mockHealthInsights.filter((i) => i.priority === 'low');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Análises e recomendações personalizadas para sua saúde
        </p>
      </div>

      <Card className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">{t('healthScore')}</p>
              <h2 className="text-5xl font-bold mt-2">{mockHealthScore.overall}/100</h2>
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="h-5 w-5" />
                <span className="text-white/90">
                  {mockHealthScore.trend === 'improving'
                    ? 'Melhorando'
                    : mockHealthScore.trend === 'stable'
                    ? 'Estável'
                    : 'Precisa atenção'}
                </span>
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2">
                <div className="flex-1">
                  <p className="text-xs text-white/80">Medicação</p>
                  <p className="text-lg font-bold">{mockHealthScore.categories.medication}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2">
                <div className="flex-1">
                  <p className="text-xs text-white/80">Exercício</p>
                  <p className="text-lg font-bold">{mockHealthScore.categories.exercise}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2">
                <div className="flex-1">
                  <p className="text-xs text-white/80">Nutrição</p>
                  <p className="text-lg font-bold">{mockHealthScore.categories.nutrition}%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Alta Prioridade</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {highPriorityInsights.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-danger-100 dark:bg-danger-900/30 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-danger-600 dark:text-danger-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Média Prioridade</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {mediumPriorityInsights.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center">
                <Bell className="h-6 w-6 text-warning-600 dark:text-warning-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Informações</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {lowPriorityInsights.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success-600 dark:text-success-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {highPriorityInsights.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-danger-600" />
            Alertas Importantes
          </h2>
          <div className="space-y-3">
            {highPriorityInsights.map((insight) => (
              <Card key={insight.id} className="border-l-4 border-danger-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {insight.description}
                      </p>
                      {insight.actionable && (
                        <Button size="sm" className="mt-3">
                          Ver Mais
                        </Button>
                      )}
                    </div>
                    <Badge variant="danger">Alta</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {mediumPriorityInsights.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-warning-600" />
            Recomendações
          </h2>
          <div className="space-y-3">
            {mediumPriorityInsights.map((insight) => (
              <Card key={insight.id} className="border-l-4 border-warning-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {insight.description}
                      </p>
                      {insight.actionable && (
                        <Button variant="secondary" size="sm" className="mt-3">
                          Ver Mais
                        </Button>
                      )}
                    </div>
                    <Badge variant="warning">Média</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {lowPriorityInsights.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-success-600" />
            Informações e Tendências
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lowPriorityInsights.map((insight) => (
              <Card key={insight.id} hover>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {insight.description}
                      </p>
                    </div>
                    <Badge variant="success">Info</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-primary-600" />
            Metas de Saúde
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Aderência a Medicamentos
                </span>
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                  {mockHealthScore.categories.medication}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: `${mockHealthScore.categories.medication}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Exercícios Semanais
                </span>
                <span className="text-sm font-bold text-success-600 dark:text-success-400">
                  {mockHealthScore.categories.exercise}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-success-600 h-2 rounded-full"
                  style={{ width: `${mockHealthScore.categories.exercise}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Alimentação Saudável
                </span>
                <span className="text-sm font-bold text-secondary-600 dark:text-secondary-400">
                  {mockHealthScore.categories.nutrition}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-secondary-600 h-2 rounded-full"
                  style={{ width: `${mockHealthScore.categories.nutrition}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Qualidade do Sono
                </span>
                <span className="text-sm font-bold text-warning-600 dark:text-warning-400">
                  {mockHealthScore.categories.sleep}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-warning-600 h-2 rounded-full"
                  style={{ width: `${mockHealthScore.categories.sleep}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
