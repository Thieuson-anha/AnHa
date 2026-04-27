export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  useCases: string[];
  imageUrl: string;
  icon: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  testimonial?: string;
  testimonialAuthor?: string;
  imageUrl: string;
}

export interface ContactFormData {
  companyName: string;
  industry: string;
  estimatedQuantity: string;
  contactName: string;
  email: string;
  phone: string;
  message?: string;
}

export interface Stat {
  value: string;
  label: string;
  description?: string;
}
