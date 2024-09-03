import { getUserTransaction } from "@/app/actions/getUserTransactions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { formatCurrency } from "@/lib/utils";
import { Transaction } from "@/types/Transaction";
import DeleteTransactionBtn from "./DeleteTransactionBtn";

const TransactionTable = async () => {
  const { transactions, error } = await getUserTransaction();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Table className="shadow-sm">
      <TableCaption>Transactions History</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Income</TableHead>
          <TableHead>Expense</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions &&
          transactions.map((transaction: Transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.text}</TableCell>
              <TableCell className="text-green-600">
                {transaction.amount > 0
                  ? "$" + formatCurrency(transaction.amount)
                  : ""}
              </TableCell>
              <TableCell className="text-red-600">
                {transaction.amount < 0
                  ? "$" + formatCurrency(transaction.amount)
                  : ""}
              </TableCell>
              <TableCell>
                <DeleteTransactionBtn transactionId={transaction.id} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
