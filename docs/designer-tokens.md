# An Hà Design System — Implementation Guide

## 1. Tailwind Config (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─────────────────────────────────────────
      // COLOR TOKENS
      // ─────────────────────────────────────────
      colors: {
        navy: {
          900: '#0f2744',   // dark bg, header
          800: '#1e3a5f',   // primary brand
          700: '#2d5280',   // hover states
          600: '#3d6a9e',   // borders, dividers
          500: '#4d82bc',   // light accent
          100: '#e8f0fa',   // tinted bg
          50:  '#f0f5fb',   // ultra light
        },
        gold: {
          600: '#a8842d',   // pressed state
          500: '#c9a84c',   // CTA primary
          400: '#d4b86a',   // hover CTA
          300: '#e0cc8a',   // subtle accent
          100: '#f7f0d8',   // tinted bg
          50:  '#fdf9ee',   // ultra light
        },
        // Override gray để khớp design token
        gray: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },

      // ─────────────────────────────────────────
      // TYPOGRAPHY
      // ─────────────────────────────────────────
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body:    ['Be Vietnam Pro', 'sans-serif'],
        sans:    ['Be Vietnam Pro', 'Inter', 'sans-serif'], // default
      },
      fontSize: {
        // Custom scale bổ sung Tailwind defaults
        'display-2xl': ['4.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-xl':  ['3.75rem', { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg':  ['3rem',    { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-md':  ['2.25rem', { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm':  ['1.875rem',{ lineHeight: '1.25', letterSpacing: '0',       fontWeight: '600' }],
      },
      lineHeight: {
        'tight-hero': '1.08',
        'snug-body':  '1.65',
      },
      letterSpacing: {
        'caption': '0.08em',
        'tight':   '-0.02em',
      },

      // ─────────────────────────────────────────
      // SPACING CUSTOM
      // ─────────────────────────────────────────
      spacing: {
        '4.5':  '1.125rem',   // 18px
        '13':   '3.25rem',    // 52px
        '15':   '3.75rem',    // 60px
        '18':   '4.5rem',     // 72px
        '22':   '5.5rem',     // 88px
        '25':   '6.25rem',    // 100px
        '30':   '7.5rem',     // 120px — section padding mobile
        '35':   '8.75rem',    // 140px — section padding desktop
      },
      maxWidth: {
        'screen-2xl': '1440px',
        'prose-lg':   '720px',
        'prose-xl':   '820px',
      },

      // ─────────────────────────────────────────
      // BORDER RADIUS
      // ─────────────────────────────────────────
      borderRadius: {
        'xl':  '0.75rem',    // 12px — cards
        '2xl': '1rem',       // 16px — large cards
        '3xl': '1.5rem',     // 24px — hero elements
        '4xl': '2rem',       // 32px — feature blocks
      },

      // ─────────────────────────────────────────
      // BOX SHADOW
      // ─────────────────────────────────────────
      boxShadow: {
        'card':    '0 1px 3px 0 rgb(15 39 68 / 0.06), 0 1px 2px -1px rgb(15 39 68 / 0.06)',
        'card-md': '0 4px 16px -2px rgb(15 39 68 / 0.10), 0 2px 6px -2px rgb(15 39 68 / 0.06)',
        'card-lg': '0 16px 40px -4px rgb(15 39 68 / 0.14), 0 6px 16px -4px rgb(15 39 68 / 0.08)',
        'cta':     '0 4px 14px 0 rgb(201 168 76 / 0.40)',
        'cta-lg':  '0 6px 24px 0 rgb(201 168 76 / 0.50)',
        'navy':    '0 8px 24px -4px rgb(15 39 68 / 0.30)',
        'inner-gold': 'inset 0 1px 0 rgb(255 255 255 / 0.15)',
      },

      // ─────────────────────────────────────────
      // BACKGROUND GRADIENTS
      // ─────────────────────────────────────────
      backgroundImage: {
        'hero-gradient':    'linear-gradient(135deg, #0f2744 0%, #1e3a5f 50%, #2d5280 100%)',
        'hero-radial':      'radial-gradient(ellipse at 70% 50%, #2d5280 0%, #0f2744 70%)',
        'section-gradient': 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
        'gold-gradient':    'linear-gradient(135deg, #c9a84c 0%, #d4b86a 100%)',
        'card-shine':       'linear-gradient(135deg, rgb(255 255 255 / 0.05) 0%, transparent 60%)',
        'dot-pattern':      'radial-gradient(circle, #3d6a9e 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-sm': '20px 20px',
        'dot-md': '28px 28px',
        'dot-lg': '36px 36px',
      },

      // ─────────────────────────────────────────
      // ANIMATION & TRANSITION
      // ─────────────────────────────────────────
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'smooth':  'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring':  'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgb(201 168 76 / 0.4)' },
          '50%':       { boxShadow: '0 0 0 8px rgb(201 168 76 / 0)' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in':    'fade-in 0.4s ease-out both',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),        // Form styling base reset
    require('@tailwindcss/typography'),   // Prose content
    require('@tailwindcss/aspect-ratio'), // Image aspect ratios
  ],
}

export default config
```

---

## 2. Component Class Specifications

### 2.1 — Button Component

```typescript
// components/ui/Button.tsx
// Tất cả variants với đầy đủ states: default, hover, focus, active, disabled

export const buttonVariants = {

  // ── PRIMARY CTA ────────────────────────────────────────────────────────────
  // Dùng cho: "Nhận báo giá", "Liên hệ tư vấn", hero CTA
  primary: [
    // Base
    'inline-flex items-center justify-center gap-2',
    'bg-gold-500 text-navy-900',
    'font-heading font-semibold',
    'rounded-xl',
    'border border-gold-400',
    'shadow-cta',
    'transition-all duration-250 ease-smooth',
    // Hover
    'hover:bg-gold-400',
    'hover:shadow-cta-lg',
    'hover:-translate-y-0.5',
    // Focus
    'focus:outline-none',
    'focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2',
    // Active
    'active:bg-gold-600 active:translate-y-0 active:shadow-cta',
    // Disabled
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none',
  ].join(' '),

  // ── SECONDARY (Outline Navy) ────────────────────────────────────────────────
  // Dùng cho: action phụ, form cancel
  secondary: [
    'inline-flex items-center justify-center gap-2',
    'bg-transparent text-navy-800',
    'font-heading font-semibold',
    'rounded-xl',
    'border-2 border-navy-800',
    'transition-all duration-250 ease-smooth',
    'hover:bg-navy-800 hover:text-white',
    'hover:-translate-y-0.5 hover:shadow-navy',
    'focus:outline-none',
    'focus-visible:ring-2 focus-visible:ring-navy-800 focus-visible:ring-offset-2',
    'active:bg-navy-900 active:border-navy-900 active:translate-y-0',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none',
  ].join(' '),

  // ── OUTLINE LIGHT (dùng trên nền navy) ─────────────────────────────────────
  // Dùng cho: secondary CTA trong hero section
  outlineLight: [
    'inline-flex items-center justify-center gap-2',
    'bg-transparent text-white',
    'font-heading font-semibold',
    'rounded-xl',
    'border-2 border-white/40',
    'backdrop-blur-sm',
    'transition-all duration-250 ease-smooth',
    'hover:bg-white/10 hover:border-white/70',
    'hover:-translate-y-0.5',
    'focus:outline-none',
    'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
    'focus-visible:ring-offset-navy-800',
    'active:bg-white/5 active:translate-y-0',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none',
  ].join(' '),

  // ── GHOST ──────────────────────────────────────────────────────────────────
  // Dùng cho: navigation links, text actions
  ghost: [
    'inline-flex items-center justify-center gap-1.5',
    'bg-transparent text-gray-600',
    'font-body font-medium',
    'rounded-lg',
    'transition-colors duration-200',
    'hover:text-navy-800 hover:bg-gray-100',
    'focus:outline-none',
    'focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1',
    'active:text-navy-900 active:bg-gray-200',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),

  // ── LINK ───────────────────────────────────────────────────────────────────
  // Dùng cho: inline text actions, breadcrumbs
  link: [
    'inline-flex items-center gap-1',
    'text-navy-700 font-medium',
    'underline-offset-2',
    'hover:text-navy-900 hover:underline',
    'transition-colors duration-200',
    'focus:outline-none focus-visible:rounded focus-visible:ring-1 focus-visible:ring-navy-700',
  ].join(' '),
}

// SIZE VARIANTS
export const buttonSizes = {
  sm:  'px-4 py-2 text-sm',
  md:  'px-6 py-2.5 text-sm',       // Navigation buttons
  lg:  'px-8 py-3.5 text-base',     // Standard CTA
  xl:  'px-10 py-4 text-lg',        // Hero CTA
  icon: 'p-2.5',                    // Icon-only button
}

// USAGE EXAMPLE:
// <button className={`${buttonVariants.primary} ${buttonSizes.xl}`}>
//   Nhận báo giá
//   <ArrowRight className="w-5 h-5" />
// </button>
```

---

### 2.2 — Card Component

```typescript
// components/ui/Card.tsx
// 5 card variants phủ toàn bộ use cases

export const cardVariants = {

  // ── PRODUCT CARD ────────────────────────────────────────────────────────────
  // Dùng cho: Trang Giải Pháp, SolutionOverview section
  product: {
    wrapper: [
      'group relative',
      'bg-white rounded-2xl',
      'border border-gray