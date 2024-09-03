import { getIncomeExpense } from "@/app/actions/getIncomeExpense";
import { formatCurrency } from "@/lib/utils";

const IncomeExpense = async () => {
  const { income, expense } = await getIncomeExpense();

  return (
    <div className="flex gap-3">
      <div>
        <h4>Income</h4>
        <p className="text-green-600">
          ${!income ? 0 : formatCurrency(income)}
        </p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="text-red-600">
          ${!expense ? 0 : formatCurrency(expense)}
        </p>
      </div>
    </div>
  );
};

export default IncomeExpense;
