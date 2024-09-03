import { formatCurrency } from "@/lib/utils";
import { getUserBalance } from "@/app/actions/getUserBalance";

const Balance = async () => {
  const { balance } = await getUserBalance();

  if (!balance) {
    return <p>Add your first transaction.</p>;
  }

  return (
    <div className="text-xl">
      <h4>Your Balance</h4>
      <h2 className="font-bold">${formatCurrency(balance)}</h2>
    </div>
  );
};

export default Balance;
