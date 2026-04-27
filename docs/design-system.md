# Design System - An Hà
> Tác giả: Designer Agent | Sprint 1

## Brand Philosophy
**Tin cậy · Bảo mật · Chuyên nghiệp**
Truyền thông cảm giác an toàn và uy tín cho doanh nghiệp B2B.

## Color Palette

```
Primary:
  navy-900:   #0f2744   (background section tối, header)
  navy-800:   #1e3a5f   (primary brand color)
  navy-700:   #2d5280   (hover states)
  navy-600:   #3d6a9e   (borders, dividers)

Accent:
  gold-500:   #c9a84c   (CTA buttons, highlights)
  gold-400:   #d4b86a   (hover CTA)
  gold-300:   #e0cc8a   (subtle accent)

Neutral:
  gray-50:    #f8fafc   (page backgrounds)
  gray-100:   #f1f5f9   (card backgrounds)
  gray-200:   #e2e8f0   (borders)
  gray-600:   #475569   (body text secondary)
  gray-900:   #0f172a   (body text primary)

Semantic:
  success:    #22c55e
  error:      #ef4444
  warning:    #f59e0b
```

## Typography

```css
Font families:
  heading:  'Inter', sans-serif           (700, 800)
  body:     'Be Vietnam Pro', sans-serif  (400, 500, 600)

Scale (Tailwind):
  display:   text-5xl lg:text-6xl font-extrabold  (hero headline)
  h1:        text-4xl lg:text-5xl font-bold
  h2:        text-3xl font-bold
  h3:        text-xl font-semibold
  body-lg:   text-lg font-normal
  body:      text-base font-normal
  small:     text-sm font-normal
  caption:   text-xs font-medium uppercase tracking-wider
```

## Spacing System
```
Base unit: 4px (Tailwind default)
Section padding: py-20 lg:py-28
Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Card padding: p-6 lg:p-8
Gap grid: gap-6 lg:gap-8
```

## Component Tokens

### Button
```tsx
// Primary (CTA chính)
"bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold
 px-8 py-3 rounded-lg transition-colors duration-200 shadow-md"

// Secondary (outline)
"border-2 border-navy-800 text-navy-800 hover:bg-navy-800
 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors"

// Ghost (navigation)
"text-gray-600 hover:text-navy-800 font-medium transition-colors"
```

### Card
```tsx
// Product card
"bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100
 p-8 transition-all duration-300 hover:-translate-y-1"

// Case study card
"bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg
 border border-gray-100 transition-all duration-300"

// Stat card
"bg-navy-800 text-white rounded-2xl p-8 text-center"
```

### Badge
```tsx
"inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs
 font-semibold uppercase tracking-wide"

// Variants:
blue:  "bg-blue-100 text-blue-800"
gold:  "bg-amber-100 text-amber-800"
green: "bg-green-100 text-green-800"
```

### Form Input
```tsx
"w-full px-4 py-3 border border-gray-200 rounded-lg
 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent
 placeholder:text-gray-400 text-gray-900 bg-white transition"
```

## Icon System
Dùng `lucide-react`: Shield, QrCode, Fingerprint, Award, Users, TrendingUp,
CheckCircle, ArrowRight, Phone, Mail, MapPin, ChevronDown

## Section Patterns

### Light section
```
bg-gray-50 (hoặc bg-white)
text-gray-900
```

### Dark section (navy)
```
bg-navy-900 (hoặc bg-navy-800)
text-white
Accent: text-gold-400
```

### Hero
```
bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700
text-white
Overlay pattern: grid dots hoặc circuit board SVG
```

## Responsive Breakpoints
```
Mobile:  < 640px   (default)
Tablet:  640px+    (sm:)
Laptop:  1024px+   (lg:)
Desktop: 1280px+   (xl:)
```
