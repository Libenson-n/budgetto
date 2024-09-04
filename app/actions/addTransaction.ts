"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type TransactionData = {
  text: string;
  amount: number;
  userId: string;
};

type TransactionResult = {
  data?: TransactionData;
  error?: string;
};

const addTransaction = async (
  formData: FormData,
): Promise<TransactionResult> => {
  const textValue = formData.get("text");
  const amountValue = formData.get("amount");

  if (!textValue || textValue === "" || !amountValue) {
    return { error: "Text or amount is missing!" };
  }

  const text: string = textValue.toString();
  const amount: number = parseFloat(amountValue.toString());

  console.log(amount);

  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });
    revalidatePath("/");
    return { data: transactionData };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Transcation not added";
    return { error: errorMessage };
  }
};

export default addTransaction;
