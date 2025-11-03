import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    normal: 'text-success-600 bg-success-100',
    high: 'text-warning-600 bg-warning-100',
    low: 'text-warning-600 bg-warning-100',
    critical: 'text-danger-600 bg-danger-100',
    active: 'text-success-600 bg-success-100',
    completed: 'text-gray-600 bg-gray-100',
    suspended: 'text-danger-600 bg-danger-100',
  };

  return statusColors[status] || 'text-gray-600 bg-gray-100';
}
