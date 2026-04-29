"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveProduct(data: {
  id: string;
  name: string;
  description: string;
  features: string[];
  useCases: string[];
  icon: string;
  slug: string;
}) {
  await prisma.product.update({
    where: { id: data.id },
    data: {
      name: data.name,
      description: data.description,
      features: data.features,
      useCases: data.useCases,
    },
  });
  revalidatePath("/admin/content");
  revalidatePath("/");
  revalidatePath("/giai-phap");
}

export async function saveCaseStudy(data: {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  testimonial?: string | null;
  testimonialAuthor?: string | null;
}) {
  await prisma.caseStudy.update({
    where: { id: data.id },
    data: {
      title: data.title,
      client: data.client,
      industry: data.industry,
      challenge: data.challenge,
      solution: data.solution,
      result: data.result,
      testimonial: data.testimonial ?? null,
      testimonialAuthor: data.testimonialAuthor ?? null,
    },
  });
  revalidatePath("/admin/content");
  revalidatePath("/du-an");
}
