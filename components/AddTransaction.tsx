"use client";

import addTransaction from "@/app/actions/addTransaction";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);

    if (error) {
      toast({
        title: "Error",
        description: error,
      });
    } else {
      toast({
        title: "Success",
        description: "Transaction Added",
      });
      formRef.current?.reset();
    }
  };

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader>Add transaction</CardHeader>
        <CardContent>
          <form
            ref={formRef}
            action={clientAction}
            className="flex flex-col gap-3"
          >
            <Label>Description</Label>
            <Input type="text" name="text" />
            <Label>Amount</Label>
            <p>(positive = income / negative = expense)</p>
            <Input type="number" name="amount" step="0.01" />

            <Button className="mx-auto w-1/2 bg-yellow-400 font-extrabold text-black">
              Add
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddTransaction;
