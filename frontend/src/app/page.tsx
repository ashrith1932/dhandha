import React from "react";
import Link from "next/link";
import {
  ChefHat,
  Search,
  Sparkles,
  ArrowRight,
  Star,
  MapPin,
  Clock,
  Briefcase,
  TrendingUp,
  ThumbsUp,
  MessageCircle,
  ShieldCheck,
  Building2,
  UtensilsCrossed,
  CheckCircle2,
  PlusCircle,
  Users,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { SectionContainer, SectionHeader } from "@/components/layout/section";
import { ThreeDElement } from "@/components/common/three-d-element";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  sampleCooks,
  sampleChefServices,
  sampleFoodListings,
  sampleJobs,
  sampleCommunityPosts,
  serviceCategories,
} from "@/lib/sample-data";
import { formatCurrency, timeAgo } from "@/lib/utils";

export default function HomePage() {
  return (
    <MainLayout>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-prussian via-ink-black to-prussian text-white pt-10 sm:pt-16 pb-20 sm:pb-28">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-saffron/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-grape/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-almond-400">
                <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
                <span>India&apos;s Cooking Services Marketplace</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight leading-[1.08]">
                  Everything Cooking. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-saffron-light to-amber-200">
                    One Marketplace.
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-almond-500 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed pt-2">
                  Find trusted daily cooks, book celebrity chefs, discover authentic
                  homemade food, or build your culinary career — all with one universal account.
                </p>
              </div>

              {/* Search Bar Prompt (District Style) */}
              <div className="relative max-w-xl mx-auto lg:mx-0">
                <Link
                  href="/explore"
                  className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 shadow-elevated text-almond-400 transition-all group"
                >
                  <Search className="w-5 h-5 text-saffron shrink-0" />
                  <span className="text-sm sm:text-base text-almond-400 group-hover:text-white transition-colors flex-1 text-left">
                    Search cooks, chefs, homemade thalis, biryani or jobs...
                  </span>
                  <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-xl bg-saffron text-white group-hover:bg-saffron-dark transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link href="/cooks">
                  <Button
                    size="lg"
                    className="bg-saffron hover:bg-saffron-dark text-white font-bold rounded-2xl px-7 shadow-lg shadow-saffron/30 hover:scale-105 transition-all"
                  >
                    <ChefHat className="w-5 h-5 mr-2" />
                    <span>Find a Cook</span>
                  </Button>
                </Link>
                <Link href="/food">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/25 text-white hover:bg-white/10 hover:border-white font-bold rounded-2xl px-6"
                  >
                    <UtensilsCrossed className="w-5 h-5 mr-2 text-saffron" />
                    <span>Explore Food</span>
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/25 text-white hover:bg-white/10 hover:border-white font-bold rounded-2xl px-6"
                  >
                    <Briefcase className="w-5 h-5 mr-2 text-almond-400" />
                    <span>Find Jobs</span>
                  </Button>
                </Link>
              </div>

              {/* Secondary links */}
              <div className="flex items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-almond-600 font-medium pt-2">
                <Link
                  href="/dashboard/cook"
                  className="hover:text-saffron transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-saffron" />
                  <span>Become a Verified Cook</span>
                </Link>
                <span className="text-white/20">•</span>
                <Link
                  href="/dashboard/restaurant"
                  className="hover:text-saffron transition-colors flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-almond-400" />
                  <span>Hire for My Restaurant</span>
                </Link>
              </div>
            </div>

            {/* Right: 3D Interactive Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md sm:max-w-lg aspect-square">
                <ThreeDElement
                  variant="hero"
                  badgeText="3D Culinary Space"
                  className="w-full h-full bg-gradient-to-br from-prussian-400/40 via-ink-black to-prussian-600/30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-surface border-y border-border py-6 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-border/60">
            <div className="px-2">
              <span className="block font-heading font-extrabold text-2xl sm:text-3xl text-prussian">
                2,400+
              </span>
              <span className="text-xs text-text-secondary font-medium">
                Verified Cooks & Chefs
              </span>
            </div>
            <div className="px-2">
              <span className="block font-heading font-extrabold text-2xl sm:text-3xl text-prussian">
                150+
              </span>
              <span className="text-xs text-text-secondary font-medium">
                Cities Across India
              </span>
            </div>
            <div className="px-2">
              <span className="block font-heading font-extrabold text-2xl sm:text-3xl text-prussian">
                12,000+
              </span>
              <span className="text-xs text-text-secondary font-medium">
                Meals & Services Booked
              </span>
            </div>
            <div className="px-2">
              <span className="block font-heading font-extrabold text-2xl sm:text-3xl text-saffron">
                ₹0 Hidden
              </span>
              <span className="text-xs text-text-secondary font-medium">
                Transparent Platform Pricing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE CATEGORIES GRID (District Reference Style) ===== */}
      <SectionContainer>
        <SectionHeader
          title="Explore Cooking Categories"
          subtitle="Everything from daily household assistance to luxury catering & commercial kitchen staffing"
          viewAllHref="/explore"
          viewAllText="Explore All"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {serviceCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/explore?category=${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center p-4 rounded-2xl bg-surface border border-border hover:border-saffron hover:shadow-card-hover transition-all text-center group cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform shadow-xs`}
              >
                <ChefHat className="w-6 h-6" />
              </div>
              <span className="font-heading font-bold text-xs text-prussian group-hover:text-saffron-dark transition-colors line-clamp-1">
                {cat.name}
              </span>
              <span className="text-[10px] text-text-muted mt-0.5 line-clamp-1">
                {cat.count}+ active
              </span>
            </Link>
          ))}
        </div>
      </SectionContainer>

      {/* ===== FEATURED COOKS (Hire a Cook Vertical) ===== */}
      <SectionContainer className="bg-almond-900/40 border-y border-border/80">
        <SectionHeader
          badge="Verified Professionals"
          title="Top-Rated Home Cooks Near You"
          subtitle="Background verified, culinary screened, and reviewed by Indian households"
          viewAllHref="/cooks"
          viewAllText="View All Cooks"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleCooks.map((cook) => (
            <Card
              key={cook.id}
              className="overflow-hidden border border-border hover:border-saffron hover:shadow-elevated transition-all flex flex-col group bg-surface rounded-3xl"
            >
              <div className="p-5 flex-1 space-y-4">
                {/* Header & Avatar */}
                <div className="flex items-start justify-between gap-3">
                  <div className="relative">
                    <Avatar className="w-16 h-16 border-2 border-white shadow-sm">
                      <AvatarImage src={cook.user?.avatarUrl} alt={cook.user?.fullName} />
                      <AvatarFallback>{cook.user?.fullName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-success ring-2 ring-white" />
                  </div>
                  <Badge variant="saffron" className="text-xs font-semibold gap-1">
                    <Star className="w-3 h-3 fill-saffron text-saffron" />
                    <span>{cook.averageRating}</span>
                    <span className="text-text-muted text-[10px]">
                      ({cook.totalReviews})
                    </span>
                  </Badge>
                </div>

                {/* Name & Title */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-bold text-base text-prussian group-hover:text-saffron-dark transition-colors">
                      {cook.user?.fullName}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
                    {cook.professionalTitle}
                  </p>
                </div>

                {/* Location & Experience */}
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-text-muted" />
                    {cook.locality}, {cook.city}
                  </span>
                  <span>•</span>
                  <span>{cook.yearsExperience}+ yrs exp</span>
                </div>

                {/* Cuisines */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cook.cuisines.slice(0, 3).map((c) => (
                    <span
                      key={c.id}
                      className="px-2 py-0.5 rounded-md bg-almond-800/80 text-prussian text-[11px] font-medium"
                    >
                      {c.name}
                    </span>
                  ))}
                </div>

                {/* Pricing summary */}
                <div className="pt-3 border-t border-border/70 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider block">
                      Expected Salary
                    </span>
                    <span className="font-heading font-bold text-sm text-prussian">
                      {formatCurrency(cook.expectedSalaryMin || 15000)} -{" "}
                      {formatCurrency(cook.expectedSalaryMax || 22000)}
                      <span className="text-[10px] font-normal text-text-secondary">/mo</span>
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-success">
                    {cook.completedJobs} jobs done
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 bg-almond-900/30 border-t border-border">
                <Link href={`/cooks/${cook.id}`} className="w-full block">
                  <Button
                    variant="outline"
                    className="w-full justify-center group-hover:bg-saffron group-hover:text-white group-hover:border-saffron rounded-xl transition-all text-xs font-bold"
                  >
                    <span>View Profile & Hire</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* ===== BOOK A PROFESSIONAL CHEF (Chef Vertical) ===== */}
      <SectionContainer>
        <SectionHeader
          badge="Luxury & Event Dining"
          title="Book an Executive Chef for Your Event"
          subtitle="From intimate house parties and private multi-course dinners to large wedding banquets"
          viewAllHref="/chefs"
          viewAllText="Explore Chef Services"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleChefServices.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl border border-border bg-gradient-to-b from-surface to-almond-900/20 p-5 flex flex-col justify-between hover:shadow-elevated hover:border-prussian transition-all group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-prussian text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-6 h-6 text-saffron" />
                </div>

                <div>
                  <h3 className="font-heading font-bold text-lg text-prussian group-hover:text-saffron-dark transition-colors">
                    {service.serviceType}
                  </h3>
                  <p className="text-xs text-text-secondary line-clamp-3 mt-1.5 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 text-xs text-text-secondary">
                  <div className="flex items-center justify-between">
                    <span>Chef:</span>
                    <span className="font-semibold text-prussian">
                      {service.cook?.user?.fullName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Guest Capacity:</span>
                    <span className="font-semibold text-prussian">
                      {service.minimumGuests} – {service.maximumGuests} guests
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-text-muted block">Pricing From</span>
                  <span className="font-heading font-extrabold text-base text-prussian">
                    {formatCurrency(service.basePrice)}
                    <span className="text-[10px] font-normal text-text-secondary">
                      {service.pricingType === "PER_PERSON" ? "/person" : " fixed"}
                    </span>
                  </span>
                </div>
                <Link href={`/chefs/${service.id}`}>
                  <Button size="sm" className="bg-prussian hover:bg-prussian-600 text-white rounded-xl text-xs font-bold">
                    Book Chef
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* ===== HOMEMADE FOOD MARKETPLACE (Food Vertical) ===== */}
      <SectionContainer className="bg-almond-900/40 border-y border-border/80">
        <SectionHeader
          badge="Direct from Kitchens"
          title="Homemade Food & Daily Tiffins"
          subtitle="Prepared fresh by verified home cooks and neighborhood tiffin centers with love and FSSAI standards"
          viewAllHref="/food"
          viewAllText="View Full Menu"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {sampleFoodListings.slice(0, 4).map((food) => (
            <Card
              key={food.id}
              className="overflow-hidden border border-border hover:border-saffron hover:shadow-card-hover transition-all flex flex-col group rounded-3xl bg-surface"
            >
              {/* Image Area */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-almond-800">
                <img
                  src={food.imageUrl}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-[10px] font-bold">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      food.dietaryType === "VEG" ? "bg-success" : "bg-danger"
                    }`}
                  />
                  <span>{food.dietaryType}</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-prussian/85 text-white backdrop-blur-sm text-[11px] font-semibold">
                  <Clock className="w-3 h-3 text-saffron" />
                  <span>{food.preparationTime} min</span>
                </div>
              </div>

              {/* Food Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                    {food.provider?.providerName}
                  </span>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-prussian line-clamp-1 group-hover:text-saffron-dark transition-colors">
                    {food.name}
                  </h3>
                  <p className="text-xs text-text-secondary line-clamp-2 mt-1">
                    {food.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <span className="font-heading font-bold text-base text-prussian">
                    {formatCurrency(food.price)}
                  </span>
                  <Link href={`/food/${food.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl text-xs font-semibold hover:bg-saffron hover:text-white hover:border-saffron"
                    >
                      Order
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* ===== LATEST JOBS & RESTAURANT HIRING (Jobs Vertical) ===== */}
      <SectionContainer>
        <SectionHeader
          badge="Culinary Careers"
          title="Active Cooking & Kitchen Jobs"
          subtitle="Household cook vacancies, restaurant chef jobs, and cloud kitchen positions"
          viewAllHref="/jobs"
          viewAllText="Browse All Jobs"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleJobs.slice(0, 4).map((job) => (
            <Card
              key={job.id}
              className="p-5 border border-border hover:border-prussian hover:shadow-card-hover transition-all flex flex-col justify-between group rounded-3xl bg-surface"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={job.jobType === "RESTAURANT" ? "default" : "secondary"}
                        className="text-[10px] font-bold"
                      >
                        {job.jobType}
                      </Badge>
                      <span className="text-xs text-text-muted">
                        Posted {timeAgo(job.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-prussian group-hover:text-saffron-dark transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs font-medium text-text-secondary">
                      {job.restaurant?.name || job.postedByUser?.fullName} • {job.city},{" "}
                      {job.locality}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-almond-800 flex items-center justify-center text-prussian shrink-0">
                    <Briefcase className="w-5 h-5 text-prussian" />
                  </div>
                </div>

                <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-text-muted block">Salary Offered</span>
                  <span className="font-heading font-bold text-sm text-prussian">
                    {formatCurrency(job.salaryMin || 15000)} –{" "}
                    {formatCurrency(job.salaryMax || 25000)}
                    <span className="text-[10px] font-normal text-text-secondary">
                      /{job.salaryPeriod?.toLowerCase() || "mo"}
                    </span>
                  </span>
                </div>
                <Link href={`/jobs/${job.id}`}>
                  <Button
                    size="sm"
                    className="bg-saffron hover:bg-saffron-dark text-white rounded-xl text-xs font-bold"
                  >
                    Apply Now ({job.applicationsCount} applied)
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* ===== REDDIT-STYLE COMMUNITY HIGHLIGHTS ===== */}
      <SectionContainer className="bg-almond-900/40 border-y border-border/80">
        <SectionHeader
          badge="Community Discussions"
          title="From the DHANDHA Kitchen Table"
          subtitle="Cook discussions, secret family recipes, kitchen stories, and authentic salary transparency"
          viewAllHref="/community"
          viewAllText="Join the Discussion"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleCommunityPosts.slice(0, 2).map((post) => (
            <Card
              key={post.id}
              className="p-5 border border-border hover:border-prussian hover:shadow-card-hover transition-all flex flex-col justify-between group rounded-3xl bg-surface"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={post.user?.avatarUrl} />
                    <AvatarFallback>{post.user?.fullName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-prussian">{post.user?.fullName}</span>
                    <span className="text-text-muted">•</span>
                    <Badge variant="outline" className="text-[10px] py-0 px-2">
                      {post.category}
                    </Badge>
                    <span className="text-text-muted">•</span>
                    <span className="text-text-muted">{timeAgo(post.createdAt)}</span>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-base text-prussian group-hover:text-saffron-dark transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed">
                  {post.body}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 font-semibold text-prussian">
                    <ThumbsUp className="w-4 h-4 text-saffron" />
                    {post.upvotes} Upvotes
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-text-muted" />
                    {post.commentsCount} Comments
                  </span>
                </div>
                <Link
                  href={`/community`}
                  className="font-bold text-saffron-dark hover:text-saffron transition-colors"
                >
                  Join Thread →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* ===== PLATFORM CTA BANNER ===== */}
      <section className="py-16 bg-prussian text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/15 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <Badge variant="saffron" className="text-xs px-3 py-1 font-bold">
            Kaam bhi. Khana bhi.
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold max-w-2xl mx-auto tracking-tight">
            Ready to experience India&apos;s culinary revolution?
          </h2>
          <p className="text-almond-500 max-w-xl mx-auto text-sm sm:text-base">
            Whether you need a cook for dinner tonight, an executive chef for your wedding,
            or are looking to earn as a culinary professional — DHANDHA connects you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-saffron hover:bg-saffron-dark text-white font-bold rounded-2xl px-8 shadow-lg shadow-saffron/30"
              >
                Get Started in 2 Minutes
              </Button>
            </Link>
            <Link href="/explore">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-2xl px-7"
              >
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
