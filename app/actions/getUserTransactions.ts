"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Transaction } from "@/types/Transaction";

export const getUserTransaction = async (): Promise<{
  transactions: Transaction[];
  error?: string;
}> => {
  const { userId } = auth();

  if (!userId) {
    return { "error: User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
      orderBy: {
        createdAT: "desc",
      },
    });

    return { transactions };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Database error";
    return { error: errorMessage };
  }
};
