'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FolderOpen, Upload, Filter, FileText, Download, Eye } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

const mockDocuments = [
  {
    id: '1',
    type: 'insurance-card' as const,
    title: 'Carteirinha Unimed',
    date: new Date('2024-01-01'),
    category: 'Seguros',
    fileType: 'pdf' as const,
  },
  {
    id: '2',
    type: 'vaccination-record' as const,
    title: 'Cartão de Vacinação',
    date: new Date('2023-05-15'),
    category: 'Vacinas',
    fileType: 'pdf' as const,
  },
  {
    id: '3',
    type: 'medical-report' as const,
    title: 'Relatório Médico - Cirurgia',
    date: new Date('2022-08-20'),
    category: 'Relatórios',
    fileType: 'pdf' as const,
  },
];

export default function DocumentsPage() {
  const t = useTranslations('documents');
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Armazene com segurança todos os seus documentos de saúde
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
          <Button size="sm">
            <Upload className="h-4 w-4 mr-2" />
            {t('upload')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Documentos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {mockDocuments.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <FolderOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Seguros</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">1</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Vacinas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">1</p>
              </div>
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-success-600 dark:text-success-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Relatórios</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">1</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-warning-600 dark:text-warning-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDocuments.map((doc) => (
          <Card key={doc.id} hover>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {doc.title}
                  </h3>
                  <Badge variant="primary">{doc.category}</Badge>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    {doc.date.toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="secondary" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button size="sm" variant="secondary" className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  {t('download')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
