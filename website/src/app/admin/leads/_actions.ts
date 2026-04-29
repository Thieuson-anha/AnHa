"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(id: string, status: string) {
  await prisma.contact.update({
    where: { id },
    data: { status: status as "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED" },
  });
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
