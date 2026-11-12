// ===== User & Auth Types =====

export type AccountStatus = "ACTIVE" | "SUSPENDED" | "DEACTIVATED";

export type UserCapability =
  | "ORDER_FOOD"
  | "BOOK_COOK"
  | "BOOK_CHEF"
  | "POST_GENERAL_JOB"
  | "APPLY_FOR_JOB"
  | "CREATE_COOK_PROFILE"
  | "POST_RESTAURANT_JOB"
  | "MANAGE_RESTAURANT"
  | "LIST_FOOD"
  | "MANAGE_FOOD_LISTING"
  | "MANAGE_ORDERS"
  | "ADMIN";

export interface User {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  accountStatus: AccountStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  capabilities: UserCapability[];
  createdAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  bio?: string;
  city?: string;
  state?: string;
  country: string;
  postalCode?: string;
  preferredLanguage?: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  addressLine1: string;
  addressLine2?: string;
  locality?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
}

// ===== Cook & Chef Types =====

export type AvailabilityStatus = "AVAILABLE" | "BUSY" | "NOT_AVAILABLE";
export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED" | "UNVERIFIED";
export type ExperienceType = "HOME" | "RESTAURANT" | "CATERING" | "PROFESSIONAL" | "MIXED";

export interface Cuisine {
  id: string;
  name: string;
}

export interface CookProfile {
  id: string;
  userId: string;
  user?: User;
  professionalTitle: string;
  description: string;
  yearsExperience: number;
  experienceType: ExperienceType;
  expectedSalaryMin?: number;
  expectedSalaryMax?: number;
  hourlyRate?: number;
  dailyRate?: number;
  availabilityStatus: AvailabilityStatus;
  verificationStatus: VerificationStatus;
  averageRating: number;
  totalReviews: number;
  completedJobs: number;
  cuisines: Cuisine[];
  skills: CookSkill[];
  city?: string;
  locality?: string;
}

export interface CookSkill {
  id: string;
  skillName: string;
  proficiencyLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
}

export interface CookAvailability {
  id: string;
  cookProfileId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface ChefService {
  id: string;
  cookProfileId: string;
  cook?: CookProfile;
  serviceType: string;
  description: string;
  pricingType: "FIXED" | "PER_PERSON" | "HOURLY" | "CUSTOM";
  basePrice: number;
  minimumGuests?: number;
  maximumGuests?: number;
  active: boolean;
}

// ===== Restaurant Types =====

export type BusinessType = "RESTAURANT" | "CAFE" | "CLOUD_KITCHEN" | "CATERING" | "BAKERY" | "OTHER";

export interface Restaurant {
  id: string;
  ownerUserId: string;
  name: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: Address;
  businessType: BusinessType;
  logoUrl?: string;
  verificationStatus: VerificationStatus;
  createdAt: string;
}

// ===== Job Types =====

export type JobType = "HOUSEHOLD" | "RESTAURANT" | "CATERING" | "EVENT" | "TEMPORARY";
export type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "DAILY" | "HOURLY" | "TEMPORARY";
export type SalaryPeriod = "MONTHLY" | "WEEKLY" | "DAILY" | "HOURLY" | "ONE_TIME";
export type JobStatus = "ACTIVE" | "CLOSED" | "FILLED" | "EXPIRED" | "DRAFT";
export type ApplicationStatus = "PENDING" | "SHORTLISTED" | "INTERVIEWED" | "ACCEPTED" | "REJECTED" | "WITHDRAWN";

export interface Job {
  id: string;
  postedBy: string;
  postedByUser?: User;
  restaurantId?: string;
  restaurant?: Restaurant;
  jobType: JobType;
  title: string;
  description: string;
  employmentType: EmploymentType;
  salaryMin?: number;
  salaryMax?: number;
  salaryPeriod?: SalaryPeriod;
  experienceRequired?: number;
  vacancies: number;
  city: string;
  locality?: string;
  startDate?: string;
  workingHours?: string;
  status: JobStatus;
  expiresAt?: string;
  createdAt: string;
  applicationsCount?: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  job?: Job;
  applicantUserId: string;
  applicant?: User;
  cookProfileId?: string;
  cookProfile?: CookProfile;
  coverMessage?: string;
  expectedSalary?: number;
  status: ApplicationStatus;
  appliedAt: string;
}

// ===== Food Marketplace Types =====

export type ProviderType = "HOME_COOK" | "TIFFIN_SERVICE" | "RESTAURANT" | "BAKERY" | "CATERER";
export type DietaryType = "VEG" | "NON_VEG" | "VEGAN" | "JAIN" | "EGGETARIAN";

export interface FoodProvider {
  id: string;
  userId: string;
  user?: User;
  restaurantId?: string;
  providerName: string;
  providerType: ProviderType;
  description?: string;
  verificationStatus: VerificationStatus;
  active: boolean;
  averageRating?: number;
  totalReviews?: number;
  city?: string;
  locality?: string;
}

export interface FoodListing {
  id: string;
  providerId: string;
  provider?: FoodProvider;
  name: string;
  description?: string;
  category: string;
  price: number;
  imageUrl?: string;
  dietaryType: DietaryType;
  preparationTime?: number;
  availabilityStatus: "AVAILABLE" | "SOLD_OUT" | "UNAVAILABLE";
  rating?: number;
  totalOrders?: number;
  createdAt: string;
}

// ===== Order Types =====

export type OrderStatus = "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "PARTIALLY_REFUNDED";

export interface Order {
  id: string;
  orderNumber: string;
  customerUserId: string;
  providerId: string;
  provider?: FoodProvider;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  discount: number;
  taxAmount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  deliveryMethod: "PICKUP" | "DELIVERY";
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  foodListingId: string;
  itemNameSnapshot: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

// ===== Booking Types =====

export type BookingType = "DAILY_COOK" | "HOURLY_COOK" | "TEMPORARY_COOK" | "PRIVATE_CHEF" | "EVENT_CHEF" | "CATERING";
export type BookingStatus = "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface Booking {
  id: string;
  customerUserId: string;
  cookProfileId: string;
  cook?: CookProfile;
  chefServiceId?: string;
  chefService?: ChefService;
  bookingType: BookingType;
  bookingDate: string;
  startTime?: string;
  endTime?: string;
  guestsCount?: number;
  requirements?: string;
  quotedAmount: number;
  platformFee: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  createdAt: string;
}

// ===== Community Types =====

export interface CommunityPost {
  id: string;
  userId: string;
  user?: User;
  title: string;
  body: string;
  category: string;
  imageUrl?: string;
  upvotes: number;
  downvotes: number;
  commentsCount?: number;
  userVote?: 1 | -1 | null;
  createdAt: string;
}

export interface CommunityComment {
  id: string;
  postId: string;
  userId: string;
  user?: User;
  parentCommentId?: string;
  body: string;
  createdAt: string;
  replies?: CommunityComment[];
}

// ===== Review Types =====

export interface Review {
  id: string;
  reviewerUserId: string;
  reviewer?: User;
  revieweeUserId: string;
  bookingId?: string;
  orderId?: string;
  rating: number;
  reviewText?: string;
  createdAt: string;
}

// ===== Notification Types =====

export type NotificationType =
  | "JOB_APPLICATION"
  | "APPLICATION_STATUS"
  | "BOOKING_REQUEST"
  | "BOOKING_CONFIRMED"
  | "BOOKING_CANCELLED"
  | "ORDER_CONFIRMED"
  | "ORDER_UPDATE"
  | "PAYMENT_CONFIRMED"
  | "REFUND_UPDATE"
  | "MESSAGE"
  | "VERIFICATION_STATUS"
  | "REVIEW_RECEIVED"
  | "GENERAL";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  actionUrl?: string;
  isRead: boolean;
  createdAt: string;
}

// ===== Pagination =====

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// ===== Search =====

export type SearchCategory = "ALL" | "COOKS" | "CHEFS" | "FOOD" | "JOBS" | "RESTAURANTS" | "COMMUNITY";

export interface SearchFilters {
  query?: string;
  category?: SearchCategory;
  city?: string;
  locality?: string;
  cuisines?: string[];
  dietaryType?: DietaryType[];
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  experienceMin?: number;
  availability?: AvailabilityStatus;
  verifiedOnly?: boolean;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  page?: number;
  pageSize?: number;
}
