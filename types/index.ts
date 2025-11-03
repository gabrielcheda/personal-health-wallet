// ==================== PRESCRIPTION TYPES ====================
export interface Prescription {
  id: string;
  doctorInfo: DoctorInfo;
  date: Date;
  diagnosis: string;
  cidCode: string;
  medications: Medication[];
  observations: string;
  nextAppointment?: Date;
  digitalSignature: string;
  qrCode: string;
  status: 'active' | 'completed' | 'suspended';
}

export interface DoctorInfo {
  name: string;
  crm: string;
  specialty: string;
  clinic: string;
  phone: string;
  email?: string;
}

export interface Medication {
  name: string;
  activeIngredient: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  canRefill: boolean;
  refillsRemaining: number;
  sideEffects: string[];
  interactions: string[];
  genericAlternatives: string[];
}

// ==================== EXAM TYPES ====================
export interface ExamResult {
  id: string;
  type: 'blood' | 'imaging' | 'cardiac' | 'other';
  examName: string;
  date: Date;
  laboratory: Laboratory;
  requestingDoctor: string;
  results: ExamParameter[];
  images?: string[];
  report?: string;
  doctorNotes?: string;
  followUpRequired: boolean;
}

export interface Laboratory {
  name: string;
  address: string;
  phone: string;
  email?: string;
}

export interface ExamParameter {
  parameter: string;
  value: number | string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
}

// ==================== NUTRITION TYPES ====================
export interface NutritionPlan {
  id: string;
  nutritionist: Nutritionist;
  startDate: Date;
  endDate: Date;
  goal: 'weight-loss' | 'muscle-gain' | 'maintenance' | 'medical';
  dailyCalories: number;
  macros: Macros;
  meals: Meal[];
  restrictions: string[];
  supplements: Supplement[];
  weeklyCheckIn: boolean;
  progressMetrics: ProgressMetrics;
}

export interface Nutritionist {
  name: string;
  crn: string;
  contact: string;
  specialty?: string;
}

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time: string;
  options: MealOption[];
}

export interface MealOption {
  name: string;
  ingredients: string[];
  calories: number;
  preparation: string;
  image?: string;
}

export interface Supplement {
  name: string;
  dosage: string;
  timing: string;
}

export interface ProgressMetrics {
  weight: number[];
  measurements: {
    chest?: number;
    waist?: number;
    hip?: number;
    arm?: number;
    leg?: number;
  };
  photos: string[];
}

// ==================== WORKOUT TYPES ====================
export interface WorkoutPlan {
  id: string;
  professional: FitnessProfessional;
  type: 'strength' | 'cardio' | 'flexibility' | 'rehabilitation' | 'mixed';
  duration: number;
  frequency: number;
  workouts: Workout[];
  progressTracking: WorkoutProgress;
  injuryNotes?: string;
  restrictions?: string[];
}

export interface FitnessProfessional {
  name: string;
  type: 'personal-trainer' | 'physiotherapist' | 'coach';
  cref?: string;
  contact: string;
}

export interface Workout {
  day: string;
  focus: string;
  exercises: Exercise[];
  estimatedDuration: number;
  caloriesBurned: number;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  duration?: string;
  restTime: string;
  videoUrl?: string;
  notes: string;
  alternatives: string[];
}

export interface WorkoutProgress {
  strength: Record<string, number[]>;
  endurance: Record<string, number[]>;
  flexibility: Record<string, number[]>;
  weight: number[];
}

// ==================== MEDICATION REMINDER TYPES ====================
export interface MedicationReminder {
  id: string;
  medicationName: string;
  dosage: string;
  times: string[];
  withFood: boolean;
  duration: {
    start: Date;
    end: Date;
  };
  inventory: {
    current: number;
    lowStockAlert: number;
  };
  refillReminder: boolean;
  interactions: string[];
  missedDoses: MissedDose[];
  adherenceRate: number;
}

export interface MissedDose {
  date: Date;
  time: string;
  reason?: string;
}

// ==================== FAMILY MEMBER TYPES ====================
export interface FamilyMember {
  id: string;
  relationship: 'spouse' | 'child' | 'parent' | 'other';
  name: string;
  photo: string;
  birthDate: Date;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  medications: string[];
  emergencyInfo: EmergencyInfo;
  accessLevel: 'full' | 'limited' | 'emergency-only';
}

// ==================== EMERGENCY TYPES ====================
export interface EmergencyInfo {
  bloodType: string;
  rhFactor: '+' | '-';
  allergies: Allergy[];
  chronicConditions: string[];
  currentMedications: string[];
  emergencyContacts: EmergencyContact[];
  insurance: InsuranceInfo;
  organDonor: boolean;
  advanceDirectives?: string;
  qrCode: string;
}

export interface Allergy {
  type: 'medication' | 'food' | 'environmental' | 'other';
  allergen: string;
  severity: 'mild' | 'moderate' | 'severe' | 'life-threatening';
  reaction: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  validUntil: Date;
  cardImage?: string;
}

// ==================== HEALTHCARE PROVIDER TYPES ====================
export interface HealthcareProvider {
  id: string;
  name: string;
  specialty: string;
  crm: string;
  clinic: string;
  address: string;
  phone: string;
  email?: string;
  lastVisit: Date;
  appointmentHistory: Appointment[];
  rating?: number;
  notes?: string;
  isFavorite: boolean;
}

export interface Appointment {
  id: string;
  date: Date;
  type: string;
  reason: string;
  notes?: string;
  prescription?: string;
  followUp?: Date;
}

// ==================== DOCUMENT TYPES ====================
export interface HealthDocument {
  id: string;
  type: DocumentType;
  title: string;
  date: Date;
  file: string;
  fileType: 'pdf' | 'image' | 'document';
  category: string;
  tags: string[];
  relatedProvider?: string;
  expiryDate?: Date;
  isConfidential: boolean;
}

export type DocumentType =
  | 'insurance-card'
  | 'vaccination-record'
  | 'medical-report'
  | 'surgery-record'
  | 'dental-record'
  | 'vision-prescription'
  | 'medical-certificate'
  | 'disability-documentation'
  | 'travel-health'
  | 'advance-directive'
  | 'other';

// ==================== TIMELINE TYPES ====================
export interface TimelineEvent {
  id: string;
  date: Date;
  type: 'consultation' | 'exam' | 'prescription' | 'vaccine' | 'surgery' | 'emergency' | 'other';
  title: string;
  description: string;
  provider?: string;
  relatedId?: string;
  category: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
}

// ==================== HEALTH INSIGHTS TYPES ====================
export interface HealthInsight {
  id: string;
  type: 'trend' | 'risk' | 'reminder' | 'achievement' | 'warning';
  title: string;
  description: string;
  data?: any;
  actionable: boolean;
  action?: string;
  priority: 'low' | 'medium' | 'high';
  date: Date;
}

export interface HealthScore {
  overall: number;
  categories: {
    medication: number;
    exercise: number;
    nutrition: number;
    sleep: number;
    mentalHealth: number;
  };
  trend: 'improving' | 'stable' | 'declining';
  lastUpdated: Date;
}

// ==================== NOTIFICATION TYPES ====================
export interface Notification {
  id: string;
  type: 'medication' | 'appointment' | 'exam' | 'vaccine' | 'refill' | 'general';
  title: string;
  message: string;
  time: Date;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

// ==================== SECURITY TYPES ====================
export interface SecurityFeatures {
  authentication: {
    type: 'biometric' | 'pin' | 'password';
    twoFactor: boolean;
    sessionTimeout: number;
  };
  encryption: {
    atRest: 'AES-256';
    inTransit: 'TLS 1.3';
  };
  sharing: SharingSettings;
  audit: AuditLog;
  backup: BackupSettings;
}

export interface SharingSettings {
  temporaryAccess: boolean;
  linkExpiry: Date;
  viewOnly: boolean;
  watermark: boolean;
}

export interface AuditLog {
  accessLog: AccessLogEntry[];
}

export interface AccessLogEntry {
  user: string;
  action: string;
  timestamp: Date;
  ip: string;
}

export interface BackupSettings {
  automatic: boolean;
  encrypted: boolean;
  frequency: 'daily' | 'weekly';
  lastBackup?: Date;
}

// ==================== SEARCH TYPES ====================
export interface SearchQuery {
  query: string;
  filters: SearchFilters;
  results: SearchResults;
}

export interface SearchFilters {
  category: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
  provider: string[];
  tags: string[];
}

export interface SearchResults {
  prescriptions: Prescription[];
  exams: ExamResult[];
  appointments: Appointment[];
  relevanceScore: number;
}

// ==================== GAMIFICATION TYPES ====================
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate?: Date;
  progress?: number;
  target?: number;
}

export interface HealthStreak {
  type: 'medication' | 'exercise' | 'nutrition' | 'water';
  current: number;
  longest: number;
  lastUpdate: Date;
}

// ==================== ADDITIONAL FEATURES ====================
export interface WearableData {
  id: string;
  device: string;
  type: 'heart-rate' | 'steps' | 'sleep' | 'calories' | 'blood-pressure';
  value: number;
  unit: string;
  timestamp: Date;
}

export interface TelemedicineConsultation {
  id: string;
  doctor: DoctorInfo;
  date: Date;
  duration: number;
  reason: string;
  notes: string;
  recordingUrl?: string;
  prescription?: string;
  followUp?: Date;
}

export interface SymptomEntry {
  id: string;
  date: Date;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  triggers?: string[];
  notes?: string;
}

export interface MenstrualCycle {
  id: string;
  startDate: Date;
  endDate?: Date;
  flow: 'light' | 'medium' | 'heavy';
  symptoms: string[];
  mood: string[];
  notes?: string;
}

export interface MoodEntry {
  id: string;
  date: Date;
  mood: 'excellent' | 'good' | 'neutral' | 'bad' | 'terrible';
  energy: number;
  stress: number;
  sleep: number;
  notes?: string;
}

export interface VaccinationRecord {
  id: string;
  vaccine: string;
  date: Date;
  dose: number;
  totalDoses: number;
  location: string;
  batchNumber: string;
  nextDose?: Date;
  qrCode?: string;
  certificate?: string;
}

export interface MedicalExpense {
  id: string;
  date: Date;
  type: 'consultation' | 'exam' | 'medication' | 'procedure' | 'other';
  description: string;
  amount: number;
  provider: string;
  insuranceCovered: boolean;
  receipt?: string;
  taxDeductible: boolean;
}
