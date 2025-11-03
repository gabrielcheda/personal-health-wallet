'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Dumbbell, Calendar, TrendingUp, Play, CheckCircle } from 'lucide-react';
import { mockWorkoutPlan } from '@/data/mockData';
import { useTranslations, useLocale } from 'next-intl';

export default function FitnessPage() {
  const t = useTranslations('fitness');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const plan = mockWorkoutPlan;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Acompanhe seus treinos e progresso físico
          </p>
        </div>
        <Button size="sm">
          <Play className="h-4 w-4 mr-2" />
          Iniciar Treino
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('weeklyWorkouts')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {plan.frequency}x
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-primary-600 dark:text-primary-400" />
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
                  {plan.duration} sem
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
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-1 capitalize">
                  {plan.type === 'mixed' ? 'Misto' : plan.type}
                </p>
              </div>
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-warning-600 dark:text-warning-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Concluídos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {Math.floor(plan.duration * 0.6)}
                </p>
              </div>
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success-600 dark:text-success-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Dumbbell className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {plan.professional.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {plan.professional.type === 'personal-trainer'
                    ? 'Personal Trainer'
                    : plan.professional.type === 'physiotherapist'
                    ? 'Fisioterapeuta'
                    : 'Coach'}
                  {plan.professional.cref && ` • ${plan.professional.cref}`}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {plan.professional.contact}
                </p>
              </div>
            </div>
            <Badge variant="success">Plano Ativo</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t('weeklyWorkouts')}
        </h2>
        {plan.workouts.map((workout, idx) => (
          <Card key={idx} hover>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {workout.day}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Foco: {workout.focus}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="secondary">{workout.estimatedDuration} min</Badge>
                    <Badge variant="warning">{workout.caloriesBurned} kcal</Badge>
                    <Badge variant="primary">{workout.exercises.length} {t('exercises')}</Badge>
                  </div>
                </div>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Iniciar
                </Button>
              </div>

              <div className="space-y-3">
                {workout.exercises.map((exercise, exerciseIdx) => (
                  <div
                    key={exerciseIdx}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {exerciseIdx + 1}. {exercise.name}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          <span>{exercise.sets} {t('sets')}</span>
                          <span>•</span>
                          <span>{exercise.reps} {t('reps')}</span>
                          {exercise.weight && (
                            <>
                              <span>•</span>
                              <span>{exercise.weight}</span>
                            </>
                          )}
                          {exercise.duration && (
                            <>
                              <span>•</span>
                              <span>{exercise.duration}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{t('rest')}: {exercise.restTime}</span>
                        </div>
                      </div>
                    </div>

                    {exercise.notes && (
                      <p className="text-sm text-primary-700 dark:text-primary-300 mt-2 p-2 bg-primary-50 dark:bg-primary-900/20 rounded">
                        💡 {exercise.notes}
                      </p>
                    )}

                    {exercise.alternatives.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Alternativas: {exercise.alternatives.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {plan.restrictions && plan.restrictions.length > 0 && (
        <Card className="border-l-4 border-warning-500">
          <CardHeader>
            <CardTitle className="text-warning-700 dark:text-warning-400">
              Restrições e Observações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {plan.restrictions.map((restriction, idx) => (
                <p key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                  • {restriction}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
