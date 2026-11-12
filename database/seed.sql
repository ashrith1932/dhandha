-- ==============================================================================
-- DHANDHA: Comprehensive Seed Data (India Marketplace)
-- Kaam bhi. Khana bhi.
-- ==============================================================================

-- 1. Insert Cuisines
INSERT INTO cuisines (id, name) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'North Indian'),
  ('c1000000-0000-0000-0000-000000000002', 'South Indian'),
  ('c1000000-0000-0000-0000-000000000003', 'Punjabi'),
  ('c1000000-0000-0000-0000-000000000004', 'Mughlai'),
  ('c1000000-0000-0000-0000-000000000005', 'Gujarati'),
  ('c1000000-0000-0000-0000-000000000006', 'Rajasthani'),
  ('c1000000-0000-0000-0000-000000000007', 'Maharashtrian'),
  ('c1000000-0000-0000-0000-000000000008', 'Jain Pure Veg'),
  ('c1000000-0000-0000-0000-000000000009', 'Bengali'),
  ('c1000000-0000-0000-0000-000000000010', 'Continental'),
  ('c1000000-0000-0000-0000-000000000011', 'Chinese')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert Users (Universal Profiles)
INSERT INTO users (id, full_name, email, phone, avatar_url, auth_provider, account_status, email_verified, phone_verified) VALUES
  ('u1000000-0000-0000-0000-000000000001', 'Priya Sharma', 'priya@example.com', '+919876543210', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya', 'PHONE_OTP', 'ACTIVE', true, true),
  ('u1000000-0000-0000-0000-000000000002', 'Rajesh Kumar', 'rajesh@example.com', '+919876543211', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Rajesh', 'PHONE_OTP', 'ACTIVE', true, true),
  ('u1000000-0000-0000-0000-000000000003', 'Anita Desai', 'anita@example.com', '+919876543212', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Anita', 'PHONE_OTP', 'ACTIVE', true, true),
  ('u1000000-0000-0000-0000-000000000004', 'Vikram Singh', 'vikram@example.com', '+919876543213', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Vikram', 'GOOGLE', 'ACTIVE', true, true),
  ('u1000000-0000-0000-0000-000000000005', 'Meera Patel', 'meera@example.com', '+919876543214', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Meera', 'PHONE_OTP', 'ACTIVE', true, true),
  ('u1000000-0000-0000-0000-000000000006', 'Arjun Reddy', 'arjun@example.com', '+919876543215', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Arjun', 'GOOGLE', 'ACTIVE', true, true)
ON CONFLICT (id) DO NOTHING;

-- 3. Universal User Capabilities
INSERT INTO user_capabilities (user_id, capability, status) VALUES
  ('u1000000-0000-0000-0000-000000000001', 'ORDER_FOOD', 'ACTIVE'),
  ('u1000000-0000-0000-0000-000000000001', 'BOOK_COOK', 'ACTIVE'),
  ('u1000000-0000-0000-0000-000000000001', 'BOOK_CHEF', 'ACTIVE'),
  ('u1000000-0000-0000-0000-000000000001', 'POST_GENERAL_JOB', 'ACTIVE'),
  ('u1000000-0000-0000-0000-000000000002', 'CREATE_COOK_PROFILE', 'ACTIVE'),
  ('u1000000-0000-0000-0000-000000000002', 'APPLY_FOR_JOB', 'ACTIVE'),
  ('u1000000-0000-0000-0000-000000000003', 'CREATE_COOK_PROFILE', 'ACTIVE'),
  ('u1000000-0000-0000-0000-000000000003', 'LIST_FOOD', 'ACTIVE'),
  ('u1000000-0000-0000-0000-000000000004', 'MANAGE_RESTAURANT', 'ACTIVE'),
  ('u1000000-0000-0000-0000-000000000004', 'POST_RESTAURANT_JOB', 'ACTIVE'),
  ('u1000000-0000-0000-0000-000000000006', 'CREATE_COOK_PROFILE', 'ACTIVE'),
  ('u1000000-0000-0000-0000-000000000006', 'BOOK_CHEF', 'ACTIVE')
ON CONFLICT DO NOTHING;

-- 4. User Profiles
INSERT INTO user_profiles (user_id, bio, city, state, postal_code, preferred_language) VALUES
  ('u1000000-0000-0000-0000-000000000001', 'Family household looking for reliable North Indian home cooks.', 'Delhi', 'Delhi', '110075', 'Hindi'),
  ('u1000000-0000-0000-0000-000000000002', 'Passionate North Indian home cook with 12 years of experience.', 'Delhi', 'Delhi', '110075', 'Hindi'),
  ('u1000000-0000-0000-0000-000000000003', 'South Indian thali and dosa specialist with certified kitchen.', 'Bengaluru', 'Karnataka', '560034', 'Kannada'),
  ('u1000000-0000-0000-0000-000000000004', 'Restaurateur managing multiple commercial dining outlets in Delhi NCR.', 'Delhi', 'Delhi', '110001', 'English'),
  ('u1000000-0000-0000-0000-000000000005', 'Specialist in traditional Gujarati thalis and festive sweets.', 'Ahmedabad', 'Gujarat', '380015', 'Gujarati'),
  ('u1000000-0000-0000-0000-000000000006', 'Five-star trained banquet chef available for luxury weddings & events.', 'Mumbai', 'Maharashtra', '400050', 'English')
ON CONFLICT (user_id) DO NOTHING;

-- 5. Addresses
INSERT INTO addresses (id, user_id, label, address_line_1, locality, city, state, postal_code, is_default) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'u1000000-0000-0000-0000-000000000001', 'Home', 'Flat 402, Royal Palms, Sector 11', 'Dwarka', 'Delhi', 'Delhi', '110075', true),
  ('a1000000-0000-0000-0000-000000000002', 'u1000000-0000-0000-0000-000000000004', 'Restaurant Office', '45, Outer Circle', 'Connaught Place', 'Delhi', 'Delhi', '110001', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Cook Profiles
INSERT INTO cook_profiles (id, user_id, professional_title, description, years_experience, experience_type, expected_salary_min, expected_salary_max, hourly_rate, daily_rate, availability_status, verification_status, average_rating, total_reviews, completed_jobs) VALUES
  ('cp000000-0000-0000-0000-000000000001', 'u1000000-0000-0000-0000-000000000002', 'Experienced Home Cook — North Indian Specialist', 'Over 12 years of experience cooking authentic North Indian cuisine. Specializing in Punjabi, Rajasthani, and Mughlai dishes. Punctual, hygienic, and courteous.', 12, 'HOME', 15000.00, 22000.00, 350.00, 1200.00, 'AVAILABLE', 'VERIFIED', 4.85, 47, 156),
  ('cp000000-0000-0000-0000-000000000002', 'u1000000-0000-0000-0000-000000000003', 'Professional Chef — South Indian & Continental', 'Certified culinary professional with 8 years experience in top restaurants across Bengaluru. Expert in South Indian thalis, dosas, and healthy meals.', 8, 'RESTAURANT', 25000.00, 40000.00, 600.00, 2500.00, 'AVAILABLE', 'VERIFIED', 4.90, 83, 245),
  ('cp000000-0000-0000-0000-000000000003', 'u1000000-0000-0000-0000-000000000005', 'Gujarati & Rajasthani Home Cook', 'Passionate about traditional pure vegetarian home cooking. Expert in rotlis, theplas, dhoklas, and festive sweets.', 15, 'HOME', 12000.00, 18000.00, 300.00, 1000.00, 'AVAILABLE', 'VERIFIED', 4.70, 62, 198),
  ('cp000000-0000-0000-0000-000000000004', 'u1000000-0000-0000-0000-000000000006', 'Executive Event Chef — Multi-Cuisine', 'Five-star hotel veteran available for luxury private dining, high-profile weddings, and corporate banquets.', 10, 'PROFESSIONAL', 35000.00, 60000.00, 1500.00, 5000.00, 'AVAILABLE', 'VERIFIED', 4.95, 124, 340)
ON CONFLICT (id) DO NOTHING;

-- 7. Cook Cuisines
INSERT INTO cook_cuisines (cook_profile_id, cuisine_id) VALUES
  ('cp000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001'),
  ('cp000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000003'),
  ('cp000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000002'),
  ('cp000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000005'),
  ('cp000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001'),
  ('cp000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000010')
ON CONFLICT DO NOTHING;

-- 8. Chef Services
INSERT INTO chef_services (id, cook_profile_id, service_type, description, pricing_type, base_price, minimum_guests, maximum_guests, active) VALUES
  ('cs000000-0000-0000-0000-000000000001', 'cp000000-0000-0000-0000-000000000004', 'Private Dining Experience', 'Multi-course bespoke tasting menu prepared live in your home kitchen for intimate dinner parties.', 'PER_PERSON', 2500.00, 2, 12, true),
  ('cs000000-0000-0000-0000-000000000002', 'cp000000-0000-0000-0000-000000000004', 'Wedding Banquet Feast', 'Grand wedding feast catering with regional and fusion live counters.', 'PER_PERSON', 800.00, 50, 500, true),
  ('cs000000-0000-0000-0000-000000000003', 'cp000000-0000-0000-0000-000000000002', 'House Party Chef', 'Interactive house party cooking with live starter station, mains, and dessert plating.', 'FIXED', 8000.00, 8, 30, true)
ON CONFLICT (id) DO NOTHING;

-- 9. Restaurants
INSERT INTO restaurants (id, owner_user_id, name, description, phone, email, business_type, verification_status) VALUES
  ('r1000000-0000-0000-0000-000000000001', 'u1000000-0000-0000-0000-000000000004', 'Spice Junction', 'Premium fine dine Indian restaurant in Connaught Place, New Delhi.', '+911140001234', 'info@spicejunction.in', 'RESTAURANT', 'VERIFIED'),
  ('r1000000-0000-0000-0000-000000000002', 'u1000000-0000-0000-0000-000000000004', 'The Biryani House', 'Authentic Hyderabadi dum biryani kitchen brand across Delhi NCR.', '+911140005678', 'contact@biryanihouse.in', 'RESTAURANT', 'VERIFIED')
ON CONFLICT (id) DO NOTHING;

-- 10. Jobs
INSERT INTO jobs (id, posted_by, restaurant_id, job_type, title, description, employment_type, salary_min, salary_max, salary_period, experience_required, vacancies, city, locality, status) VALUES
  ('j1000000-0000-0000-0000-000000000001', 'u1000000-0000-0000-0000-000000000001', NULL, 'HOUSEHOLD', 'Full-time Vegetarian Home Cook Needed in Dwarka', 'Looking for an experienced vegetarian cook for our family of 4. Must be skilled in North Indian and Gujarati meals. Cooking required for lunch and dinner.', 'FULL_TIME', 15000.00, 20000.00, 'MONTHLY', 3, 1, 'Delhi', 'Dwarka', 'ACTIVE'),
  ('j1000000-0000-0000-0000-000000000002', 'u1000000-0000-0000-0000-000000000004', 'r1000000-0000-0000-0000-000000000001', 'RESTAURANT', 'Senior Tandoor & Mughlai Chef — Spice Junction', 'Spice Junction is hiring senior tandoor chefs with minimum 5 years experience in high-volume tandoor preparations.', 'FULL_TIME', 25000.00, 35000.00, 'MONTHLY', 5, 2, 'Delhi', 'Connaught Place', 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

-- 11. Food Providers & Food Listings
INSERT INTO food_providers (id, user_id, provider_name, provider_type, verification_status, active) VALUES
  ('fp000000-0000-0000-0000-000000000001', 'u1000000-0000-0000-0000-000000000003', 'Anita''s Home Kitchen', 'HOME_COOK', 'VERIFIED', true),
  ('fp000000-0000-0000-0000-000000000002', 'u1000000-0000-0000-0000-000000000005', 'Meera''s Gujarati Thali', 'TIFFIN_SERVICE', 'VERIFIED', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO food_listings (id, provider_id, name, description, category, price, image_url, dietary_type, preparation_time, availability_status) VALUES
  ('fl000000-0000-0000-0000-000000000001', 'fp000000-0000-0000-0000-000000000001', 'South Indian Deluxe Thali', 'Rice, sambar, rasam, 2 vegetable curries, curd, papad, pickle, and payasam. Prepared fresh daily.', 'Thali', 180.00, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop', 'VEG', 45, 'AVAILABLE'),
  ('fl000000-0000-0000-0000-000000000002', 'fp000000-0000-0000-0000-000000000001', 'Masala Dosa with Chutneys', 'Crispy golden dosa filled with spiced potato masala. Served with coconut chutney and hot sambar.', 'Breakfast', 80.00, 'https://images.unsplash.com/photo-1668236543090-82bbe40920b1?w=400&h=300&fit=crop', 'VEG', 20, 'AVAILABLE'),
  ('fl000000-0000-0000-0000-000000000003', 'fp000000-0000-0000-0000-000000000002', 'Authentic Gujarati Thali Box', 'Rotli, dal, kadhi, 3 sabzis, steamed rice, khichdi, papad, salad and sweet.', 'Thali', 150.00, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop', 'VEG', 60, 'AVAILABLE')
ON CONFLICT (id) DO NOTHING;

-- 12. Community Posts
INSERT INTO community_posts (id, user_id, title, body, category, upvotes, downvotes) VALUES
  ('post0000-0000-0000-0000-000000000001', 'u1000000-0000-0000-0000-000000000001', 'Best practices for evaluating a home cook in Delhi NCR?', 'After hiring cooks through unverified channels for years, here is my checklist for hygiene, tasting trial, and contract transparency...', 'Tips & Advice', 42, 2),
  ('post0000-0000-0000-0000-000000000002', 'u1000000-0000-0000-0000-000000000002', 'From local home cook to catering 5 families: My culinary journey', 'I started 12 years ago cooking for one family. Today through DHANDHA, I earn a stable professional income with full respect.', 'Stories', 156, 3)
ON CONFLICT (id) DO NOTHING;
