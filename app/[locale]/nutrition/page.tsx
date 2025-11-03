'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Apple,
  Calendar,
  TrendingDown,
  Target,
  Utensils,
  ShoppingCart,
  Camera,
  Pill as SupplementIcon,
} from 'lucide-react';
import { mockNutritionPlan } from '@/data/mockData';
import { formatDate } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

export default function NutritionPage() {
  const t = useTranslations('nutrition');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const plan = mockNutritionPlan;
  const currentWeight = plan.progressMetrics.weight[plan.progressMetrics.weight.length - 1];
  const initialWeight = plan.progressMetrics.weight[0];
  const weightLost = initialWeight - currentWeight;

  const goalLabels: Record<string, string> = {
    'weight-loss': 'Perda de Peso',
    'muscle-gain': 'Ganho de Massa',
    'maintenance': 'Manutenção',
    'medical': 'Motivo Médico',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Acompanhe sua dieta e progresso nutricional
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Lista de Compras
          </Button>
          <Button size="sm">
            <Camera className="h-4 w-4 mr-2" />
            Registrar Refeição
          </Button>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Peso Atual</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {currentWeight} kg
                </p>
                <p className="text-xs text-success-600 dark:text-success-400 mt-1">
                  <TrendingDown className="h-3 w-3 inline mr-1" />
                  {weightLost.toFixed(1)} kg perdidos
                </p>
              </div>
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-success-600 dark:text-success-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('dailyCalories')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {plan.dailyCalories}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Apple className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Duração</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {Math.ceil(
                    (plan.endDate.getTime() - plan.startDate.getTime()) /
                      (1000 * 60 * 60 * 24 * 30)
                  )}{' '}
                  meses
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('goal')}</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                  {goalLabels[plan.goal]}
                </p>
              </div>
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-warning-600 dark:text-warning-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nutritionist Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Apple className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {plan.nutritionist.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Nutricionista • CRN: {plan.nutritionist.crn}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {plan.nutritionist.contact}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant="success">Plano Ativo</Badge>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Início: {formatDate(plan.startDate)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macros */}
      <Card>
        <CardHeader>
          <CardTitle>{t('macros')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Proteína</p>
              <p className="text-2xl font-bold text-primary-700 dark:text-primary-300 mt-1">
                {plan.macros.protein}g
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {Math.round((plan.macros.protein * 4 / plan.dailyCalories) * 100)}% das calorias
              </p>
            </div>
            <div className="p-4 bg-success-50 dark:bg-success-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Carboidratos</p>
              <p className="text-2xl font-bold text-success-700 dark:text-success-300 mt-1">
                {plan.macros.carbs}g
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {Math.round((plan.macros.carbs * 4 / plan.dailyCalories) * 100)}% das calorias
              </p>
            </div>
            <div className="p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Gordura</p>
              <p className="text-2xl font-bold text-warning-700 dark:text-warning-300 mt-1">
                {plan.macros.fat}g
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {Math.round((plan.macros.fat * 9 / plan.dailyCalories) * 100)}% das calorias
              </p>
            </div>
            <div className="p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Fibra</p>
              <p className="text-2xl font-bold text-secondary-700 dark:text-secondary-300 mt-1">
                {plan.macros.fiber}g
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Meta diária
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meal Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Utensils className="h-5 w-5 mr-2 text-primary-600" />
              {t('meals')}
            </CardTitle>
            <Button variant="secondary" size="sm">
              Ver Calendário Semanal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plan.meals.map((meal, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {meal.type === 'breakfast'
                        ? 'Café da Manhã'
                        : meal.type === 'lunch'
                        ? 'Almoço'
                        : meal.type === 'dinner'
                        ? 'Jantar'
                        : 'Lanche'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Horário: {meal.time}
                    </p>
                  </div>
                  <Badge variant="primary">{meal.options.length} opções</Badge>
                </div>

                <div className="space-y-3">
                  {meal.options.map((option, optIdx) => (
                    <div
                      key={optIdx}
                      className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          Opção {optIdx + 1}: {option.name}
                        </h5>
                        <Badge variant="secondary">{option.calories} kcal</Badge>
                      </div>

                      <div className="mb-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Ingredientes:
                        </p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-0.5">
                          {option.ingredients.map((ingredient, i) => (
                            <li key={i} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded border border-primary-200 dark:border-primary-800">
                        <p className="text-sm font-medium text-primary-900 dark:text-primary-100 mb-1">
                          Modo de Preparo:
                        </p>
                        <p className="text-sm text-primary-800 dark:text-primary-200">
                          {option.preparation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Supplements */}
      {plan.supplements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SupplementIcon className="h-5 w-5 mr-2 text-primary-600" />
              {t('supplements')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {plan.supplements.map((supplement, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {supplement.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {supplement.dosage}
                    </p>
                  </div>
                  <Badge variant="primary">{supplement.timing}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Restrictions */}
      {plan.restrictions.length > 0 && (
        <Card className="border-l-4 border-warning-500">
          <CardHeader>
            <CardTitle className="text-warning-700 dark:text-warning-400">
              Restrições Alimentares
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {plan.restrictions.map((restriction, idx) => (
                <Badge key={idx} variant="warning">
                  {restriction}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>{t('progress')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Peso Inicial</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {initialWeight} kg
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Peso Atual</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentWeight} kg
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Progresso</span>
              <span className="font-semibold text-success-600 dark:text-success-400">
                -{weightLost.toFixed(1)} kg
              </span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                <span>Histórico de Peso</span>
              </div>
              <div className="flex items-end space-x-1 h-24">
                {plan.progressMetrics.weight.map((weight, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary-500 rounded-t"
                      style={{
                        height: `${((initialWeight - weight) / (initialWeight - currentWeight)) * 100}%`,
                        minHeight: '4px',
                      }}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Measurements */}
      <Card>
        <CardHeader>
          <CardTitle>Medidas Corporais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(plan.progressMetrics.measurements).map(([key, value]) => (
              <div key={key} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {key === 'chest'
                    ? 'Peito'
                    : key === 'waist'
                    ? 'Cintura'
                    : key === 'hip'
                    ? 'Quadril'
                    : key === 'arm'
                    ? 'Braço'
                    : 'Perna'}
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                  {value} cm
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
