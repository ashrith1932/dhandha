-- ==============================================================================
-- DHANDHA: India's Cooking Services Marketplace
-- Production Relational Schema (PostgreSQL 15+)
-- Tagline: Kaam bhi. Khana bhi.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. IDENTITY & CAPABILITIES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  avatar_url TEXT,
  password_hash TEXT,
  auth_provider VARCHAR(30) DEFAULT 'PHONE_OTP', -- GOOGLE, PHONE_OTP, EMAIL_PASSWORD
  provider_user_id VARCHAR(255),
  account_status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (account_status IN ('ACTIVE', 'SUSPENDED', 'DEACTIVATED')),
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'India',
  postal_code VARCHAR(15),
  date_of_birth DATE,
  preferred_language VARCHAR(50) DEFAULT 'Hindi',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Capability-based authorization (Universal Account principle)
CREATE TABLE IF NOT EXISTS user_capabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  capability VARCHAR(60) NOT NULL, -- ORDER_FOOD, BOOK_COOK, BOOK_CHEF, POST_GENERAL_JOB, APPLY_FOR_JOB, CREATE_COOK_PROFILE, POST_RESTAURANT_JOB, MANAGE_RESTAURANT, LIST_FOOD, MANAGE_ORDERS, ADMIN
  resource_id UUID, -- Optional scope (e.g. restaurant_id)
  status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PENDING_VERIFICATION', 'REVOKED')),
  granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ,
  UNIQUE(user_id, capability, resource_id)
);

CREATE INDEX idx_user_cap_user ON user_capabilities(user_id);

CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label VARCHAR(50) DEFAULT 'Home', -- Home, Work, Other
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  locality VARCHAR(150),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(15) NOT NULL,
  country VARCHAR(100) DEFAULT 'India',
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_addresses_user ON addresses(user_id);
CREATE INDEX idx_addresses_city ON addresses(city);

-- ==============================================================================
-- 2. COOK & CHEF VERTICALS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS cook_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  professional_title VARCHAR(150) NOT NULL,
  description TEXT,
  years_experience INTEGER NOT NULL DEFAULT 0,
  experience_type VARCHAR(50) DEFAULT 'HOME' CHECK (experience_type IN ('HOME', 'RESTAURANT', 'CATERING', 'PROFESSIONAL', 'MIXED')),
  expected_salary_min NUMERIC(12, 2),
  expected_salary_max NUMERIC(12, 2),
  hourly_rate NUMERIC(12, 2),
  daily_rate NUMERIC(12, 2),
  availability_status VARCHAR(30) DEFAULT 'AVAILABLE' CHECK (availability_status IN ('AVAILABLE', 'BUSY', 'NOT_AVAILABLE')),
  verification_status VARCHAR(30) DEFAULT 'PENDING' CHECK (verification_status IN ('PENDING', 'VERIFIED', 'REJECTED', 'UNVERIFIED')),
  average_rating NUMERIC(3, 2) DEFAULT 5.00,
  total_reviews INTEGER DEFAULT 0,
  completed_jobs INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cooks_status ON cook_profiles(availability_status, verification_status);
CREATE INDEX idx_cooks_rating ON cook_profiles(average_rating DESC);

CREATE TABLE IF NOT EXISTS cuisines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS cook_cuisines (
  cook_profile_id UUID NOT NULL REFERENCES cook_profiles(id) ON DELETE CASCADE,
  cuisine_id UUID NOT NULL REFERENCES cuisines(id) ON DELETE CASCADE,
  PRIMARY KEY (cook_profile_id, cuisine_id)
);

CREATE TABLE IF NOT EXISTS cook_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cook_profile_id UUID NOT NULL REFERENCES cook_profiles(id) ON DELETE CASCADE,
  skill_name VARCHAR(100) NOT NULL,
  proficiency_level VARCHAR(30) DEFAULT 'INTERMEDIATE' CHECK (proficiency_level IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'))
);

CREATE TABLE IF NOT EXISTS cook_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cook_profile_id UUID NOT NULL REFERENCES cook_profiles(id) ON DELETE CASCADE,
  day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday, 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS cook_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cook_profile_id UUID NOT NULL REFERENCES cook_profiles(id) ON DELETE CASCADE,
  document_type VARCHAR(60) NOT NULL, -- AADHAAR, POLICE_CLEARANCE, PAN, FSSAI_HYGIENE, CERTIFICATE
  document_url TEXT NOT NULL,
  verification_status VARCHAR(30) DEFAULT 'PENDING' CHECK (verification_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chef_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cook_profile_id UUID NOT NULL REFERENCES cook_profiles(id) ON DELETE CASCADE,
  service_type VARCHAR(100) NOT NULL, -- Private Dining, Wedding Catering, House Party, Corporate Lunch
  description TEXT,
  pricing_type VARCHAR(30) DEFAULT 'PER_PERSON' CHECK (pricing_type IN ('FIXED', 'PER_PERSON', 'HOURLY', 'CUSTOM')),
  base_price NUMERIC(12, 2) NOT NULL,
  minimum_guests INTEGER DEFAULT 2,
  maximum_guests INTEGER DEFAULT 50,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 3. RESTAURANT & COMMERCIAL FOOD BUSINESSES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  address_id UUID REFERENCES addresses(id) ON DELETE SET NULL,
  business_type VARCHAR(60) DEFAULT 'RESTAURANT' CHECK (business_type IN ('RESTAURANT', 'CAFE', 'CLOUD_KITCHEN', 'CATERING', 'BAKERY', 'OTHER')),
  logo_url TEXT,
  verification_status VARCHAR(30) DEFAULT 'PENDING' CHECK (verification_status IN ('PENDING', 'VERIFIED', 'REJECTED', 'SUSPENDED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_restaurants_owner ON restaurants(owner_user_id);
CREATE INDEX idx_restaurants_verified ON restaurants(verification_status);

CREATE TABLE IF NOT EXISTS restaurant_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  member_role VARCHAR(40) NOT NULL DEFAULT 'MANAGER' CHECK (member_role IN ('OWNER', 'MANAGER', 'HEAD_CHEF', 'RECRUITER')),
  membership_status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (membership_status IN ('ACTIVE', 'INVITED', 'REMOVED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(restaurant_id, user_id)
);

CREATE TABLE IF NOT EXISTS business_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL, -- FSSAI_LICENSE, GSTIN_CERTIFICATE, PAN_BUSINESS, ESTABLISHMENT_LICENSE
  document_number_encrypted TEXT,
  document_url TEXT NOT NULL,
  verification_status VARCHAR(30) DEFAULT 'PENDING' CHECK (verification_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 4. JOBS & RECRUITMENT VERTICAL
-- ==============================================================================

CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  posted_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE, -- NULL if general household job
  job_type VARCHAR(50) NOT NULL CHECK (job_type IN ('HOUSEHOLD', 'RESTAURANT', 'CATERING', 'EVENT', 'TEMPORARY')),
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  employment_type VARCHAR(40) NOT NULL CHECK (employment_type IN ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'DAILY', 'HOURLY', 'TEMPORARY')),
  salary_min NUMERIC(12, 2),
  salary_max NUMERIC(12, 2),
  salary_period VARCHAR(30) DEFAULT 'MONTHLY' CHECK (salary_period IN ('MONTHLY', 'WEEKLY', 'DAILY', 'HOURLY', 'ONE_TIME')),
  experience_required INTEGER DEFAULT 0,
  vacancies INTEGER DEFAULT 1,
  city VARCHAR(100) NOT NULL,
  locality VARCHAR(150),
  address_id UUID REFERENCES addresses(id),
  start_date DATE,
  working_hours TEXT,
  status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CLOSED', 'FILLED', 'EXPIRED', 'DRAFT')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_jobs_city ON jobs(city);
CREATE INDEX idx_jobs_type ON jobs(job_type);
CREATE INDEX idx_jobs_status ON jobs(status);

CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cook_profile_id UUID REFERENCES cook_profiles(id) ON DELETE SET NULL,
  cover_message TEXT,
  expected_salary NUMERIC(12, 2),
  status VARCHAR(30) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SHORTLISTED', 'INTERVIEWED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN')),
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(job_id, applicant_user_id)
);

CREATE INDEX idx_applications_job ON job_applications(job_id);
CREATE INDEX idx_applications_user ON job_applications(applicant_user_id);

CREATE TABLE IF NOT EXISTS job_saved (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, job_id)
);

-- ==============================================================================
-- 5. FOOD MARKETPLACE VERTICAL
-- ==============================================================================

CREATE TABLE IF NOT EXISTS food_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE SET NULL,
  provider_name VARCHAR(200) NOT NULL,
  provider_type VARCHAR(50) NOT NULL CHECK (provider_type IN ('HOME_COOK', 'TIFFIN_SERVICE', 'RESTAURANT', 'BAKERY', 'CATERER')),
  description TEXT,
  verification_status VARCHAR(30) DEFAULT 'PENDING' CHECK (verification_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS food_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES food_providers(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL, -- Thali, Breakfast, Snacks, Biryani, Beverages, Daily Meal
  price NUMERIC(12, 2) NOT NULL,
  image_url TEXT,
  dietary_type VARCHAR(30) NOT NULL DEFAULT 'VEG' CHECK (dietary_type IN ('VEG', 'NON_VEG', 'VEGAN', 'JAIN', 'EGGETARIAN')),
  preparation_time INTEGER DEFAULT 30, -- In minutes
  availability_status VARCHAR(30) DEFAULT 'AVAILABLE' CHECK (availability_status IN ('AVAILABLE', 'SOLD_OUT', 'UNAVAILABLE')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_food_category ON food_listings(category);
CREATE INDEX idx_food_diet ON food_listings(dietary_type);

CREATE TABLE IF NOT EXISTS food_listing_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  food_listing_id UUID NOT NULL REFERENCES food_listings(id) ON DELETE CASCADE,
  available_date DATE NOT NULL,
  available_quantity INTEGER DEFAULT 50,
  is_available BOOLEAN DEFAULT TRUE
);

-- ==============================================================================
-- 6. ORDERS & ORDER ITEMS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(40) NOT NULL UNIQUE,
  customer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  provider_id UUID NOT NULL REFERENCES food_providers(id) ON DELETE RESTRICT,
  delivery_address_id UUID REFERENCES addresses(id) ON DELETE RESTRICT,
  subtotal NUMERIC(12, 2) NOT NULL,
  delivery_fee NUMERIC(12, 2) DEFAULT 0.00,
  platform_fee NUMERIC(12, 2) DEFAULT 0.00,
  discount NUMERIC(12, 2) DEFAULT 0.00,
  tax_amount NUMERIC(12, 2) DEFAULT 0.00,
  total_amount NUMERIC(12, 2) NOT NULL,
  payment_status VARCHAR(30) DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED')),
  order_status VARCHAR(30) DEFAULT 'PENDING' CHECK (order_status IN ('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED')),
  delivery_method VARCHAR(30) DEFAULT 'DELIVERY' CHECK (delivery_method IN ('PICKUP', 'DELIVERY')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_customer ON orders(customer_user_id);
CREATE INDEX idx_orders_provider ON orders(provider_id);
CREATE INDEX idx_orders_status ON orders(order_status);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  food_listing_id UUID NOT NULL REFERENCES food_listings(id) ON DELETE RESTRICT,
  item_name_snapshot VARCHAR(200) NOT NULL, -- Price & Name snapshot protection
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12, 2) NOT NULL,
  line_total NUMERIC(12, 2) NOT NULL
);

-- ==============================================================================
-- 7. COOK & CHEF BOOKINGS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  cook_profile_id UUID NOT NULL REFERENCES cook_profiles(id) ON DELETE RESTRICT,
  chef_service_id UUID REFERENCES chef_services(id) ON DELETE SET NULL,
  booking_type VARCHAR(50) NOT NULL CHECK (booking_type IN ('DAILY_COOK', 'HOURLY_COOK', 'TEMPORARY_COOK', 'PRIVATE_CHEF', 'EVENT_CHEF', 'CATERING')),
  booking_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  service_address_id UUID REFERENCES addresses(id),
  guests_count INTEGER,
  requirements TEXT,
  quoted_amount NUMERIC(12, 2) NOT NULL,
  platform_fee NUMERIC(12, 2) DEFAULT 0.00,
  total_amount NUMERIC(12, 2) NOT NULL,
  payment_status VARCHAR(30) DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED')),
  booking_status VARCHAR(30) DEFAULT 'PENDING' CHECK (booking_status IN ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_date ON bookings(cook_profile_id, booking_date);
CREATE INDEX idx_bookings_customer ON bookings(customer_user_id);

-- ==============================================================================
-- 8. PAYMENTS, PAYOUTS & COMMISSIONS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  gateway VARCHAR(40) DEFAULT 'RAZORPAY',
  gateway_order_id VARCHAR(255) NOT NULL UNIQUE,
  gateway_payment_id VARCHAR(255) UNIQUE,
  amount NUMERIC(12, 2) NOT NULL,
  currency VARCHAR(5) DEFAULT 'INR',
  payment_status VARCHAR(30) DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED')),
  payment_method VARCHAR(40), -- UPI, CARD, NETBANKING, WALLET
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  beneficiary_user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  provider_id UUID REFERENCES food_providers(id) ON DELETE SET NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  gross_amount NUMERIC(12, 2) NOT NULL,
  platform_commission NUMERIC(12, 2) NOT NULL,
  gateway_fee NUMERIC(12, 2) DEFAULT 0.00,
  net_amount NUMERIC(12, 2) NOT NULL,
  payout_status VARCHAR(30) DEFAULT 'PENDING' CHECK (payout_status IN ('PENDING', 'PROCESSED', 'FAILED')),
  gateway_transfer_id VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS refunds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE RESTRICT,
  amount NUMERIC(12, 2) NOT NULL,
  reason TEXT,
  refund_status VARCHAR(30) DEFAULT 'PENDING' CHECK (refund_status IN ('PENDING', 'PROCESSED', 'FAILED')),
  gateway_refund_id VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 9. COMMUNITY (REDDIT STYLE)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(250) NOT NULL,
  body TEXT NOT NULL,
  category VARCHAR(80) NOT NULL, -- Tips & Advice, Stories, Discussion, Recipes, Salary Transparency
  image_url TEXT,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_community_cat ON community_posts(category);
CREATE INDEX idx_community_votes ON community_posts(upvotes DESC);

CREATE TABLE IF NOT EXISTS community_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES community_comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS community_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vote_type SMALLINT NOT NULL CHECK (vote_type IN (-1, 1)),
  UNIQUE(post_id, user_id)
);

-- ==============================================================================
-- 10. REVIEWS & TRUST
-- ==============================================================================

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  reviewee_user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  job_application_id UUID REFERENCES job_applications(id) ON DELETE SET NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_user_id);

-- ==============================================================================
-- 11. NOTIFICATIONS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(60) NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  action_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
