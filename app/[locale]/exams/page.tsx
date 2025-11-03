'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  FileText,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Upload,
  Filter,
  Download,
  Activity,
} from 'lucide-react';
import { mockExams } from '@/data/mockData';
import { formatDate, getStatusColor } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

export default function ExamsPage() {
  const t = useTranslations('exams');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const bloodTests = mockExams.filter((e) => e.type === 'blood');
  const imagingTests = mockExams.filter((e) => e.type === 'imaging');
  const abnormalResults = mockExams.filter((e) =>
    e.results.some((r) => r.status === 'high' || r.status === 'low' || r.status === 'critical')
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
            Acompanhe seus exames e resultados laboratoriais
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            {t('filter')}
          </Button>
          <Button size="sm">
            <Upload className="h-4 w-4 mr-2" />
            {t('upload')}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('stats.total')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {mockExams.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Exames de Sangue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {bloodTests.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-danger-100 dark:bg-danger-900/30 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-danger-600 dark:text-danger-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Imagens</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {imagingTests.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('stats.attention')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {abnormalResults.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-warning-600 dark:text-warning-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exams that need attention */}
      {abnormalResults.length > 0 && (
        <Card className="border-l-4 border-warning-500">
          <CardHeader>
            <CardTitle className="flex items-center text-warning-700 dark:text-warning-400">
              <AlertCircle className="h-5 w-5 mr-2" />
              Exames que Requerem Atenção
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {abnormalResults.map((exam) => (
                <div
                  key={exam.id}
                  className="p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {exam.examName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exam.laboratory.name} • {formatDate(exam.date)}
                      </p>
                      <div className="mt-2 space-y-1">
                        {exam.results
                          .filter((r) => r.status !== 'normal')
                          .map((result, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <Badge
                                variant={
                                  result.status === 'critical'
                                    ? 'danger'
                                    : 'warning'
                                }
                                className={getStatusColor(result.status)}
                              >
                                {result.status === 'high' ? '↑ Alto' : result.status === 'low' ? '↓ Baixo' : 'Crítico'}
                              </Badge>
                              <span className="text-gray-700 dark:text-gray-300">
                                {result.parameter}: {result.value} {result.unit}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400 text-xs">
                                (Normal: {result.referenceRange})
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      {t('viewReport')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Exams */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {t('recent')}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {mockExams.map((exam) => (
            <Card key={exam.id} hover>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {exam.examName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {exam.laboratory.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Solicitado por: {exam.requestingDoctor}
                        </p>
                      </div>
                      <Badge
                        variant={
                          exam.type === 'blood'
                            ? 'danger'
                            : exam.type === 'imaging'
                            ? 'secondary'
                            : 'primary'
                        }
                      >
                        {exam.type === 'blood'
                          ? 'Sangue'
                          : exam.type === 'imaging'
                          ? 'Imagem'
                          : exam.type === 'cardiac'
                          ? 'Cardíaco'
                          : 'Outro'}
                      </Badge>
                    </div>

                    {exam.results.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {t('results')} ({exam.results.length} parâmetros)
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {exam.results.map((result, idx) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg border ${
                                result.status === 'normal'
                                  ? 'bg-success-50 dark:bg-success-900/10 border-success-200 dark:border-success-800'
                                  : result.status === 'critical'
                                  ? 'bg-danger-50 dark:bg-danger-900/10 border-danger-200 dark:border-danger-800'
                                  : 'bg-warning-50 dark:bg-warning-900/10 border-warning-200 dark:border-warning-800'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {result.parameter}
                                  </p>
                                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                                    {result.value} {result.unit}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                    {t('reference')}: {result.referenceRange}
                                  </p>
                                </div>
                                <div>
                                  {result.status === 'high' && (
                                    <TrendingUp className="h-5 w-5 text-warning-600" />
                                  )}
                                  {result.status === 'low' && (
                                    <TrendingDown className="h-5 w-5 text-warning-600" />
                                  )}
                                  {result.status === 'critical' && (
                                    <AlertCircle className="h-5 w-5 text-danger-600" />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      exam.report && (
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                            Resultado
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {exam.report}
                          </p>
                        </div>
                      )
                    )}

                    {exam.doctorNotes && (
                      <div className="mt-3 p-3 bg-primary-50 dark:bg-primary-900/10 rounded-lg border border-primary-200 dark:border-primary-800">
                        <p className="text-sm font-medium text-primary-900 dark:text-primary-100 mb-1">
                          Notas do Médico
                        </p>
                        <p className="text-sm text-primary-800 dark:text-primary-200">
                          {exam.doctorNotes}
                        </p>
                      </div>
                    )}

                    {exam.followUpRequired && (
                      <div className="mt-3 flex items-center gap-2 p-2 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-warning-600" />
                        <p className="text-sm text-warning-800 dark:text-warning-300">
                          Requer acompanhamento médico
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="lg:w-64 space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        {t('date')}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatDate(exam.date)}
                      </p>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {t('lab')}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {exam.laboratory.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {exam.laboratory.phone}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        {tCommon('download')}
                      </Button>
                      <Button variant="secondary" className="w-full" size="sm">
                        Ver Histórico
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
