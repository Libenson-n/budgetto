"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getUserBalance = async (): Promise<{
  balance?: number;
  error?: string;
}> => {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });

    const balance = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    return { balance };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Database error";
    return { error: errorMessage };
  }
};
