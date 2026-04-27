# An Hà Frontend — Types, HeroSection & Header

## 1. TypeScript Types (`src/types/components.ts`)

```typescript
// src/types/components.ts
import type { StaticImageData } from 'next/image'

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'outlineLight' | 'ghost' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'icon'

export interface CTAButton {
  label: string
  href: string
  variant: ButtonVariant
  size?: ButtonSize
  icon?: React.ReactNode
  /** Mở link trong tab mới */
  external?: boolean
  /** Tracking event name cho analytics */
  trackingId?: string
}

export interface ImageAsset {
  src: string | StaticImageData
  alt: string
  width?: number
  height?: number
  priority?: boolean
}

export interface SeoMeta {
  title: string
  description: string
  ogImage?: string
  keywords?: string[]
}

// ─────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────

export type HeroBadgeVariant = 'gold' | 'navy' | 'success'

export interface HeroBadge {
  text: string
  variant?: HeroBadgeVariant
  icon?: React.ReactNode
}

export interface HeroStat {
  /** Số liệu nổi bật, VD: "500+" */
  value: string
  /** Nhãn mô tả, VD: "Khách hàng doanh nghiệp" */
  label: string
  /** Icon tuỳ chọn */
  icon?: React.ReactNode
}

export interface HeroSectionProps {
  /** Badge nhỏ phía trên headline, VD: "✓ Được tin dùng bởi 500+ doanh nghiệp" */
  badge?: HeroBadge
  /** Headline chính — hỗ trợ highlight từ khoá qua <mark> */
  headline: string
  /** Từ/cụm từ được highlight màu gold */
  highlightWords?: string[]
  /** Subheadline / mô tả ngắn */
  subheadline: string
  /** Tối đa 2 CTA buttons */
  ctaButtons: [CTAButton] | [CTAButton, CTAButton]
  /** Stats bar phía dưới CTA, tối đa 3 */
  stats?: [HeroStat?, HeroStat?, HeroStat?]
  /** Ảnh nền hoặc ảnh sản phẩm bên phải */
  heroImage?: ImageAsset
  /** Video nền (autoplay, muted, loop) */
  backgroundVideoUrl?: string
  /** Bật/tắt dot pattern overlay */
  showDotPattern?: boolean
  /** Thêm className tùy chỉnh */
  className?: string
}

// ─────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────

export type ProductCategory = 'tem-qr' | 'tem-hologram' | 'tem-serial'
export type ProductBadgeType = 'popular' | 'new' | 'enterprise'

export interface ProductFeature {
  text: string
  included: boolean
}

export interface ProductCardProps {
  id: string
  name: string
  slug: string
  category: ProductCategory
  /** Tagline ngắn */
  tagline: string
  description: string
  /** Icon SVG component hoặc URL */
  icon: React.ReactNode
  image?: ImageAsset
  features: ProductFeature[]
  /** Badge nổi bật: "Phổ biến nhất", "Mới", "Dành cho doanh nghiệp lớn" */
  badge?: ProductBadgeType
  /** Ngành hàng áp dụng */
  useCases: string[]
  ctaLabel?: string
  href: string
  /** Card nổi bật (featured layout lớn hơn) */
  featured?: boolean
  className?: string
}

// ─────────────────────────────────────────────────────────────
// CASE STUDY CARD
// ─────────────────────────────────────────────────────────────

export type IndustryType =
  | 'thuc-pham'
  | 'duoc-pham'
  | 'my-pham'
  | 'dien-tu'
  | 'thoi-trang'
  | 'nong-san'

export interface CaseStudyResult {
  metric: string   // VD: "Giảm 85%"
  description: string // VD: "tỷ lệ hàng giả bị phát hiện"
}

export interface CaseStudyTestimonial {
  quote: string
  authorName: string
  authorTitle: string
  authorAvatar?: ImageAsset
}

export interface CaseStudyCardProps {
  id: string
  title: string
  slug: string
  client: string
  industry: IndustryType
  industryLabel: string
  /** Một câu tóm tắt vấn đề */
  challenge: string
  /** Giải pháp đã triển khai */
  solution: string
  results: CaseStudyResult[]
  testimonial?: CaseStudyTestimonial
  coverImage: ImageAsset
  /** Logo của client */
  clientLogo?: ImageAsset
  /** Hiển thị dạng featured (full-width) hay compact */
  variant?: 'featured' | 'compact' | 'list'
  className?: string
}

// ─────────────────────────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────────────────────────

export type IndustryOption = {
  value: string
  label: string
}

export type QuantityRange =
  | 'under-10k'
  | '10k-50k'
  | '50k-200k'
  | '200k-1m'
  | 'over-1m'

export interface ContactFormData {
  companyName: string
  contactName: string
  industry: string
  quantityRange: QuantityRange
  email: string
  phone: string
  message: string
  /** Sản phẩm quan tâm */
  interestedProducts: ProductCategory[]
  /** Đồng ý nhận thông tin */
  acceptMarketing: boolean
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface ContactFormProps {
  /** Tiêu đề form */
  title?: string
  /** Mô tả phụ */
  description?: string
  /** Callback khi submit thành công */
  onSuccess?: (data: ContactFormData) => void
  /** Callback khi submit lỗi */
  onError?: (error: Error) => void
  /** Source tracking: 'hero' | 'contact-page' | 'solution-page' */
  source?: string
  className?: string
}

// ─────────────────────────────────────────────────────────────
// NAVIGATION HEADER
// ─────────────────────────────────────────────────────────────

export interface NavChild {
  label: string
  href: string
  description?: string
  icon?: React.ReactNode
}

export interface NavItem {
  label: string
  href: string
  /** Nếu có children → hiển thị dropdown */
  children?: NavChild[]
  /** Hiển thị badge "Mới" */
  isNew?: boolean
}

export interface HeaderProps {
  /** Override nav items (mặc định dùng DEFAULT_NAV_ITEMS) */
  navItems?: NavItem[]
  /** CTA button "Nhận báo giá" */
  ctaButton?: Pick<CTAButton, 'label' | 'href'>
  /** Transparent trên hero (scroll để chuyển solid) */
  transparent?: boolean
  className?: string
}
```

---

## 2. HeroSection Component (`src/components/sections/HeroSection.tsx`)

```tsx
// src/components/sections/HeroSection.tsx
'use client'

import React, { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, CheckCircle2, ChevronRight } from 'lucide-react'
import type { HeroSectionProps, HeroStat, CTAButton } from '@/types/components'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Mỗi child delay tăng dần
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
} as const

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
} as const

const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
} as const

const slideRightVariant = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  },
} as const

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

interface HighlightedHeadlineProps {
  headline: string
  highlightWords?: string[]
}

/**
 * Render headline, wrap các từ trong highlightWords bằng <mark> màu gold
 */
function HighlightedHeadline({ headline, highlightWords = [] }: HighlightedHeadlineProps) {
  if (highlightWords.length === 0) {
    return <>{headline}</>
  }

  // Tạo regex khớp bất kỳ từ nào trong danh sách
  const pattern = highlightWords
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')
  const regex = new RegExp(`(${pattern})`, 'gi')
  const parts = headline.split(regex)

  return (
    <>
      {parts.map((part, idx) => {
        const isHighlight = highlightWords.some(
          (w) => w.toLowerCase() === part.toLowerCase()
        )
        if (isHighlight) {
          return (
            <mark
              key={idx}
              className={cn(
                'bg-transparent text-gold-400',
                // Underline decoration kiểu brush stroke
                'relative inline-block',
                'after:absolute after:bottom-0 after:left-0 after:right-0',
                'after:h-[3px] after:rounded-full',
                'after:bg-gold-500/60'
              )}
            >
              {part}
            </mark>
          )
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>
      })}
    </>
  )
}

// ─────────────────────────────────────────────────────────────

interface StatItemProps {
  stat: HeroStat
  index: number
}

function StatItem({ stat, index }: StatItemProps) {
  return (
    <motion.div
      variants={fadeUpVariant}
      custom={index}
      className={cn(
        'flex flex-col items-center sm:items-start',
        'px-6 py-4',
        // Divider giữa các stat (trừ item cuối)
        'sm:border-r sm:border-white/15 last:border-r-0',
        'first:pl-0'
      )}
    >
      {stat.icon && (
        <span className="mb-1 text-gold-400" aria-hidden="true">
          {stat.icon}
        </span>
      )}
      <span
        className={cn(
          'text-3xl font-heading font-extrabold text-white',
          'leading-tight tracking-tight'
        )}
      >
        {stat.value}
      </span>
      <span className="mt-0.5 text-sm font-body text-navy-100/70 text-center sm:text-left">
        {stat.label}
      </span>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────

interface CTAButtonRendererProps {
  button: CTAButton
  index: number
}

function CTAButtonRenderer({ button, index }: CTAButtonRendererProps) {
  const isPrimary = button.variant === 'primary'
  const isOutlineLight = button.variant === 'outlineLight'

  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2.5',
    'font-heading font-semibold rounded-xl',
    'transition-all duration-250',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-offset-navy-900',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    // Size XL cho hero
    'px-8 py-4 text-base lg:px-10 lg:py-4 lg:text-lg'
  )

  const variantClasses = isPrimary
    ? cn(
        'bg-gold-500 text-navy-900',
        'border border-gold-400',
        'shadow-cta',
        'hover:bg-gold-400 hover:shadow-cta-lg hover:-translate-y-0.5',
        'active:bg-gold-600 active:translate-y-0 active:shadow-cta',
        'focus-visible:ring-gold-500'
      )
    : isOutlineLight
    ? cn(
        'bg-transparent text-white',
        'border-2 border-white/40',
        'backdrop-blur-sm',
        'hover:bg-white/10 hover:border-white/70 hover:-translate-y-0.5',
        'active:bg-white/5 active:translate-y-0',
        'focus-visible:ring-white'
      )
    : ''

  const linkProps = button.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <motion.div
      variants={fadeUpVariant}
      custom={index}
      // Pulse animation chỉ cho primary CTA
      className={isPrimary ? 'animate-pulse-gold rounded-xl' : ''}
    >
      <Link
        href={button.href}
        className={cn(baseClasses, variantClasses)}
        data-tracking={button.trackingId