"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async (
  transactionId: string,
): Promise<{
  message?: string;
  error?: string;
}> => {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    await db.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    });

    revalidatePath("/");

    return { message: "Transaction delete" };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Database error";
    return { error: errorMessage };
  }
};
