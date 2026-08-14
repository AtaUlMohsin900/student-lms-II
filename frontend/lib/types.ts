import { LucideIcon } from 'lucide-react';

// ─── UI / Domain type aliases (video lecture, course create, etc.) ───
export type ContentType = 'video' | 'article' | 'pdf' | 'quiz';
export type MediaType = 'thumbnail' | 'video';
export type CourseLevel = 'beginner' | 'beginner_to_intermediate' | 'intermediate' | 'intermediate_to_advanced' | 'beginner_to_advanced' | 'advanced';
export type CourseStatus = 'draft' | 'pending' | 'approved' | 'rejected';
export type UserRole = 'student' | 'instructor' | 'super_admin' | 'admin';
export type EnrollmentStatus = 'active' | 'completed' | 'cancelled';
export type PayoutAccountType = 'saving' | 'current';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  phone?: string;
  status?: 'active' | 'inactive' | 'pending' | 'suspended' | 'banned';
  dateOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile extends User {
  bio?: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: string;
  instructorApplication?: InstructorApplication;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'instructor';
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data: {
    user: User;
    token: string;
  };
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  bio?: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  short_description?: string;
  thumbnail_url?: string;
  promo_video_url?: string;
  price: number;
  original_price?: number;
  level: CourseLevel;
  category: any; // Can be string ID or object with name
  instructor_id: string;
  instructor?: {
    name: string;
    email?: string;
    avatar?: string;
  };
  status: CourseStatus;
  creation_step?: number;
  creationStep?: number;
  enrollment_count?: number;
  rating?: number;
  review_count?: number;
  duration?: number;
  language?: string;
  learning_outcomes?: string[];
  requirements?: string[];
  content?: unknown[];
  tags?: string[];
  is_enrolled?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: EnrollmentStatus;
  progress: number;
  last_accessed?: string;
  enrolled_at: string;
  course?: Course;
}

export interface EnrollmentProgress {
  id: string;
  enrollment_id?: string;
  content_id?: string;
  completed?: boolean;
  completed_at?: string;
  content?: CourseContent;
}

export interface Certificate {
  id: string;
  course_id?: string;
  user_id?: string;
  certificate_number?: string;
  certificateNumber?: string; // API camelCase
  certificate_url?: string;
  issued_at?: string;
  issuedAt?: string; // API camelCase
  created_at?: string;
  course?: Course;
  user?: User;
}

export interface DashboardStatConfig {
  label: string;
  key: string;
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  color?: string;
  highlight?: boolean;
}

export interface OnboardingBenefit {
  title: string;
  icon: LucideIcon;
  items?: string[];
  content?: string;
}

export interface OnboardingStep {
  text: string;
  icon: LucideIcon;
  color: string;
}

export interface CategoryColor {
  gradient: string;
  bg: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  course: string;
}

export interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface CourseApproval {
  id: string;
  course_id: string;
  thumbnail_url?: string;
  title: string;
  description: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected' | 'draft' | 'published';
  reason?: string;
  admin_id?: string;
  created_at: string;
  instructor: {
    name: string;
    email: string;
  };
  category?: {
    name: string;
  };
}

export interface InstructorApplication {
  id: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  bio: string;
  expertiseAreas: string[];
  experienceYears?: number;
  education?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface InstructorApplicationData {
  bio: string;
  expertiseAreas?: string[];
  experienceYears?: number;
  education?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  course_count?: number;
}

// Quiz types (used by CourseContent.metadata)
export interface QuizQuestion {
  text: string;
  options: Array<{ text: string; isCorrect: boolean }>;
}

export interface QuizData {
  time_limit_minutes: number;
  questions: QuizQuestion[];
}

export interface QuizMetadata {
  time_limit_minutes?: number;
  questions?: QuizQuestion[];
}

export interface CourseContent {
  id: string;
  course_id: string;
  title: string;
  type: ContentType;
  content_url?: string;
  body?: string;
  duration?: number;
  file_size?: number;
  order?: number;
  order_index?: number;
  metadata?: QuizMetadata;
}

export interface PayoutAccount {
  id?: string;
  account_holder_name?: string;
  account_number?: string;
  account_type?: string;
  ifsc_code?: string;
  bank_name?: string;
}

export interface PayoutAccountFormData {
  account_holder_name: string;
  account_number: string;
  account_type: PayoutAccountType;
  ifsc_code: string;
  bank_name: string;
}

export interface PayoutRequest {
  id: string;
  instructor_id?: string;
  payout_account_id?: string;
  amount: number | string;
  status: 'pending' | 'success';
  processed_by?: string | null;
  processed_at?: string | null;
  created_at?: string;
  createdAt?: string;
  admin_notes?: string | null;
  adminNotes?: string | null;
  failure_reason?: string | null;
  failureReason?: string | null;
  instructor?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string | null;
  };
  payoutAccount?: {
    id?: string;
    account_holder_name?: string;
    accountHolderName?: string;
    account_number?: string;
    accountNumber?: string;
    account_type?: string;
    accountType?: string;
    ifsc_code?: string;
    ifscCode?: string;
    bank_name?: string;
    bankName?: string;
  };
}

export interface CourseFilters {
  category?: string;
  level?: string;
  price?: string;
  search?: string;
  sort?: string;
  limit?: number;
  page?: number;
}

export interface PlatformStats {
  [key: string]: unknown;
}

export interface InstructorAnalytics {
  [key: string]: unknown;
}

export interface StudentDashboardData {
  [key: string]: unknown;
}

export interface CoursesResponse {
  success: boolean;
  data: {
    courses: Course[];
    pagination?: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export interface CourseResponse {
  success: boolean;
  data: Course;
}

export interface Review {
  id: string;
  user_id: string;
  course_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

// ─── Course create / content form (instructor UI) ───
export interface ContentFormData {
  title: string;
  type: ContentType;
  file: File | null;
  duration: string;
  content: string;
  url: string;
  quizData: QuizData;
}
